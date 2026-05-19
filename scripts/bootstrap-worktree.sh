#!/usr/bin/env sh
# symlink shared .env files and node_modules into the current worktree.
# run from repo root via .husky/post-checkout or manually after git worktree add.

set -e

MAIN_BRANCH="${MAIN_BRANCH:-main}"
ENV_FILES=".env .env.production"

# collection root (parent of .bare)
REPO_ROOT="$(git rev-parse --git-common-dir)"
REPO_ROOT="$(cd "$REPO_ROOT/.." && pwd)"
WORKTREE_DIR="$(pwd)"

# ── env symlinks (all worktrees) ──────────────────────────────────────────────
for f in $ENV_FILES; do
  CANONICAL="$REPO_ROOT/$f"
  TARGET="$WORKTREE_DIR/$f"

  if [ ! -f "$CANONICAL" ]; then
    if [ ! -e "$TARGET" ]; then
      echo "[bootstrap-worktree] no $f at collection root — copy from .env.example if needed"
    fi
    continue
  fi

  if [ -L "$TARGET" ]; then
    continue
  fi

  if [ -e "$TARGET" ]; then
    echo "[bootstrap-worktree] $f exists and is not a symlink — leaving it alone"
    continue
  fi

  ln -sf "$CANONICAL" "$TARGET"
  echo "[bootstrap-worktree] symlinked $f → $CANONICAL"
done

# ── node_modules symlink (non-main worktrees only) ────────────────────────────
if [ "$WORKTREE_DIR" = "$REPO_ROOT/$MAIN_BRANCH" ]; then
  exit 0
fi

MAIN_NM="$REPO_ROOT/$MAIN_BRANCH/node_modules"
NM_LINK="$WORKTREE_DIR/node_modules"

if [ ! -d "$MAIN_NM" ]; then
  echo "[bootstrap-worktree] $MAIN_NM not found — run pnpm install in $MAIN_BRANCH first"
  exit 0
fi

if [ -L "$NM_LINK" ]; then
  echo "[bootstrap-worktree] node_modules symlink already exists — skipping"
elif [ -d "$NM_LINK" ]; then
  echo "[bootstrap-worktree] real node_modules directory found — leaving it alone"
else
  ln -sf "$MAIN_NM" "$NM_LINK"
  echo "[bootstrap-worktree] symlinked node_modules → $MAIN_NM"
fi
