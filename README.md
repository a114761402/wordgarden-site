# wordgarden.nl

Word Garden's static website, hosted by GitHub Pages from `a114761402/wordgarden-site` (`main`, repository root), with HTTPS and `CNAME=wordgarden.nl`.

The local folder retains its historical name `exports/wordgarden.me`. `exports/wordgarden.nl` is a separate redirect checkout for `wordgarden.me`; do not deploy the main site there.

Canonical runtime source: `exports/launch-2026-11-18/site/` in the parent Word Garden workspace. It contains the reviewed homepage, shared CSS/JS, privacy/support/open-data pages, four language asset folders and approved ecosystem images. Public dictionary and wordbook downloads come from the parent's `public/` directory, limited to paths linked by `site/open-data.html`.

Update the canonical source, independently review and test, run `./sync.sh`, inspect the explicit diff, then commit and push the website changes. The sync script copies a runtime allowlist and linked data without deleting existing files. It does not copy review screenshots, preview servers, tests or local-only comparison pages. Preserve the four existing films unless a film replacement is specifically authorized.

On 2026-11-24 Chuang authorized Word Garden website updates to deploy directly after independent review and necessary tests, without waiting for another per-update confirmation. This applies only to this website; it does not authorize App Store submissions, payments, deletion of data or changes to other services.
