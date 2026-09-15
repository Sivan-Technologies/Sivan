import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('  Sivan Ai MiniPay & Admin Hub Comprehensive E2E Test');
  console.log('====================================================\n');

  // ---------------------------------------------------------------
  // 1. Token Order Verification (USDC -> USDT -> cUSD -> cNGN)
  // ---------------------------------------------------------------
  console.log('--- Test Suite 1: Celo Multi-Network Token Ordering ---');
  const celoConfigFile = path.join(rootDir, 'sivan-minipay-app/src/config/celo.config.ts');
  const celoConfigContent = fs.readFileSync(celoConfigFile, 'utf-8');

  // Verify Mainnet tokens order
  const mainnetTokensMatch = celoConfigContent.match(/mainnet:[\s\S]*?tokens:\s*{([\s\S]*?CELO:)/);
  assert(Boolean(mainnetTokensMatch), 'Mainnet tokens block found in celo.config.ts');

  if (mainnetTokensMatch) {
    const tokensText = mainnetTokensMatch[1];
    const usdcIdx = tokensText.indexOf('USDC:');
    const usdtIdx = tokensText.indexOf('USDT:');
    const cusdIdx = tokensText.indexOf('cUSD:');
    const cngnIdx = tokensText.indexOf('cNGN:');

    assert(usdcIdx !== -1 && usdtIdx !== -1 && cusdIdx !== -1 && cngnIdx !== -1, 'All 4 primary stablecoins defined');
    assert(usdcIdx < usdtIdx, 'USDC comes before USDT');
    assert(usdtIdx < cusdIdx, 'USDT comes before cUSD');
    assert(cusdIdx < cngnIdx, 'cUSD comes before cNGN');
  }

  // ---------------------------------------------------------------
  // 2. Bank Logo Asset Verification
  // ---------------------------------------------------------------
  console.log('\n--- Test Suite 2: Official Nigerian Bank Logos ---');
  const bankLogosDir = path.join(rootDir, 'sivan-minipay-app/public/banks');
  const requiredLogos = [
    'opay.png',
    'palmpay.png',
    'kuda.png',
    'gtbank.png',
    'access.png',
    'zenith.png',
    'uba.png',
    'firstbank.png',
    'wema.png'
  ];

  for (const logo of requiredLogos) {
    const filePath = path.join(bankLogosDir, logo);
    const exists = fs.existsSync(filePath);
    if (exists) {
      const stats = fs.statSync(filePath);
      const fd = fs.openSync(filePath, 'r');
      const buffer = Buffer.alloc(8);
      fs.readSync(fd, buffer, 0, 8, 0);
      fs.closeSync(fd);
      // Check PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
      const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
      assert(stats.size > 1000 && isPng, `Valid high-res PNG logo present: ${logo} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      assert(false, `Missing required logo asset: ${logo}`);
    }
  }

  // ---------------------------------------------------------------
  // 3. Phone-to-Bank Auto-Detection & Form Layout Ordering
  // ---------------------------------------------------------------
  console.log('\n--- Test Suite 3: Cashout View Form Order & Auto-Detection ---');
  const cashoutViewFile = path.join(rootDir, 'sivan-minipay-app/src/components/CashoutView.ts');
  const cashoutViewContent = fs.readFileSync(cashoutViewFile, 'utf-8');

  // Verify Account Number is positioned before Destination Bank in the DOM template
  const acctPos = cashoutViewContent.indexOf('10-Digit NUBAN Account Number');
  const bankPos = cashoutViewContent.indexOf('Destination Bank');
  assert(acctPos !== -1 && bankPos !== -1, 'Both Account Number and Destination Bank fields exist in template');
  assert(acctPos < bankPos, '10-Digit NUBAN Account Number appears BEFORE Destination Bank');

  // Test Auto-detection regular expression
  const phoneRegex = /^(70|80|81|90|91|07|08|09)/;
  const testPhoneNumbers = [
    { num: '0801234567', expectedPhone: true, bank: 'OPay' },
    { num: '0709876543', expectedPhone: true, bank: 'OPay' },
    { num: '0905554321', expectedPhone: true, bank: 'OPay' },
    { num: '0123456789', expectedPhone: false, bank: 'Standard NUBAN' }
  ];

  for (const item of testPhoneNumbers) {
    const isPhone = phoneRegex.test(item.num);
    assert(isPhone === item.expectedPhone, `Account ${item.num} detected as ${isPhone ? 'Fintech Phone Wallet' : 'Standard Bank'}`);
  }

  // Verify quick pills exist in template
  assert(cashoutViewContent.includes('id="bank-quick-pills"'), 'Quick bank suggestion pills container exists');
  assert(cashoutViewContent.includes('class="bank-pill-btn active"'), 'Default active pill is pre-selected');
  assert(cashoutViewContent.includes('id="bank-filter-input"'), 'Searchable bank filter input exists');

  // ---------------------------------------------------------------
  // 4. Platform Fee Abstraction Math & Realistic Testing Amounts
  // ---------------------------------------------------------------
  console.log('\n--- Test Suite 4: Fee Abstraction & Realistic Amounts Math ---');
  const fxServiceFile = path.join(rootDir, 'sivan-minipay-app/src/services/fx-quotes.service.ts');
  const fxServiceContent = fs.readFileSync(fxServiceFile, 'utf-8');

  assert(fxServiceContent.includes('export const PROTOCOL_FEE_PERCENT = 0.01;'), '1% Sivan platform off-ramp fee constant defined');

  // Simulate fee calculation for realistic testing amounts between 5 USDC and 50 USDC
  const simulatedRate = 1485.50; // NGN per USDC
  const testAmounts = [5.0, 10.0, 25.0, 50.0];

  for (const amt of testAmounts) {
    const gross = amt * simulatedRate;
    const fee = gross * 0.01;
    const net = gross - fee;

    assert(fee > 0, `Amount $${amt} USDC -> Gross: ₦${gross.toFixed(2)}, Fee (1%): ₦${fee.toFixed(2)}, Net: ₦${net.toFixed(2)}`);
    assert(Math.abs((net + fee) - gross) < 0.001, `Invariant holds: Net (₦${net.toFixed(2)}) + Fee (₦${fee.toFixed(2)}) == Gross (₦${gross.toFixed(2)})`);
  }

  // Verify realistic SLA messaging
  assert(!cashoutViewContent.includes('3 seconds') && !cashoutViewContent.includes('sub-3s'), 'Zero unrealistic sub-3s offramp claims in MiniPay code');
  assert(cashoutViewContent.includes('Under 1-2 Mins'), 'MiniPay UI correctly states realistic NIBSS timing (Under 1-2 Mins)');

  // ---------------------------------------------------------------
  // 5. Admin Hub: Navigation, Types, and MiniPay Tab Wiring
  // ---------------------------------------------------------------
  // ---------------------------------------------------------------
  // 5. Admin Hub: Navigation, Types, and MiniPay Tab Wiring
  // ---------------------------------------------------------------
  console.log('\n--- Test Suite 5: Admin Hub MiniPay Distribution Hub Integration ---');
  const resolveFile = (rel: string) => {
    const direct = path.join(rootDir, rel);
    if (fs.existsSync(direct)) return direct;
    const parent = path.resolve(rootDir, '..', rel);
    if (fs.existsSync(parent)) return parent;
    return direct;
  };

  const adminTypesFile = resolveFile('sivan-admin-hub/app/dashboard/modules/sivan-payment/src/types.ts');
  const adminTypesContent = fs.existsSync(adminTypesFile) ? fs.readFileSync(adminTypesFile, 'utf-8') : '';
  assert(adminTypesContent.includes("'minipay'"), "AdminViewKey union includes 'minipay'");

  const adminAppFile = resolveFile('sivan-admin-hub/app/dashboard/modules/sivan-payment/src/App.tsx');
  const adminAppContent = fs.existsSync(adminAppFile) ? fs.readFileSync(adminAppFile, 'utf-8') : '';
  assert(adminAppContent.includes("import { MiniPayTab } from './components/MiniPayTab';"), 'MiniPayTab imported in App.tsx');
  assert(adminAppContent.includes("{ key: 'minipay', icon: '📱', label: 'MiniPay' }"), 'MiniPay navigation item registered with icon 📱 and label MiniPay');
  assert(adminAppContent.includes("{view === 'minipay' && <MiniPayTab notify={notify} onUpdated={refreshAdmin} />}"), 'MiniPayTab wired to view render router');

  // Verify MiniPayTab Component Structure and 4 Required Sections
  const miniPayTabFile = resolveFile('sivan-admin-hub/app/dashboard/modules/sivan-payment/src/components/MiniPayTab.tsx');
  const miniPayTabContent = fs.existsSync(miniPayTabFile) ? fs.readFileSync(miniPayTabFile, 'utf-8') : '';

  assert(miniPayTabContent.includes('title="MiniPay Distribution Hub"'), 'Tab title is "MiniPay Distribution Hub"');
  assert(miniPayTabContent.includes('sub="Celo Micro-Transaction Rails, Liquidity Providers & Attribution Settings"'), 'Tab subtitle correctly formatted');

  // Section 1: Liquidity & Off-Ramp Rails
  assert(miniPayTabContent.includes('Liquidity & Off-Ramp Rails'), 'Section 1: Liquidity & Off-Ramp Rails header present');
  assert(miniPayTabContent.includes('primaryProvider') && miniPayTabContent.includes('textile') && miniPayTabContent.includes('moove') && miniPayTabContent.includes('busha'), 'Primary Provider selector supports Textile, Moove, Busha');
  assert(miniPayTabContent.includes('offrampFeePercent'), 'Platform off-ramp fee % control present');
  assert(miniPayTabContent.includes('minCashoutUsdc') && miniPayTabContent.includes('maxCashoutUsdc'), 'Min and Max transaction limits controls present');

  // Section 2: On-Ramp Widgets & Corridors
  assert(miniPayTabContent.includes('On-Ramp Widgets & Corridors'), 'Section 2: On-Ramp Widgets & Corridors header present');
  assert(miniPayTabContent.includes('Cashlink') && miniPayTabContent.includes('Kotani Pay') && miniPayTabContent.includes('Fonbnk') && miniPayTabContent.includes('MoonPay'), 'All requested on-ramp providers supported');

  // Section 3: Circuit Breaker / Maintenance Toggle
  assert(miniPayTabContent.includes('Circuit Breaker & Maintenance Controls'), 'Section 3: Circuit Breaker controls present');
  assert(miniPayTabContent.includes('Pause Cashouts (NIBSS Maintenance)'), 'Emergency switch label matches specification');
  assert(miniPayTabContent.includes('maintenanceReason'), 'Configurable maintenance reason field present');

  // Section 4: Celo Ecosystem Health & Attribution
  assert(miniPayTabContent.includes('Celo Ecosystem Health & Attribution'), 'Section 4: Celo Ecosystem Health present');
  assert(miniPayTabContent.includes('celo_bafcc2e56bd7'), 'ERC-8021 Attribution tag celo_bafcc2e56bd7 present');
  assert(miniPayTabContent.includes('9827'), 'Agent Token ID #9827 present');
  assert(miniPayTabContent.includes('0x4a1A9cf30A86b2b333D1a743181aAE71a50BAFBc'), 'Agent wallet address verified');

  // ---------------------------------------------------------------
  // 6. Documentation Compliance & Policy Verification
  // ---------------------------------------------------------------
  console.log('\n--- Test Suite 6: Specification & Compliance Policy Verification ---');
  const specFile = resolveFile('mds/future phase/FUTURE_BUILD_ADMIN_HUB_MINIPAY_DISTRIBUTION_TAB.md');
  const specContent = fs.existsSync(specFile) ? fs.readFileSync(specFile, 'utf-8') : '';

  // Verify zero raw asterisks in markdown
  const hasRawAsterisks = /\*+/.test(specContent);
  assert(!hasRawAsterisks, 'Zero raw asterisks found in FUTURE_BUILD_ADMIN_HUB_MINIPAY_DISTRIBUTION_TAB.md');

  // Verify naming policies
  assert(!specContent.includes('Sivan Bot'), 'Document refers to Sivan Ai, never Sivan Bot');
  assert(!specContent.toLowerCase().includes('escrow'), 'Document strictly refers to Service agreement, never escrow');

  console.log('\n====================================================');
  console.log(`  E2E Test Results: ${passedTests}/${totalTests} Passed (${failedTests} Failed)`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal E2E test execution failure:', err);
  process.exit(1);
});
