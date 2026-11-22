#!/bin/bash
# Copies the promo site and privacy page into this GitHub Pages repo (wordgarden.me).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$here/../launch-2026-11-18/site"
web="$here/../.."
cp "$site/index.html" "$here/index.html"
cp "$web/public/privacy.html" "$here/privacy.html"
for l in zh en nl es; do
  mkdir -p "$here/assets/$l"
  rsync -a --delete --exclude 'film.mp4' --exclude '.*' "$site/assets/$l/" "$here/assets/$l/"
done
echo wordgarden.me > "$here/CNAME"
touch "$here/.nojekyll"
