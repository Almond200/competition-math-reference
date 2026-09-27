#!/usr/bin/env python3
"""Label legibility gate: renders every figure in headless Chrome, runs the app's own
tidyDiagram() on it, and measures what a reader actually sees.

check-diagrams.py reads the SVG source, before tidyDiagram() has moved anything, and can only
compare label against label with an estimated width. The collisions readers noticed were a
different kind: a label printed on its own marker dot (the "1"s on the circle centres in the
Soddy figure), a stroke running through the glyphs, and labels the tidy pass had flung far from
the point they name. Those depend on real glyph widths and on where tidyDiagram() leaves each
label, so they can only be checked in a browser. This drives tools/label-audit.html, which does
the rendering and measuring; see the comment at its top.

Findings (all must be zero):
  on-dot / on-stroke / on-faint-stroke / on-label   a label touches a dot, a line or a label
  off-canvas                                         a label leaves the viewBox
  far-move      tidyDiagram() had to carry a label more than 14px; place it in the figure instead
  arrow-touch   an arrowhead's tip runs into a shape it is not drawn along (the substitution
                arrow that stabbed the corner of the square it pointed at)

Run:  python3 tools/check-labels.py      (about 30 seconds; exit 1 on any finding)
      Open http://127.0.0.1:<port>/tools/label-audit.html#show on a local server to SEE the
      offending figures, each offending label boxed in red.
"""
import functools, html, http.server, os, re, socketserver, subprocess, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main():
    if not os.path.exists(CHROME):
        sys.exit("check-labels: Google Chrome not found at %s" % CHROME)
    # label-audit.html fetches js/app.js to lift tidyDiagram() out of it, and a file:// page
    # cannot fetch, so the site is served for the length of the run on a free port.
    handler = functools.partial(Quiet, directory=ROOT)
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as srv:
        port = srv.server_address[1]
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        res = subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--virtual-time-budget=120000",
                              "--dump-dom", "http://127.0.0.1:%d/tools/label-audit.html" % port],
                             capture_output=True, text=True, timeout=300)
        srv.shutdown()
    m = re.search(r'<pre id="out">(.*?)</pre>', res.stdout, re.S)
    if not m or m.group(1).startswith("running"):
        sys.exit("check-labels: the audit page did not finish -- open tools/label-audit.html and "
                 "check the console.\n" + res.stderr[-2000:])
    lines = html.unescape(m.group(1)).strip().split("\n")
    head, found = lines[0], [l for l in lines[1:] if l.strip()]
    for l in found:
        print("  " + l)
    print(head)
    print("OK - every label is clear of dots, strokes and other labels, and sits where its figure put it"
          if not found else "FAIL - see above")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
