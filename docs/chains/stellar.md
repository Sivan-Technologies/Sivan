# Stellar Integration & Developer Guide

Autonomous Multi-Chain Settlement and Soroban Architecture on Stellar

---

## Overview

Stellar is built from the ground up for high-speed cross-border payments, pathfinding, and asset issuance. Sivan AI integrates Stellar to provide ultra-low-cost USDC settlement and non-custodial wallet management for African freelancers, traders, and AI agents.

---

## Network Specifications

- Network: Stellar Public Network (Mainnet) and Testnet
- Native Asset: XLM (Lumens)
- Supported Stablecoins: USDC (issued by Circle on Stellar)
- Settlement Finality: 3 to 5 seconds
- Smart Contracts: Soroban
- Horizon API: https://horizon.stellar.org
- Official Block Explorer: StellarExpert (https://stellar.expert)

---

## Key Features on Stellar

### 1. Sponsored Accounts
To eliminate friction for non-crypto natives, Sivan AI utilizes Stellar account sponsorship. The protocol sponsors:
- Base reserve minimums (XLM requirement) for new user accounts
- Trustline establishment for Circle USDC
- Transaction fees for approved agent operations

### 2. Path Payment Routing
Stellar has a native decentralized order book. When payments arrive in alternative assets, Sivan uses path payment strict receive and strict send operations to swap assets automatically into USDC with zero slippage before settlement.

### 3. Non-Custodial Deterministic Keys
User Stellar keypairs are deterministically derived via secure user seeds or provisioned through non-custodial server wallets. The user retains complete authority over account assets.

---

## Stellar USDC Integration Flow

```typescript
import { Keypair, Server, Asset, Operation, TransactionBuilder, Networks } from '@stellar/stellar-sdk';

const server = new Server('https://horizon.stellar.org');
const USDC_ISSUER = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN';
const USDC_ASSET = new Asset('USDC', USDC_ISSUER);

// Establishing USDC trustline with fee sponsorship
async function setupSponsoredUsdcTrustline(userSecretKey: string, sponsorSecretKey: string) {
  const userKeypair = Keypair.fromSecret(userSecretKey);
  const sponsorKeypair = Keypair.fromSecret(sponsorSecretKey);

  const sponsorAccount = await server.loadAccount(sponsorKeypair.publicKey());

  const transaction = new TransactionBuilder(sponsorAccount, {
    fee: '100',
    networkPassphrase: Networks.PUBLIC,
  })
    .addOperation(Operation.beginSponsoringFutureReserves({
      sponsoredId: userKeypair.publicKey(),
    }))
    .addOperation(Operation.changeTrust({
      asset: USDC_ASSET,
      source: userKeypair.publicKey(),
    }))
    .addOperation(Operation.endSponsoringFutureReserves({
      source: userKeypair.publicKey(),
    }))
    .setTimeout(30)
    .build();

  transaction.sign(sponsorKeypair, userKeypair);
  return await server.submitTransaction(transaction);
}
```

---

## Developer API Example: Initiate Stellar Settlement

```bash
curl -X POST https://api.sivantech.online/api/v1/developer/transfers \
  -H "Content-Type: application/json" \
  -H "X-Sivan-Api-Key: YOUR_API_KEY" \
  -d '{
    "userId": "usr_samson_001",
    "destinationAddress": "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
    "network": "stellar",
    "asset": "usdc",
    "amount": 35.0,
    "memo": "Design sprint payout"
  }'
```

---

## Stellar to Nigerian Bank Off-Ramp Flow

1. User or AI agent initiates an off-ramp quote via GET /api/v1/quotes/fx?network=stellar&asset=usdc&fiat=NGN.
2. The user sends Stellar USDC to the designated non-custodial address.
3. Upon on-chain transaction confirmation (typically 3 to 5 seconds on Stellar), Sivan dispatches the NGN payout through Nigerian NIP banking rails.
4. Fiat lands in the recipient bank account in under 1 to 2 minutes.
