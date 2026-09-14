<div align="center">

<img src="assets/sivan_logo_transparent.png" alt="Sivan Logo" width="320"/>

# Sivan AI

Autonomous Multi-Chain Settlement Layer, Service Agreement Coordination & Fiat Off-Ramp for Humans and AI Agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Celo Agent: #9827](https://img.shields.io/badge/Celo%20ERC--8004-Agent%20%239827-35D07F.svg)](https://8004scan.io/agents/celo/9827)
[![Multi-Chain](https://img.shields.io/badge/Multi--Chain-Celo%20%7C%20Stellar%20%7C%20Solana%20%7C%20Base-blueviolet)](https://app.sivantech.online/)
[![WebMCP Standard](https://img.shields.io/badge/WebMCP-W3C%20Draft%20Compliant-brightgreen)](https://github.com/webmachinelearning/webmcp)
[![MiniPay Ready](https://img.shields.io/badge/MiniPay-Celo%20Ready-brightgreen)](https://app.sivantech.online/)
[![Status](https://img.shields.io/badge/Status-Staging%20Live-orange)](https://staging.sivantech.online/)
[![Nigeria First](https://img.shields.io/badge/Live%20In-Nigeria-brightgreen)](https://sivantech.online/)

[Landing Page](https://sivantech.online/) | [Payment App](https://app.sivantech.online/) | [Telegram AI (Live)](https://t.me/Sivan_Ai) | [Agent Registry (#9827)](https://8004scan.io/agents/celo/9827) | [Developer Documentation](docs/DEVELOPER_API_GUIDE.md)

</div>

---

## About Sivan AI

Sivan AI is an agent-native financial settlement and service coordination platform built from Abuja, Nigeria for African emerging markets and global digital commerce. Sivan enables AI agents, web applications, and mobile users to:

1. Structure Service Agreements: Define milestone scopes, pricing, and cryptographic release criteria before work begins.
2. Execute Autonomous Settlement: Move stablecoins across Celo, Stellar, Solana, and Base with automated gas sponsorship.
3. Coordinate WebMCP Commerce: Browser-native AI agents (Google Chrome Gemini, Claude, ChatGPT) discover structured financial tools via document.modelContext.
4. Off-Ramp to Local Banks: Settle USDC and cUSD directly into Nigerian bank accounts in under 1 to 2 minutes via NIBSS / NIP payment rails.
5. On-Chain Verifiable Agent Identity: Registered on Celo Mainnet as ERC-8004 Agent #9827.

---

## Core Ecosystem Architecture

The Sivan platform is organized into three modular layers:

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
                                    v
+-------------------------------------------------------------------------+
|                 MULTI-CHAIN EXECUTION & BANK RAILS                      |
|                            sivan-payment                                |
|  - Multi-Chain Settlement Engine (Celo, Stellar, Solana, Base)         |
|  - Instant Nigerian Bank Off-Ramp (Textile Credit / Busha NIP Rails)   |
|  - Real-Time RFQ Rates, Fee Separation Engine & Virtual Accounts       |
+-------------------------------------------------------------------------+
```

---

## Ecosystem Repositories & Submodules

| Submodule | Repository Link | Branch | Description |
|---|---|---|---|
| sivan-payment | [Sivan-Technologies/sivan-payment](https://github.com/Sivan-Technologies/sivan-payment) | multichain | Core multi-chain financial engine, virtual accounts, NIP bank rails, and developer gateway |
| sivan-ai-agent | [Sivan-Technologies/sivan-ai-agent](https://github.com/Sivan-Technologies/sivan-ai-agent) | multichain | Autonomous Service Agreement Coordinator & Celo ERC-8004 registered agent |
| sivan-minipay-app | [Sivan-Technologies/sivan-minipay-app](https://github.com/Sivan-Technologies/sivan-minipay-app) | main | Mobile-first Web3 client and instant cashout app optimized for Opera MiniPay on Celo |

---

## Developer Documentation

Comprehensive integration guides and API documentation are organized in the docs directory:

### Multi-Chain Integration Guides
- [Celo Integration Guide](docs/chains/celo.md): cUSD gas sponsorship via feeCurrency, MiniPay integration, ERC-8004 Agent #9827.
- [Stellar Integration Guide](docs/chains/stellar.md): Soroban architecture, Circle USDC, sponsored accounts, path payment routing.
- [Solana Integration Guide](docs/chains/solana.md): High-throughput SPL USDC settlement, Jupiter DEX routing, compute budget priority fees.
- [Base Integration Guide](docs/chains/base.md): L2 settlement, Coinbase Smart Wallet compatibility, low-gas EVM transactions.

### REST API Reference
- [Multi-Chain Payments API](docs/api/payments.md): Initiating and tracking cross-chain transfers.
- [FX Quoting API](docs/api/quotes.md): Real-time conversion rates and guaranteed quotes.
- [Nigerian Bank Off-Ramp API](docs/api/offramp.md): Bank resolution, RFQ locking, and near-instant NIP dispersal.

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

### 3. Instant Nigerian Bank Off-Ramp
- Payout Speed: Under 1 to 2 minutes via Nigerian Interbank Settlement System (NIP) rails.
- Supported Assets: cUSD and USDC across Celo, Stellar, Solana, and Base.
- Bank Resolution: Real-time 10-digit NUBAN account validation before order dispatch.

### 4. Transparent Fee Separation Protocol
- Sivan Transfer Fee: Applies to on-chain wallet movements and service agreement releases.
- Sivan Off-Ramp Fee: Applies to fiat cashouts into Nigerian bank accounts. Evaluated transparently during RFQ quoting with zero hidden spreads.

---

## Leadership & Organization

- Samson Micheal: Founder, CEO, Technical Founder, and Product Engineer (Abuja, Nigeria)
- Jonathan Hart: Co-Founder & Head of Operations / Growth
- Official Organization: Sivan Technologies
- Official Email: sivantechnology@gmail.com
- Founder Email: airspexta@gmail.com

---

## Official Links

| Resource | URL |
|---|---|
| Marketing Website | https://sivantech.online |
| Payment Application | https://app.sivantech.online |
| Telegram AI (Live) | https://t.me/Sivan_Ai |
| X (Twitter) Profile | https://x.com/sivan_Tech |
| Founder LinkedIn | https://linkedin.com/in/samson-micheal |
| GitHub Organization | https://github.com/Sivan-Technologies |
| Celo Agent Registry | https://8004scan.io/agents/celo/9827 |

---

<div align="center">

Built for digital commerce, autonomous AI agents, and emerging African markets.

Nigeria-first. Built to scale globally.

</div>
