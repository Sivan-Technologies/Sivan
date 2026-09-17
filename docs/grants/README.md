# Grant and hackathon materials

Decks, the canonical story, and the deck source. Committed here rather than
living on someone's laptop, because these were rebuilt several times and the
verification behind each claim is worth keeping.

## Read this first

**`STORY.md` is the single source of truth.** Every other document derives from
it. If a deck disagrees with it, the deck is wrong. If it is wrong, fix it there
first and propagate.

It exists because four applications drifted apart when each was written from
scratch: two claimed different fee structures, three claimed different chain
support, one claimed an audit that does not exist, and one carried a token
address that resolves to nothing on chain.

It carries an **approved numbers** table with how each figure was verified, and
a **banned numbers** table listing the claims that caused those contradictions.

## Files

| File | What it is |
|---|---|
| `STORY.md` | Canonical story, verified numbers, known weaknesses, banned claims |
| `COLOSSEUM_PLAYBOOK.md` | Crypto World's Fair strategy, red-flag audit, 8 slide structure |
| `FIX_THESE_NOW.md` | Public-repo issues found while preparing submissions |
| `Sivan_Colosseum_Deck.pdf` | Colosseum, 10 slides |
| `Sivan_Pitch_Deck.pdf` | Circle Developer Grant, 14 slides |
| `Sivan_Starknet_Deck.pdf` | Starknet Foundation Seed Grant, 11 slides |
| `src/*.py` | python-pptx sources. Edit these, not the PDFs |

## Rebuilding a deck

```bash
pip install python-pptx
python docs/grants/src/build_colosseum_deck.py
```

Each builder **fails the build** rather than producing a deck when a guard
trips:

- any em dash or en dash
- buzzwords: universal, revolutionary, democratizing, seamless, disruptive
- vanity metrics: "174 test scripts", "21 of 21", "100% passing"
- unverifiable claims: "0.15s settlement", "3-second bank payout"
- the invalid Starknet USDC address that appeared in an early draft
- more than the slide cap

The guards exist because several of these shipped in a draft before anyone
checked them.

## Claims that were checked and corrected

Recorded so nobody relitigates them:

| Claim | Finding |
|---|---|
| Celo and Stellar adapters | **Real.** `sivan-payment@multichain`, `src/wallets/{celo,stellar}/`. CIP-64 fee abstraction, Horizon fee-bump, MiniPay detection |
| x402 | **Real, in `sivan-escrow-agent` only.** `x402Client.ts` against PayAI's facilitator, wired into the live escrow route |
| "Sivan implements x402" | **False.** Sivan is a client of a facilitator, not a facilitator. Say "settles through x402" |
| "the vault implements x402" | **False.** `sivan-contracts` has no 402 handling. It is the settlement layer x402 settles into |
| Celo x402 support | **Real.** `api.x402.celo.org` answers `eip155:42220`, v1 and v2. The Coinbase FAQ network table lists only its own facilitator's chains |
| x402 escrow | The `exact` scheme is push-payment; the spec calls escrow future work. Escrow over x402 still needs a contract, which is why the vault exists |
| Celo core Escrow contract | Real and audited at `0xf4fa51472ca8d72af678975d9f8795a504e7ada5`, but it is a phone-number claim vault. No milestones, fees, disputes or attestation |
| Starknet USDC address | The address in an early draft resolves to nothing. Native is `0x033068F6539f8e6e6b131e6B2B814e6c34A5224bC66947c47DaB9dFeE93b35fb` |

## Still open

- **Traction.** Two settlements, $18 and 24 USDC. The weakest slide in every deck
- **No Solscan signature recorded.** `scripts/test-real-5usdc-onchain.ts` exists in `sivan-payment` but no signature is saved anywhere
- **The vault is not deployed.** Alfajores needs a funded key
