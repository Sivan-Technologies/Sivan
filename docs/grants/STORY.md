# Sivan · Canonical Story

**This file is the single source of truth for how Sivan is described anywhere.**

Deck, Colosseum submission, Circle application, Starknet application, README,
demo script, X posts. If a document disagrees with this file, the document is
wrong. If this file is wrong, fix it here first and propagate.

Why it exists: four applications drifted apart because each was written from
scratch. Two claimed different fee structures, three claimed different chain
support, one claimed an audit that does not exist, and one carried a token
address that resolves to nothing.

**Verified against the running code on 18 September 2026.** Sources of truth:

| Repo | Branch | HEAD |
|---|---|---|
| `sivan-contracts` | `staging` | `c4a8737` |
| `sivan-payment` | `multichain` | `013b282` |
| `sivan-escrow-agent` | `main` | `35d8eca` |

Not `sivan-payment` on `main`, which is an older tree without the chain
adapters: it declares only `solana | base | ethereum`.

---

## 1. The thesis

> **Nobody should have to own a gas token to get paid.**

This is the sentence the whole company hangs off. It is not a feature. It is the
reason the product exists, and it is solved at protocol level on every chain
Sivan settles.

Everyone in stablecoin payments says "we make crypto easy." Almost nobody has
removed the gas token, because removing it is different work on every chain and
most teams pick one and stop.

### The one-liner

> **Sivan settles stablecoin work into a real bank account in dollars, pounds,
> euros or naira, from a chat message, without anyone touching a gas token.**

**Test:** a stranger reads it once and repeats it back. That is the bar.

**Banned words.** On every judge's red-flag list: universal, revolutionary,
democratizing, redefining, disruptive, seamless, cutting-edge, next-generation,
clearinghouse, paradigm. Retired phrasing: *"the universal clearinghouse for
digital dollars"*, *"universal conversational and agentic settlement protocol"*.

---

## 2. The spine (Pixar)

| Beat | Sivan |
|---|---|
| **Once upon a time** | A designer invoices a client in another country. |
| **Every day** | She waits 3 to 5 days and loses 5 to 10 percent to intermediaries. The crypto alternative asks her to buy a gas token first. |
| **Until one day** | She is paid in USDC inside the same chat where she agreed the work. |
| **Because of that** | She never buys CELO, ETH, SOL or XLM. Sivan pays the gas, or the gas is paid in the dollars she already has. |
| **Because of that** | The money reaches a real bank account, in dollars, pounds, euros or naira, and she keeps the 8 percent. |
| **Until finally** | Anyone paid across a border is paid as if they lived in the client's country. |

Six beats. Do not add a seventh.

---

## 3. The one user

**Amara. Designer. Invoices clients in London and Toronto, banks locally.**

Keep her named and specific. What was removed is the city, not the person: the
persona was doing double duty as a geography claim, and that made the whole
company read as regional when the payout rails are not.

One persona, named, referenced on the problem slide, the product slide and in the
demo. Not "individuals, businesses, and autonomous AI agents", which is three
users, which a judge reads as none.

**Who Sivan is NOT for, said out loud when asked:** crypto traders, DeFi users,
anyone who already owns a hardware wallet. They are already served. Amara is not.

SMEs, agencies and AI agents are real secondary segments. They live in the
appendix. They are expansion, not positioning.

**On geography.** Sivan is not an African product, and describing it as one
understates what shipped: USD over ACH, GBP over Faster Payments, EUR over SEPA
and NGN over NIP, with the USD, GBP and EUR accounts issued by us. The live site
already says "Global, multi-currency."

Nigeria is one corridor of four and the one we started with. Say it that way
when asked: *"we started there because it is the hardest, not because it is the
limit."* Do not lead with it, and do not hide it either.

---

## 4. Gas abstraction, chain by chain

This table is the proof behind the thesis. Every row was read from source.

