# Sivan · Colosseum Playbook

**Purpose:** the strategy and the deck script for Colosseum (and Arbitrum after it).
Written against Volarevic's red-flag list, YC's legibility rules, and the Pixar
story spine. Every claim here was checked against the running code or a live
HTTP response. Where a number cannot be verified it is marked `NEEDS NUMBER`.

---

## 0. The one thing to internalise

> Colosseum is not a hackathon. It is a seed-stage VC competition.
> Judges are not looking to be impressed. **They are looking for a reason to say no.**

Everything below is organised around removing reasons to say no, then telling one
story clearly enough that a distracted person on a phone gets it in eight seconds.

**Your deck is a Tinder swipe.** Not a document.

---

## 1. Honest scorecard

### Where Sivan is genuinely strong

| Signal | Evidence |
|---|---|
| Live product, not a hack | `app.sivantech.online` 200, six services up, 20 days uptime |
| Real money moves | NGN off-ramp settles to Nigerian bank accounts via NIP |
| Real Solana code | `spl-transfer.ts` uses mainnet USDC mint `EPjFWdd5...TDt1v`, handles ATA creation, builds VersionedTransactions |
| Revenue exists | 1.25% off-ramp returned live by the public fee endpoint |
| Founder is the user | Abuja-based, building for the market he lives in |
| Bootstrapped | No outside capital, no dilution |
| Compliance done early | BVN and NIN verification against the national registry |

This is a stronger base than most Colosseum submissions. The problem is not the
company. **The problem is how it is currently being described.**

### Red flags currently live in your materials

Checked against Volarevic's list one by one.

| Flag | Where it appears | Fix |
|---|---|---|
| Buzzwords | "universal clearinghouse for digital dollars", "universal conversational and agentic settlement protocol" | Say what it does in words a market trader would use |
| "Everything app" positioning | Colosseum answer targets freelancers AND SMEs AND AI agents | **Pick one. Freelancers.** |
| Multiple revenue streams, no focus | Three-stream fee slide | One number on the deck: 1.25%. Rest goes in the appendix |
| Competitor matrix | He names this exact artifact as a red flag | Replace with one sentence of positioning |
| Vanity metrics | "174 test scripts", "8-repository architecture", "6 services" | Delete. Replace with settled volume |
| Too much text | Current decks run 40+ words on several slides | Hard cap: 15 words per slide |
| No clear user | "individuals, businesses, and autonomous AI agents" | One persona with a name |

### The multi-chain question (CORRECTED)

**Earlier guidance in this file said "Colosseum is Solana-only, bury the
multi-chain story." That was wrong and has been corrected.**

Crypto World's Fair (14 Sept to 12 Oct 2026) explicitly welcomes all chains. There
is a general prize pool judged across every chain, plus dedicated ecosystem tracks
including Base, Arbitrum, Robinhood Chain, ETH L1, Hyperliquid and Zcash.

So multi-chain is an **asset** here, not a distraction. Sivan already prices gas on
Solana, Base, Ethereum, Arbitrum and Polygon (`NETWORK_GAS_USD`), which makes it
credibly eligible for the general pool plus the Base, Arbitrum and ETH L1 tracks
off a single build.

**How to position it:**

> Sivan settles on Solana, Base, Ethereum, Arbitrum and Polygon. The off-ramp is
> the hard part and it is chain-agnostic by design, so every chain we add inherits
> a working path to a Nigerian bank account.

Do not claim a track where there is no code. Solana, Base and Arbitrum are real.

---

## 2. The story (Pixar spine)

This is the spine. Everything in the deck hangs off it.

| Beat | Sivan |
|---|---|
| **Once upon a time** | A designer in Abuja invoices a client in London. |
| **Every day** | She waits 3 to 5 days and loses 5 to 10 percent to intermediaries. |
| **Until one day** | She gets paid in USDC inside the same Telegram chat where she agreed the work. |
| **Because of that** | The naira lands in her real bank account in under two minutes. |
| **Because of that** | She keeps the 8 percent she was losing. |
| **Until finally** | Every African freelancer gets paid as if they lived in the client's country. |

**One user. One problem. One number.** If a slide does not serve this spine, cut it.

### The one-liner

Current: *"the universal clearinghouse for digital dollars"* — buzzword, vague, forgettable.

Use instead:

> **Sivan pays African freelancers in their own bank account, from a chat message, in under two minutes.**

Test it: a stranger reads it once and can repeat it back. That is the bar.

---

## 3. Deck structure (8 slides, hard limit)

YC rule: 5 to 7 ideas, legible, simple, obvious. Colosseum decks are scanned, not read.

**Global rules**
- Max **15 words** per slide. Title carries the idea; body is support.
- Font never below **28pt** for the headline.
- One idea per slide. If it needs a second idea, it needs a second slide.
- Every chart gets a plain-English caption stating the conclusion. Never make a
  judge derive it.
- No animations, no transitions, no memes, no diagrams.

| # | Slide | The single idea | Notes |
|---|---|---|---|
| 1 | **Title** | Sivan pays African freelancers in their own bank account, from a chat message, in under two minutes. | Logo, one line, nothing else |
| 2 | **Problem** | A Lagos designer invoices London and waits 5 days to lose 8 percent. | One persona, one number. No market-size slide here |
| 3 | **Product** | The phone mockup. USDC in, naira out, confirmed in chat. | The image IS the slide. Three words of caption |
| 4 | **Traction** | Two real settlements, $18 and 24 USDC, on mainnet into a Nigerian bank account. | Small but real and verifiable. See section 4 |
| 5 | **How it works** | Three steps: receive USDC on Solana, convert, paid to bank. | Bulleted steps, never a diagram |
| 6 | **Why these chains** | Sub-cent fees are what make a $20 payout viable. Settles on Solana, Base and Arbitrum. | Ties chains to the user's economics, not to ideology |
| 7 | **Business** | 1.25 percent on every conversion. Charging today. | ONE number. Other streams go in the appendix |
| 8 | **Team** | Two founders. Abuja. Building for the market we live in. | Founder-as-user is your strongest signal |

