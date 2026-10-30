# Dynamic Off-Ramp Virtual Account Threshold Specification

Document Reference: FUTURE_BUILD_DYNAMIC_OFFRAMP_VIRTUAL_ACCOUNT_THRESHOLD
Target Scope: Admin Hub, Central Settings API, WhatsApp Layer, Telegram Layer
Status: Architecture Planning (No Coding Yet)
Last Updated: 2026-10-30

---

## 1. Executive Summary

This specification establishes an admin-configurable stablecoin threshold in the Admin Hub Off-Ramp management panel.

When a user initiates an off-ramp or withdrawal from USDC or USDT to Nigerian Naira (NGN):
• If the withdrawal amount exceeds the configured admin threshold (e.g. 140 USD), the user is directed to withdraw to their verified External Bank Account (commercial bank via NIP rails) rather than their Sivan Virtual Account.
• If the withdrawal amount is at or below the configured admin threshold, the user retains full access to both their Sivan Virtual Account and External Bank Account.
• The threshold is stored dynamically in the core settings database. Admin can increase, decrease, or completely lift the limit at any time directly from the Admin Hub without code deployment.

---

## 2. Motivation and Core Economics

### Float Protection and Regulatory Tier Realities

Sivan Virtual Accounts (issued via partner banking infrastructure like Wema Bank) operate under regulated tier structures (Tier 1 and Tier 2 KYC). These accounts enforce strict per-transaction and daily inflow limits, typically ranging between 50,000 NGN and 200,000 NGN.

When converting 140 USD at prevailing exchange rates (approximately 210,000 NGN to 230,000 NGN or higher):
• Inflows of this magnitude can breach Tier 1/2 KYC ceilings on newly provisioned virtual accounts.
• High-value virtual account credits strain the licensed float pool and increase scrutiny from partner compliance algorithms.
• External commercial bank accounts (GTBank, Access Bank, Zenith, Opay, etc.) are already fully verified Tier 3 accounts with high single-transaction limits, making them the natural clearing target for larger settlements.

### Why Admin Dynamic Control Is Essential

Exchange rates between USD and NGN change over time:
• If the Naira strengthens, 140 USD represents fewer Naira, meaning the threshold could be safely increased by the admin.
• If the Naira depreciates, 140 USD represents significantly more Naira, meaning the admin may choose to lower the threshold (e.g. to 100 USD) to keep inflows safely below virtual account tier caps.
• Setting the threshold to 0 or null allows the admin to instantly lift the limit across all channels whenever float conditions permit.

---

## 3. Exact Admin Hub Placement and UI Layout

### Target Application
Repository: sivan-admin-hub
Main Layout: app/dashboard/modules/sivan-payment/src/App.tsx
Target Component: app/dashboard/modules/sivan-payment/src/components/ControlsTab.tsx

### Navigation Hierarchy in Admin Hub
1. Open Admin Hub: https://admin.sivantech.online
2. Select Module: Sivan Payment
3. Sidebar Group: Operations
4. Tab: Controls (View Key: 'controls')
5. Sub-Section: "Offramp Controls & Rails" (or "Virtual Account Settlement Controls")

### UI Component Specification (ControlsTab.tsx)

Inside the Offramp Controls card panel, insert the new threshold control row:

• Field Label: Max Virtual Account Off-Ramp (USD)
• Component Type: Numeric Input with currency adornment ($)
• Helper Description: Stablecoin conversions above this USD value must settle directly to an external commercial bank. Enter 0 to remove this restriction and allow all amounts.
• State Binding:
  - maxVirtualAccountOfframpUsd: number
  - draft state for editing with Dirty/Save state indicator
• Action Button: "Save Offramp Threshold"
• Audit Note: Triggers ApprovalReasonModal for maker-checker accountability with reason note (e.g. "Adjusted threshold to match updated Wema Tier 1 daily limit").

---

## 4. Exact Backend Services and Routes (sivan-payment)

### Target Repository
Repository: sivan-payment

### 1. Routes Layer
File: src/controls/payment-controls.routes.ts
• GET /api/offramp/controls: Public/bot endpoint returning current offramp settings including maxVirtualAccountOfframpUsd.
• GET /api/admin/offramp/controls: Admin endpoint returning current settings plus audit trail and pending maker-checker approvals.
• PUT /api/admin/offramp/controls: Admin endpoint accepting schema updates.

