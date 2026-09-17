# Three fixes before any submission

All three are in public places a judge will look. Each is small. Ordered by damage.

**First, a correction I owe you.** I previously said your suites were broken based
on running the `Samswitchy/sivan-payment` repo on `main`. That was the wrong repo.
Running the real one (`Sivan-Technologies/sivan-payment`, branch `multichain`,
HEAD `c2b9450`) gives **19 of 21 suites passing**, and the two failures are
environment and path problems, not logic. Your test suite is in far better shape
than I claimed. Details in fix 2.

---

## FIX 1 — `webmcp.js` invents a balance (highest damage)

**File:** `Sivan-Technologies/Sivan`, `src/webmcp.js`, lines 96 to 108

### What is wrong

```js
const response = await fetch(`${apiBaseUrl}/api/balances/unified?asset=${asset}`, {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },   // no auth sent
  signal,
});

const data = response.ok ? await response.json()
  : { available: 79.75, asset: 'USDC', networks: ['solana','base','stellar','celo','bsc'] };
```

Measured, not assumed:

```
GET https://api-staging.sivantech.online/          -> 200 {"status":"ok","service":"sivan-payments"}
GET https://api-staging.sivantech.online/api/balances/unified?asset=usdc
                                                    -> 404 Route not found
```

The service is up. **The route does not exist.** So `response.ok` is always false,
the fallback fires on **every single call**, and the tool reports:

> "Available Balance: 79.75 USDC. Supported Networks: Solana, Base, Stellar, Celo, BSC."

under a tool description that says *"Queries real-time available and spendable
USDC balances"*. It is not real-time, it is not the caller's balance, and the
fetch sends no credentials so it never could be.

**Why this is the worst of the three:** the README brands this an official WebMCP
Challenge entry. A judge running your tool gets fabricated data presented as live.
That is a disqualifying finding, not a bug report.

### The fix

```js
async execute({ asset = 'usdc' }, { signal }) {
  if (signal?.aborted) throw new Error('WebMCP tool execution was aborted by the user.');

  /**
   * NO FABRICATED FALLBACK.
   *
   * This previously fell back to a hardcoded 79.75 USDC when the call failed,
   * and because the endpoint 404s, that fallback was the ONLY path. An agent
   * was told invented data was a real-time balance.
   *
   * An agent that receives an honest error can retry, ask the user to sign in,
   * or stop. An agent handed a fake balance will reason on top of it and may
   * try to spend money that does not exist.
   */
  const response = await fetch(`${apiBaseUrl}/api/balances/unified?asset=${asset}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',   // balances are per user; send the session
    signal,
  });

  if (!response.ok) {
    return {
      isError: true,
      content: [{
        type: 'text',
        text: response.status === 401 || response.status === 403
          ? 'Sign in to Sivan to read your balance.'
          : `Balance unavailable right now (HTTP ${response.status}). Nothing was assumed.`,
      }],
    };
  }

  const data = await response.json();
  const networks = Array.isArray(data.networks) ? data.networks.join(', ') : 'unknown';
  return {
    content: [{
      type: 'text',
      text: `Available balance: ${data.available} ${String(data.asset ?? asset).toUpperCase()}. Networks: ${networks}.`,
    }],
  };
}
```

Also fix the tool `description`: it should say what the tool does, and the network
list should come from the response, not be hardcoded in the sentence.

### Then either

- **Build `/api/balances/unified`** on the staging API so the tool works, or
- **Point `apiBaseUrl` at the endpoint that already serves balances.**

A tool that returns an honest "sign in first" is fine. A tool that invents numbers
is not.

---

## FIX 2 — `TEST_VERIFICATION_REPORT.md` does not match what runs

**File:** `Sivan-Technologies/Sivan`, `docs/TEST_VERIFICATION_REPORT.md`
(committed 15 Sept)

### What I measured

Cloned `Sivan-Technologies/sivan-payment` branch `multichain`, HEAD `c2b9450`,
ran `npm ci` then the master runner.

**Run 1, exactly as a judge would:**

```
$ npx tsx scripts/run-all-tests.ts
Total Suites: 21
Passed:       2
Failed:       19
```

Nineteen suites died on the same error before executing a single assertion:

```
ZodError: USER_JWT_SECRET  Invalid input: expected string, received undefined
  at src/config/env.ts:547
