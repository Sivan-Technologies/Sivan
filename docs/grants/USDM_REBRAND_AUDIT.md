# cUSD to USDm rebrand: audit before implementation

Audited 17 Sept 2026 across all 9 organisation repositories, on their real
default branches. Nothing below is inferred from a partial search; every count
came from a full-tree grep and every on-chain claim from an `eth_call`.

---

## 1. The rebrand is real, and confirmed on chain

Read directly from both networks, not from documentation:

| Network | Address | `symbol()` | `name()` | decimals |
|---|---|---|---|---|
| Celo Mainnet | `0x765DE816845861e75A25fCA122bb6898B8B1282a` | **USDm** | **Mento Dollar** | 18 |
| Celo Sepolia | `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b` | **USDm** | **Mento Dollar** | 18 |

Addresses and the 18-decimal standard are unchanged, exactly as your brief
states. The token itself already reports the new identity, which means any
surface still printing "cUSD (Celo Dollar)" is not merely out of date, it
**contradicts the contract it is describing**.

---

## 2. Status: NOT complete. 5 of 9 repos affected

| Repository | Branch audited | Files | Occurrences | User-facing gap |
|---|---|---|---|---|
| `Sivan` | main | 7 | 26 | **Yes, worst offender.** Public docs and README badge |
| `sivan-minipay-app` | main | 15 | 47 | **No.** UI already renders USDm, see below |
| `sivan-payment` | **multichain** | 20 | ~40 | **Yes.** Public MCP API schema |
| `sivan-contracts` | staging | 14 | 66 | **Yes.** Docs say "Celo Dollar" |
| `sivan-ai-agent` | multichain | 1 | 2 | No, code comments only |
| `Telegram-layer` | main | 0 | 0 | Clean |
| `telegram-admin-auth` | main | 0 | 0 | Clean |
| `sivan-escrow-agent` | main | 0 | 0 | Clean |
| `whatsapp-layer` | main | 0 | 0 | Clean |

### A branch trap worth recording

`sivan-payment` checked out locally on `main` reports **zero** occurrences. Its
actual default branch is `multichain`, which has **20 files**. Auditing the
checked-out branch would have produced a confident and completely wrong "already
done". The same applies to `sivan-ai-agent`, also defaulting to `multichain`.

---

## 3. MiniPay is already correct. I want to be precise about this

The raw count for `sivan-minipay-app` looks alarming at 47 occurrences, and it
would be easy to report it as the biggest problem. It is not. Every display path
already hardcodes the new name:

```ts
// SwapView.ts
${getTokenIconSvg('cUSD', 16)} <span>USDm</span>

// CreateAgreementView.ts and CashoutView.ts
${getTokenIconSvg('cUSD', 16)} <span>USDm (Celo)</span>

// celo-client.ts
{ symbol: 'cUSD', name: 'USDm (Mento Dollar)', decimals: 18, ... }
```

The remaining `cUSD` strings are **internal identifiers**: object keys in
`celo.config.ts`, `data-token` attributes, TypeScript union members, and the
`symbol` field used to look up balances. I checked whether `symbol` is ever
rendered directly (`grep "\.symbol}" src/components/`) and it is not.

**So the only genuine issue in MiniPay is one README line.** Renaming the
internal keys is optional cleanup, not a rebrand requirement, and it carries
real risk: those keys index config maps and balance lookups, so a partial rename
silently breaks balance display rather than failing loudly.

---

## 4. Genuine user-facing gaps, in priority order

### 4.1 `sivan-payment` MCP schema, public developer API

`src/developer-gateway/mcp-schema.ts`:

```ts
amount:   { description: 'Payment amount in USDC, cUSD, or USDT (e.g. 15.50).' },
currency: { type: 'string', enum: ['USDC', 'cUSD', 'USDT'] },
```

The `description` is a pure label and should say USDm. **The `enum` is
different: it is an accepted input value, part of your API contract.** Changing
it to `'USDm'` breaks every existing integration that posts `"cUSD"`.

Recommended handling, and the only part of this work I would not do
unilaterally:

```ts
// Accept both. cUSD is the legacy alias, retained so existing integrations
// keep working; USDm is the current symbol and what documentation shows.
enum: ['USDC', 'USDm', 'cUSD', 'USDT'],
description: 'Payment currency symbol. USDm (formerly cUSD). Defaults to USDC.',
```

with `cUSD` normalised to `USDm` on ingest. A hard rename is a breaking change
and needs your explicit call.

