#!/bin/sh
# Parse-check the inline script of each lab/*.html. These pages carry a few hundred lines of
# JS inside a <script> tag, where a mis-paired quote is invisible to every other gate and shows
# up only as a blank page in the browser.
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
JSC=/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc
fail=0
for f in "$ROOT"/lab/*.html; do
  python3 - "$f" <<'PY' > /tmp/lab-check.js
import io,re,sys
s = io.open(sys.argv[1], encoding="utf-8").read()
blocks = re.findall(r"<script>(.*?)</script>", s, re.S)
io.open("/tmp/lab-check.js", "w", encoding="utf-8").write(blocks[-1] if blocks else "")
PY
  out=$("$JSC" /tmp/lab-check.js 2>&1 | grep -i "SyntaxError" || true)
  if [ -n "$out" ]; then echo "  FAIL $(basename "$f"): $out"; fail=1; else echo "  ok   $(basename "$f")"; fi
done
"$JSC" "$ROOT/lab/lab-common.js" 2>&1 | grep -i "SyntaxError" && { echo "  FAIL lab-common.js"; fail=1; } || echo "  ok   lab-common.js"
rm -f /tmp/lab-check.js
[ "$fail" = 0 ] && echo "OK - every lab page parses" || echo "FAIL - see above"
exit $fail
