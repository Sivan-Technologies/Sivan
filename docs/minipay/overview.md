# Opera MiniPay Integration Guide

Mobile-First Web3 Payments and Instant Nigerian Bank Cashouts on Celo

---

## Overview

Opera MiniPay is a lightweight, non-custodial stablecoin wallet embedded inside Opera Mini browser, serving millions of users across Nigeria, Ghana, and Kenya. Sivan MiniPay App (sivan-minipay-app) is specifically optimized to provide MiniPay users with instant stablecoin transfers and direct cashouts to Nigerian bank accounts.

---

## Live Deployment & Access

- Production App: https://app.sivantech.online
- Network: Celo Mainnet (Chain ID 42220)
- Core Asset: cUSD (Celo Dollar) and USDC

---

## Technical Integration Details

### 1. Injected Provider Detection
MiniPay injects an Ethereum-compatible provider into the browser context. Sivan detects MiniPay via:

```typescript
export function isMiniPay(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).ethereum?.isMiniPay ||
    (window as any).provider?.isMiniPay ||
    navigator.userAgent.includes('MiniPay')
  );
}
```

### 2. Zero-Gas Experience with feeCurrency
MiniPay users do not hold native CELO. All gas fees are paid in cUSD directly via Celo feeCurrency protocol parameter.

### 3. Instant Bank Off-Ramp Flow
- Step 1: User enters cashout amount in cUSD.
- Step 2: Sivan fetches the live NGN exchange rate and calculates the exact payout amount.
- Step 3: User enters their 10-digit Nigerian NUBAN account number and selects their bank. Sivan verifies the account name in real time.
- Step 4: User signs the cUSD payment inside MiniPay.
- Step 5: Sivan verifies the on-chain transfer and dispatches fiat through Nigerian Interbank Settlement System (NIP) rails. Funds land in the recipient account in under 1 to 2 minutes.

---

## Submodule Reference

The full source code for the consumer MiniPay application is maintained in the submodule:
sivan-minipay-app @ main
