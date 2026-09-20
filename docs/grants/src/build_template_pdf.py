"""
Render PITCH_DECK_TEMPLATE.md to a styled PDF.

Uses markdown -> HTML -> PDF via WeasyPrint, falling back to a direct
ReportLab render if WeasyPrint's system libraries are unavailable. The
fallback matters: this sandbox has no libreoffice, and a builder that only
works on one machine is a builder nobody else can run.
"""
import re
import sys
import markdown

SRC = "/home/user/PITCH_DECK_TEMPLATE.md"
OUT = "/home/user/Pitch_Deck_Template.pdf"

CSS = """
@page { size: A4; margin: 20mm 18mm 18mm 18mm;
        @bottom-center { content: counter(page); font-size: 8pt; color: #8A93A3; } }
body { font-family: "DejaVu Sans", sans-serif; font-size: 9.5pt; line-height: 1.5;
       color: #10182B; }
h1 { font-size: 20pt; color: #0A1428; border-bottom: 3px solid #1E6FD9;
     padding-bottom: 5pt; margin-top: 18pt; page-break-after: avoid; }
h1:first-of-type { margin-top: 0; }
h2 { font-size: 14pt; color: #1E6FD9; margin-top: 16pt; page-break-after: avoid; }
h3 { font-size: 11pt; color: #11A8B8; margin-top: 12pt; page-break-after: avoid; }
p { margin: 6pt 0; }
code { background: #F4F7FB; padding: 1pt 3pt; border-radius: 2pt;
       font-family: "DejaVu Sans Mono", monospace; font-size: 8.5pt; color: #0A1428; }
pre { background: #0A1428; color: #E2E8F0; padding: 8pt; border-radius: 4pt;
      font-size: 7.5pt; line-height: 1.35; overflow-x: hidden;
      white-space: pre-wrap; word-wrap: break-word; page-break-inside: avoid; }
pre code { background: none; color: #E2E8F0; padding: 0; }
blockquote { border-left: 3px solid #2FC16B; background: #F4F7FB;
             margin: 8pt 0; padding: 6pt 10pt; font-style: normal; }
blockquote p { margin: 3pt 0; }
table { border-collapse: collapse; width: 100%; margin: 8pt 0; font-size: 8.5pt;
        page-break-inside: avoid; }
th { background: #0A1428; color: #FFFFFF; text-align: left; padding: 5pt 6pt;
     font-weight: bold; }
td { border-bottom: 1px solid #E2E8F0; padding: 4pt 6pt; vertical-align: top; }
tr:nth-child(even) td { background: #F9FBFD; }
ul, ol { margin: 6pt 0; padding-left: 16pt; }
li { margin: 3pt 0; }
hr { border: none; border-top: 1px solid #E2E8F0; margin: 14pt 0; }
strong { color: #0A1428; }
del { color: #8A93A3; }
"""


def build_html():
    md = open(SRC).read()
    body = markdown.markdown(
        md, extensions=["tables", "fenced_code", "sane_lists"]
    )
    return f"<!DOCTYPE html><html><head><meta charset='utf-8'>" \
           f"<style>{CSS}</style></head><body>{body}</body></html>"


def try_weasyprint(html):
    from weasyprint import HTML
    HTML(string=html).write_pdf(OUT)
    return "weasyprint"


