#!/usr/bin/env bash
# Pages serves every file under the deploy root, and `pages deploy .` has no
# working exclude (.assetsignore is a Workers-assets feature, not a Pages one).
# So the deploy root is assembled from an allowlist instead of the repo root,
# which keeps docs/, the .pen design source and tests off the public site.
set -euo pipefail
cd "$(dirname "$0")"

OUT=.deploy
rm -rf "$OUT"
mkdir -p "$OUT"

cp index.html "$OUT/"
for dir in assets join holding; do
  cp -R "$dir" "$OUT/"
done
find "$OUT" -name '*.test.js' -delete

bunx wrangler pages deploy "$OUT" --project-name mattstack-dev "$@"
