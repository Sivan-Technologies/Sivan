# Sivan · Canonical Story

**This file is the single source of truth for how Sivan is described anywhere.**

Deck, Colosseum submission, Circle application, Starknet application, README,
demo script, X posts. If a document disagrees with this file, the document is
wrong. If this file is wrong, fix it here first and propagate.

Why it exists: four applications drifted apart because each was written from
scratch. Two claimed different fee structures, three claimed different chain
support, one claimed an audit that does not exist, and one carried a token
address that resolves to nothing.

**Verified against the running code on 16 September 2026.** Source of truth for
code claims: `Sivan-Technologies/sivan-payment`, branch `multichain`, HEAD
`c2b9450`. Not `Samswitchy/sivan-payment` on `main`, which is an older tree and
does not contain the chain adapters.

---

## 1. The thesis

> **A freelancer in Lagos should never have to own a gas token to get paid.**

This is the sentence the whole company hangs off. It is not a feature. It is the
reason the product exists, and it is solved at protocol level on every chain
Sivan settles.

Everyone in stablecoin payments says "we make crypto easy." Almost nobody has
removed the gas token, because removing it is different work on every chain and
most teams pick one and stop.

### The one-liner

> **Sivan pays African freelancers into a real bank account in dollars, pounds,
> euros or naira, from a chat message, without them ever touching a gas token.**

**Test:** a stranger reads it once and repeats it back. That is the bar.

**Banned words.** On every judge's red-flag list: universal, revolutionary,
democratizing, redefining, disruptive, seamless, cutting-edge, next-generation,
clearinghouse, paradigm. Retired phrasing: *"the universal clearinghouse for
digital dollars"*, *"universal conversational and agentic settlement protocol"*.

---

## 2. The spine (Pixar)

| Beat | Sivan |
|---|---|
| **Once upon a time** | A designer in Abuja invoices a client in London. |
| **Every day** | She waits 3 to 5 days and loses 5 to 10 percent to intermediaries. The crypto alternative asks her to buy a gas token first. |
| **Until one day** | She is paid in USDC inside the same chat where she agreed the work. |
| **Because of that** | She never buys CELO, ETH, SOL or XLM. Sivan pays the gas, or the gas is paid in the dollars she already has. |
| **Because of that** | The money reaches a real bank account, in dollars, pounds, euros or naira, and she keeps the 8 percent. |
| **Until finally** | Every African freelancer is paid as if they lived in the client's country. |

Six beats. Do not add a seventh.

---

## 3. The one user

**Amara. Designer. Abuja. Invoices clients in London and Toronto.**

One persona, named, referenced on the problem slide, the product slide and in the
demo. Not "individuals, businesses, and autonomous AI agents" — that is three
users, which a judge reads as none.

**Who Sivan is NOT for, said out loud when asked:** crypto traders, DeFi users,
anyone who already owns a hardware wallet. They are already served. Amara is not.

SMEs, agencies and AI agents are real secondary segments. They live in the
appendix. They are expansion, not positioning.

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
| Off-ramp, USDC to naira | **1.25%** | Live: `GET /api/fees/offramp` returns `percent: "1.25"` |
| Escrow / service agreements | **2.5% naira, 1.5% USDC**, plus NGN 50 or $0.50 fixed | `settingsStore.ts` schema defaults |
| P2P transfers | 0.50% under $100, 0.25% above, $0.25 floor, $0.30 new recipient | `transfer-fee-policy.ts` |

Never again write "0.5% capped at $5" for escrow. That figure was in an early
Starknet draft and is wrong by roughly 30x on a large agreement.

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

Measured 16 Sept on `multichain` HEAD `c2b9450`:

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
2. **The CBN linked every Nigerian bank account to BVN or NIN** (effective 1 March
   2024). An account that resolves is one a licensed bank already verified, which
   is what makes lightweight tiered verification possible.
3. **Chat is already the interface.** Nigerians transact in WhatsApp and Telegram.
   No new surface to teach.

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
| Solana mainnet signature on Solscan | **MISSING.** `scripts/test-real-5usdc-onchain.ts` exists, no signature recorded. Highest priority |
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
| No third-party audit | "The protocol we settle through is audited. Our integration is not, and we will not blur the two. It is budgeted." |
| Nigeria only | Not true, and do not concede it. "We pay out in dollars, pounds, euros and naira, and we issue USD and GBP virtual accounts. Nigeria is where we started, not the ceiling. Ghana is next on the local rail." |
| Not decentralised | "Sivan holds no fiat. Balances are stablecoin, fiat moves bank to provider to bank. A settlement layer, not a custodian." |
| WhatsApp is down | Being fixed. Do not demo it. |

---

## 11. Fix before submitting

Public, and a judge will look. Detail in `FIX_THESE_NOW.md`.

1. **`webmcp.js` fabricates a balance.** The endpoint it calls 404s, so the
   hardcoded `79.75 USDC` fallback fires on every call and is labelled real-time.
2. **`TEST_VERIFICATION_REPORT.md` claims 100%.** It is 19 of 21. Republish honestly.
3. **Chain adapters are invisible on a plain clone.** They are in a submodule on a
   non-default branch. Add `--recurse-submodules` to the README, and consider
   merging `multichain` into `main`. Your best engineering should not be one
   branch-checkout from unfindable.

---

## 12. Derived documents

| Document | Audience | Emphasis |
|---|---|---|
| `COLOSSEUM_PLAYBOOK.md` | Colosseum judges | Gas abstraction thesis, one user, traction |
| `Sivan_Pitch_Deck.pdf` | Circle | Multi-chain USDC, CCTP roadmap, three revenue streams |
| `Sivan_Starknet_Deck.pdf` | Starknet Foundation | Account Abstraction as the blocker, porting the tested Celo vault |
| Demo video script | All | The spine in 90 seconds, real money |
| Public README | Developers and judges | What exists, nothing more |

---

## 13. The 28-day clock

Crypto World's Fair closes **12 October 2026**.

| When | What |
|---|---|
| Days 1 to 3 | Record a Solana mainnet signature. Fix `webmcp.js`. Fix the two failing suites |
| Days 1 to 7 | Twenty real transactions. One named user quote |
| Days 7 to 14 | Build the 8-slide deck. Record the 90-second demo |
| Days 14 to 21 | Follow and engage judges once announced |
| Days 21 to 26 | Ask two judges for deck feedback |
| Day 26 | Submit. Not day 28 |
