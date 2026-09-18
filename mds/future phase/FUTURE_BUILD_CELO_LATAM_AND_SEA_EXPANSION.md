# Sivan AI - Future Build Plan: Latin America & Southeast Asia Expansion via Celo & Textile FX

Document Reference: FUTURE_BUILD_CELO_LATAM_AND_SEA_EXPANSION.md
Category: Phase 2 / Phase 3 Multi-Corridor Roadmap
Author: Samson Micheal, Founder & Technical Lead
Organization: Sivan Technologies
Status: Architecture Ready (Planned for Post-Phase 1 Soft Launch)

---

## 1. Executive Summary

Sivan AI currently focuses on Africa's largest economy (Nigeria) via the Celo cNGN corridor, providing atomic USDT/USDC to cNGN swaps and instant NIBSS bank account disbursements.

Because Textile Credit FX has already deployed live market maker liquidity and settlement contracts on Celo Mainnet for Latin America (Brazil and Argentina) and Southeast Asia (Indonesia), Sivan AI can expand internationally with zero changes to its underlying smart contract settlement engine.

This specification details the architecture, token contracts, fiat rails, and rollout strategy for:
1. Brazil: wBRL (Wrapped Brazilian Real) via PIX instant payment rails.
2. Indonesia: IDRX (Indonesian Rupiah Token) via BI-FAST and local e-wallets.
3. Argentina: wARS (Wrapped Argentine Peso) via CBU / CVU and Mercado Pago.

---

## 2. On-Chain Token & Contract Infrastructure on Celo Mainnet

All Latin American and Southeast Asian corridors settle atomically through the canonical Textile LimitOrderReactor contract on Celo Mainnet:
- Settlement Reactor: 0xa9AA0a64769cBed4d3B1Ceb4Df01CdE915C235b3
- Permit2 Canonical Contract: 0x000000000022D473030F116dDEE9F6B43aC78BA3
- Fee Controller: 0xBDA5e4d85674Fc3A4566B1080A3c59Dc2526c057

### Supported Corridors and Deployed Tokens on Celo

| Corridor | Token Symbol | Token Contract Address on Celo | Decimals | Live Liquidity Pair |
|---|---|---|---|---|
| Nigeria | cNGN | 0xF6829D7393dAe24509eb1E52eE8e572e2E271a4f | 6 | cNGN <-> USDT / USDC |
| Brazil | wBRL | 0xa621746B31688B77c59B5dC5186b19aB9E3A52A4 | 6 | wBRL <-> USDT |
| Indonesia | IDRX | 0x153177A14c1D7172A2a7bF14e5D09923831A63d8 | 6 | IDRX <-> USDT |
| Argentina | wARS | 0x0DC4F92879B7670e5f4e4e6e3c801D229129D90D | 6 | wARS <-> USDT |

---

## 3. Fiat Dispersal Rails & National Banking Systems

### 3.1. Brazil (wBRL -> Brazilian Real / BRL)
- National Payment Rail: PIX (Central Bank of Brazil instant settlement rail).
- Settlement Time: Sub-10 seconds 24/7.
- Key Financial Institutions: Nubank, Itau Unibanco, Banco Bradesco, Banco do Brasil, Banco Inter.
- User Identifier: PIX Key (CPF/CNPJ, Email, Phone Number, or Random Key).
- Use Cases: Cross-border service agreement settlements, freelance milestone payments, e-commerce imports.

### 3.2. Indonesia (IDRX -> Indonesian Rupiah / IDR)
- National Payment Rail: BI-FAST (Bank Indonesia Fast Payment) & Real-Time Gross Settlement.
- E-Wallet Rails: GoPay, OVO, DANA, ShopeePay, LinkAja.
- Key Financial Institutions: Bank Central Asia (BCA), Bank Mandiri, Bank Rakyat Indonesia (BRI), Bank Negara Indonesia (BNI).
- User Identifier: Indonesian NIK / Bank Account Number or Registered E-Wallet Phone.
- Use Cases: Remittances for overseas workers, remote developer payouts, decentralized trade financing.

### 3.3. Argentina (wARS -> Argentine Peso / ARS)
- National Payment Rail: Sistema Nacional de Pagos (SNP) via CBU (Clave Bancaria Uniforme) and CVU (Clave Virtual Uniforme).
- Key Fintechs & Banks: Mercado Pago, Lemon Cash, Belo, Santander Rio, BBVA Argentina.
- User Identifier: 22-digit CBU/CVU or Alias CBU.
- Use Cases: Inflation hedge off-ramping, milestone-based service agreements, peer-to-peer freelancer contracts.

---

## 4. Architectural Integration Plan for Sivan AI

### 4.1. Sivan Payment Backend Integration
1. Extend Textile FX Adapter (textile-fx.service.ts):
   - Add corridor resolvers for wBRL, IDRX, and wARS against Textile tickers endpoint (https://api.textilecredit.com/tickers).
   - Add bank directory endpoints for Brazilian PIX keys and Indonesian BI-FAST bank codes.
2. Unified Fee Policy:
   - Sivan On-Chain DEX Swaps: 0.00% protocol fee across all emerging market currencies to maximize trading volume.
   - Fiat Off-Ramp Dispersal: Transparent percentage fee with local fiat currency floor and ceiling caps.

### 4.2. Sivan MiniPay App Integration
1. Multi-Country Corridor Selector:
   - Extend countries.config.ts to support Brazil (BR / BRL), Indonesia (ID / IDR), and Argentina (AR / ARS).
2. Dynamic Bank / PIX Form Fields:
   - Brazil: Single input for PIX Key with instant format validation.
   - Indonesia: Dropdown of 120+ Indonesian banks + 5 major e-wallets.
   - Argentina: 22-digit CVU/CBU or Alias input.

### 4.3. Service Agreements & WebMCP Tooling
- Global Milestone Settlements: A remote developer can complete a milestone for an international client, with funds locking in USDC and settling into wBRL via PIX or local currency via bank rails upon buyer verification.
- Cross-Border AI Agent Commerce: Autonomous AI agents operating under ERC-8004 identity (Agent #9827) can execute cross-corridor RFQ swaps without requiring foreign exchange bank accounts.

---

## 5. Security and Non-Custodial Guarantee

1. No Middleman Wallets: Funds are never routed through personal or platform custodial wallets.
2. Smart Contract Settlement: Swaps execute strictly through Textile LimitOrderReactor (0xa9AA0a64769cBed4d3B1Ceb4Df01CdE915C235b3) via EIP-712 Permit2 authorization.
3. Slippage & Revert Protection: If liquidity conditions or exchange rates move beyond the 0.5% tolerance threshold, the smart contract atomically reverts the transaction without debiting user balances.

---

## 6. Phased Rollout Schedule

- Phase 1 (Active Production): Nigeria soft launch with cNGN and NIBSS bank account rails.
- Phase 2A (Latin America Pilot): Brazil wBRL PIX integration and Brazilian fintech testing.
- Phase 2B (Southeast Asia Pilot): Indonesia IDRX BI-FAST integration and e-wallet support.
- Phase 3 (Global Mesh): Argentina wARS and multi-currency AI Agent-to-Agent autonomous cross-settlement.
