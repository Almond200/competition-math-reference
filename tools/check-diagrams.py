#!/usr/bin/env python3
"""Geometry check for every diagram panel: nothing may fall off the canvas, and no two
text labels may overlap.

This exists because neither of the two checks the process already had could see the class of
bug it catches. `scan-conventions.py` asks whether a card *has* a diagram, not whether the
diagram is legible, and `tidyDiagram` only de-collides labels at render time. So a derived
point that lands outside the viewBox -- the external bisector foot at x = -406, the reflected
focus at y = 368 on a 330-tall canvas -- drew nothing and passed every gate silently.

Run:  python3 tools/check-diagrams.py     (exit 1 on any finding)
"""
import itertools, os, re, subprocess, sys, tempfile

JSC = "/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILES = ["js/data/diagrams/geometry-diagrams.js", "js/data/diagrams/general-diagrams.js"]

# Character-width factors for the sans stack, calibrated against getBBox() in the browser:
# "tangent at a" and "a - b" both measure ~0.47 x font-size per character. Two factors,
# because the two checks want to err in opposite directions -- a generous estimate turns a
# label that actually fits into a false alarm, while a tight one lets a near-collision pass.
CW_FIT = 0.50      # off-canvas: tight, so only a genuine overflow is reported
CW_HIT = 0.58      # overlap: generous, so near-misses still surface

# A drawn circle overflowing by up to this fraction of its own radius is a near-miss worth
# fixing; beyond it the circle is plainly larger than the frame on purpose. Today's data splits
# cleanly either side: the three real bugs are at 4%, 17% and 23%, the deliberate arc at 90%.
CIRCLE_SLICE = 0.25


def dump(rel):
    """Render every panel in one diagram file to SVG text via jsc."""
    src = ('var window = {};\nload(%r);\nvar D = window.MATH_DIAGRAMS || {};\n'
           'Object.keys(D).forEach(function (k) {\n'
           '  var v = D[k]; if (!Array.isArray(v)) v = [v];\n'
           '  v.forEach(function (p, i) {\n'
           '    if (typeof p === "string") { print("###" + k + "#" + i); print(p); }\n'
           '  });\n});\n' % os.path.join(ROOT, rel))
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as fh:
        fh.write(src)
        tmp = fh.name
    try:
        res = subprocess.run([JSC, tmp], cwd=ROOT, capture_output=True, text=True)
    finally:
        os.unlink(tmp)
    # A diagram file that throws used to look exactly like a file with no diagrams in it:
    # stdout came back empty, this returned it, and the run reported OK on a smaller panel
    # count. One undefined colour constant silently removed all 27 figures in
    # general-diagrams.js from the app and every gate still passed. Never swallow it again.
    if res.returncode != 0 or res.stderr.strip():
        sys.exit("check-diagrams: %s failed to evaluate -- every figure in it is missing "
                 "from the app.\n%s" % (rel, res.stderr.strip()))
    return res.stdout


def boxes(svg, cw):
    """Bounding box per text label, honouring text-anchor (start/middle/end)."""
    out = []
    for m in re.finditer(r'<text x="(-?[\d.]+)" y="(-?[\d.]+)"[^>]*font-size="([\d.]+)"'
                         r'[^>]*text-anchor="(\w+)"[^>]*>(.*?)</text>', svg):
        x, y, fs, anchor = float(m.group(1)), float(m.group(2)), float(m.group(3)), m.group(4)
        label = re.sub(r"<[^>]+>", "", m.group(5))
        w = max(len(label), 1) * fs * cw
        x0 = x - w / 2 if anchor == "middle" else (x - w if anchor == "end" else x)
        out.append((label, x0, y - fs * 0.82, x0 + w, y + fs * 0.28))
    return out


