#!/usr/bin/env python3
import sys
import subprocess
import json
import urllib.request
import re
import ssl

# CONFIGURATION
# Replace this with your actual ALB domain URL ending with /verify
SERVER_URL = "https://gh-scan.more.in/verify"

def get_repo_name():
    try:
        # Fetch remote origin URL (e.g. git@github.com:owner/repo.git or https://github.com/owner/repo)
        url = subprocess.check_output(["git", "remote", "get-url", "origin"], stderr=subprocess.DEVNULL).decode('utf-8').strip()
        match = re.search(r"[:/]([^/]+/[^/]+?)(?:\.git)?$", url)
        if match:
            return match.group(1)
    except Exception:
        pass
    return None

def get_gh_token():
    try:
        # Read the active GitHub CLI credential token
        return subprocess.check_output(["gh", "auth", "token"], stderr=subprocess.DEVNULL).decode('utf-8').strip()
    except Exception:
        return None

def check_gh_auth():
    return bool(get_gh_token())

_CONVENTIONAL_COMMIT_RE = re.compile(
    r"^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)"
    r"(?:\([a-zA-Z0-9_\-\/.]+\))?"
    r"(!?)"
    r": "
    r".+$"
)

_REVERT_RE = re.compile(r'^Revert ".+"$')

def is_merge_commit(sha: str) -> bool:
    try:
        parents = subprocess.check_output(["git", "log", "--pretty=%P", "-n", "1", sha], stderr=subprocess.DEVNULL).decode('utf-8').strip().split()
        return len(parents) >= 2
    except Exception:
        return False

def validate_commit_message(msg: str, sha: str = None) -> bool:
    if not msg:
        return False
    first_line = msg.splitlines()[0].strip()
    if not first_line:
        return False
    if first_line.startswith("Merge "):
        if sha and not is_merge_commit(sha):
            return bool(_CONVENTIONAL_COMMIT_RE.match(first_line))
        return True
    if first_line.startswith("Revert "):
        # Only allow standard git revert format: Revert "<original subject>"
        return bool(_REVERT_RE.match(first_line))
    return bool(_CONVENTIONAL_COMMIT_RE.match(first_line))