`developer-gateway.routes.ts:42` advertises `nativeAssets: ['cUSD', 'USDC']` in
a capability response, which is user-facing output and should read `USDm`.

### 4.2 `Sivan` public documentation, the worst offender

These are read by grant reviewers and integrators:

- `README.md:15` shield badge: `Stablecoins-USDC | cUSD`
- `README.md:32`, `README.md:83` prose
- `docs/minipay/overview.md:17` "Core Asset: cUSD (Celo Dollar)" — **wrong name**
- `docs/chains/celo.md:18` "Supported Stablecoins: cUSD (Celo Dollar)" — **wrong name**
- `docs/api/quotes.md:9`, `docs/api/offramp.md:9` API documentation prose

### 4.3 `sivan-contracts` documentation

- `docs/CELO_X402_SMART_CONTRACT_SPECIFICATION.md:76` "Celo Dollar (cUSD)"
- `docs/DEVELOPER_INTEGRATION_GUIDE.md:27` "Celo Dollar (cUSD)"
- `README.md:26`, `README.md:34`
- Architecture doc, four references

Note `docs/DEPLOY_TESTNET.md:129` shows `cUSD  0xdE9e...  symbol=USDm`. That one
is **correct as written**: it is a transcript of real deploy output where `cUSD`
is our internal label and `symbol=USDm` is what the chain returned. Changing it
would make the document misrepresent the tool's output.

---

## 5. Unrelated finding that outranks the rebrand

While tracing token addresses I found a published USDC address that is not USDC.

```
0xcebA97Fcedaa310E7D988936b9741FA007a9C05c   codesize=0    no symbol()
0xcebA9300f2b948710d2653dD7B07f33A8B32118C   codesize=1798 symbol=USDC
```

**`0xcebA97Fce...` is not a contract at all.** Empty bytecode. It appears in
three developer-facing documents as "Celo Native USDC":

- `docs/CELO_X402_NON_CUSTODIAL_ARCHITECTURE.md:44`
- `docs/CELO_X402_SMART_CONTRACT_SPECIFICATION.md:75`
- `docs/DEVELOPER_INTEGRATION_GUIDE.md:26`

The first 6 characters match the real address, so it reads as plausible and
survives a glance. An integrator who copies it sends USDC to an address with no
code. On Celo that transfer succeeds at the token level and the funds are
unrecoverable.

This is a funds-loss hazard in published documentation and should be fixed
before any cosmetic rebrand work. It is not caused by the rebrand; I found it
while verifying the token tables.

---

## 6. Naming convention to apply

Consistent with what MiniPay already does, and with how Mento presents it:

- First mention in a document: **USDm (Mento Dollar, formerly cUSD)**
- Thereafter: **USDm**
- Never "Celo Dollar". The chain says "Mento Dollar"; the old name is now wrong
- Keep `cUSD` where it is an **internal identifier**: config keys, type union
  members, `data-*` attributes, variable names, test fixture labels
- Keep `cUSD` in **historical transcripts**, such as recorded deploy output
- API enums: accept both, normalise to `USDm`, document `cUSD` as a legacy alias

The distinction that matters throughout: **a label is what a human reads, an
identifier is what code matches on.** The brief covers labels. Renaming
identifiers is a separate refactor with breakage risk and no user benefit.

---

## 7. Proposed execution order

1. **Fix the dead USDC address** in three `sivan-contracts` docs. Highest
   severity, unrelated to the rebrand, five minutes.
2. `sivan-contracts` docs and README: labels to USDm, remove "Celo Dollar".
3. `Sivan` docs and README: same, including the shield badge.
4. `sivan-payment`: gateway capability response and MCP `description`. Flag the
   `enum` decision for you.
5. `sivan-minipay-app`: one README line.
6. `sivan-ai-agent`: two code comments, cosmetic.
7. Add a CI guard so the old name cannot return: fail the build on
   `Celo Dollar`, and on `cUSD` appearing in documentation prose while allowing
   it in code identifiers and recorded output.

Item 7 is what makes this stay done rather than drift back, in the same spirit
as the existing em-dash and buzzword build assertions.

---

## Question before I proceed

The only genuinely ambiguous decision is the **MCP `enum`**. Everything else is
unambiguous label work I can complete and push.

Do you want the API to accept both `cUSD` and `USDm` with normalisation, which
is backward compatible, or a hard rename to `USDm` only, which is cleaner but
breaks any integration currently sending `cUSD`?
