#!/usr/bin/env python3
"""
Sivan x Starknet Foundation Seed Grant deck.

FRAMING DECISION, STATED UP FRONT.

This deck does NOT claim a Starknet integration exists. It cannot: grepping both
Sivan repos for "starknet" or "cairo" returns zero files. The application text
this was built from claimed Cairo contracts, a starknet.js adapter, an MCP
server exposing Starknet tools, and an "Audited x402 Protocol Implementation".
None of those are in the code. A foundation reviewer disproves all of it in
about ninety seconds, and "audited" is a word that ends applications.

So the deck is positioned as what is actually true and is genuinely fundable:
a LIVE payments company with real Nigerian fiat rails, choosing Starknet as its
settlement layer, asking for $25,000 to build the integration. That is exactly
what a seed grant is for. The milestones carry the story instead of pretending
the work is done.

Two corrections baked in:
  - The USDC address in the application is not a real Starknet contract. Its
    first 12 hex chars match Circle's BRIDGED token then diverge. The native
    address per Circle's own migration guide is used here instead.
  - "Audited" is replaced with what is real: internal review, 174 automated
    test scripts, and a third-party audit BUDGETED in Milestone 1.

NO EM DASHES. Asserted at the end of the build.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

INK       = RGBColor(0x10, 0x18, 0x2B)
MUTED     = RGBColor(0x5A, 0x66, 0x78)
SOFT      = RGBColor(0x8A, 0x93, 0xA3)
BLUE      = RGBColor(0x1E, 0x6F, 0xD9)
TEAL      = RGBColor(0x11, 0xA8, 0xB8)
GREEN     = RGBColor(0x2F, 0xC1, 0x6B)
SUCCESS   = RGBColor(0x16, 0x85, 0x6D)
GOLD      = RGBColor(0xB2, 0x6B, 0x00)
STRK      = RGBColor(0xE8, 0x6B, 0x5A)   # Starknet accent
STRK_DEEP = RGBColor(0x0B, 0x0B, 0x3B)   # Starknet deep navy
WHITE     = RGBColor(0xFF, 0xFF, 0xFF)
PAPER     = RGBColor(0xF4, 0xF7, 0xFB)
LINE      = RGBColor(0xE2, 0xE8, 0xF0)
CARD      = RGBColor(0xFF, 0xFF, 0xFF)

FONT = "Aptos"
W, H = Inches(13.333), Inches(7.5)
M = Inches(0.86)
CW = W - (2 * M)

prs = Presentation()
prs.slide_width, prs.slide_height = W, H
BLANK = prs.slide_layouts[6]

USDC_NATIVE = "0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb"


def slide():
    s = prs.slides.add_slide(BLANK)
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = WHITE
    return s


def rect(s, x, y, w, h, fill=None, line=None, lw=1.0, radius=None):
    shp = s.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE, x, y, w, h)
    if radius is not None:
        try:
            shp.adjustments[0] = radius
        except Exception:
            pass
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid()
        shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = Pt(lw)
    shp.shadow.inherit = False
    return shp


def text(s, x, y, w, h, runs, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=None):
    tb = s.shapes.add_textbox(x, y, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, r in enumerate(runs):
        body, size, bold, color = r[0], r[1], r[2], r[3]
        after = r[4] if len(r) > 4 else 6
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.space_after = Pt(after)
        if spacing:
            p.line_spacing = spacing
        run = p.add_run()
        run.text = body
        run.font.name = FONT
        run.font.size = Pt(size)
        run.font.bold = bold
        run.font.color.rgb = color
    return tb


def accent_bar(s, x, y, w=Inches(1.15), h=Pt(4.5)):
    seg = int(w / 3)
    for i, c in enumerate((BLUE, TEAL, STRK)):
        rect(s, x + Emu(seg * i), y, Emu(seg), h, fill=c)


def eyebrow(s, label, y=Inches(0.62)):
    text(s, M, y, CW, Inches(0.3), [(label.upper(), 11.5, True, STRK)])
    accent_bar(s, M, y + Inches(0.33))


def title(s, heading, y=Inches(1.12), size=35, color=INK, w=None):
    text(s, M, y, w or CW, Inches(1.0), [(heading, size, True, color)], spacing=0.95)


def footer(s, n):
    text(s, M, H - Inches(0.52), Inches(5), Inches(0.28),
         [("Sivan Technologies  |  Starknet Foundation Seed Grant", 9, False, SOFT)])
    text(s, W - M - Inches(1.2), H - Inches(0.52), Inches(1.2), Inches(0.28),
         [(str(n), 9, False, SOFT)], align=PP_ALIGN.RIGHT)


def stat_card(s, x, y, w, h, value, label, note=None, vcolor=INK):
    rect(s, x, y, w, h, fill=PAPER, line=LINE, radius=0.09)
    text(s, x + Inches(0.28), y + Inches(0.24), w - Inches(0.5), Inches(0.6),
         [(value, 26, True, vcolor)])
    text(s, x + Inches(0.28), y + Inches(0.88), w - Inches(0.5), Inches(0.32),
         [(label, 11.5, True, INK)])
    if note:
        text(s, x + Inches(0.28), y + Inches(1.18), w - Inches(0.5), Inches(0.5),
             [(note, 9.5, False, MUTED)], spacing=1.1)


def bullet(s, x, y, w, lead, rest, size=12.5, dot=STRK, lead_color=INK):
    rect(s, x, y + Inches(0.09), Inches(0.07), Inches(0.07), fill=dot)
    tb = s.shapes.add_textbox(x + Inches(0.26), y, w, Inches(0.62))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.space_after = Pt(0)
    p.line_spacing = 1.24
    a = p.add_run(); a.text = lead
    a.font.name = FONT; a.font.size = Pt(size); a.font.bold = True; a.font.color.rgb = lead_color
    b = p.add_run(); b.text = rest
    b.font.name = FONT; b.font.size = Pt(size); b.font.bold = False; b.font.color.rgb = MUTED


N = 0
def page():
    global N
    N += 1
    return slide()


# ══════════════════════════════════════════════════════════════════ 1 COVER
s = page()
rect(s, Emu(0), Emu(0), W, H, fill=STRK_DEEP)
bh = int(H / 3)
for i, c in enumerate((BLUE, TEAL, STRK)):
    rect(s, Emu(0), Emu(bh * i), Inches(0.16), Emu(bh), fill=c)
s.shapes.add_picture("/tmp/sivan-logo.png", M, Inches(1.0), height=Inches(1.4))
text(s, M, Inches(2.7), Inches(10), Inches(1.0), [("Sivan", 58, True, WHITE)])
text(s, M, Inches(3.66), Inches(9.6), Inches(0.9),
     [("A live payments product, bringing African fiat rails to Starknet.",
       19, False, RGBColor(0xC7, 0xD4, 0xE6))], spacing=1.25)
accent_bar(s, M, Inches(4.66), w=Inches(1.5))
text(s, M, Inches(5.0), Inches(11), Inches(0.9),
     [("USDC settles into a Nigerian bank account in seconds today. Starknet Account "
       "Abstraction removes the last thing standing between that and everyone else.",
       13, False, RGBColor(0x9F, 0xB2, 0xCA))], spacing=1.3)
text(s, M, H - Inches(1.05), Inches(11), Inches(0.7),
     [("Starknet Foundation Seed Grant  |  $25,000 in STRK  |  Abuja, Nigeria",
       11.5, False, RGBColor(0x76, 0x8A, 0xA6))])

# ══════════════════════════════════════════════════════════════════ 2 PROBLEM
s = page()
eyebrow(s, "The problem")
title(s, "Getting paid from abroad costs Nigerians a week and a cut.")
stat_card(s, M, Inches(2.5), Inches(3.72), Inches(1.94), "3 to 5 days",
          "Typical settlement", "Correspondent banking, per World Bank data.", vcolor=BLUE)
stat_card(s, M + Inches(3.98), Inches(2.5), Inches(3.72), Inches(1.94), "5 to 10%",
          "Lost to intermediaries", "FX spread plus fees, stacked at every hop.", vcolor=GOLD)
stat_card(s, M + Inches(7.96), Inches(2.5), Inches(3.72), Inches(1.94), "Seed phrases",
          "The crypto alternative", "Gas tokens and wrong network transfers.", vcolor=STRK)
rect(s, M, Inches(4.94), CW, Inches(1.2), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(0.36), Inches(5.18), CW - Inches(0.72), Inches(0.8),
     [("A freelancer in Abuja invoicing a client in London can hold USDC in two seconds. "
       "Turning it into spendable naira is the part that is still broken, and it is the "
       "only part they care about.", 14, False, INK)], spacing=1.28)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 3 WHAT IS LIVE
s = page()
eyebrow(s, "What already works")
title(s, "This is a running business, not a proposal.")
rows = [
    ("Web application", "app.sivantech.online", "Live", SUCCESS),
    ("Telegram bot", "t.me/Sivan_Ai", "Live", SUCCESS),
    ("NGN off ramp", "Naira paid to Nigerian bank accounts in seconds", "Live", SUCCESS),
    ("Identity verification", "BVN and NIN against the national source", "Live", SUCCESS),
    ("Escrow agreements", "Milestone based release with dispute trail", "Live", SUCCESS),
    ("Starknet", "This grant. Nothing shipped yet.", "Not started", STRK),
]
y, rh = Inches(2.36), Inches(0.6)
for i, (name, detail, status, sc) in enumerate(rows):
    if i % 2 == 0:
        rect(s, M, y, CW, rh, fill=PAPER)
    text(s, M + Inches(0.3), y + Inches(0.16), Inches(3.3), Inches(0.34),
         [(name, 13, True, INK)])
    text(s, M + Inches(3.7), y + Inches(0.17), Inches(6.0), Inches(0.34),
         [(detail, 12, False, MUTED)])
    rect(s, W - M - Inches(1.5), y + Inches(0.14), Inches(1.2), Inches(0.32),
         fill=sc, radius=0.5)
    text(s, W - M - Inches(1.5), y + Inches(0.185), Inches(1.2), Inches(0.25),
         [(status, 9.5, True, WHITE)], align=PP_ALIGN.CENTER)
    y += rh
text(s, M, y + Inches(0.26), CW, Inches(0.5),
     [("The last row is the honest one. We are not claiming a Starknet integration "
       "that does not exist yet, we are asking for the funding to build it.",
       12.5, False, MUTED)], spacing=1.25)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 4 PRODUCT
s = page()
rect(s, Emu(0), Emu(0), W, H, fill=STRK_DEEP)
rect(s, Emu(0), Emu(0), Inches(0.11), H, fill=STRK)
text(s, M, Inches(0.62), Inches(6), Inches(0.3), [("THE PRODUCT", 11.5, True, STRK)])
accent_bar(s, M, Inches(0.95))
text(s, M, Inches(1.30), Inches(6.3), Inches(1.2),
     [("One message. Dollars land as naira.", 32, True, WHITE)], spacing=0.98)
text(s, M, Inches(2.58), Inches(5.9), Inches(0.8),
     [("No seed phrase, no gas token, no exchange account. The user sees a balance and "
       "a bank account, the only mental model they already have.",
       13, False, RGBColor(0xA9, 0xBB, 0xD2))], spacing=1.3)
feats = [
    ("Settlement confirmed in chat", "The receipt arrives where the request was made."),
    ("Verified identity tiers", "Bank, then BVN or NIN, each unlocking a ceiling."),
    ("Naira paid to a real account", "Local bank rails, not an IOU inside a wallet."),
]
fy = Inches(3.58)
for h, d in feats:
    rect(s, M, fy + Inches(0.10), Inches(0.07), Inches(0.07), fill=STRK)
    text(s, M + Inches(0.26), fy, Inches(5.5), Inches(0.3), [(h, 12.5, True, WHITE)])
    text(s, M + Inches(0.26), fy + Inches(0.29), Inches(5.5), Inches(0.3),
         [(d, 11, False, RGBColor(0x8E, 0xA3, 0xBD))])
    fy += Inches(0.72)
s.shapes.add_picture("/tmp/phone_crop.png", W - Inches(4.62), Inches(0.74), height=Inches(4.42))
s.shapes.add_picture("/tmp/dash.png", W - Inches(5.30), Inches(5.24), width=Inches(4.42))
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 5 WHY STARKNET
s = page()
eyebrow(s, "Why Starknet")
title(s, "Account Abstraction is not a feature to us. It is the blocker.")
left = [
    ("Native AA means no seed phrase. ", "Today onboarding a non crypto user means explaining key custody. On Starknet the account IS a contract."),
    ("Paymasters mean no gas token. ", "A Nigerian user should never have to acquire STRK or ETH before receiving money."),
    ("Session keys make chat viable. ", "A Telegram flow cannot prompt for a signature on every step and survive."),
    ("Low fees make small transfers work. ", "Our median transfer is small. On most L1s the fee eats the payment."),
]
text(s, M, Inches(2.42), Inches(6.4), Inches(0.34),
     [("What Starknet solves that our current chains do not", 12.5, True, STRK)])
for i, (a, b) in enumerate(left):
    bullet(s, M, Inches(2.88) + Inches(0.86) * i, Inches(5.7), a, b)
rect(s, M + Inches(6.5), Inches(2.42), Inches(5.1), Inches(3.86), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(6.86), Inches(2.70), Inches(4.4), Inches(0.34),
     [("What we bring to Starknet", 12.5, True, INK)])
gives = [
    "A live fiat off ramp into Nigeria, already working",
    "Identity verification against the national registry",
    "A chat distribution surface on Telegram and WhatsApp",
    "An escrow state machine with a dispute trail",
    "Open source starknet.js adapter and agent tooling",
]
gy = Inches(3.18)
for g in gives:
    rect(s, M + Inches(6.86), gy + Inches(0.08), Inches(0.07), Inches(0.07), fill=GREEN)
    text(s, M + Inches(7.1), gy, Inches(4.2), Inches(0.5), [(g, 11.5, False, MUTED)], spacing=1.2)
    gy += Inches(0.54)
text(s, M + Inches(6.86), gy + Inches(0.02), Inches(4.3), Inches(0.4),
     [("Starknet gets a payments corridor it does not have today.", 10.5, True, INK)], spacing=1.15)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 6 WHAT WE BUILD
s = page()
eyebrow(s, "The build")
title(s, "We are porting a tested vault,\nnot starting from a blank file.")
items = [
    ("01", "Port a tested vault, keep the x402 rail", BLUE,
     "Escrow already settles through x402 via the PayAI facilitator, live today. "
     "Our Celo vault handles release and deadline refunds: 34 tests, 6 invariants "
     "over 12,800 fuzzed calls. Starknet gets both."),
    ("02", "starknet.js Account Abstraction adapter", TEAL,
     "TypeScript adapter with native account abstraction, session keys and paymaster "
     "sponsorship, wired into the Sivan settlement engine that runs today."),
    ("03", "Agent tooling for the ecosystem", STRK,
     "An MCP tool and adapter so any agent framework can settle on Starknet, not just ours. "
     "This is the part that outlives our own product."),
]
y = Inches(2.24)
for tag, head, col, body in items:
    rect(s, M, y, CW, Inches(1.28), fill=CARD, line=LINE, radius=0.05)
    rect(s, M, y, Pt(5), Inches(1.28), fill=col)
    text(s, M + Inches(0.4), y + Inches(0.22), Inches(0.6), Inches(0.3), [(tag, 11, True, col)])
    text(s, M + Inches(1.1), y + Inches(0.2), Inches(5.4), Inches(0.36), [(head, 16, True, INK)])
    text(s, M + Inches(1.1), y + Inches(0.64), Inches(10.0), Inches(0.6),
         [(body, 11.5, False, MUTED)], spacing=1.22)
    y += Inches(1.42)
rect(s, M, y + Inches(0.02), CW, Inches(0.58), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(0.34), y + Inches(0.16), CW - Inches(0.7), Inches(0.36),
     [("Native USDC on Starknet: " + USDC_NATIVE, 10, False, INK)])
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 7 MILESTONES
s = page()
eyebrow(s, "Use of funds")
title(s, "$25,000 in STRK, six weeks, every deliverable in our own hands.")
ms = [
    ("Milestone 1", "$8,500", "Week 2", BLUE, "Settlement adapter and Account Abstraction",
     "Sivan StarknetAdapter on Sepolia with native account abstraction, session "
     "keys, paymaster sponsored gas and the existing x402 escrow rail.",
     "Public PR, Sepolia address, passing tests"),
    ("Milestone 2", "$8,500", "Week 4", TEAL, "Agent gateway and chat integration",
     "Starknet settlement exposed as MCP agent tooling. Telegram and web execute "
     "Starknet transfers and milestone agreements using session keys.",
     "Demo video: agent and human settle on Starknet"),
    ("Milestone 3", "$8,000", "Week 6", STRK, "Mainnet launch and fiat bridge",
     "Starknet USDC settling into Nigerian bank rails with sponsored gas, plus an "
     "onboarding campaign across West African developer communities.",
     "Mainnet live, a real fiat payout, public metrics dashboard"),
]
y = Inches(2.26)
for tag, amt, when, c, head, body, done in ms:
    rect(s, M, y, CW, Inches(1.42), fill=CARD, line=LINE, radius=0.05)
    rect(s, M, y, Pt(5), Inches(1.42), fill=c)
    text(s, M + Inches(0.4), y + Inches(0.16), Inches(2.2), Inches(0.28),
         [(tag.upper(), 9.5, True, c)])
    text(s, M + Inches(0.4), y + Inches(0.42), Inches(6.6), Inches(0.36),
         [(head, 16, True, INK)])
    text(s, M + Inches(0.4), y + Inches(0.80), Inches(7.6), Inches(0.6),
         [(body, 11, False, MUTED)], spacing=1.2)
    text(s, W - M - Inches(6.2), y + Inches(1.08), Inches(5.9), Inches(0.28),
         [("DONE WHEN: " + done, 9.5, False, SOFT)], align=PP_ALIGN.RIGHT)
    text(s, W - M - Inches(2.3), y + Inches(0.2), Inches(2.0), Inches(0.42),
         [(amt, 21, True, INK)], align=PP_ALIGN.RIGHT)
    text(s, W - M - Inches(2.3), y + Inches(0.64), Inches(2.0), Inches(0.28),
         [(when, 11, False, MUTED)], align=PP_ALIGN.RIGHT)
    y += Inches(1.56)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 8 BUSINESS MODEL
s = page()
eyebrow(s, "Business model")
title(s, "Three revenue streams, all charging today.")
cw3, gap3 = Inches(3.66), Inches(0.26)
rect(s, M, Inches(2.30), cw3, Inches(2.34), fill=CARD, line=LINE, radius=0.06)
rect(s, M, Inches(2.30), cw3, Pt(5), fill=GREEN)
text(s, M + Inches(0.3), Inches(2.58), cw3 - Inches(0.6), Inches(0.3),
     [("OFF RAMP", 9.5, True, GREEN)])
text(s, M + Inches(0.3), Inches(2.88), cw3 - Inches(0.6), Inches(0.66), [("1.25%", 38, True, INK)])
text(s, M + Inches(0.3), Inches(3.56), cw3 - Inches(0.6), Inches(0.3),
     [("USDC to naira conversion", 12, True, INK)])
text(s, M + Inches(0.3), Inches(3.86), cw3 - Inches(0.6), Inches(0.6),
     [("Returned live by our public fee endpoint today. Not a projection.",
       10, False, MUTED)], spacing=1.18)

x2 = M + cw3 + gap3
rect(s, x2, Inches(2.30), cw3, Inches(2.34), fill=CARD, line=LINE, radius=0.06)
rect(s, x2, Inches(2.30), cw3, Pt(5), fill=BLUE)
text(s, x2 + Inches(0.3), Inches(2.58), cw3 - Inches(0.6), Inches(0.3),
     [("ESCROW AND SERVICE AGREEMENTS", 9.5, True, BLUE)])
text(s, x2 + Inches(0.3), Inches(2.88), cw3 - Inches(0.6), Inches(0.66), [("2.5%", 38, True, INK)])
text(s, x2 + Inches(0.3), Inches(3.56), cw3 - Inches(0.6), Inches(0.3),
     [("on naira, 1.5% on USDC", 12, True, INK)])
text(s, x2 + Inches(0.3), Inches(3.86), cw3 - Inches(0.6), Inches(0.6),
     [("Priced per currency, plus a fixed component of NGN 50 or $0.50.",
       10, False, MUTED)], spacing=1.18)

x3 = M + (cw3 + gap3) * 2
rect(s, x3, Inches(2.30), cw3, Inches(2.34), fill=CARD, line=LINE, radius=0.06)
rect(s, x3, Inches(2.30), cw3, Pt(5), fill=TEAL)
text(s, x3 + Inches(0.3), Inches(2.58), cw3 - Inches(0.6), Inches(0.3),
     [("PEER TO PEER TRANSFERS", 9.5, True, TEAL)])
for i, (k, v) in enumerate([("Under $100", "0.50%"), ("$100 and above", "0.25%"),
                            ("Minimum per transfer", "$0.25"), ("New recipient account", "$0.30")]):
    ty = Inches(2.98) + Inches(0.34) * i
    text(s, x3 + Inches(0.3), ty, Inches(2.3), Inches(0.28), [(k, 10.5, False, MUTED)])
    text(s, x3 + Inches(2.5), ty, Inches(0.86), Inches(0.28), [(v, 10.5, True, INK)], align=PP_ALIGN.RIGHT)
text(s, x3 + Inches(0.3), Inches(4.36), cw3 - Inches(0.6), Inches(0.3),
     [("The floor covers gas and rail cost.", 10, False, MUTED)])
rect(s, M, Inches(4.92), CW, Inches(1.38), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(0.36), Inches(5.1), Inches(5.3), Inches(0.32),
     [("Why the floor matters", 12.5, True, INK)])
text(s, M + Inches(0.36), Inches(5.42), Inches(5.2), Inches(0.7),
     [("A $20 transfer pays 1.25% effective, not 0.50%, because the $0.25 floor dominates "
       "until roughly $50. Small transfers stay profitable.", 11.5, False, MUTED)], spacing=1.22)
text(s, M + Inches(6.34), Inches(5.1), Inches(5.3), Inches(0.32),
     [("Take rate against the market", 12.5, True, INK)])
text(s, M + Inches(6.34), Inches(5.42), Inches(5.2), Inches(0.7),
     [("Traditional remittance into Nigeria costs 5 to 10 percent. We clear the same "
       "corridor at 1.25 percent and still hold a margin on all three streams.",
       11.5, False, MUTED)], spacing=1.22)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 9 SECURITY
s = page()
eyebrow(s, "Security posture")
title(s, "We wrote the contract, so we\nowe you the audit.")
rect(s, M, Inches(2.34), Inches(5.62), Inches(2.5), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(0.36), Inches(2.6), Inches(4.9), Inches(0.34),
     [("What we have done", 12.5, True, SUCCESS)])
have = [
    "Escrow settles through x402, a reviewed open standard",
    "34 unit tests and 6 invariants on our own vault",
    "Five money-affecting bugs found and fixed pre-deploy",
    "Atomic double entry ledger, tests assert refusals",
]
hy = Inches(3.04)
for h in have:
    rect(s, M + Inches(0.36), hy + Inches(0.08), Inches(0.07), Inches(0.07), fill=SUCCESS)
    text(s, M + Inches(0.6), hy, Inches(4.7), Inches(0.5), [(h, 11.5, False, MUTED)], spacing=1.2)
    hy += Inches(0.44)
rect(s, M + Inches(5.98), Inches(2.34), Inches(5.62), Inches(2.5), fill=PAPER, line=LINE, radius=0.06)
text(s, M + Inches(6.34), Inches(2.6), Inches(4.9), Inches(0.34),
     [("What we still owe you", 12.5, True, GOLD)])
gaps = [
    "No third party audit of our vault has been done",
    "It is not yet deployed to any public network",
    "External review is budgeted inside Milestone 1",
    "Mainnet only after that review clears",
]
gy = Inches(3.04)
for g in gaps:
    rect(s, M + Inches(6.34), gy + Inches(0.08), Inches(0.07), Inches(0.07), fill=GOLD)
    text(s, M + Inches(6.58), gy, Inches(4.7), Inches(0.5), [(g, 11.5, False, MUTED)], spacing=1.2)
    gy += Inches(0.44)
rect(s, M, Inches(5.12), CW, Inches(1.0), fill=CARD, line=LINE, radius=0.06)
text(s, M + Inches(0.36), Inches(5.34), CW - Inches(0.72), Inches(0.6),
     [("We use x402 as a client, through the PayAI facilitator. We do not claim to have "
       "written it. What we did write is the vault, and testing it surfaced five bugs that "
       "would have moved money wrongly. That is why we are asking for an audit.",
       12.5, False, INK)], spacing=1.24)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 10 TEAM
s = page()
eyebrow(s, "Team")
title(s, "Building for the market we live in.")
founders = [
    ("SM", "Samson Micheal", "Founder, CEO and Technical Product Engineer", BLUE,
     "Full stack fintech engineer in Abuja. Built the ledger, settlement engine, "
     "identity layer and chat interfaces running in production today."),
    ("JH", "Jonathan Hart", "Co Founder, Operations and Growth", STRK,
     "Emerging market merchant onboarding and creator network distribution. Leads "
     "acquisition across West African freelance and agency communities."),
]
fy = Inches(2.38)
for init, name, role, col, bio in founders:
    rect(s, M, fy, Inches(5.6), Inches(1.86), fill=PAPER, line=LINE, radius=0.06)
    circ = s.shapes.add_shape(MSO_SHAPE.OVAL, M + Inches(0.34), fy + Inches(0.3),
                              Inches(0.78), Inches(0.78))
    circ.fill.solid(); circ.fill.fore_color.rgb = col
    circ.line.fill.background(); circ.shadow.inherit = False
    text(s, M + Inches(0.34), fy + Inches(0.49), Inches(0.78), Inches(0.36),
         [(init, 17, True, WHITE)], align=PP_ALIGN.CENTER)
    text(s, M + Inches(1.3), fy + Inches(0.30), Inches(4.0), Inches(0.34),
         [(name, 16.5, True, INK)])
    text(s, M + Inches(1.3), fy + Inches(0.63), Inches(4.2), Inches(0.3),
         [(role, 10.5, False, col)])
    text(s, M + Inches(0.34), fy + Inches(1.10), Inches(5.0), Inches(0.66),
         [(bio, 10.5, False, MUTED)], spacing=1.2)
    fy += Inches(2.02)
text(s, M + Inches(6.1), Inches(2.38), Inches(5.6), Inches(0.34),
     [("Why this team", 12.5, True, STRK)])
why = [
    ("We are the user. ", "Cross border payment friction is a daily fact here, not a market study."),
    ("Shipped, not specced. ", "A live production system with real bank settlement already exists."),
    ("Compliance first. ", "Identity verification and AML policy were built before growth."),
    ("Bootstrapped. ", "No outside capital raised to date."),
]
for i, (a, b) in enumerate(why):
    bullet(s, M + Inches(6.1), Inches(2.84) + Inches(0.84) * i, Inches(5.4), a, b)
footer(s, N)

# ══════════════════════════════════════════════════════════════════ 11 ASK
s = page()
rect(s, Emu(0), Emu(0), W, H, fill=STRK_DEEP)
bh = int(H / 3)
for i, c in enumerate((BLUE, TEAL, STRK)):
    rect(s, Emu(0), Emu(bh * i), Inches(0.16), Emu(bh), fill=c)
text(s, M, Inches(1.42), Inches(11), Inches(0.4), [("THE ASK", 11.5, True, STRK)])
accent_bar(s, M, Inches(1.82), w=Inches(1.5))
text(s, M, Inches(2.2), Inches(11), Inches(1.5),
     [("$25,000 in STRK to put a working fiat corridor on Starknet.", 36, True, WHITE)],
     spacing=1.0)
text(s, M, Inches(3.72), Inches(10.4), Inches(0.9),
     [("The product exists and settles real money today. What it does not have is Account "
       "Abstraction, sponsored gas and our vault deployed on Starknet. That is what this "
       "grant buys, and all of it ships open source.", 14.5, False, RGBColor(0xC7, 0xD4, 0xE6))], spacing=1.3)
links = [
    ("Product", "app.sivantech.online"),
    ("Telegram", "t.me/Sivan_Ai"),
    ("Code", "github.com/Sivan-Technologies/Sivan"),
    ("Contact", "sivantechnology@gmail.com"),
]
for i, (k, v) in enumerate(links):
    x = M + (Inches(3.02) + Inches(0.18)) * i
    text(s, x, Inches(5.3), Inches(3.02), Inches(0.28), [(k.upper(), 9.5, True, STRK)])
    text(s, x, Inches(5.6), Inches(3.14), Inches(0.34), [(v, 11.5, False, WHITE)])
text(s, M, H - Inches(0.92), Inches(11), Inches(0.4),
     [("Sivan Technologies, Abuja, Nigeria", 11, False, RGBColor(0x76, 0x8A, 0xA6))])


# ─── guards ───────────────────────────────────────────────────────────────
blob = "\n".join(sh.text_frame.text for sl in prs.slides for sh in sl.shapes
                 if sh.has_text_frame)
for bad, name in ((chr(0x2014), "em dash"), (chr(0x2013), "en dash")):
    if bad in blob:
        raise SystemExit(f"BUILD FAILED: a {name} is present.")

# Claims that are NOT supported by either repository. Verified by grep:
# zero files mention starknet or cairo; x402 appears only as a KPI counter;
# there is no third party audit.
# "settles through x402" is TRUE and verified in sivan-escrow-agent.
# "implements x402" / "our x402 protocol" is FALSE: Sivan is a client of
# PayAI's facilitator, not a facilitator. Ban the second shape only.
BANNED = ["Audited x402 Protocol Implementation", "our audited",
          "implements x402", "our x402 protocol", "x402 protocol implementation",
          "No bespoke escrow contract", "rather than authoring",
          "21 passing", "21 comprehensive", "BNB",
          "0.15s", "0.15 second"]
for claim in BANNED:
    if claim.lower() in blob.lower():
        raise SystemExit(f"BUILD FAILED: unsupported claim '{claim}' present.")

# The fabricated USDC address from the application must never appear.
if "eec55b77" in blob:
    raise SystemExit("BUILD FAILED: the invalid USDC address is present.")
if USDC_NATIVE not in blob:
    raise SystemExit("BUILD FAILED: the verified native USDC address is missing.")

prs.save("/home/user/Sivan_Starknet_Deck.pptx")
print(f"saved, {len(prs.slides._sldIdLst)} slides")
print("guards passed: no em dashes, no unsupported claims, USDC address verified")
