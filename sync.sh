#!/bin/bash
# Sync the reviewed canonical website without deleting existing data.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$here/../launch-2026-11-18/site"
web="$here/../.."
python3 - "$site" "$here" "$web/public" <<'PY'
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import shutil, sys
source, destination, public = map(Path, sys.argv[1:])
runtime = ['index.html', 'privacy.html', 'support.html', 'open-data.html',
           'light.css', 'responsive-v25.css', 'language.js', 'document-language.js',
           'assets/airpods-gesture-nod-v1.webp', 'assets/airpods-gesture-shake-v1.webp',
           'assets/ecosystem-realistic-v9-800.webp',
           'assets/ecosystem-realistic-v9-1600.webp', 'assets/mobile-big-screens.webp',
           'assets/ecosystem-eight-keyboard-desktop-1200.webp', 'assets/ecosystem-eight-keyboard-desktop-2400.webp',
           'assets/ecosystem-eight-keyboard-mobile-800.webp', 'assets/ecosystem-eight-keyboard-mobile-1600.webp']
pairs = [(source / name, destination / name) for name in runtime]
for language in ['zh', 'en', 'nl', 'es']:
    for path in (source / 'assets' / language).iterdir():
        if path.is_file() and not path.name.startswith('.') and path.name != 'film.mp4':
            pairs.append((path, destination / path.relative_to(source)))
class Downloads(HTMLParser):
    def __init__(self): super().__init__(); self.paths = set()
    def handle_starttag(self, tag, attributes):
        if tag != 'a': return
        url = urlsplit(dict(attributes).get('href', ''))
        if url.scheme or url.netloc: return
        name = url.path.lstrip('/')
        if name.startswith(('library/', 'dictionaries/')):
            if '..' in Path(name).parts: raise ValueError('Invalid download path')
            self.paths.add(name)
links = Downloads(); links.feed((source / 'open-data.html').read_text())
pairs.extend((public / name, destination / name) for name in sorted(links.paths))
for origin, _ in pairs:
    if not origin.is_file(): raise FileNotFoundError(origin)
for origin, target in pairs:
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(origin, target)
(destination / 'CNAME').write_text('wordgarden.nl\n')
(destination / '.nojekyll').touch()
print(f'Synced {len(pairs)} reviewed runtime/data files; no files deleted.')
PY
