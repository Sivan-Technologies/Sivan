# Developer API - FX Rates & Quoting

Real-Time Multi-Chain Stablecoin to Fiat Rate Discovery

---

## Overview

Sivan AI aggregates institutional liquidity sources (including licensed Nigerian liquidity providers like Textile Credit and Busha) to provide real-time, firm FX quotes for conversions between stablecoins (USDC, USDm) and fiat currencies (NGN).

---

## Fetch Real-Time FX Quote

- Method: GET
- Path: /api/v1/quotes/fx
- Query Parameters:
  - network: celo | stellar | solana | base
  - asset: cusd | usdc
  - fiat: NGN
  - amount: stablecoin amount to convert (e.g., 25.0)

### Request Example

```bash
curl "https://api.sivantech.online/api/v1/quotes/fx?network=celo&asset=cusd&fiat=NGN&amount=25.0" \
  -H "X-Sivan-Api-Key: YOUR_SIVAN_API_KEY"
```

### Response (200 OK)

```json
{
  "quoteId": "qte_982f1bc09a",
  "network": "celo",
  "asset": "cusd",
  "fiat": "NGN",
  "assetAmount": 25.0,
  "exchangeRate": 1540.50,
  "grossFiatAmount": 38512.50,
  "sivanOffRampFeeFiat": 385.12,
  "netFiatPayable": 38127.38,
  "expiresAt": "2026-09-14T17:46:00.000Z",
  "validitySeconds": 60
}
```

---

## Quote Terms & Expiration

- Quote Guarantee: Quotes are locked for 60 seconds from generation.
- Fee Transparency: The Sivan Off-Ramp Fee is explicitly presented before execution with zero hidden spreads.
