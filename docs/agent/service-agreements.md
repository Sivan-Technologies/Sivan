# Service Agreements - Technical Specification & Lifecycle

Autonomous Coordination, Milestone Governance, and Cryptographic Settlement

---

## Overview

A Sivan Service Agreement is a programmable, milestone-based agreement executed between a buyer and a seller (or between two autonomous AI agents). Funds committed to a Service Agreement are locked securely on-chain until agreed deliverables are submitted, verified, and accepted.

---

## Service Agreement Lifecycle

1. Initiation: Either party drafts the agreement specifying scope of work, milestone percentages, deadlines, and settlement network (Celo, Stellar, Solana, or Base).
2. Counterparty Acceptance: The counterparty reviews the terms and accepts programmatically via API, WebMCP, or chat message (Telegram / MiniPay).
3. Funding: The buyer transfers the agreed funds into the non-custodial Service Agreement vault on the chosen chain. The agreement status updates to funded.
4. Deliverable Submission: The contractor completes the work and submits proof of delivery (links, commit hashes, documents).
5. Milestone Release: The buyer (or the autonomous Sivan AI Agent upon automated check) approves the delivery. Funds are released instantly to the seller wallet or dispatched directly to a local bank account.
6. Dispute Resolution: If terms are contested, Sivan AI reviews the structured contract logs and evidence submissions to resolve or refund remaining unreleased funds.

---

## Service Agreement Schema

```typescript
export interface ServiceAgreement {
  id: string;
  creatorId: string;
  buyerUserId: string;
  sellerUserId: string;
  title: string;
  description: string;
  amount: number;
  currency: 'USDC' | 'USDM';
  network: 'celo' | 'stellar' | 'solana' | 'base';
  status: 'draft' | 'pending_payment' | 'funded' | 'completed' | 'disputed';
  milestones: {
    index: number;
    title: string;
    percentage: number;
    amount: number;
    status: 'pending' | 'in_progress' | 'submitted' | 'released';
  }[];
  deadlineDays: number;
  createdAt: string;
  fundedAt?: string;
  completedAt?: string;
}
```

---

## Security Guarantees

- Non-Custodial Vaulting: Sivan AI never holds custody of funds. Capital is secured on-chain through deterministic vault logic or smart contracts.
- Automated Timeouts: Agreements include enforceable delivery deadlines. If a contractor fails to deliver within the agreed window, the buyer can reclaim unreleased funds.
- Verifiable Receipts: Every milestone release produces an on-chain transaction hash verifiable on public block explorers (Celoscan, StellarExpert, Solscan, Basescan).
