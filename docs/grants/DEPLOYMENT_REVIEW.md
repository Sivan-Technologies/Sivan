# Review: Celo Sepolia deployment and repository docs

Reviewed at `465e819` (main and staging are identical). Everything below was
checked against the chain or a file path, not against the documentation.

---

## Verdict

**The deployment is sound.** The vault is live, correctly configured, and the
deployed bytecode is byte-identical to `staging` HEAD. The error you saw at the
end of the deploy was a false alarm and I can now prove it. Your deployment
record is unusually honest and its caveats are, on checking, all correct.

Three things need fixing. One is a regression introduced in `90f1f07` that will
bite the next person who clones. One is source verification, still outstanding.
The rest is the README, which is the weakest artifact in the repo and currently
contradicts the contract in four places.

---

## 1. The deployment, verified independently

Read from `https://forno.celo-sepolia.celo-testnet.org` at block 36,352,885.

| Property | On-chain value | Matches record |
|---|---|---|
| Vault | `0x0592edf36Ec65A809f5230cEd5BadBe472787CAf` | yes |
| Chain ID | 11142220 | yes |
| Bytecode size | 12,169 bytes | live |
| `owner()` | `0xA457959759d5667359d1C333DBdcBEA4285a51Cc` | yes |
| `feeCollector()` | `0x46eFfe0409BFE99b0435e7bb7219DC6586612345` | yes |
| `agentAttester()` | `0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc` | yes |
| `registeredAgentId()` | 9827 | yes |
| `tokenAllowlistEnforced()` | **true** | yes |
| `supportedTokens(USDC)` | **true** | yes |
| `supportedTokens(USDm)` | false | expected, USDC-only seed |
| `supportedTokens(USDT)` | false | expected, USDC-only seed |
| Fee tiers | 100 / 75 / 50 bps at 50 / 500 units | correct |
| `paused()` | false | correct |
| `MAX_FEE_BPS` | 300 | correct |
| `MAX_PARTNER_SHARE_BPS` | 5000 | correct |
| `MAX_AUTHORIZATION_WINDOW` | 86400 (1 day) | correct |

**Item 3 of your "remaining work" is now done.** Fee collector, attester, agent
ID and fee tiers all read back as intended, not just owner and USDC.

All three role addresses are EOAs (`code=0`), all funded, all distinct. That
last part matters: on a hot deploy key you would have had protocol revenue and
attestation authority in the same place.

### Transaction hashes, recovered

Your record says these "were not captured and remain to be recorded." They are
retrievable from Blockscout. **Item 1 is now done:**

| What | Hash | Block | Status | Gas |
|---|---|---|---|---|
| Vault creation | `0x2f29b61cc36810d7d453cc7032f231afe57ebeccfffb1391c9728b0233259240` | 36351050 | ok | 3,000,367 |
| `setSupportedTokens` | `0xa952aebd6c006dc397a5c12f740c2367a60a4da0d10e881e296dca838b5a5b79` | 36351054 | ok | 71,331 |

Both succeeded. Creator matches the recorded deployer. Deploy gas is exactly
the 3,000,367 measured on the fork beforehand, which is a good sign the fork
rehearsal was faithful.

The seed cost 71,331 gas rather than the 120,393 I measured, because you listed
one token instead of three. That is the expected difference.

---

## 2. The "Allowlist did not engage" error: solved

Your record says the stale-read theory "has not been conclusively proven." It
can be. I queried `tokenAllowlistEnforced()` pinned to specific block heights:

```
block 36351053 -> 0x...00   false   (one block BEFORE the seed)
block 36351054 -> 0x...01   true    (the seed tx's OWN block)
block 36351055 -> 0x...01   true
block latest   -> 0x...01   true
```

The flag flipped in the same block the seeding transaction mined. There was
never a moment after that transaction where the correct answer was `false`.

So the contract behaved perfectly and the script's assertion was reading from a
load-balanced RPC node that had not yet caught up. `forno.celo-sepolia` sits
behind multiple backends; your `tx.wait()` returned from one and the follow-up
`eth_call` hit another that was a block behind.

**This is a script bug, not a contract bug, and your instinct not to redeploy
was exactly right.** The guard is still valuable, it just needs to tolerate
propagation lag. Fix, which is item 2 on your list and still unimplemented:

```js
const receipt = await tx.wait();
// Pin the read to the block the seed actually mined in, so a lagging
// RPC backend cannot answer from before the state change. Retry only
// for propagation, never by re-sending a transaction.
for (let i = 0; i < 8; i++) {
  try {
    const ok = await vault.tokenAllowlistEnforced({ blockTag: receipt.blockNumber });
    if (ok) break;
  } catch (_) { /* backend has not indexed this block yet */ }
  if (i === 7) throw new Error(
    `Allowlist not enforced at block ${receipt.blockNumber}. ` +
    `Vault ${vaultAddress}, seed tx ${receipt.hash}. ` +
    `Do NOT redeploy: inspect the existing vault first.`
  );
  await new Promise(r => setTimeout(r, 2000));
}
```