def dupe_keys(rel):
    """Two `DIAGRAMS["id"] = ...` assignments for one id means the earlier one is dead code.
    Six keys had drifted into this state, and for median-to-hypotenuse the *discarded* copy was
    the correct one -- the surviving copy was the one whose circumcircle did not fit."""
    src = open(os.path.join(ROOT, rel), encoding="utf-8").read()
    seen, dupes = {}, []
    for m in re.finditer(r'^\s*DIAGRAMS\["([\w-]+)"\]\s*=', src, re.M):
        key = m.group(1)
        line = src.count("\n", 0, m.start()) + 1
        if key in seen:
            dupes.append("%s: DIAGRAMS[%r] is assigned twice (lines %d and %d) -- "
                         "the first is dead code" % (rel, key, seen[key], line))
        else:
            seen[key] = line
    return dupes


def main():
    findings, panels = [], 0
    for rel in FILES:
        if os.path.exists(os.path.join(ROOT, rel)):
            findings.extend(dupe_keys(rel))
    for rel in FILES:
        if not os.path.exists(os.path.join(ROOT, rel)):
            continue
        for blk in re.split(r"###", dump(rel))[1:]:
            name, _, svg = blk.partition("\n")
            vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
            if not vb:
                continue
            panels += 1
            W, H = float(vb.group(1)), float(vb.group(2))
            for label, x0, y0, x1, y1 in boxes(svg, CW_FIT):
                if x0 < -1 or x1 > W + 1 or y0 < -1 or y1 > H + 1:
                    findings.append("%s: label %r at x[%.0f,%.0f] y[%.0f,%.0f] "
                                    "falls outside the %gx%g canvas" % (name, label, x0, x1, y0, y1, W, H))
            # A marker dot off the canvas means a *derived* point landed off it, which is
            # the real defect -- everything anchored to that point is invisible too.
            # Long lines are exempt: drawing a line past the frame is how an unbounded line
            # is rendered, and clipping it there is the intent.
            for m in re.finditer(r'<circle cx="(-?[\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"', svg):
                cx, cy, r = map(float, m.groups())
                # Test the CENTRE, not the centre plus a radius of slack. The old bound
                # `cy > H + r` let a dot sit a full radius past the edge, so a marker centred
                # at y = 342 on a 340-tall canvas -- entirely invisible -- passed the gate.
                # If the derived point is outside the viewBox the point is off-canvas, full
                # stop; a dot merely touching the edge is still legible and is not the defect
                # this is looking for.
                if r <= 8 and (cx < 0 or cx > W or cy < 0 or cy > H):
                    findings.append("%s: marker dot at (%.0f, %.0f) is off the %gx%g canvas"
                                    % (name, cx, cy, W, H))
                # A DRAWN circle (circumcircle, incircle) that misses fitting by a little is a
                # bug: it gets sliced flat by the frame and reads as a rendering fault. One that
                # is far bigger than the canvas is a deliberate arc -- four circumcircles of four
                # triangles really are huge -- so it is exempt for the same reason long lines are.
                # The r <= 8 branch above only ever saw marker dots, which is how a radius-166
                # circumcircle clipped at BOTH ends sat in median-to-hypotenuse without tripping
                # a single gate.
                elif r > 8:
                    out = max(-(cx - r), (cx + r) - W, -(cy - r), (cy + r) - H)
                    if 1 < out <= r * CIRCLE_SLICE:
                        findings.append("%s: circle r=%.0f at (%.0f, %.0f) overshoots the %gx%g "
                                        "canvas by %.0fpx (%.0f%% of r) -- it will be clipped flat"
                                        % (name, r, cx, cy, W, H, out, 100 * out / r))
            for (s1, a1, b1, c1, d1), (s2, a2, b2, c2, d2) in itertools.combinations(boxes(svg, CW_HIT), 2):
                if a1 < c2 and a2 < c1 and b1 < d2 and b2 < d1:
                    findings.append("%s: labels %r and %r overlap by %.0fx%.0f px"
                                    % (name, s1, s2, min(c1, c2) - max(a1, a2), min(d1, d2) - max(b1, b2)))

    for f in findings:
        print("  " + f)
    print("panels: %d | findings: %d" % (panels, len(findings)))
    print("OK - every panel fits its canvas and no labels collide" if not findings
          else "FAIL - see above")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
