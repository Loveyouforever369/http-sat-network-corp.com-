#!/usr/bin/env bash
# Deploy the Academy build to the live GitHub Pages branch (preserves other pages).
# Usage: bash scripts/deploy-pages.sh "commit message"
set -euo pipefail
SRC="/home/user/http-sat-network-corp.com-"
MSG="${1:-Academy update}"
cd "$SRC"

echo "=== commit + push working branch ==="
git add -A
git commit -q -m "$MSG" || echo "(working branch: nothing to commit)"
for i in 1 2 3 4; do git push -u origin claude/affectionate-gauss-fapuhq && break || { echo "retry $i"; sleep $((2**i)); }; done

echo "=== mirror to Pages branch (claude/quirky-meitner-1d3ybg) ==="
for i in 1 2 3 4; do git fetch origin claude/quirky-meitner-1d3ybg && break || { echo "retry $i"; sleep $((2**i)); }; done
git worktree remove /tmp/pagesdeploy --force 2>/dev/null || true
rm -rf /tmp/pagesdeploy
git worktree add -B pages-deploy /tmp/pagesdeploy origin/claude/quirky-meitner-1d3ybg
cd /tmp/pagesdeploy
cp -f "$SRC/index.html" ./index.html
rm -rf ./css ./js
cp -rf "$SRC/css" ./css
cp -rf "$SRC/js" ./js
if [ -d "$SRC/media" ]; then rm -rf ./media; cp -rf "$SRC/media" ./media; fi
cp -f "$SRC/vercel.json" ./vercel.json 2>/dev/null || true
touch ./.nojekyll
git add -A
git -c user.name="Claude" -c user.email="noreply@anthropic.com" commit -q -m "Deploy: $MSG" || echo "(pages: nothing to deploy)"
for i in 1 2 3 4; do git push origin HEAD:claude/quirky-meitner-1d3ybg && break || { echo "retry $i"; sleep $((2**i)); }; done
cd "$SRC"; git worktree remove /tmp/pagesdeploy --force 2>/dev/null || true
echo "DEPLOYED -> https://loveyouforever369.github.io/http-sat-network-corp.com-/"
