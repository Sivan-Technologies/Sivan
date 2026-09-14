# Developer API - Nigerian Bank Off-Ramp

Non-Custodial Stablecoin Cashout via Nigerian Interbank Settlement Rails

---

## Overview

Sivan AI provides automated off-ramp settlement allowing stablecoins (cUSD, USDC) on Celo, Stellar, Solana, and Base to be converted and disbursed directly into Nigerian commercial and microfinance bank accounts via NIBSS / NIP payment rails.

---

## Realistic Settlement Timing

- Internal Ledger & Verification: Sub-second (0.15s)
- On-Chain Transfer Confirmation: Block-dependent (Celo ~1s, Solana ~0.4s, Stellar ~3-5s, Base ~2s)
- Nigerian Bank Settlement: Near-instant (typically under 1 to 2 minutes via NIP interbank network)

---

## Step 1: Resolve Bank Account (NUBAN Verification)

Verifies that the provided 10-digit account number matches the specified bank institution and returns the registered account holder name.

- Method: POST
- Path: /api/v1/offramp/resolve-bank

### Request Body

```json
{
  "accountNumber": "0123456789",
  "bankCode": "058"
}
```

### Response (200 OK)

```json
{
  "valid": true,
  "accountNumber": "0123456789",
  "accountName": "SAMSON MICHEAL",
  "bankCode": "058",
  "bankName": "Guaranty Trust Bank"
}
```

---

## Step 2: Initiate Off-Ramp Order

Creates an off-ramp order with a non-custodial deposit facility.

- Method: POST
- Path: /api/v1/offramp/initiate

### Request Body

```json
{
  "quoteId": "qte_982f1bc09a",
  "accountNumber": "0123456789",
  "bankCode": "058",
  "accountName": "SAMSON MICHEAL",
  "beneficiaryPhone": "+2348012345678"
}
```

### Response (201 Created)

```json
{
  "orderId": "orp_c0812df93a",
  "status": "pending_deposit",
  "network": "celo",
  "asset": "cusd",
  "depositAddress": "0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc",
  "expectedAmount": 25.0,
  "netFiatPayable": 38127.38,
  "currency": "NGN",
  "recipientBank": "Guaranty Trust Bank",
  "recipientAccountNumber": "0123456789",
  "expiresAt": "2026-09-14T17:50:00.000Z"
}
```

---

## Step 3: Track Payout Lifecycle

- Method: GET
- Path: /api/v1/offramp/{orderId}

### Response (200 OK)

```json
{
  "orderId": "orp_c0812df93a",
  "status": "completed",
  "onChainTxHash": "0x3f5c9e...47a1b",
  "nipSessionId": "999058260914174601000123456789",
  "fiatAmount": 38127.38,
  "settledAt": "2026-09-14T17:47:12.000Z"
}
```
