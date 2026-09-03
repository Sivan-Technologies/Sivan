# Sivan AI - Developer API & WebMCP Integration Guide

Autonomous Multi-Chain Settlement Layer and Service Agreement Coordination for AI Agents and Developers.

---

## 1. Overview

Sivan AI provides programmatic financial tools for autonomous AI agents, web applications, and developer platforms. Sivan enables AI agents and software to:

1. Draft milestone-based Service Agreements between buyers and sellers.
2. Query multi-chain spendable USDC balances across Solana, Base, Stellar, Celo, and BSC.
3. Lock funds into secure on-chain Service Agreement vaults upon human confirmation.
4. Release milestone payouts to contractors upon automated deliverable verification.
5. Off-ramp settled stablecoins to local bank accounts.

---

## 2. WebMCP In-Browser Integration

Sivan AI implements the W3C Web Model Context Protocol (WebMCP) draft standard. Any browser-native AI agent (Google Chrome Gemini, ChatGPT in-app browser, Claude Artifacts) discovers Sivan tools on document.modelContext or window.SIVAN_WEBMCP.

### Available WebMCP Tools

| Tool Name | Parameters | Description |
|---|---|---|
| create_service_agreement | counterparty, amount, currency, milestones, deliverables | Drafts a milestone Service Agreement with human approval |
| get_wallet_balances | asset (usdc/usdt) | Queries real-time spendable balances across supported chains |
| fund_service_agreement | agreementId, network | Locks agreed USDC into the multi-chain agreement vault |
| release_agreement_milestone | agreementId, milestoneIndex | Releases milestone funds to the seller |

### Quickstart (JavaScript / TypeScript)

```javascript
// Check registered WebMCP tools
const tools = window.SIVAN_WEBMCP.listTools();
console.log('Available Tools:', tools);

// Execute tool call from AI Agent
const result = await window.SIVAN_WEBMCP.callTool('create_service_agreement', {
  counterparty: '@soliame',
  amount: 20,
  currency: 'USDC',
  milestones: 2,
  deliverables: 'Mobile Application UI/UX Design'
});

console.log('Agreement Created:', result);
```

---

## 3. Developer REST API Reference

Base URL (Staging): https://api-staging.sivantech.online
Base URL (Production): https://api.sivantech.online

### Authentication
Include the Bearer JWT token in the Authorization header:
```http
Authorization: Bearer <USER_OR_DEVELOPER_JWT>
```

---

### Endpoint 1: Create Service Agreement

Creates a new milestone-based Service Agreement record in pending_payment status.

```http
POST /api/agreements
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "buyerUserId": "usr_10ed27f0-7ff2-4228-b45c-70a327d9b3c8",
  "sellerUserId": "usr_b1d36f5b-9e1d-4d72-918a-c0484310c6bc",
  "title": "Mobile App UI Design",
  "description": "Two 50% milestones for wireframes and high-fidelity prototype",
  "amountUsdc": 20,
  "currency": "USDC",
  "network": "solana",
  "deadlineDays": 7
}
```

Response (201 Created):
```json
{
  "id": "agr_94f8a2e1",
  "buyerUserId": "usr_10ed27f0-7ff2-4228-b45c-70a327d9b3c8",
  "sellerUserId": "usr_b1d36f5b-9e1d-4d72-918a-c0484310c6bc",
  "title": "Mobile App UI Design",
  "amountUsdc": 20,
  "currency": "USDC",
  "network": "solana",
  "status": "pending_payment",
  "deadlineDays": 7,
  "countdownLabel": "⏳ Awaiting payment",
  "createdAt": "2026-09-03T14:45:00.000Z"
}
```

---

### Endpoint 2: Fund Service Agreement

Locks the agreed funds into the Service Agreement vault on Solana Devnet or Base.

```http
POST /api/agreements/agr_94f8a2e1/fund
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "network": "solana"
}
```

Response (200 OK):
```json
{
  "id": "agr_94f8a2e1",
  "status": "funded",
  "fundedAt": "2026-09-03T14:46:12.000Z",
  "deliveryDueAt": "2026-09-10T14:46:12.000Z",
  "countdownLabel": "⏱ 7 days remaining"
}
```

---

### Endpoint 3: Release Milestone Payout

Releases the milestone payout to the seller upon deliverable approval.

```http
POST /api/agreements/agr_94f8a2e1/release
Content-Type: application/json
Authorization: Bearer <TOKEN>

{
  "milestoneIndex": 0
}
```

Response (200 OK):
```json
{
  "id": "agr_94f8a2e1",
  "status": "released",
  "releasedAt": "2026-09-03T14:50:00.000Z",
  "countdownLabel": "✅ Released"
}
```

---

### Endpoint 4: Query Unified Multi-Chain Balances

Returns spendable and reserved USDC balances across all connected blockchain networks.

```http
GET /api/balances/unified
Authorization: Bearer <TOKEN>
```

Response (200 OK):
```json
{
  "data": {
    "totalSpendableUsdc": "20.00",
    "balances": [
      { "chain": "solana", "asset": "usdc", "spendable": "20.00", "cluster": "devnet" },
      { "chain": "base", "asset": "usdc", "spendable": "0.00", "cluster": "sepolia" }
    ],
    "wallets": [
      { "chain": "solana", "address": "Grj8tUheEicPLjBB3XVFFCnwx2iUQCuR9MshiXku92cL" },
      { "chain": "base", "address": "0x901255F561BCf73688fa1b1c18a9cA836132d132" }
    ]
  }
}
```

---

## 4. Multi-Chain Block Explorer Verification

All settlements and milestone fundings broadcast to public networks with verifiable explorer receipts:

| Network | Environment | Block Explorer URL Pattern |
|---|---|---|
| Solana | Devnet | https://solscan.io/tx/{TX_HASH}?cluster=devnet |
| Base | Sepolia | https://sepolia.basescan.org/tx/{TX_HASH} |
| Stellar | Testnet | https://stellar.expert/explorer/testnet/tx/{TX_HASH} |

---

## 5. Security & Non-Custodial Architecture

1. Human-in-the-Loop: Autonomous AI agents cannot move funds without explicit human approval via the WebMCP interactive confirmation card.
2. Non-Custodial: Sivan never requests or stores private keys. Wallets are managed through Privy embedded server keys and user self-custody.
3. Service Agreement Protection: Funds are locked strictly according to verifiable milestone terms, protecting both buyers and contractors.
