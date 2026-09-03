# WebMCP Master Resource and Build Guide
# Sivan AI — Autonomous Multi-Chain Settlement Layer for Browser Agents

---

## 1. Executive Overview

WebMCP (Web Model Context Protocol) is the open W3C standard that allows web applications to expose client-side JavaScript functions as structured tools for AI agents. 

This guide contains the complete technical reference, partner resources, architecture specifications, and testing playbooks for Sivan AI's WebMCP implementation.

---

## 2. Official Documentation & Specifications

### Primary Standards & Guides
- W3C WebMCP Specification Repository: https://github.com/webmachinelearning/webmcp
- Google Chrome Official WebMCP Developer Docs: https://developer.chrome.com/docs/ai/webmcp
- Chrome WebMCP Origin Trial Guide: https://developer.chrome.com/blog/ai-webmcp-origin-trial
- WebMCP Security & Trust Boundary Guide: https://developer.chrome.com/docs/ai/webmcp/secure-tools
- TypeScript Definitions: https://www.npmjs.com/package/webmcp-types
- useWebMCPTool React Hook: https://www.npmjs.com/package/use-webmcp-tool

---

## 3. Hackathon Supporter Resources & Ecosystem Tools

### OpenAI
- WebMCP Showcase: https://developers.openai.com/showcase?view=webmcp-apps
- ChatGPT Sites Guide: https://learn.chatgpt.com/docs/sites?surface=app
- WebMCP Guide: http://learn.chatgpt.com/docs/webmcp

### Cloudflare
- Cloudflare WebMCP Architecture Overview: https://blog.cloudflare.com/webmcp/
- WebMCP on Browser Run: https://developers.cloudflare.com/browser-run/features/webmcp/
- WebMCP on Workers React Template: https://github.com/cloudflare/agents/tree/main/examples/webmcp-react
- Cloudflare Challenge Hub: https://webmcp-challenge.examples.workers.dev/

### Google Chrome
- Chrome DevTools WebMCP Debugger: https://developer.chrome.com/docs/devtools/application/webmcp
- Chrome WebMCP Evals: https://developer.chrome.com/docs/ai/webmcp/evals
- Modern Web Guidance & Agent Skills: https://github.com/GoogleChrome/modern-web-guidance
- Google Chrome Labs WebMCP Demos: https://github.com/GoogleChromeLabs/webmcp-tools/tree/main/demos

### Render
- Render Workflows for Agents: https://render.com/workflows
- Render Starter Templates: https://render.com/templates
- Render Credits Portal: https://credits-portal-mmdm.onrender.com/claim/openai-hackathon

### Vercel
- Open Source Storefront Implementation: https://github.com/vercel/shop/pull/498
- Live WebMCP Storefront Demo: https://template.vercel.shop/

### Shopify
- Shopify WebMCP Documentation: https://shopify.dev/docs/api/web-mcp
- Shopify Agentic Tools & Catalog API: https://shopify.dev/docs/agents

### Netlify
- Netlify Getting Started Guide: https://docs.netlify.com/start/choose-your-path/
- WebMCP Netlify Starter: https://webmcp-starter.netlify.app/

---

## 4. Sivan AI WebMCP Technical Architecture

```
[ Browser AI Agent (ChatGPT / Chrome Gemini) ]
                      |
                      | 1. Discovers document.modelContext tools
                      v
[ Sivan WebMCP Client (src/webmcp.js) on https://staging.sivantech.online ]
                      |
                      | 2. Displays on-screen human approval card
                      v
[ Human User Sign-Off (Click 'Approve & Fund') ]
                      |
                      | 3. Authenticated API Call via Cloudflare Edge
                      v
[ Cloudflare Gateway (sivan-gateway) ]
                      |
                      | 4. Dispatches to Render Microservices
                      v
[ Sivan Multi-Chain Core (Fastify + PostgreSQL on Render) ]
        |                   |                    |
        v                   v                    v
  [ Solana web3.js ]  [ Base / EVM ]   [ Stellar Horizon RPC ]
```

