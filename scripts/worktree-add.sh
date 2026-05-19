#!/usr/bin/env sh
# add a worktree and bootstrap .env + node_modules symlinks.
# git worktree add must run inside a worktree (not the bare collection root).
#
# usage (from any worktree, usually main):
#   sh scripts/worktree-add.sh <directory-name> [git worktree add options...]
#
# examples:
#   sh scripts/worktree-add.sh seo-tasks -b seo-tasks
#   sh scripts/worktree-add.sh seo-tasks origin/main

set -e

if [ $# -lt 1 ]; then
  echo "usage: sh scripts/worktree-add.sh <directory-name> [git worktree add options...]" >&2
  exit 1
fi

DIR_NAME="$1"
shift

REPO_ROOT="$(git rev-parse --git-common-dir)"
REPO_ROOT="$(cd "$REPO_ROOT/.." && pwd)"
WORKTREE_PATH="$REPO_ROOT/$DIR_NAME"

git worktree add "$WORKTREE_PATH" "$@"
(cd "$WORKTREE_PATH" && sh scripts/bootstrap-worktree.sh)

echo ""
echo "worktree ready at $WORKTREE_PATH"