**Appendix (after the last slide, for Q&A only):** other revenue streams, other
chains, architecture, compliance, test coverage, competitor detail.

---

## 4. The one thing that decides this

**You need a real transaction number.** Everything else is ready.

Colosseum is a VC competition. VCs fund evidence of pull. Right now slide 4 has
engineering proxies where a business number belongs, and Volarevic names vanity
metrics explicitly as a red flag.

### What to do this week

1. **Pull the real figure.** Total NGN settled, transaction count, date of first
   transaction. Even if it is small. A small real number with a date anchor beats
   four proxies.
2. **If the number is near zero, go make it.** Run 20 real transactions with people
   you know. That is a weekend. "NGN 1.8m across 24 payouts since June" is a
   completely respectable seed-stage traction slide.
3. **Get one verifiable Solana mainnet signature.** You have
   `scripts/test-real-5usdc-onchain.ts` but no recorded signature anywhere in the
   repo. One Solscan link on the deck proves more than the whole architecture
   story. Run it, save the signature, put it on slide 5.
4. **Get one named user quote.** "Chidi runs a studio in Lagos, was losing 8
   percent through PayPal, now settles same day." One real person outperforms the
   entire market slide.

---

## 5. Fix these before submitting

Ordered by damage if a judge finds them. All of these are in public places a
judge will actually look.

1. **`webmcp.js` returns a fake balance.** `src/webmcp.js` in
   `Sivan-Technologies/Sivan` falls back to a hardcoded `79.75 USDC` when the API
   call fails. The endpoint it calls (`/api/balances/unified`) returns **404**, so
   the fallback fires **every time**. A judge testing your tools sees invented data
   labelled "real-time". Return an error instead.
2. **The public README overclaims.** It badges "Multi-Chain: Solana | Base | Stellar
   | Celo | BSC" and "True Multi-Chain". Celo is one explorer URL; Stellar is two
   comments about what Privy supports. Trim to what exists.
3. **Drop the AI-agent positioning from the primary pitch.** It splits the story.
   Keep it as one appendix slide for the AI track if there is one.
4. **Delete the competitor matrix** from the Colosseum version.
5. **Kill "174 test scripts"** as a headline. It belongs in the appendix, if anywhere.

---

## 6. The extra mile (Volarevic's section 5)

These are cheap and most entrants skip them.

- **Follow the judges on X now.** Engage genuinely for two weeks before submitting.
- **Ask two judges for deck feedback** before the deadline. Costs nothing, and it
  turns a cold submission into a warm one.
- **Ship a 90-second launch video.** One take, real money moving, no narration over
  an empty UI. Watching $50 become naira in a bank account is your single most
  persuasive asset.
- **Superteam Nigeria.** Get plugged in locally. Judges weight ecosystem presence.
- **Align to their thesis.** Colosseum funds things people cannot stop doing.
  Getting paid is the most non-optional behaviour there is. Say that out loud.
- **Build in public** for the next month: post the settled-volume number weekly.

---

## 7. Arbitrum reuse

Same spine, three swaps. Do not rewrite from scratch.

| Slide | Colosseum | Arbitrum |
|---|---|---|
| 6 | Why Solana: sub-cent fees make a $20 payout viable | Why Arbitrum: same economics, plus EVM tooling and Base/Ethereum liquidity you already settle across |
| 5 | Solana mainnet signature on Solscan | Arbiscan transaction |
| Appendix | Multi-chain story hidden | Multi-chain is an **asset** here: you already price gas on Arbitrum in `network-costs.ts` |

Everything else is identical. Build the Colosseum deck properly and Arbitrum is an
afternoon.

---

## 8. Checklist

**Before writing a single slide**
- [ ] Real settled volume and transaction count
- [ ] One Solana mainnet signature, saved
- [ ] One named user quote
- [ ] `webmcp.js` fake balance removed
- [ ] README chain claims trimmed

**Deck**
- [ ] 8 slides maximum
- [ ] Max 15 words per slide
- [ ] One user named on slide 2, same user referenced throughout
- [ ] Zero buzzwords: universal, revolutionary, democratizing, redefining, disruptive, seamless
- [ ] No competitor matrix
- [ ] No diagrams
- [ ] One revenue number on the main deck
- [ ] Every chart has a conclusion caption
- [ ] Someone outside the team reads it and repeats the one-liner back correctly

**Submission**
- [ ] Loom over YouTube (their stated preference)
- [ ] 90-second demo, real money
- [ ] Judges followed and engaged for two weeks
- [ ] Feedback requested from at least two
- [ ] Superteam Nigeria contacted

---

## 9. Honest odds

**With the traction number:** genuinely competitive. Live product, real revenue,
real Solana code, founder-as-user, bootstrapped, in a market Solana wants to win.
That is a top-decile profile.

**Without it:** you get filtered at slide 4. Judges see a well-built product with
no evidence anyone wants it, and "well-built" is not the bar. Every submission
claims to be well-built.

The deck is two days of work. The number is the whole game.