| Chain | How the user avoids a gas token | Where |
|---|---|---|
| **Celo** | **CIP-64.** Transaction type `0x7b`, EIP-1559 plus a `feeCurrency` field, so the node debits gas in USDC, USDT or USDm. The user pays gas in the dollars they were already sent. | `celo/cip64-serializer.ts`, `celo/celo-fee-currency.ts` |
| **Stellar** | **Fee-bump.** Sivan's treasury sponsors the 100-stroop network fee, and trustlines for USDC and USDT are opened for the user. | `stellar/fee-bump.ts`, `stellar/trustline.ts` |
| **Base, BSC** | **Privy gas sponsorship** on the transaction. | `provider/privy-wallet.provider.ts` |
| **Solana** | Fee payer handled at transfer construction, including the ~0.00204 SOL rent for a new SPL token account. | `solana/spl-transfer.ts` |

**Why CIP-64 is the strongest single item in the company.** It is not an
integration, it is protocol-level serialization work: RLP encoding a `0x7b`
typed transaction with a fee-currency address, plus a decimals adapter because
USDC on Celo is 6 decimals while the node prices gas in 18. Very few teams have
done this. It is the most concrete possible proof of the thesis.

---

## 5. Approved numbers

Only these. If a number is not in this section, it does not go in a document.

### x402 (verified 17 Sept, sivan-escrow-agent HEAD 35d8eca)

**It is real, and it lives in `sivan-escrow-agent` only.** I twice claimed it
did not exist, having searched `sivan-payment`, `sivan-contracts` and the public
`Sivan` repo and generalised from three repos to all of them.

| Evidence | Measured |
|---|---|
| `src/services/x402Client.ts` | 221 lines. `createPaymentFacility()`, `settlePayment()`, `getPaymentStatus()`, `verifyConnectivity()` |
| `src/services/paymentRouter.ts` | `processCryptoEscrow()` calls it; `processUsdcEscrow` and `processUsdtEscrow` both delegate |
| `src/routes/escrows.ts:311` | the live escrow route calls it. Not dormant scaffolding |
| `src/services/settlementVerification.ts` | independently verifies settlements through the same client |
| Facilitator | `facilitator.payai.network`, HTTP 200 |
| Service | `escrow.sivantech.online`, `databaseMode: live` |
| Totals | 13 files reference x402, 4 reference the facilitator |

**The precise claim:** Sivan settles escrow *through* x402 as a client of PayAI's
facilitator. It does not run a facilitator and does not answer HTTP 402. That is
a normal integration; the wording just has to match it.

### Chains