```

**Run 2, with that one variable set:**

```
$ USER_JWT_SECRET=test-secret npx tsx scripts/run-all-tests.ts
Total Suites: 21
Passed:       19
Failed:       2
```

**So your suites are genuinely healthy.** Stellar, Celo, BSC, MCP, WebAuthn,
Transaction PIN and the ML fraud engine all pass. That is a real result and it is
worth publishing. The report is not far from true, it is just not reproducible by
anyone who clones the repo.

### The two real failures

**a) Build Isolation, 8 of 10.** `tsc -p tsconfig.scripts.json` fails with 4,093
errors, all of the form:

```
frontend/src/appUtils.tsx(1,26): error TS2307: Cannot find module 'react'
```

Cause: `frontend/node_modules` is not installed, and the scripts tsconfig pulls in
frontend sources. Fix by running `npm ci` inside `frontend/` before the typecheck,
or by excluding `frontend/**` from `tsconfig.scripts.json`.

**b) P2P Direct Transfer.** The runner points at a file that does not exist:

```js
command: 'tsx scripts/test-p2p-direct-transfer.ts',   // ERR_MODULE_NOT_FOUND
```

The actual file is `scripts/test-p2p-transfer.ts`. One-word fix.

Once the path is corrected the suite still fails on an assertion:

```
POST /api/admin/balance/adjustments -> 401, expected 200
```

The header (`x-admin-api-key`) and the env (`ADMIN_API_KEY: 'test-admin-key'`) are
both correct, and I confirmed `env.ADMIN_API_KEY` parses to `"test-admin-key"` at
runtime. So this is a genuine auth-path bug worth a proper look, not a config
problem. Do not paper over it.

### Fixes to the report itself

1. **Make it reproducible.** Add the exact command at the top:
   ```
   USER_JWT_SECRET=<any value> npm test
   ```
   Better: give `USER_JWT_SECRET` a dev default in `env.ts` when
   `APP_ENV !== 'production'`, so a fresh clone works. A test suite that needs an
   undocumented secret reads as broken.

2. **Correct the headline.** "100% Passing (77/77)" is not what a judge will see.
   Publish `19 of 21 suites passing` and name the two failures with their causes.
   A report that admits two failures is far more credible than one claiming
   perfection, and it cannot be falsified by a thirty-second clone.

3. **Drop "Mocking is prohibited across all production verification pathways."**
   The repo ships `mock-wallet.provider.ts` and the runner sets
   `BRIDGE_MOCK_MODE: 'true'` and `WALLET_PROVIDER=mock` for several suites. That
   is normal and correct for tests. The sentence is the problem, not the practice.
   Replace with something true:

   > Suites run real protocol logic, real cryptographic operations and real
   > database constraints. External payment rails and custodial wallet providers
   > are stubbed at the boundary so tests are deterministic and cost nothing.

4. **Reconcile the numbers.** The report says "21 of 21" and "77/77" and "307
   assertions" in different places. Pick one counting method and use it
   throughout.

---

## FIX 3 — README chain claims

**File:** `Sivan-Technologies/Sivan`, `README.md`

The badge says `Multi-Chain: Solana | Base | Stellar | Celo | BSC` and the body
says "True Multi-Chain".

**I was wrong to challenge this earlier and I am retracting it.** The Stellar and
Celo adapters are real, on the `multichain` branch:

```
src/wallets/stellar/  StellarAdapter.ts, fee-bump.ts, stellar-keypair.ts,
                      stellar-rpc.ts, trustline.ts
src/wallets/celo/     CeloAdapter.ts, celo-fee-currency.ts, celo-rpc.ts,
                      celo-tx-builder.ts, cip64-serializer.ts,
                      minipay-detector.ts, textile-fx.service.ts
```

with `@stellar/stellar-sdk ^15.1.0` and `@celo/attribution-tags ^0.3.0` as real
dependencies, Horizon calls, trustline handling and CIP-64 serialization. The
dedicated Stellar, Celo and BSC suites all pass. **The claim is accurate.**

### The only thing still worth changing

The chains are in a **submodule on a non-default branch**. A judge who clones
`Sivan-Technologies/Sivan` and greps for "stellar" finds one comment, because
submodules are not fetched by default and `sivan-payment` defaults to a branch
that does not have this work. That is exactly the mistake I made.

Add this near the top of the README:

```md
## Cloning

The chain adapters live in submodules. Clone with them:

    git clone --recurse-submodules https://github.com/Sivan-Technologies/Sivan.git

Multi-chain adapters (Stellar, Celo, Base, Solana, BSC) are in
`sivan-payment/src/wallets/` on the `multichain` branch.
```

Also consider merging `multichain` into `main` on `sivan-payment` before
submitting. Your strongest engineering evidence should not be one branch-checkout
away from invisible.

---

## Order of work

| # | Task | Effort | Why now |
|---|---|---|---|
| 1 | Remove the 79.75 fallback | 20 min | Fabricated data in a public tool |
| 2 | Fix the runner path, `test-p2p-transfer.ts` | 1 min | One word |
| 3 | Add a dev default for `USER_JWT_SECRET` | 10 min | Makes a fresh clone pass |
| 4 | `npm ci` in `frontend/` inside the build-isolation suite | 10 min | Clears 4,093 phantom errors |
| 5 | Rewrite the test report to 19/21 with named failures | 30 min | Credible and unfalsifiable |
| 6 | Add the submodule clone instructions to the README | 5 min | Makes your best work visible |
| 7 | Investigate the P2P admin 401 | unknown | A real auth bug, worth understanding |

Items 1 to 6 are about two hours. Item 7 is the only one that needs thought.
