#!/bin/bash

if [ "$1" = "--status" ]; then
    echo "=============================================="
    echo "      More AI Quality Gate Diagnostics        "
    echo "=============================================="
    if command -v node &> /dev/null; then
        echo "🟢 Node.js: Installed ($(node -v))"
    else
        echo "🔴 Node.js: Not Installed"
    fi
    if command -v python3 &> /dev/null; then
        echo "🟢 Python 3: Installed ($(python3 --version))"
    else
        echo "🔴 Python 3: Not Installed"
    fi
    if command -v gh &> /dev/null && gh auth status &>/dev/null; then
        echo "🟢 GitHub CLI (gh): Authenticated"
    else
        echo "🔴 GitHub CLI (gh): Not Authenticated (run 'gh auth login')"
    fi
    CURRENT_HOOKS=$(git config core.hooksPath 2>/dev/null || git config --global core.hooksPath 2>/dev/null || echo "None")
    echo "ℹ️  Active Git hooks path: $CURRENT_HOOKS"
    exit 0
fi

# 1. Select Quality Gate Hook Runtime
echo "=============================================="
echo "      More AI Quality Gate Hook Installer     "
echo "=============================================="
echo "Select hook runtime to configure:"
echo "1) Node.js (Recommended for Frontend devs, no Python needed)"
echo "2) Python 3 (Recommended for Backend / Python devs)"
read -p "Enter choice (1 or 2): " choice

# Validate chosen runtime
if [ "$choice" = "1" ]; then
    if ! command -v node &> /dev/null; then
        echo "🚨 Error: Node.js is not installed."
        exit 1
    fi
    RUNNER_TYPE="node"
    TARGET_SCRIPT="pre-push.cjs"
elif [ "$choice" = "2" ]; then
    if ! command -v python3 &> /dev/null; then
        echo "🚨 Error: Python 3 is not installed."
        exit 1
    fi
    RUNNER_TYPE="python3"
    TARGET_SCRIPT="pre-push.py"
else
    echo "❌ Invalid selection. Setup aborted."
    exit 1
fi

# 2. Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "🚨 Error: GitHub CLI ('gh') is not installed."
    echo "Please install it first (e.g., 'brew install gh' on macOS)."
    exit 1
fi

# 3. Check if gh CLI is authenticated
if ! gh auth status &>/dev/null; then
    echo "🚨 GitHub CLI is not authenticated."
    echo "Starting 'gh auth login'..."
    gh auth login
    if [ $? -ne 0 ]; then
        echo "❌ Authentication failed. Hooks setup aborted."
        exit 1
    fi
else
    echo "✅ GitHub CLI is already authenticated."
fi

# 4. Configure Global Workstation Git Hooks
GLOBAL_HOOK_DIR="$HOME/.git-global-hooks"
mkdir -p "$GLOBAL_HOOK_DIR"

HOOKS_SRC="$(dirname "$0")"
cp "$HOOKS_SRC/$TARGET_SCRIPT" "$GLOBAL_HOOK_DIR/$TARGET_SCRIPT"

WRAPPER_FILE="$GLOBAL_HOOK_DIR/pre-push"
cat << EOF > "$WRAPPER_FILE"
#!/bin/sh
$RUNNER_TYPE "\$(dirname "\$0")/$TARGET_SCRIPT" "\$@"
EOF

chmod +x "$WRAPPER_FILE"
chmod +x "$GLOBAL_HOOK_DIR/$TARGET_SCRIPT"

git config --global core.hooksPath "$GLOBAL_HOOK_DIR"
echo ""
echo "✅ Global Git hooks successfully configured!"
echo "ℹ️  All repositories on this machine will automatically run the More AI Quality Gate."
