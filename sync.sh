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
# Word-data download page and exactly the files it links to (CC BY-SA 4.0 data)
cp "$web/public/open-data.html" "$here/open-data.html"
rm -rf "$here/dictionaries" "$here/library"
grep -oE 'href="/(dictionaries|library)/[^"#]+"' "$here/open-data.html" | sed 's/^href="\///;s/"$//' | sort -u | while read -r f; do
  mkdir -p "$here/$(dirname "$f")"; cp "$web/public/$f" "$here/$f"
done
echo wordgarden.me > "$here/CNAME"
touch "$here/.nojekyll"
