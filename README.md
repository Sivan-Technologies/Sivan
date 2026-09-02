# Sivan AI — WebMCP Multi-Chain Settlement Layer

The Autonomous Settlement and Multi-Chain Financial Layer for Browser AI Agents.

Official WebMCP Challenge Submission: https://webmcp.devpost.com/

---

## Overview

Sivan AI connects browser AI agents (ChatGPT, Google Gemini in Chrome, Claude) with cryptographic multi-chain rails and local banking infrastructure.

Using the emerging W3C WebMCP standard (document.modelContext.registerTool), Sivan AI exposes client-side financial tools directly to in-browser agents. Instead of fragile DOM scraping or risky direct payments, agents can draft, fund, and settle milestone-based Service Agreements across Solana, Base, Stellar, Celo, BSC, and local bank accounts with human-in-the-loop oversight.

---

## Live Links & Demo

- Live Staging Web App: https://staging.sivantech.online
- Production Web App: https://app.sivantech.online
- Official Website: https://sivantech.online
- Telegram AI Layer: https://t.me/Sivan_Ai
- Founder: Samson Micheal (Abuja, Nigeria)

---

## Key Features

1. Milestone-Based Service Agreements
- Protects both buyer and seller by locking funds and releasing payouts upon verified delivery.
- Eliminates upfront direct payment risks.

2. Native WebMCP Client Tools
- document.modelContext tool registration allowing browser agents to discover and execute actions securely.
- Human-in-the-loop review cards before any blockchain transaction is broadcast.

3. True Multi-Chain Infrastructure
- Solana: Sub-second finality and ultra-low transaction costs.
- Stellar: Native low-fee cross-border remittance routing.
- Base: Gas-sponsored EVM layer-2 scalability.
- Celo & BSC: High-throughput global mobile liquidity.

4. Fiat Local Bank Settlement
- Direct off-ramp from settled USDC into Nigerian bank accounts via instant NGN rails.

---

## WebMCP Tools Specification

Sivan AI registers the following tools on document.modelContext:

### 1. create_service_agreement
Drafts a milestone-based Service Agreement for freelancing or digital commerce.
- Parameters: counterparty (string), amount (number), currency (USDC), milestones (number), deliverables (string).
- Action: Renders an interactive review modal in the Sivan UI for user sign-off.

### 2. get_wallet_balances
Queries real-time available and spendable balances across all supported multi-chain networks.
- Parameters: asset (string).
- Action: Returns unified balances across Solana, Base, Stellar, Celo, and BSC.

### 3. fund_service_agreement
Locks approved funds into the Service Agreement on the chosen blockchain.
- Parameters: agreementId (string), network (solana | base | stellar | celo | bsc).
- Action: Dispatches on-chain settlement transaction.

### 4. release_agreement_milestone
Releases milestone funds to the contractor upon delivery verification.
- Parameters: agreementId (string), milestoneIndex (number).
- Action: Dispatches payout and generates block explorer receipt links.

---

## How to Test with WebMCP

### In Google Chrome:
1. Open Chrome and navigate to: chrome://flags/#enable-webmcp-testing
2. Enable the flag and restart Chrome.
3. Visit https://staging.sivantech.online
4. Open Developer Tools -> Console to inspect registered tools via:
   await document.modelContext.getTools();

### In ChatGPT In-App Browser:
1. Navigate to https://staging.sivantech.online within the ChatGPT browser.
2. Ask ChatGPT:
   "Check my Sivan balance and help me draft a service agreement with @designer for 20 USDC."
3. The agent will discover Sivan's WebMCP tools and interact directly.

---

## Architecture

- Client Layer: WebMCP Provider (src/webmcp.js), React / Vite SPA.
- Gateway Edge: Cloudflare Workers (sivan-gateway) routing MCP SSE streams and CORS.
- Multi-Chain Core: Fastify microservices on Render managing Privy embedded wallets, Stellar Horizon RPC, Solana web3.js, and EVM ethers adapters.
- Database: PostgreSQL on Neon with structured audit logs.

---

## License

MIT License. Copyright (c) 2026 Sivan Technologies (Samson Micheal). See LICENSE for details.
