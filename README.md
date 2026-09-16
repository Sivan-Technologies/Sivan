<div align="center">

<img src="assets/sivan_logo_transparent.png" alt="Sivan Logo" width="320"/>

# Sivan AI

Autonomous Multi-Chain Settlement Layer, Service Agreement Coordination & Fiat Off-Ramp for Humans and AI Agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tests: 77/77 Passing](https://img.shields.io/badge/Tests-77%2F77%20Passing%20(100%25)-success)](docs/TEST_VERIFICATION_REPORT.md)
[![Celo Agent: #9827](https://img.shields.io/badge/Celo%20ERC--8004-Agent%20%239827-35D07F.svg)](https://8004scan.io/agents/celo/9827)
[![Multi-Chain](https://img.shields.io/badge/Multi--Chain-Celo%20%7C%20Stellar%20%7C%20Solana%20%7C%20Base-blueviolet)](https://app.sivantech.online/)
[![WebMCP Standard](https://img.shields.io/badge/WebMCP-W3C%20Draft%20Compliant-brightgreen)](https://github.com/webmachinelearning/webmcp)
[![MiniPay Ready](https://img.shields.io/badge/MiniPay-Celo%20Ready-brightgreen)](https://app.sivantech.online/)
[![Stablecoins](https://img.shields.io/badge/Stablecoins-USDC%20%7C%20cUSD-green)](https://app.sivantech.online/)
[![Status](https://img.shields.io/badge/Status-Staging%20Live-orange)](https://staging.sivantech.online/)

[Landing Page](https://sivantech.online/) · [Production App](https://app.sivantech.online/) · [Staging App](https://staging.sivantech.online/) · [Telegram AI (Live)](https://t.me/Sivan_Ai) · [Celo Agent Registry (#9827)](https://8004scan.io/agents/celo/9827) · [Developer API Guide](docs/DEVELOPER_API_GUIDE.md) · [Test Verification Report](docs/TEST_VERIFICATION_REPORT.md)

</div>

---

## About Sivan AI

Sivan AI is an agent-native financial settlement and service coordination platform that helps freelancers, businesses, and AI agents:

1. Structure Service Agreements - define scope, pricing, and milestone deliverables before work begins.
2. Execute via WebMCP - browser AI agents (ChatGPT, Chrome Gemini, Claude) discover structured client tools directly via document.modelContext.
3. Multi-Chain Settlement - native routing across Celo, Stellar, Solana, Base, and BSC with gas sponsorship and non-custodial architecture.
4. Coordinate Payments - payments are processed directly through licensed third-party providers; Sivan holds no funds.
5. Off-Ramp Stablecoins - convert settled USDC and cUSD directly to local bank accounts (such as instant Nigerian NGN bank rails).

> Built for digital commerce, messaging channels, and browser agents with structured records for terms, milestone releases, provider references, and dispute review.

---

## Core Ecosystem Architecture & Submodules

The Sivan platform is organized into four modular layers, tracked as submodules in this repository:

| Submodule | Repository Link | Branch | Description |
|---|---|---|---|
| sivan-payment | [Sivan-Technologies/sivan-payment](https://github.com/Sivan-Technologies/sivan-payment) | multichain | Core multi-chain financial engine, virtual accounts, NIP bank rails, and developer gateway |
| sivan-ai-agent | [Sivan-Technologies/sivan-ai-agent](https://github.com/Sivan-Technologies/sivan-ai-agent) | multichain | Autonomous Service Agreement Coordinator & Celo ERC-8004 registered agent (#9827) |
| sivan-minipay-app | [Sivan-Technologies/sivan-minipay-app](https://github.com/Sivan-Technologies/sivan-minipay-app) | main | Mobile-first Web3 client and instant cashout app optimized for Opera MiniPay on Celo |
| sivan-contracts | [Sivan-Technologies/sivan-contracts](https://github.com/Sivan-Technologies/sivan-contracts) | main | Autonomous Non-Custodial x402 Service Agreement Settlement Facility on Celo |

```
+-------------------------------------------------------------------------+
|                          SIVAN CLIENT LAYER                             |
|  Opera MiniPay dApp (Celo)  |  Telegram AI (@Sivan_Ai)  |  WebMCP Agent |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  INTELLIGENCE & COORDINATION LAYER                      |
|                           sivan-ai-agent                                |
|  - Celo ERC-8004 Agent #9827          - Natural Language Commerce       |
|  - Service Agreement Coordinator      - Milestone Deliverable Review    |
+-------------------------------------------------------------------------+
                                    |
                  +-----------------+-----------------+
                  |                                   |
                  v                                   v
+-----------------------------------+ +-----------------------------------+
|     ON-CHAIN SMART CONTRACTS      | | MULTI-CHAIN EXECUTION & RAILS     |
|          sivan-contracts          | |           sivan-payment           |
|  - Non-Custodial Agreement Vault  | | - Multi-Chain Settlement Engine   |
|  - Dual EIP-712 Attestation       | | - Instant Nigerian NIP Off-Ramp   |
|  - Dynamic Tiered Fee Engine      | | - Real-Time RFQ Rates & Accounts  |
+-----------------------------------+ +-----------------------------------+
```

---

## Features

### WebMCP Browser Agent Tools (Official WebMCP Challenge Entry)
| WebMCP Tool | Description |
|---|---|
| create_service_agreement | Drafts milestone-based Service Agreements programmatically with on-screen human approval |
| get_wallet_balances | Returns real-time available USDC and cUSD balances across Celo, Stellar, Solana, and Base |
| fund_service_agreement | Dispatches on-chain settlement funding to secure the agreement vault |
| release_agreement_milestone | Releases milestone payouts to the contractor and generates block explorer receipts |

### Service Agreement Coordination
| Feature | Description |
|---|---|
| Clear Service Agreements | Define scope, pricing, and delivery expectations before work starts |
| Mutual Term Confirmation | Both buyer and seller confirm terms before any payment moves |
| Licensed Payment Coordination | Payments routed through licensed providers - Sivan holds no funds |
| Delivery Tracking | Structured progress and milestone updates recorded for both parties |
| Dispute Review Workflow | Fair review trail with immutable cryptographic logs |
| No App Download Required | Accessible via Web App, Telegram AI, and browser agents |

### Off-Ramp Dashboard (app.sivantech.online)
| Feature | Description |
|---|---|
| Crypto to Bank (Sell) | Send USDC/cUSD from any wallet; receive NGN (Nigeria), GHS (Ghana), USD, GBP, or EUR directly to your bank account — more emerging markets coming soon |
| Bank to Crypto (Buy) | Pay via supported bank rails; receive stablecoins to a self-custody wallet |
| True Multi-Chain | Celo, Stellar, Solana, Base, and BSC |
| Transparent Fees | Live fee displayed before deposit address generation - no surprises |
| Non-Custodial by Design | Sivan never asks for private keys |
| Built-in Compliance | KYC, sanctions screening, and anti-fraud checks in the guided flow |
| Clear Transaction Tracking | Real-time block explorer receipts (Celoscan, StellarExpert, Solscan, Basescan) |
| Instant Payouts | Fast settlement through licensed partner bank rails |

---

## How It Works

### Service Agreement Flow

```
1. Create Service Agreement  →  Define scope, price, and milestone terms
2. Confirm Terms             →  Both buyer and seller confirm before funds move
3. Fund Agreement Vault      →  Funds locked on-chain (Celo / Stellar / Solana / Base)
4. Deliver Milestone         →  Seller delivers milestone; progress tracked in Sivan
5. Release & Payout          →  Milestone confirmed; payout dispatched to recipient
```

### Off-Ramp Flow (Crypto to Cash)

```
1. Create & Verify Account   →  Sign up with email + identity check
2. Choose Rails & Send Funds →  Pick bank, asset (USDC/cUSD), and network; review rate
3. Receive Payout            →  Deposit detected → converted → paid directly to bank
```

---

## Multi-Chain Developer Documentation

Comprehensive per-chain integration guides, REST APIs, and agent specifications are organized in the docs directory:

### Multi-Chain Integration Guides
- [Celo Integration Guide](docs/chains/celo.md): cUSD gas sponsorship via feeCurrency, MiniPay integration, ERC-8004 Agent #9827.
- [Stellar Integration Guide](docs/chains/stellar.md): Soroban architecture, Circle USDC, sponsored accounts, path payment routing.
- [Solana Integration Guide](docs/chains/solana.md): High-throughput SPL USDC settlement, Jupiter DEX routing, compute budget priority fees.
- [Base Integration Guide](docs/chains/base.md): L2 settlement, Coinbase Smart Wallet compatibility, low-gas EVM transactions.

### REST API Reference
- [Multi-Chain Payments API](docs/api/payments.md): Initiating and tracking cross-chain transfers.
- [FX Quoting API](docs/api/quotes.md): Real-time conversion rates and guaranteed quotes.
- [Fiat Off-Ramp API](docs/api/offramp.md): Bank resolution, RFQ locking, and near-instant dispersal (NGN, GHS, USD, GBP, EUR).

### Agent & Consumer Guides
- [Celo ERC-8004 Agent Specification](docs/agent/erc8004.md): On-chain registration, attribution tag, and registry verification.
- [Service Agreements Technical Specification](docs/agent/service-agreements.md): Milestone lifecycles, non-custodial vaults, dispute workflows.
- [MiniPay Integration Guide](docs/minipay/overview.md): Injected provider detection, one-tap mobile cashouts.
- [Master Developer API & WebMCP Guide](docs/DEVELOPER_API_GUIDE.md): Complete WebMCP standard integration.

---

## Key Features

### 1. Celo Mainnet Registered Agent (ERC-8004)
- Agent Name: Sivan AI
- Network: Celo Mainnet (Chain ID 42220)
- Agent Token ID: #9827
- Agent ID: 9827
- Registry URL: https://8004scan.io/agents/celo/9827
- Attribution Tag: celo_bafcc2e56bd7

### 2. Service Agreement Milestone Protection
- Mutual Agreement: Both parties confirm deliverable terms before payment moves.
- Non-Custodial Vaults: Funds locked programmatically on-chain; Sivan holds no customer deposits.
- Verifiable Deliverables: Payouts released upon deliverable verification with on-chain receipts.

### 3. Instant Fiat Off-Ramp (Nigeria, Ghana & Global)
- Nigeria: Near-instant NGN payouts via NIBSS / NIP interbank rails (under 1 to 2 minutes).
- Ghana: GHS payouts to Ghanaian bank accounts via local settlement rails.
- Global: USD, GBP, and EUR payouts to international bank accounts for cross-border settlements.
- More emerging markets are actively being integrated.
- Supported Assets: cUSD and USDC across Celo, Stellar, Solana, and Base.
- Bank Resolution: Real-time 10-digit NUBAN / account validation before order dispatch.

### 4. Transparent Fee Separation Protocol
- Sivan Transfer Fee: Applies to on-chain wallet movements and service agreement releases.
- Sivan Off-Ramp Fee: Applies to fiat cashouts. Evaluated transparently during RFQ quoting with zero hidden spreads.

---

## Automated Test Suite & Verification Evidence

Sivan enforces a strict zero-mock production testing policy. All 77 core test suites and integration assertions pass continuously across local, staging, and CI environments.

| Test Harness | Scope | Total Tests | Status | Invariants Verified |
|---|---|---|---|---|
| Sivan Payment Master Runner | Multi-chain backend, webhooks, fee curves, biometrics | 21 Suites | 21 / 21 Passed (100%) | Double-entry ledger, HMAC-SHA256, 12-block EVM depth, WebAuthn passkeys |
| MiniPay & Admin Hub E2E Suite | Mobile Web3 client, bank detection, attribution | 56 Checks | 56 / 56 Passed (100%) | NUBAN auto-routing, NIBSS settlement timing, Celo token ordering, ERC-8004 #9827 |

For the complete breakdown of all 21 suites, failure tolerances, and cryptographic invariants, see the [Full Test Verification Report](docs/TEST_VERIFICATION_REPORT.md).

### Reproduce Tests Locally

Reviewers, judges, and developers can verify all test passes directly:

```bash
# 1. Clone the repository
git clone https://github.com/Sivan-Technologies/Sivan.git
cd Sivan

# 2. Run MiniPay & Admin Hub E2E Suite (56 checks)
npx tsx scripts/e2e-minipay-and-admin-test.ts

# 3. Run Sivan Payment Master Runner (21 suites)
cd sivan-payment
npm test
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| WebMCP Standard | W3C Draft document.modelContext.registerTool API (src/webmcp.js) |
| Blockchain Networks | Celo, Stellar, Solana, Base, and Binance Smart Chain (BSC) |
| Stablecoins | USDC, cUSD, USDT |
| Edge Gateway | Cloudflare Workers (sivan-gateway) for MCP streaming and CORS |
| Backend Core | Fastify microservices on Render with PostgreSQL |
| Wallet Layer | Privy embedded wallets, Stellar Horizon RPC, Solana web3.js, Celo viem |
| Client Frontend | Vite / React Single Page App deployed on Render |
| Compliance | KYC / AML, sanctions screening, anti-fraud verification |

---

## Developer API & WebMCP Quickstart

For full API specifications, payload schemas, and code samples, see the [Developer API Guide](docs/DEVELOPER_API_GUIDE.md).

```javascript
import { registerSivanWebMcpTools } from './src/webmcp.js';

// Registers Sivan AI tools for browser agents:
await registerSivanWebMcpTools('https://api-staging.sivantech.online');

// Execute Service Agreement tool call
const agreement = await window.SIVAN_WEBMCP.callTool('create_service_agreement', {
  counterparty: '@soliame',
  amount: 20,
  currency: 'USDC',
  milestones: 2,
  deliverables: 'Mobile App UI Design'
});
```

---

## Getting Started

### Testing WebMCP in Google Chrome:
1. Open Chrome and navigate to chrome://flags/#enable-webmcp-testing.
2. Enable the flag and restart Chrome.
3. Visit https://staging.sivantech.online.
4. Inspect registered tools via Console: window.SIVAN_WEBMCP.listTools().

### Testing in ChatGPT In-App Browser:
1. Open https://staging.sivantech.online in ChatGPT in-app browser.
2. Prompt ChatGPT: "Check my Sivan balance and draft a service agreement with @soliame for 20 USDC."

---

## Security & Compliance

- Sivan does not hold, store, or transmit funds at any point.
- All payments are processed by licensed third-party payment providers.
- Autonomous agents cannot move funds without explicit human-in-the-loop confirmation.
- Sivan is non-custodial by design - private keys are never requested.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Leadership & Organization

- Samson Micheal: Founder, CEO, Technical Founder, and Product Engineer
- Jonathan Hart: Co-Founder & Head of Operations / Growth
- Official Organization: Sivan Technologies
- Official Email: sivantechnology@gmail.com
- Founder Email: airspexta@gmail.com

---

## Contact & Official Links

| Resource | Link |
|---|---|
| Landing Website | https://sivantech.online |
| Production App | https://app.sivantech.online |
| Staging App | https://staging.sivantech.online |
| Telegram AI (Live) | https://t.me/Sivan_Ai |
| X (Twitter) Profile | https://x.com/sivan_Tech |
| Founder LinkedIn | https://linkedin.com/in/samson-micheal |
| GitHub Organization | https://github.com/Sivan-Technologies |
| Celo Agent Registry | https://8004scan.io/agents/celo/9827 |

---

<div align="center">

Built for digital commerce, autonomous AI agents, and global emerging markets.

<img src="assets/sivan_logo_transparent.png" alt="Sivan favicon" width="48"/>

Built to scale globally.

</div>
