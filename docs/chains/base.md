# Base Integration & Developer Guide

Layer 2 Settlement and Coinbase Smart Wallet Compatibility on Base

---

## Overview

Base is an Ethereum Layer 2 developed by Coinbase that offers low transaction fees, EVM equivalence, and seamless interoperability with the broader Ethereum ecosystem. Sivan AI leverages Base to give global developers, enterprises, and Web3 applications a low-gas Ethereum corridor into African consumer markets.

---

## Network Specifications

- Network: Base Mainnet and Base Sepolia (Testnet)
- Chain ID: 8453 (Mainnet), 84532 (Sepolia)
- Native Asset: ETH (Layer 2 gas)
- Supported Stablecoins: Native Circle USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- Gas Target: Under $0.01 per transaction
- Official Block Explorer: Basescan (https://basescan.org)

---

## Key Features on Base

### 1. Coinbase Smart Wallet and Passkey Integration
Base natively supports ERC-4337 account abstraction and passkey-based onboarding through Coinbase Smart Wallet. Sivan AI supports signing and transaction dispatch directly from passkey-authenticated smart accounts, removing seed phrase friction for end users.

### 2. Native Circle USDC
Base uses native Circle-minted USDC rather than bridged assets. Sivan AI interacts directly with the official Circle contract on Base, eliminating cross-chain bridging security risks for secured agreement funds.

### 3. Sivan Service Agreement Contracts
Service Agreements on Base utilize standard EVM smart contracts where funds remain cryptographically locked until milestones are approved by the buyer or released automatically upon delivery timeout expiration.

---

## Developer API Example: Base Transfer

```bash
curl -X POST https://api.sivantech.online/api/v1/developer/transfers \
  -H "Content-Type: application/json" \
  -H "X-Sivan-Api-Key: YOUR_API_KEY" \
  -d '{
    "userId": "usr_samson_001",
    "destinationAddress": "0x901255F561BCf73688fa1b1c18a9cA836132d132",
    "network": "base",
    "asset": "usdc",
    "amount": 50.0,
    "memo": "Phase 1 contract settlement"
  }'
```

---

## Base to Nigerian Bank Cashout Flow

1. Real-Time RFQ: Query GET /api/v1/quotes/fx?network=base&asset=usdc for current NGN rates.
2. Direct Transfer: Send Base USDC to the Sivan non-custodial gateway address.
3. Rapid EVM Finality: Transaction confirms on Base L2 in ~2 seconds.
4. Bank Dispersal: Fiat lands in the Nigerian bank account via NIP rails in under 1 to 2 minutes.