The important part is printing the vault address and tx hash in the failure
message. Had that been there, you would not have had to go looking for them.

---

## 3. Deployed bytecode is byte-identical to staging HEAD

Rather than trusting the compile, I pulled `eth_getCode` and diffed it against
the local artifact. Same length, 12,169 bytes, same trailing IPFS metadata hash.

27 byte-ranges differ. Every single one decodes to an OpenZeppelin EIP-712
immutable:

| Offset | Decoded |
|---|---|
| 7138 | `Sivan Celo Settlement Facility` |
| 7169 | `0x1e` = 30 = that string's length |
| 7179 | `"1"` (version) |
| 11517 | `0x0592edf3...787caf`, the vault's own address |
| 11559+ | cached domain separator and name/version hashes |
| 11775 | `0xaa044c` = **11142220**, the live chain ID |

Zero logic differences. The contract on Sepolia is the code in this repo.

This also settles a README error: it claims the EIP-712 domain hardcodes
`chainId (42220)`. It does not. OpenZeppelin binds `block.chainid` at
construction, which is why the immutable reads 11142220 here. The contract is
right and the README is wrong. Hardcoding 42220 would have been a genuine bug,
making every testnet signature invalid.

---

## 4. Regression in `90f1f07`: the network now vanishes without `.env`

This is the one thing I would fix before anyone else clones the repo.

`hardhat.config.cjs` was changed so `celoSepolia` is defined only when
`CELO_SEPOLIA_RPC_URL` is set:

```js
...(process.env.CELO_SEPOLIA_RPC_URL ? { celoSepolia: {...} } : {}),
```

Tested with the env var absent:

```
$ npm run deploy:sepolia
Error HH100: Network celoSepolia doesn't exist
```

Three problems:

**a. It contradicts the README.** The README documents `npm run deploy:sepolia`
as the deployment command. On a fresh clone that command cannot work, and
`HH100: Network doesn't exist` gives no hint that a missing env var is the
cause. The previous version defaulted the URL to the public endpoint, so the
command worked out of the box and `.env` was an override rather than a
prerequisite.

**b. `Number(undefined)` is `NaN`.** If `CELO_SEPOLIA_RPC_URL` is set but
`CELO_SEPOLIA_CHAIN_ID` is not, `chainId` becomes `NaN` rather than failing
cleanly. The preflight does catch this, but only after Hardhat has already
constructed a nonsense network.

**c. It removed a verified constant in favour of a variable.** The chain ID
11142220 is not configuration; it is a fact about Celo Sepolia. Reading it from
`.env` means a typo there is indistinguishable from a real network change.

Suggested fix, keeping your preflight but restoring the defaults:

```js
celoSepolia: {
  url: process.env.CELO_SEPOLIA_RPC_URL || "https://forno.celo-sepolia.celo-testnet.org",
  chainId: 11142220,   // a fact about the network, not a setting
  accounts,
},
```

Your runtime assertion that `network.chainId === 11142220n` then still catches
an RPC pointed at the wrong chain, which is the case actually worth defending
against.

### What `90f1f07` got right

Genuinely good additions, worth keeping:

- **Preflight before any transaction.** Checking roles, token metadata and gas
  balance before spending is the correct ordering. Failing after the vault
  deploys but before seeding is the expensive failure mode.
- **Rejecting zero addresses explicitly** rather than letting them default.
- **Asserting the token reports `USDC` with 6 decimals.** And the comment
  noting metadata is not proof of authenticity is exactly the right caveat.
- **Key normalisation** for the `0x` prefix.
- **Unsupported-network guard**, which catches typos in `--network`.

---

## 5. Source verification: still not done

```
$ curl .../api/v2/smart-contracts/0x0592edf3...
verified: None
```

The contract is unverified on Blockscout. This is the single highest-value
remaining item, and for grant submissions it matters more than the deployment
itself. An unverified contract is a black box to a judge; a verified one lets
them read the code next to the live state.

The config is already in place from `d3bb666` and needs no API key:

```bash
npx hardhat verify --network celoSepolia \
  0x0592edf36Ec65A809f5230cEd5BadBe472787CAf \
  0x46eFfe0409BFE99b0435e7bb7219DC6586612345 \
  0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc \
  9827 \
  0xA457959759d5667359d1C333DBdcBEA4285a51Cc
```

Constructor order is `(feeCollector, agentAttester, registeredAgentId, initialOwner)`.
Note the owner is the deployer, which is the fourth argument, and the fee
collector is first. Getting these transposed is the usual reason verification
fails on an otherwise correct contract.

