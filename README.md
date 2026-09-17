# mattstack.dev

The front door: a static landing page that resolves the latest mattstack.app DMG
from m4ttstack/rt releases at view time. Deployed to Cloudflare Pages with `./deploy.sh`, which assembles the deploy
root from an allowlist so repo internals (`docs/`, the `.pen` design source,
tests) are not served.
