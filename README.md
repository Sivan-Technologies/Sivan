<div align="center">

<img src="assets/sivan_logo_transparent.png" alt="Sivan Logo" width="320"/>

# Sivan AI

Autonomous Multi-Chain Settlement Layer, Service Agreement Coordination & Fiat Off-Ramp for Humans and AI Agents.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Multi-Chain](https://img.shields.io/badge/Multi--Chain-Solana%20%7C%20Base%20%7C%20Stellar%20%7C%20Celo%20%7C%20BSC-blueviolet)](https://app.sivantech.online/)
[![WebMCP Standard](https://img.shields.io/badge/WebMCP-W3C%20Draft%20Compliant-brightgreen)](https://github.com/webmachinelearning/webmcp)
[![Stablecoins](https://img.shields.io/badge/Stablecoins-USDC%20%7C%20USDT-green)](https://app.sivantech.online/)
[![Status](https://img.shields.io/badge/Status-Staging%20Live-orange)](https://staging.sivantech.online/)
[![Nigeria First](https://img.shields.io/badge/Live%20In-Nigeria-brightgreen)](https://sivantech.online/)

[🌐 Landing Page](https://sivantech.online/) · [🚀 Production App](https://app.sivantech.online/) · [🧪 Staging App](https://staging.sivantech.online/) · [🤖 Telegram AI (Live)](https://t.me/Sivan_Ai) · [📚 Developer API Guide](docs/DEVELOPER_API_GUIDE.md)

</div>

---

## About Sivan AI

Sivan AI is an agent-native financial settlement and service coordination platform that helps freelancers, businesses, and AI agents:

1. Structure Service Agreements - define scope, pricing, and milestone deliverables before work begins.
2. Execute via WebMCP - browser AI agents (ChatGPT, Chrome Gemini, Claude) discover structured client tools directly via document.modelContext.
3. Multi-Chain Settlement - native routing across Solana, Base, Stellar, Celo, and BSC with gas sponsorship and non-custodial architecture.
4. Coordinate Payments - payments are processed directly through licensed third-party providers; Sivan holds no funds.
5. Off-Ramp Stablecoins - convert settled USDC directly to local bank accounts (such as instant Nigerian NGN bank rails).

> Built for digital commerce, messaging channels, and browser agents with structured records for terms, milestone releases, provider references, and dispute review.

---

## Features

### WebMCP Browser Agent Tools (Official WebMCP Challenge Entry)
| WebMCP Tool | Description |
|---|---|
| create_service_agreement | Drafts milestone-based Service Agreements programmatically with on-screen human approval |
| get_wallet_balances | Returns real-time available USDC balances across Solana, Base, Stellar, Celo, and BSC |
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
| Crypto to Bank (Sell) | Send USDC/USDT from any wallet; receive NGN, USD, GBP, or EUR to your bank account |
| Bank to Crypto (Buy) | Pay via supported bank rails; receive stablecoins to a self-custody wallet |
| True Multi-Chain | Solana, Base, Stellar, Celo, BSC, and Ethereum |
| Transparent Fees | Live fee displayed before deposit address generation - no surprises |
| Non-Custodial by Design | Sivan never asks for private keys |
| Built-in Compliance | KYC, sanctions screening, and anti-fraud checks in the guided flow |
| Clear Transaction Tracking | Real-time block explorer receipts (Solscan, Basescan, StellarExpert) |
| Instant Payouts | Fast settlement through licensed partner bank rails |

---

## How It Works

### Service Agreement Flow

```
1. Create Service Agreement  →  Define scope, price, and milestone terms
2. Confirm Terms             →  Both buyer and seller confirm before funds move
3. Fund Agreement Vault      →  Funds locked on-chain (Solana / Base / Stellar)
4. Deliver Milestone         →  Seller delivers milestone; progress tracked in Sivan
5. Release & Payout          →  Milestone confirmed; payout dispatched to recipient
```

### Off-Ramp Flow (Crypto to Cash)

```
1. Create & Verify Account   →  Sign up with email + identity check
2. Choose Rails & Send Funds →  Pick bank, asset (USDC), and network; review rate
3. Receive Payout            →  Deposit detected → converted → paid directly to bank
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| WebMCP Standard | W3C Draft document.modelContext.registerTool API (src/webmcp.js) |
| Blockchain Networks | Solana, Base (EVM), Stellar, Celo, Binance Smart Chain (BSC), Ethereum |
| Stablecoins | USDC, USDT |
| Edge Gateway | Cloudflare Workers (sivan-gateway) for MCP streaming and CORS |
| Backend Core | Fastify microservices on Render with PostgreSQL |
| Wallet Layer | Privy embedded wallets, Stellar Horizon RPC, Solana web3.js |
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
1. Open Chrome and navigate to `chrome://flags/#enable-webmcp-testing`.
2. Enable the flag and restart Chrome.
3. Visit https://staging.sivantech.online.
4. Inspect registered tools via Console: `window.SIVAN_WEBMCP.listTools()`.

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

## Contact & Official Links

| Resource | Link |
|---|---|
| Landing Website | https://sivantech.online |
| Production App | https://app.sivantech.online |
| Staging App | https://staging.sivantech.online |
| Telegram AI (Live) | https://t.me/Sivan_Ai |
| X (Twitter) Profile | https://x.com/sivan_Tech |
| Founder & CEO | Samson Micheal (Abuja, Nigeria) |
| LinkedIn Profile | https://linkedin.com/in/samson-micheal |
| GitHub Organization | https://github.com/Sivan-Technologies |

---

<div align="center">

Built for digital commerce and browser AI agents. Multi-Chain Native.

<img src="assets/sivan_logo_transparent.png" alt="Sivan favicon" width="48"/>

Nigeria-first. Built to scale globally.

</div>