| Claim | Value |
|---|---|
| Wallets Sivan issues | `solana, base, ethereum, stellar, celo, bsc` (`WalletChain` type) |
| Chains with live gas pricing | solana, base, bsc, celo, ethereum, arbitrum, polygon (`NETWORK_GAS_USD`) |
| Chain adapters in source | `wallets/{solana, evm, celo, stellar}` |
| Solana USDC mint | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` (canonical mainnet) |
| Starknet native USDC, if ever cited | `0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb` |

**Say:** "Sivan issues wallets and settles on six chains: Solana, Base, Ethereum,
Celo, Stellar and BNB Chain."

### Fees

| Stream | Rate | Verified |
|---|---|---|
| Off-ramp, USDC to naira | **1%** | Live: `GET /api/payment/api/fees/offramp` returns `percent: "1"`, re-verified 18 Sept |
| Escrow / service agreements | **2.5% naira, 1.5% USDC**, plus NGN 50 or $0.50 fixed | `settingsStore.ts` schema defaults |
| P2P transfers | 0.50% under $100, 0.25% above, $0.25 floor, $0.30 new recipient | `transfer-fee-policy.ts` |

Never again write "0.5% capped at $5" for escrow. That figure was in an early
Starknet draft and is wrong by roughly 30x on a large agreement.

**The off-ramp fee was 1.25% in every deck while the endpoint returned 1%.** The
slide describing it said "returned live by our public fee endpoint", so the one
number that advertised its own verifiability was the one that failed it. The
deck builders now assert the value at build time and fail if it drifts. If the
live fee changes, change it here first, then in the three builders.

### Product

| Claim | Value |
|---|---|
| **Payout currencies** | **USD (ACH), GBP (Faster Payments), EUR (SEPA/IBAN), NGN (NIP).** All four `enabled=true` on the live API |
| **Virtual accounts issued** | **10 live.** USD, GBP, EUR, NGN supported. Provisioned via Bridge, admin-approved |
| Settlement speed | NGN typically under 1 to 2 minutes via NIP |
| Live surfaces | Web app, Telegram bot, off-ramp, BVN and NIN verification, escrow |
| Identity | BVN and NIN checked against the national source, tiered limits |
| Custody | Sivan holds no fiat. Balances are stablecoin; fiat moves bank to provider to bank |

**Verified 16 Sept:** `GET /api/offramp/controls` returns usd/gbp/eur/ngn all
enabled. Every virtual-account route (`/api/admin/virtual-accounts`,
`/api/admin/virtual-account-requests`, `/api/users/:id/virtual-accounts`)
returns **401**, not 404, which means deployed and correctly protected.

**This is the biggest under-sold asset in the company.** A Nigerian freelancer
with a real US account and routing number means her client sends an ordinary ACH
transfer and never learns she is abroad. Say it plainly and early.

### Tests

**Two different suites. Do not merge the numbers.**

`sivan-contracts`, measured 18 Sept on `staging` HEAD `c4a8737`:

> **107 Hardhat tests passing**, plus 7 Foundry invariants over 12,800 calls and
> 4 fuzz tests at 512 runs each. Slither reports nothing against the vault.

That count grew from 34 because an external review raised five findings, three
of them High. Each was reproduced as a failing test before being fixed. The
commit history shows reproduction then fix, which is worth more than the number.

`sivan-payment`, measured 16 Sept on `multichain`:

> **19 of 21 suites passing.** Two failures: a missing `frontend/node_modules`
> causing the scripts typecheck to fail, and a wrong filename in the runner for
> the P2P suite.

Reproduce with `USER_JWT_SECRET=<any value> npm test`. Without that variable the
env schema rejects at import and 19 suites fail before running an assertion.

**Publish 19 of 21 and name the two failures.** A report admitting two failures
cannot be falsified by a thirty-second clone. One claiming 100% can.

### Traction, stated exactly this way

> **Two real settlements. $18 and 24 USDC, on mainnet, into a Nigerian bank
> account.** Small on purpose: we proved the rail end to end before opening it.

Do not inflate. Do not hide. A judge who has seen two hundred decks claiming ten
thousand users respects a real $18 **provided it is verifiable**, which is why
the Solscan link matters more than the amount.

### Banned numbers

| Banned | Why |
|---|---|
| "174 test scripts", "8-repository architecture" | Vanity metrics, named on the red-flag list |
| "21 of 21 suites, 100% passing" | Not reproducible. It is 19 of 21 |
| "77 of 77" / "307 assertions" | Three different counts appear in one report |
| "Mocking is prohibited across all production pathways" | The runner sets `BRIDGE_MOCK_MODE=true` and ships `mock-wallet.provider.ts` |
| "0.15 second settlement" | Not measurable anywhere in the code |
| "3-second bank payout" | Overstated. Use 1 to 2 minutes |
| "Sivan implements x402" / "our x402 protocol" | **FALSE.** Sivan is an x402 CLIENT of PayAI's facilitator, not a facilitator. It does not answer HTTP 402 itself. Say "settles through x402". |
| "the vault implements x402" | **FALSE.** `sivan-contracts` has zero 402 handling. It is Layer 2, what x402 settles into. |
| Any Starknet USDC address other than the one above | The draft address resolves to nothing |

---

## 6. Distribution

Three surfaces, and the third is the one nobody else has.

| Surface | Status | Why it matters |
|---|---|---|
| Telegram bot | Live, `t.me/Sivan_Ai` | Where the deal is already being agreed |
| Web app | Live, `app.sivantech.online` | Full dashboard |
| **MiniPay** | Detector built (`minipay-detector.ts`, chain 42220) | **MiniPay ships inside Opera Mini, with tens of millions of African users.** Verify whether it is shipped to users before claiming it on a deck |
| WhatsApp | Layer deployed but routing broken (404s) | Do not demo until fixed |

---

## 7. Why now

1. **Gas abstraction matured across chains.** CIP-64 on Celo, fee-bump on
   Stellar, paymasters on EVM. Two years ago the user had to hold a gas token.
2. **Stablecoin off-ramps became licensed and programmatic** across several
   corridors at once rather than one at a time. Where identity is already linked
   to a bank account at national level, as with BVN and NIN in Nigeria,
   lightweight tiered verification becomes possible on top of a check a licensed
   bank already did.
3. **Chat is already the interface.** Deals are agreed in WhatsApp and Telegram
   before any invoice exists. No new surface to teach.
4. **x402 gave agent-to-agent payments a protocol.** We run a working x402
   escrow on Solana, and Celo launched its own facilitator in July.

---

## 8. Chain positioning for Colosseum

**Crypto World's Fair (14 Sept to 12 Oct 2026) accepts all chains.** General prize
pool judged across every chain, plus ecosystem tracks including Base, Arbitrum,
Robinhood Chain, ETH L1, Hyperliquid and Zcash.

Multi-chain is an **asset** here, not a distraction.

**Credibly eligible today:** general pool, Base, ETH L1, and Celo if there is a
track. Arbitrum has gas pricing but no dedicated adapter, so claim it only as a
settlement network, not an integration.

**If asked "why so many chains":** the user does not care which chain their client
paid on. They care that naira arrives. Chain-agnostic settlement with gas
abstraction on each one is the product, not a hedge.

---

## 9. Proof assets

| Asset | Status |
|---|---|
| Verified vault on Blockscout plus a full on-chain lifecycle | **BLOCKED on redeploy.** `scripts/lifecycle-live.js` produces roughly a dozen real transactions covering deposit, release, dispute resolution and timeout refund. This replaces the settlement count as the traction artifact |
| ERC-8004 Agent #9827 | **LIVE.** Resolves on `8004scan.io/agents/celo/9827`, creation tx `0xc0998a21...42a1`. Its owner is the same address the vault has configured as attester, so registry and contract are provably the same operator. Strongest checkable claim we have |
| Solana mainnet signature on Solscan | **MISSING.** `scripts/test-real-5usdc-onchain.ts` exists, no signature recorded |
| One named user with a quote | **MISSING.** One real person beats the market slide |
| 90-second demo, one take, real money | Not made. Loom, not YouTube |
| CIP-64 serializer | `celo/cip64-serializer.ts`. Strongest engineering artifact |
| Live fee endpoint a judge can curl | `api.sivantech.online/api/payment/api/fees/offramp` |
| Phone mockup showing settlement | `frontend/public/sivan-phone-mockup.png` |

---

## 10. Known weaknesses and honest answers

Never hide these. A judge who finds a concealed weakness discounts everything. A
judge who hears you name it first trusts the rest.

| Weakness | Answer |
|---|---|
| Almost no volume | "Two settlements, forty-two dollars. We proved the rail before opening it. The rail is the hard part and it works." |
| Two suites failing | "Nineteen of twenty-one pass. One is a missing frontend install, one is a wrong filename in the runner. Both are in the open." |
| No third-party audit | "The protocol we settle through is audited. Our contract is not, and we will not blur the two. What we did do is commission a review that found five issues, three High, and fix every one with a failing test first. The commit history shows it." |
| The deployed testnet vault has a known bug | True of `0x0592edf3...787caf`, which predates the audit fixes and is not a proxy. It is being replaced. Do not link it and do not verify it: a verified vulnerable contract is worse than an unverified one. |
| Nigeria only | Not true, and do not concede it. "We pay out in dollars, pounds, euros and naira over ACH, Faster Payments, SEPA and NIP, and we issue the USD, GBP and EUR accounts. Nigeria is one corridor of four and the one we started with, because it is the hardest." |
| Not decentralised | "Sivan holds no fiat. Balances are stablecoin, fiat moves bank to provider to bank. A settlement layer, not a custodian." |
| WhatsApp is down | Being fixed. Do not demo it. |

---

## 11. Fix before submitting

Public, and a judge will look.

**Done.**

1. ~~`webmcp.js` fabricates a balance~~ Removed. The endpoint 404s, so the
   hardcoded `79.75 USDC` fallback was the only path and it was labelled
   real-time.
2. ~~`TEST_VERIFICATION_REPORT.md` claims 100%~~ Republished as 19 of 21 with
   both failures named.
3. ~~Off-ramp fee wrong in every deck~~ 1.25% corrected to 1%, with a build
   assertion so it cannot drift back.
4. ~~Retired token naming~~ Mento rebranded cUSD to USDm. Renamed across five repos, with a
   portable CI guard. Also removed a published USDC address with **codesize 0**
   that appeared in three developer docs, including a copy-pasteable snippet.

**Open, in priority order.**

1. **Redeploy the vault.** `0x0592edf3...787caf` carries three High findings and
   cannot be patched in place. Blocks the demo video and the traction artifact.
   Runbook: `sivan-contracts/docs/REDEPLOY_NOW.md`. Budget 0.35 CELO.
2. **Submit the right repo.** The `Sivan` umbrella uses submodules, so a plain
   clone yields **four empty directories**. Colosseum does not accept org links,
   so submit `sivan-contracts` directly: it is self-contained and holds 24
   commits inside the hackathon window. Also merge `staging` into `main`, since
   `.gitmodules` pins `sivan-contracts` to `main`, which is stale.
3. **Three USDm patches unpushed.** The token is read-only on `sivan-payment`,
   `sivan-minipay-app` and `sivan-ai-agent`. Patches in `usdm-patches/`, each
   applied to a fresh clone and verified.
4. **`settlementVerification.ts` verifies nothing on chain.** It checks
   connectivity and credentials. The name promises more than the code does:
   either rename it, or add a real receipt check.

## 12. Derived documents

| Document | Audience | Emphasis |
|---|---|---|
| `COLOSSEUM_PLAYBOOK.md` | Colosseum judges | Gas abstraction thesis, one user, traction |
| `Sivan_Pitch_Deck.pdf` | Circle | Multi-chain USDC, CCTP roadmap, three revenue streams |
| `Sivan_Starknet_Deck.pdf` | Starknet Foundation | Account Abstraction as the blocker, porting the tested Celo vault |
| Demo video script | All | The spine in 90 seconds, real money |
| Public README | Developers and judges | What exists, nothing more |

---

## 13. The clock

**Final submission opens 6 October 2026**, not the 12th. Treat the 6th as the
date everything must already be done.

| When | What |
|---|---|
| Now | Redeploy the vault, verify on Blockscout, prove the attester key |
| Same day | Run `lifecycle-live.js`. Roughly a dozen real transactions on a public explorer |
| Next | Record the demo video: live product only, ending on the Blockscout transaction |
| Next | Record the pitch video: talking head, no slides, two minutes |
| Then | Merge `staging` into `main`. Apply the three USDm patches if the token scope is widened |
| Before the 6th | Ask two judges for deck feedback |

The demo video depends on the redeploy. The pitch video depends on nothing and
can be shot today.