def get_git_info():
    # Read stdin from Git (contains target ref information)
    lines = sys.stdin.read().splitlines()
    if not lines:
        return None, None, None, None

    local_ref, local_sha, remote_ref, remote_sha = lines[0].split()

    # Check if deleting remote branch or if no SHA
    if local_sha == "0000000000000000000000000000000000000000":
        return None, None, None, None  # Deleting branch, safe to push

    # Resolve SHA if it is not a 40-character hex string (e.g. HEAD, branch name)
    if not re.fullmatch(r"[a-f0-9]{40}", local_sha):
        try:
            local_sha = subprocess.check_output(["git", "rev-parse", local_sha], stderr=subprocess.DEVNULL).decode('utf-8').strip()
        except Exception:
            pass

    if remote_sha == "0000000000000000000000000000000000000000":
        # New branch: diff against dev/main or last 1 commit
        base = "origin/dev"
        try:
            subprocess.check_call(["git", "rev-parse", "--verify", "origin/dev"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            try:
                subprocess.check_call(["git", "rev-parse", "--verify", "origin/main"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                base = "origin/main"
            except subprocess.CalledProcessError:
                base = "HEAD~1"  # Fallback if single commit
    else:
        # Pushing to existing branch: base is the remote tracking branch
        remote_branch = remote_ref.split('/')[-1]
        base = f"origin/{remote_branch}"

    diff_range = f"{base}..{local_sha}"

    try:
        # Fetch log with patch of changes being pushed
        diff = subprocess.check_output(["git", "log", "-p", diff_range], stderr=subprocess.DEVNULL).decode('utf-8', errors='ignore')
        # Fetch commit hashes and messages of changes being pushed
        commits_raw = subprocess.check_output(["git", "log", "--format=%H %s", diff_range], stderr=subprocess.DEVNULL).decode('utf-8', errors='ignore').splitlines()
        
        commits_data = []
        for line in commits_raw:
            line = line.strip()
            if line:
                parts = line.split(" ", 1)
                sha = parts[0]
                msg = parts[1] if len(parts) > 1 else ""
                commits_data.append((sha, msg))
        return diff, commits_data, local_sha, base
    except Exception as e:
        # Do NOT fall back to a partial scan — that would silently miss secrets in earlier commits
        print(f"🚨 PUSH BLOCKED — Could not extract diff range for scanning: {e}")
        print("Please ensure your branch has a valid remote tracking branch and try again.")
        return None, None, None, None

def get_git_config(key):
    try:
        return subprocess.check_output(["git", "config", key], stderr=subprocess.DEVNULL).decode('utf-8').strip()
    except Exception:
        return ""

def main():
    repo = get_repo_name()
    if not repo:
        print("⚠️ Warning: Could not detect repository name from git remote. Proceeding...")
        sys.exit(0)

    if not check_gh_auth():
        print("🚨 GITHUB CLI NOT AUTHENTICATED")
        print("Please run 'gh auth login' in your terminal (and complete SAML SSO if required) before pushing.")
        sys.exit(1)

    token = get_gh_token()
    if not token:
        print("🚨 PUSH BLOCKED: Could not retrieve GitHub token.")
        sys.exit(1)

    git_info = get_git_info()
    if not git_info or not git_info[0]:
        print("No changes to verify. Proceeding...")
        sys.exit(0)
    diff, commits_data, local_sha, base_branch = git_info

    if commits_data:
        invalid_commits = [(sha, msg) for sha, msg in commits_data if not validate_commit_message(msg, sha)]
        if invalid_commits:
            print("\n🚨 PUSH BLOCKED — Commit Message Format Violation")
            print("Commit messages must follow the Conventional Commits specification:")
            print("Format: `<type>(<scope>): <description>`")
            print("Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.\n")
            print("Non-compliant commits in this push:")
            for sha, msg in invalid_commits:
                print(f"- {sha}: {msg}")
            print("\nPush aborted. Please rewrite your commit history to clear/fix these commits:")
            print("  git rebase -i origin/dev")
            print("Then mark the violated commit IDs as 'reword' or 'r' to correct them.")
            sys.exit(1)

    print("🔍 Running Pre-Push Quality Gate...")
    print("⏳ Waiting for server-side Gemini Static Analysis (takes ~5-10s)...")

    dev_email = get_git_config("user.email")
    dev_name = get_git_config("user.name")

    # Build payload
    payload = json.dumps({
        "diff": diff,
        "repo": repo,
        "commits": [msg for sha, msg in commits_data],
        "sha": local_sha,
        "developer_email": dev_email,
        "developer_name": dev_name
    }).encode('utf-8')

    # Make API request to your AWS FastAPI server
    req = urllib.request.Request(
        SERVER_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
            "User-Agent": "Pre-Push-Hook"
        },
        method="POST"
    )

    try:
        try:
            context = ssl.create_default_context()
            res = urllib.request.urlopen(req, context=context, timeout=120)
        except Exception as ssl_err:
            # Fallback if certificate verification failed (common in local developer environments with private CAs)
            if "CERTIFICATE_VERIFY_FAILED" in str(ssl_err) or "unable to get local issuer certificate" in str(ssl_err):
                context = ssl._create_unverified_context()
                res = urllib.request.urlopen(req, context=context, timeout=120)
            else:
                raise ssl_err
        with res:
            result = json.loads(res.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        if e.code == 401:
            print("🚨 PUSH BLOCKED — Unauthorized: You do not have access to this repository.")
        elif e.code == 403:
            print("🚨 PUSH BLOCKED — Forbidden: You do not have write/push permissions on this repository.")
        elif e.code == 429:
            print("🚨 PUSH BLOCKED — Rate Limit Exceeded: Gemini API rate limit reached. Please wait a minute and retry.")
        else:
            print(f"🚨 PUSH BLOCKED — Validation Server Error (Code {e.code})")
        sys.exit(1)
    except Exception as e:
        print(f"🚨 PUSH BLOCKED — Hook Connection/SSL Error: {e}")
        sys.exit(1)

    passed = result.get("passed", False)
    score = result.get("overall_score", 0)
    errors = result.get("errors", [])
    suggestions = result.get("suggestions", [])

    if passed:
        print(f"✅ Quality Gate Passed! (Score: {score}/100)")
        sys.exit(0)
    else:
        print(f"\n🚨 PUSH BLOCKED — Quality Gate Failed (Score: {score}/100)")

        if errors:
            print("\n--- 🚨 BUGS, SECRETS & SECURITY VULNERABILITIES ---")
            for err in errors:
                print(f"* {err['file']}:{err['line']} -> {err['message']}")
                details = err.get('details')
                if details:
                    if isinstance(details, list):
                        for detail in details:
                            print(f"  - {detail}")
                    elif isinstance(details, str) and details.strip():
                        print(f"  Snippet: {details.strip()}")

        if suggestions:
            print("\n--- 💡 SUGGESTED IMPROVEMENTS & CODE SMELLS ---")
            for sug in suggestions:
                print(f"* {sug['file']}:{sug['line']} -> {sug['message']}")

        print("\nPush aborted. Please fix the errors above and try again.")
        print("If these errors are inside previous commits in your push history, rewrite the history to clean them:")
        print(f"  git rebase -i {base_branch}")
        print("Then amend or reword the violated commits.")
        sys.exit(1)

if __name__ == "__main__":
    main()