def try_reportlab():
    """
    Direct render. Deliberately handles only the subset of markdown this
    document actually uses: headings, paragraphs, tables, code blocks,
    blockquotes, lists and rules.
    """
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.lib import colors
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                    Table, TableStyle, HRFlowable, Preformatted)

    INK = colors.HexColor("#10182B"); DEEP = colors.HexColor("#0A1428")
    BLUE = colors.HexColor("#1E6FD9"); TEAL = colors.HexColor("#11A8B8")
    GREEN = colors.HexColor("#2FC16B"); LINE = colors.HexColor("#E2E8F0")
    PAPER = colors.HexColor("#F4F7FB"); MUTED = colors.HexColor("#8A93A3")

    S = {
        "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=17,
                             textColor=DEEP, spaceBefore=16, spaceAfter=8, leading=21),
        "h2": ParagraphStyle("h2", fontName="Helvetica-Bold", fontSize=12.5,
                             textColor=BLUE, spaceBefore=13, spaceAfter=6, leading=16),
        "h3": ParagraphStyle("h3", fontName="Helvetica-Bold", fontSize=10.5,
                             textColor=TEAL, spaceBefore=10, spaceAfter=4, leading=13),
        "p": ParagraphStyle("p", fontName="Helvetica", fontSize=9,
                            textColor=INK, spaceAfter=5, leading=13.5),
        "li": ParagraphStyle("li", fontName="Helvetica", fontSize=9, textColor=INK,
                             leftIndent=12, spaceAfter=3, leading=13),
        "quote": ParagraphStyle("quote", fontName="Helvetica-Bold", fontSize=9.5,
                                textColor=DEEP, leftIndent=10, rightIndent=8,
                                spaceBefore=5, spaceAfter=5, leading=14,
                                borderColor=GREEN, borderWidth=0, backColor=PAPER,
                                borderPadding=6),
        "code": ParagraphStyle("code", fontName="Courier", fontSize=7,
                               textColor=colors.HexColor("#E2E8F0"), leading=9.5),
        "cell": ParagraphStyle("cell", fontName="Helvetica", fontSize=8,
                               textColor=INK, leading=10.5),
        "cellh": ParagraphStyle("cellh", fontName="Helvetica-Bold", fontSize=8,
                                textColor=colors.white, leading=10.5),
    }

    def inline(t):
        t = (t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))
        t = re.sub(r"`([^`]+)`", r'<font face="Courier" size="8">\1</font>', t)
        t = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", t)
        t = re.sub(r"~~([^~]+)~~", r'<strike><font color="#8A93A3">\1</font></strike>', t)
        t = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", t)
        return t

    lines = open(SRC).read().split("\n")
    flow, i = [], 0
    while i < len(lines):
        ln = lines[i]

        if ln.startswith("```"):
            i += 1; buf = []
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i][:100]); i += 1
            i += 1
            if buf:
                t = Table([[Preformatted("\n".join(buf), S["code"])]],
                          colWidths=[172 * mm])
                t.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, -1), DEEP),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
                flow += [Spacer(1, 4), t, Spacer(1, 6)]
            continue

        if ln.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s:|-]+\|$", lines[i + 1]):
            hdr = [c.strip() for c in ln.strip("|").split("|")]
            i += 2; rows = []
            while i < len(lines) and lines[i].startswith("|"):
                rows.append([c.strip() for c in lines[i].strip("|").split("|")]); i += 1
            n = len(hdr)
            data = [[Paragraph(inline(c), S["cellh"]) for c in hdr]]
            for r in rows:
                r = (r + [""] * n)[:n]
                data.append([Paragraph(inline(c), S["cell"]) for c in r])
            w = 172 * mm
            cw = [w * 0.28] + [(w * 0.72) / (n - 1)] * (n - 1) if n > 1 else [w]
            t = Table(data, colWidths=cw, repeatRows=1)
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), DEEP),
                ("LINEBELOW", (0, 1), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1),
                 [colors.white, colors.HexColor("#F9FBFD")])]))
            flow += [Spacer(1, 4), t, Spacer(1, 7)]
            continue

        if ln.startswith("# "):
            flow += [Paragraph(inline(ln[2:]), S["h1"]),
                     HRFlowable(width="100%", thickness=2, color=BLUE,
                                spaceBefore=1, spaceAfter=7)]
        elif ln.startswith("## "):
            flow.append(Paragraph(inline(ln[3:]), S["h2"]))
        elif ln.startswith("### "):
            flow.append(Paragraph(inline(ln[4:]), S["h3"]))
        elif ln.startswith("> "):
            buf = []
            while i < len(lines) and lines[i].startswith(">"):
                buf.append(lines[i].lstrip("> ").rstrip()); i += 1
            t = Table([[Paragraph(inline(" ".join(buf)), S["quote"])]],
                      colWidths=[172 * mm])
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("LINEBEFORE", (0, 0), (0, -1), 2.5, GREEN),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
            flow += [Spacer(1, 3), t, Spacer(1, 6)]
            continue
        elif re.match(r"^[-*] \[[ x]\] ", ln):
            flow.append(Paragraph("&#9744;&nbsp; " + inline(re.sub(r"^[-*] \[[ x]\] ", "", ln)), S["li"]))
        elif re.match(r"^[-*] ", ln):
            flow.append(Paragraph("&bull;&nbsp; " + inline(ln[2:]), S["li"]))
        elif re.match(r"^\d+\. ", ln):
            flow.append(Paragraph(inline(ln), S["li"]))
        elif ln.strip() == "---":
            flow.append(HRFlowable(width="100%", thickness=0.5, color=LINE,
                                   spaceBefore=8, spaceAfter=8))
        elif ln.strip():
            flow.append(Paragraph(inline(ln), S["p"]))
        else:
            flow.append(Spacer(1, 3))
        i += 1

    def page_num(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(MUTED)
        canvas.drawCentredString(A4[0] / 2, 12 * mm, str(doc.page))
        canvas.restoreState()

    SimpleDocTemplate(OUT, pagesize=A4,
                      leftMargin=19 * mm, rightMargin=19 * mm,
                      topMargin=18 * mm, bottomMargin=18 * mm,
                      title="The Canonical Story method").build(
        flow, onFirstPage=page_num, onLaterPages=page_num)
    return "reportlab"


if __name__ == "__main__":
    try:
        engine = try_weasyprint(build_html())
    except Exception as e:
        print(f"weasyprint unavailable ({type(e).__name__}), using reportlab")
        engine = try_reportlab()
    import pymupdf
    d = pymupdf.open(OUT)
    print(f"built with {engine}: {OUT}, {d.page_count} pages")