### 2. Schema and Service Layer
File: src/controls/payment-controls.service.ts
• Update updatePaymentControlsSchema with:
  maxVirtualAccountOfframpUsd: z.number().nonnegative().optional()
• Update OfframpControlsResponse interface:
  maxVirtualAccountOfframpUsd: number; // default 140.00
• Update updatePaymentControls function to persist the setting into the system database and write an audit log entry.

### 3. Database Layer
File: src/database/postgres-database.ts
• Column or Key: payment_controls table or system_settings jsonb under key 'offramp.max_virtual_account_usd'.
• Default value: 140.00

---

## 5. Exact Chat Layer Changes (WhatsApp & Telegram)

### WhatsApp Layer (whatsapp-bot)
Repository: whatsapp-bot

1. API Client Integration:
File: src/services/sivanApi.ts
• Fetch and cache maxVirtualAccountOfframpUsd inside getSyncOfframpControls() with 5-minute TTL.

2. Off-Ramp & Withdrawal Method Router:
File: src/handlers/cashoutSwap.ts
• When user requests stablecoin (USDC/USDT) withdrawal to NGN:
  - If amountUsd > maxVirtualAccountOfframpUsd (and maxVirtualAccountOfframpUsd > 0):
    - Hide the Sivan Virtual Account option.
    - Directly trigger External Commercial Bank payout.
    - Attach the reassuring high-value banner: "Sivan Ai . Secure Commercial Payout. For instant settlement on amounts above $140, payouts are sent directly to your personal commercial bank account."

3. Service Agreement Settlement Setup:
File: src/handlers/messageDispatcher.ts
• Lines ~1300 to ~1340: Before accepting a Service Agreement, if the agreed payout value exceeds the threshold, enforce external commercial bank setup to guarantee flawless settlement clearing.

### Telegram Layer (Telegram-layer)
Repository: Telegram-layer

1. API Client Integration:
File: src/services/sivanApi.ts
• Add maxVirtualAccountOfframpUsd to cached offramp limits.

2. Withdrawal Dispatcher:
File: src/handlers/cashout.ts
• Apply identical threshold check when building interactive keyboard buttons. If above limit, present only External Bank option.

---

## 6. User-Facing Messaging and Experience

The user must never feel restricted or penalized. The messaging is framed as an enterprise-grade security and speed advantage.

### High-Value Settlement Copy (Above Threshold)

Header:
Sivan Ai . Secure Commercial Payout

Message Body:
For instant settlement on amounts above $140, payouts are sent directly to your personal commercial bank account (GTBank, Access, Zenith, Opay, etc.).

Action Buttons:
1. Payout to Bank
2. Cancel

### External Bank Collection (If Not Yet Saved on Profile)

If the user does not have an external bank saved:
• "Please reply with your 10-digit account number and bank name (e.g. 0123456789 GTBank)."
• Sivan Ai performs a live NIP account name lookup.
• User confirms account name: "Olaleye Samson (GTBank) . Tap Confirm to proceed."
• Payout dispatches seamlessly without restarting the flow.

---

## 7. Edge Cases and Defensive Guardrails

• USD Comparison Integrity: Always compare against the source stablecoin value (e.g. USDC or USDT input amount), not the converted NGN value. This ensures zero risk from intra-hour FX swings.
• Zero or Negative Values: Input of 0, negative values, or empty strings in Admin Hub must strictly evaluate to disabled limit (no restriction).
• Service Agreement Payout Parity: When a service provider settles earnings from a completed Service Agreement, this same policy applies to ensure high-ticket contractor payouts clear cleanly without virtual account tier bottlenecks.
• High-Volume Concurrency: Limits must be loaded into memory cache with background refresh so that webhook and conversational response times remain sub-second (0.15s target).

---

## 8. Implementation Checklist (For Future Build Phase)

• Admin Hub: Add Max Virtual Account Off-Ramp (USD) input to ControlsTab.tsx in sivan-admin-hub.
• Core Backend: Add maxVirtualAccountOfframpUsd to payment-controls.service.ts and payment-controls.routes.ts in sivan-payment.
• WhatsApp Layer: Integrate check in cashoutSwap.ts and messageDispatcher.ts in whatsapp-bot.
• Telegram Layer: Integrate identical check in cashout.ts in Telegram-layer.
• End-to-End Testing: Verify with 50 USDC (both options visible), 145 USDC (external bank only), and 0 limit (both options visible).
