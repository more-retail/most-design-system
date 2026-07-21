#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');

const SERVER_URL = "https://gh-scan.more.in/verify";

function getRepoName() {
    try {
        const url = execSync("git remote get-url origin", { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
        const match = url.match(/[:/]([^/]+\/[^/]+?)(?:\.git)?$/);
        if (match) {
            return match[1];
        }
    } catch (e) {}
    return null;
}

function getGhToken() {
    try {
        return execSync("gh auth token", { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    } catch (e) {
        return null;
    }
}

function checkGhAuth() {
    return !!getGhToken();
}

const CONVENTIONAL_COMMIT_RE = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\([a-zA-Z0-9_\-\/.]+\))?(!?): .+$/;
const REVERT_RE = /^Revert ".+"$/;

function isMergeCommit(sha) {
    try {
        const parents = execSync(`git log --pretty=%P -n 1 ${sha}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim().split(/\s+/);
        return parents.length >= 2;
    } catch (e) {
        return false;
    }
}

function validateCommitMessage(msg, sha) {
    if (!msg) return false;
    const firstLine = msg.split(/\r?\n/)[0].trim();
    if (!firstLine) return false;
    if (firstLine.startsWith("Merge ")) {
        if (sha && !isMergeCommit(sha)) {
            return CONVENTIONAL_COMMIT_RE.test(firstLine);
        }
        return true;
    }
    if (firstLine.startsWith("Revert ")) {
        return REVERT_RE.test(firstLine);
    }
    return CONVENTIONAL_COMMIT_RE.test(firstLine);
}

function readStdin() {
    return new Promise((resolve) => {
        if (process.stdin.isTTY) {
            resolve("");
            return;
        }
        let input = "";
        process.stdin.setEncoding("utf-8");
        process.stdin.on("data", (chunk) => {
            input += chunk;
        });
        process.stdin.on("end", () => {
            resolve(input);
        });
    });
}

function getGitInfo(stdin) {
    const lines = stdin.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) return null;

    const parts = lines[0].split(/\s+/);
    if (parts.length < 4) return null;
    let [local_ref, local_sha, remote_ref, remote_sha] = parts;

    if (local_sha === "0000000000000000000000000000000000000000") {
        return null; // Deleting branch
    }

    // Resolve SHA if it is not a 40-character hex string (e.g. HEAD, branch name)
    if (!/^[a-f0-9]{40}$/.test(local_sha)) {
        try {
            local_sha = execSync(`git rev-parse ${local_sha}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
        } catch (e) {}
    }

    let base = "origin/dev";
    if (remote_sha === "0000000000000000000000000000000000000000") {
        try {
            execSync("git rev-parse --verify origin/dev", { stdio: 'ignore' });
        } catch (e) {
            try {
                execSync("git rev-parse --verify origin/main", { stdio: 'ignore' });
                base = "origin/main";
            } catch (e2) {
                base = "HEAD~1";
            }
        }
    } else {
        const branchParts = remote_ref.split('/');
        const remote_branch = branchParts[branchParts.length - 1];
        base = `origin/${remote_branch}`;
    }

    const diffRange = `${base}..${local_sha}`;

    try {
        const diff = execSync(`git log -p ${diffRange}`, { maxBuffer: 10 * 1024 * 1024, stdio: ['pipe', 'pipe', 'ignore'] }).toString('utf-8');
        const commitsRaw = execSync(`git log --format="%H %s" ${diffRange}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString('utf-8').split(/\r?\n/).filter(Boolean);

        const commitsData = commitsRaw.map(line => {
            const spaceIdx = line.indexOf(" ");
            if (spaceIdx === -1) return { sha: line.trim(), msg: "" };
            return {
                sha: line.substring(0, spaceIdx),
                msg: line.substring(spaceIdx + 1).trim()
            };
        });

        return { diff, commitsData, local_sha, base };
    } catch (e) {
        console.error(`🚨 PUSH BLOCKED — Could not extract diff range for scanning: ${e.message}`);
        console.error("Please ensure your branch has a valid remote tracking branch and try again.");
        return null;
    }
}

function makeRequest(urlStr, token, payload) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr);
        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'Pre-Push-Hook-Node',
                'Content-Length': Buffer.byteLength(payload)
            },
            rejectUnauthorized: true
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        reject(new Error(`Failed to parse response JSON: ${e.message}`));
                    }
                } else if (res.statusCode === 401) {
                    reject(new Error("Unauthorized: You do not have access to this repository."));
                } else if (res.statusCode === 403) {
                    reject(new Error("Forbidden: You do not have write/push permissions on this repository."));
                } else if (res.statusCode === 429) {
                    reject(new Error("Rate Limit Exceeded: Gemini API rate limit reached. Please wait a minute and retry."));
                } else {
                    reject(new Error(`Validation Server Error (Code ${res.statusCode})`));
                }
            });
        });

        req.on('error', (e) => {
            const errStr = ((e.code || "") + " " + (e.message || "")).toUpperCase();
            if (
                errStr.includes('CERT_HAS_EXPIRED') ||
                errStr.includes('DEPTH_ZERO_SELF_SIGNED_CERT') ||
                errStr.includes('UNABLE_TO_GET_ISSUER_CERT_LOCALLY') ||
                errStr.includes('SELF SIGNED CERTIFICATE')
            ) {
                // Retry once bypassing certificate validation (e.g. self-signed local certs)
                const unverifiedOptions = { ...options, rejectUnauthorized: false };
                const retryReq = https.request(unverifiedOptions, (retryRes) => {
                    let retryBody = '';
                    retryRes.setEncoding('utf8');
                    retryRes.on('data', (chunk) => retryBody += chunk);
                    retryRes.on('end', () => {
                        if (retryRes.statusCode === 200) {
                            try {
                                resolve(JSON.parse(retryBody));
                            } catch (err) {
                                reject(new Error(`Failed to parse response JSON: ${err.message}`));
                            }
                        } else {
                            reject(new Error(`Validation Server Error (Code ${retryRes.statusCode})`));
                        }
                    });
                });
                retryReq.on('error', (err) => reject(err));
                retryReq.write(payload);
                retryReq.end();
            } else {
                reject(e);
            }
        });

        req.write(payload);
        req.end();
    });
}

function getGitConfig(key) {
    try {
        return execSync(`git config ${key}`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    } catch (e) {
        return "";
    }
}

async function main() {
    const repo = getRepoName();
    if (!repo) {
        console.warn("⚠️ Warning: Could not detect repository name from git remote. Proceeding...");
        process.exit(0);
    }

    if (!checkGhAuth()) {
        console.error("🚨 GITHUB CLI NOT AUTHENTICATED");
        console.error("Please run 'gh auth login' in your terminal (and complete SAML SSO if required) before pushing.");
        process.exit(1);
    }

    const token = getGhToken();
    if (!token) {
        console.error("🚨 PUSH BLOCKED: Could not retrieve GitHub token.");
        process.exit(1);
    }

    const stdin = await readStdin();
    const gitInfo = getGitInfo(stdin);
    if (!gitInfo || !gitInfo.diff) {
        console.log("No changes to verify. Proceeding...");
        process.exit(0);
    }

    const { diff, commitsData, local_sha, base } = gitInfo;

    if (commitsData && commitsData.length > 0) {
        const invalidCommits = commitsData.filter(c => !validateCommitMessage(c.msg, c.sha));
        if (invalidCommits.length > 0) {
            console.error("\n🚨 PUSH BLOCKED — Commit Message Format Violation");
            console.error("Commit messages must follow the Conventional Commits specification:");
            console.error("Format: `<type>(<scope>): <description>`");
            console.error("Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.\n");
            console.error("Non-compliant commits in this push:");
            invalidCommits.forEach(c => {
                console.error(`- ${c.sha}: ${c.msg}`);
            });
            console.error("\nPush aborted. Please rewrite your commit history to clear/fix these commits:");
            console.error("  git rebase -i origin/dev");
            console.error("Then mark the violated commit IDs as 'reword' or 'r' to correct them.");
            process.exit(1);
        }
    }

    console.log("🔍 Running Node.js Pre-Push Quality Gate...");
    console.log("⏳ Waiting for server-side Gemini Static Analysis (takes ~5-10s)...");

    const devEmail = getGitConfig("user.email");
    const devName = getGitConfig("user.name");

    const payload = JSON.stringify({
        diff: diff,
        repo: repo,
        commits: commitsData.map(c => c.msg),
        sha: local_sha,
        developer_email: devEmail,
        developer_name: devName
    });

    try {
        const result = await makeRequest(SERVER_URL, token, payload);
        const passed = result.passed || false;
        const score = result.overall_score || 0;
        const errors = result.errors || [];
        const suggestions = result.suggestions || [];

        if (passed) {
            console.log(`✅ Quality Gate Passed! (Score: ${score}/100)`);
            process.exit(0);
        } else {
            console.error(`\n🚨 PUSH BLOCKED — Quality Gate Failed (Score: ${score}/100)`);

            if (errors.length > 0) {
                console.error("\n--- 🚨 BUGS, SECRETS & SECURITY VULNERABILITIES ---");
                errors.forEach(err => {
                    console.error(`* ${err.file}:${err.line} -> ${err.message}`);
                    if (err.details) {
                        if (Array.isArray(err.details)) {
                            err.details.forEach(d => console.error(`  - ${d}`));
                        } else if (typeof err.details === 'string' && err.details.trim()) {
                            console.error(`  Snippet: ${err.details.trim()}`);
                        }
                    }
                });
            }

            if (suggestions.length > 0) {
                console.error("\n--- 💡 SUGGESTED IMPROVEMENTS & CODE SMELLS ---");
                suggestions.forEach(sug => {
                    console.error(`* ${sug.file}:${sug.line} -> ${sug.message}`);
                });
            }

            console.error("\nPush aborted. Please fix the errors above and try again.");
            console.error("If these errors are inside previous commits in your push history, rewrite the history to clean them:");
            console.error(`  git rebase -i ${base}`);
            console.error("Then amend or reword the violated commits.");
            process.exit(1);
        }
    } catch (e) {
        console.error(`🚨 PUSH BLOCKED — Hook Connection/SSL Error: ${e.message}`);
        process.exit(1);
    }
}

main();
