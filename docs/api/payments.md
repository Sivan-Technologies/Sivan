# Developer API - Multi-Chain Payments & Transfers

Initiating and Tracking Cross-Chain Settlements via Sivan API Gateway

---

## Base URLs

- Production Gateway: https://api.sivantech.online
- Staging Gateway: https://api-staging.sivantech.online

---

## Authentication

All developer API requests require a valid Sivan developer API key supplied in the request header:

```http
X-Sivan-Api-Key: YOUR_SIVAN_API_KEY
```

To prevent double-spend or duplicate transaction dispatch, include an optional idempotency key:

```http
X-Idempotency-Key: unique_idempotent_request_id_123
```

---

## Initiate Multi-Chain Transfer

Initiates an on-chain transfer on Celo, Stellar, Solana, or Base.

- Method: POST
- Path: /api/v1/developer/transfers

### Request Body

```json
{
  "userId": "usr_samson_001",
  "destinationAddress": "0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc",
  "network": "celo",
  "asset": "usdm",
  "amount": 25.0,
  "memo": "Milestone delivery payout"
}
```

### Supported Networks and Assets

- celo: usdm, usdc
- stellar: usdc, xlm
- solana: usdc, sol
- base: usdc, eth

### Response (200 OK)

```json
{
  "success": true,
  "transferId": "txf_84a1e902bca4",
  "status": "confirmed",
  "network": "celo",
  "asset": "usdm",
  "amount": 25.0,
  "feeDeducted": 0.15,
  "netAmount": 24.85,
  "txHash": "0x3f5c9e...47a1b",
  "explorerUrl": "https://celoscan.io/tx/0x3f5c9e...47a1b",
  "timestamp": "2026-09-14T17:45:00.000Z"
}
```

---

## Query Transfer Status

Retrieves the latest on-chain confirmation status and explorer receipt for a transfer.

- Method: GET
- Path: /api/v1/developer/transfers/{transferId}

### Response (200 OK)

```json
{
  "transferId": "txf_84a1e902bca4",
  "status": "confirmed",
  "confirmations": 12,
  "txHash": "0x3f5c9e...47a1b",
  "explorerUrl": "https://celoscan.io/tx/0x3f5c9e...47a1b",
  "settledAt": "2026-09-14T17:45:04.000Z"
}
```