---

## 5. Registered Sivan WebMCP Tools Reference

Sivan AI exposes 4 client-side tools on document.modelContext:

### Tool 1: create_service_agreement
- Name: create_service_agreement
- Purpose: Drafts a milestone-based Service Agreement for freelancing or digital commerce.
- Input Schema:
  - counterparty (string, required): Recipient username, handle (@username), or wallet address.
  - amount (number, required): Agreed settlement amount in USDC.
  - currency (string, optional): Settlement asset (default: USDC).
  - milestones (number, optional): Number of milestone stages (default: 1).
  - deliverables (string, required): Detailed scope of work and acceptance criteria.
- Execution: Invokes POST /api/agreements/draft and renders the on-screen review modal for user sign-off.

### Tool 2: get_wallet_balances
- Name: get_wallet_balances
- Purpose: Queries real-time available balances across all supported multi-chain networks.
- Input Schema:
  - asset (string, optional): Asset balance to query (default: usdc).
- Execution: Calls GET /api/balances/unified and returns spendable balances across Solana, Base, Stellar, Celo, and BSC.

### Tool 3: fund_service_agreement
- Name: fund_service_agreement
- Purpose: Locks USDC into the approved Service Agreement smart contract or ledger.
- Input Schema:
  - agreementId (string, required): Identifier of the active Service Agreement.
  - network (string, required): Blockchain network (solana | base | stellar | celo | bsc).
- Execution: Dispatches transaction broadcast and returns verifiable transaction signature / hash.

### Tool 4: release_agreement_milestone
- Name: release_agreement_milestone
- Purpose: Releases milestone funds to the contractor upon delivery confirmation.
- Input Schema:
  - agreementId (string, required): Identifier of the active Service Agreement.
  - milestoneIndex (number, optional): Zero-indexed milestone number (default: 0).
- Execution: Dispatches payout to the contractor and generates on-chain receipt.

---

## 6. Testing & Debugging Playbook

### Method A: Testing in Google Chrome (W3C Standard)
1. Launch Google Chrome 149+ and navigate to:
   chrome://flags/#enable-webmcp-testing
2. Set the flag to Enabled and restart Chrome.
3. Open the Sivan staging web app:
   https://staging.sivantech.online
4. Open Chrome DevTools (F12 or Inspect -> Console).
5. Inspect all registered tools:
   const tools = await document.modelContext.getTools();
   console.table(tools.map(t => ({ name: t.name, description: t.description })));
6. Execute a live tool test:
   await document.modelContext.executeTool(
     tools.find(t => t.name === 'create_service_agreement'),
     { counterparty: '@designer', amount: 20, deliverables: 'Website UI redesign' }
   );
7. Confirm that the human-in-the-loop review card renders immediately in the Sivan interface.

### Method B: Testing in ChatGPT In-App Browser
1. Open ChatGPT Desktop or the ChatGPT mobile/web in-app browser.
2. Navigate to https://staging.sivantech.online
3. In the ChatGPT prompt box, type:
   Check my Sivan balance and help me draft a service agreement with @designer for 20 USDC.
4. ChatGPT will discover Sivan's registered WebMCP tools and interact directly with the page.

---

## 7. Submission Checklist for Hackathon Judges

- Working Live URL: https://staging.sivantech.online
- Production Web App: https://app.sivantech.online
- Public Open-Source Repository: https://github.com/Sivan-Technologies/Sivan
- Open Source License: MIT License (visible in repo About section)
- WebMCP Implementation Code: src/webmcp.js in public repository
- Telegram AI Staging Bot: https://t.me/SivanStaging_Bot
- Telegram AI Live Bot: https://t.me/Sivan_Ai
- Founder: Samson Micheal (Abuja, Nigeria)
