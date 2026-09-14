# Celo Integration & Developer Guide

Autonomous Multi-Chain Settlement and Instant Off-Ramp on Celo Mainnet

---

## Overview

Sivan AI leverages the Celo network as a core foundation for financial inclusion and mobile-first stablecoin settlement across Africa. With Celo's mobile-first architecture, sub-second block times, and ultra-low fees, Sivan powers near-instant transfers and bank cashouts directly within consumer wallets like Opera MiniPay.

---

## Network Specifications

- Network: Celo Mainnet
- Chain ID: 42220
- Native Token: CELO
- Supported Stablecoins: cUSD (Celo Dollar), USDC (Circle)
- Gas Sponsorship: feeCurrency enabled (pay gas directly in cUSD)
- RPC Endpoints: Chainstack Mainnet RPC, forno.celo.org
- Official Block Explorer: Celoscan (https://celoscan.io)

---

## Registered Celo Mainnet AI Agent (ERC-8004)

Sivan AI is an officially registered on-chain autonomous AI agent on Celo Mainnet conforming to the ERC-8004 agent standard.

- Agent Name: Sivan AI
- Network: Celo Mainnet (Chain ID 42220)
- Agent Token ID: #9827
- Agent ID: 9827
- Registered Agent Wallet: 0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc
- Official Attribution Tag: celo_bafcc2e56bd7
- Registry Verification: https://8004scan.io/agents/celo/9827

Developers and protocols interacting with Sivan on Celo can verify agent authenticity and attribution through the ERC-8004 registry on 8004scan.

---

## Gas Sponsorship via feeCurrency

A unique advantage of building on Celo with Sivan AI is the elimination of the native token gas barrier. Users do not need to hold CELO to pay network transaction fees.

Transactions specify feeCurrency as the cUSD token address. The Celo protocol automatically deducts network gas directly from the cUSD transfer balance:

```typescript
import { createWalletClient, http } from 'viem';
import { celo } from 'viem/chains';

const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a';

const client = createWalletClient({
  chain: celo,
  transport: http('https://forno.celo.org'),
});

// Example transfer using cUSD as the gas fee currency
async function sendCusdPayment(toAddress: string, amountWei: bigint) {
  const hash = await client.sendTransaction({
    to: toAddress,
    value: amountWei,
    feeCurrency: CUSD_ADDRESS,
  });
  return hash;
}
```

---

## Opera MiniPay Integration

Sivan provides a lightweight mobile web dApp (sivan-minipay-app) optimized specifically for Opera MiniPay.

- Injected Provider: Detected via window.ethereum or window.provider
- Automatic Network Switching: Targets Celo Mainnet (Chain ID 42220)
- One-Tap Cashouts: Users select an amount, enter their Nigerian bank account, and confirm
- Payout Rails: Settles via licensed liquidity partners into Nigerian bank accounts in under 1 to 2 minutes

---

## Celo to Nigerian Bank Off-Ramp Flow

1. Rate Quoting: Developer calls GET /api/v1/quotes/fx to get real-time cUSD/NGN and USDC/NGN conversion rates.
2. Account Verification: POST /api/v1/offramp/resolve-bank verifies the 10-digit NUBAN and returns the account name.
3. Transfer Execution: User sends cUSD or USDC to the designated non-custodial deposit facility.
4. Bank Dispersal: Sivan verifies on-chain receipt and triggers near-instant NIP settlement to the Nigerian bank account (typically under 1 to 2 minutes).

---

## Developer API Example: Initiate Celo Transfer

```bash
curl -X POST https://api.sivantech.online/api/v1/developer/transfers \
  -H "Content-Type: application/json" \
  -H "X-Sivan-Api-Key: YOUR_API_KEY" \
  -d '{
    "userId": "usr_samson_001",
    "destinationAddress": "0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc",
    "network": "celo",
    "asset": "cusd",
    "amount": 25.0,
    "memo": "Milestone delivery settlement"
  }'
```

---

## Fee Architecture Separation

- Sivan Transfer Fee: Sivan applies a nominal protocol transfer fee on on-chain Celo wallet movements. Handled on-chain via protocol fee routing.
- Sivan Off-Ramp Fee: Evaluated during FX quoting for fiat bank payouts. Sivan Transfer Fee and Sivan Off-Ramp Fee are two distinct mechanisms and are calculated separately.
