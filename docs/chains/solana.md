# Solana Integration & Developer Guide

High-Throughput SPL USDC Settlement and Jupiter DEX Routing on Solana

---

## Overview

Solana provides sub-second transaction settlement, extreme throughput, and deep stablecoin liquidity. Sivan AI uses Solana as a high-volume settlement highway for AI agent commerce, cross-border freelance service agreements, and automated treasury balancing.

---

## Network Specifications

- Network: Solana Mainnet-Beta and Devnet
- Native Asset: SOL
- Supported Stablecoins: SPL USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)
- Settlement Finality: ~400ms slot times
- Liquidity Aggregation: Jupiter DEX API
- Priority Fees: Dynamic compute budget instruction injection
- Block Explorers: Solscan (https://solscan.io), SolanaFM (https://solana.fm)

---

## Key Architectural Features on Solana

### 1. SPL Token Vault Accounts
Sivan provisions Associated Token Accounts (ATAs) for Circle USDC across all registered user profiles. Funds transferred into Service Agreement vaults remain programmatically secured until deliverable acceptance criteria are satisfied.

### 2. Dynamic Priority Fees and Compute Budget
To guarantee transaction inclusion during periods of heavy Solana network congestion, Sivan dynamically computes compute unit limits and priority micro-lamport fee instructions before serialization:

```typescript
import { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { ComputeBudgetProgram } from '@solana/web3.js';

// Inject optimal compute unit price and limit
export function createPriorityFeeInstructions(microLamports: number, units: number): TransactionInstruction[] {
  return [
    ComputeBudgetProgram.setComputeUnitLimit({ units }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports }),
  ];
}
```

### 3. Jupiter Routing for Stablecoin Rebalancing
When payouts require non-USDC tokens (e.g., USDT, SOL), Sivan queries Jupiter DEX to find the lowest-slippage routing path, swaps atomically in a single Solana transaction, and delivers settled USDC to the recipient.

---

## Developer API Example: Solana Transfer

```bash
curl -X POST https://api.sivantech.online/api/v1/developer/transfers \
  -H "Content-Type: application/json" \
  -H "X-Sivan-Api-Key: YOUR_API_KEY" \
  -d '{
    "userId": "usr_samson_001",
    "destinationAddress": "Grj8tUheEicPLjBB3XVFFCnwx2iUQCuR9MshiXku92cL",
    "network": "solana",
    "asset": "usdc",
    "amount": 40.0,
    "memo": "Frontend review deliverable release"
  }'
```

---

## Solana to Nigerian Bank Cashout Flow

1. Rate Negotiation: User queries GET /api/v1/quotes/fx?network=solana&asset=usdc.
2. Deposit Verification: User sends SPL USDC to their personal Sivan Solana deposit address.
3. Rapid Confirmation: Solana cluster confirms the transaction within 1 to 2 seconds.
4. Fiat Settlement: Sivan triggers NIP bank rail payout to the user verified Nigerian bank account (under 1 to 2 minutes).