Since the bytecode is confirmed identical to `staging` HEAD, this should verify
on the first attempt.

---

## 6. README review

`README.md` is the weakest file in the repo. The docs in `docs/` are careful and
well-caveated; the README predates them and was not updated.

### Factual errors

**a. EIP-712 chainId.** Claims the domain includes `chainId (42220)`. It binds
`block.chainid` at construction, reading 11142220 on the live deployment.
Section 5.

**b. Deployment section points at a dead network.** Still documents
`npx hardhat run scripts/deploy.js --network alfajores` as the testnet command.
Alfajores was sunset 30 Sep 2025 and the deploy script now refuses it outright.
`package.json` also still carries `deploy:alfajores`. Section 4.

**c. cNGN is not supported.** Section 1 says agreements settle in "Celo native
USDC, USDm, and cNGN." cNGN appears nowhere in `contracts/` or `scripts/` except
two code comments. Mainnet seeds USDC/USDm/USDT; Sepolia seeds USDC only. cNGN
has no address in any token table.

**d. Repository structure is stale.** Section 2 lists one test file; there are
five, plus `forge-test/VaultInvariant.t.sol`. It omits
`MockFeeOnTransferERC20.sol`. It describes `deploy.js` as targeting "Celo
Alfajores and Mainnet."

This one is worth fixing for the opposite of the usual reason. The README
*undersells* the work: 34 Hardhat tests, 4 fuzz tests and 6 invariants across
12,800 calls, and it advertises a single unit test file.

### Claims that check out

- Fee tiers "1.0% down to 0.50%" matches 100/75/50 bps exactly.
- `MAX_FEE_BPS = 300` cap is real and enforced.
- Partner share "up to 30% to 50%": default 3000 bps, cap 5000. Accurate.
- ReentrancyGuard, SafeERC20, Pausable, Ownable all present.
- All four external links return 200, including the ERC-8004 agent page.

### Unverified claim

"Sub-cent settlement costs (< $0.0003 USD per deal)". At Sepolia's observed
52.5 gwei a 65,000-gas release is 0.0034 CELO. Whether that is under $0.0003
depends on the CELO price, and at the roughly $0.08 used earlier it is about
$0.00027, so the claim is plausible but sits right on the boundary and moves
with both gas price and CELO price. I would state the gas number, which is
stable, rather than a dollar figure that can quietly go stale.

### Structural note

The two-layer x402 framing at the top is the strongest paragraph in the file.
It states plainly that this repo contains no HTTP 402 handling because Solidity
cannot do that. Keep it exactly as is. That is the kind of precision that earns
trust from a technical reviewer, and it is the framing I got wrong twice before
your spec corrected me.

What the README lacks is the deployment itself. A reader arriving now cannot
see, in the first screen, that there is a live vault they can go and inspect.
Once verification lands, the address and Blockscout link belong near the top.

---

## 7. Your deployment record

`docs/CELO_SEPOLIA_DEPLOYMENT.md` is good work. The caveats are precise and
every one I tested held up:

- "Metadata validation alone is not proof of token authenticity" - correct.
- "Address validity does not prove the backend controls the attester's signing
  key" - correct, and still the most important open question here.
- "The calls used `latest`; they were not all pinned to the reported head
  block" - correct, and that is exactly the bug. Pinning resolved it.
- "This is not an independent security audit" - correct.

Three updates now warranted: the transaction hashes in section 1, the stale-read
cause moving from "not conclusively proven" to proven with the block-pinned
evidence, and item 3 marked done.

The appended sync section at the bottom reads awkwardly because it is a second
`#`-level heading inside the same file, so the document has two titles. Worth
folding into a dated changelog section.

---

## Priorities

1. **Verify the source on Blockscout.** Command in section 5. Highest value per
   minute of effort, and the grant submissions need it.
2. **Fix the `celoSepolia` network regression** so a fresh clone works without
   `.env`. Section 4.
3. **Implement the block-pinned retry** in the deploy script, with the vault
   address and tx hash in the failure message. Section 2.
4. **Correct the four README errors.** Section 6.
5. **Confirm the backend actually holds the attester key** for
   `0x4a1A9cf3...BAFBc`. Until a signature from that key verifies against the
   deployed vault, the delegated release path is unproven on this deployment.
   Your record flags this; it remains the largest open risk.
6. **Run one full lifecycle with test USDC**: deposit, deliver, release, and a
   separate timeout refund. Check receipts and balances, not UI messages. This
   is the thing that turns "deployed" into "working," and it gives you real
   transaction hashes to show.

Item 6 is also the answer to the traction problem. A verified contract plus four
real lifecycle transactions on a public explorer is a concrete, checkable
artifact, and it costs only testnet gas.
