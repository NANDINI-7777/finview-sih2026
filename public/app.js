/**
 * FinView Frontend Application Logic
 * Smart India Hackathon 2026 Interactive Prototype
 * 
 * Features:
 *   - Auto-detects Server Backend (http://localhost:5000)
 *   - Embedded Fallback DPI Engine (Zero-fail offline resilience for SIH judging)
 *   - Dynamic DPDP Consent & Scoped Aggregation
 *   - Chart.js Visualizations & Multi-Tier Lapse Timeline
 */

const API_BASE = (window.location.origin && window.location.origin !== "null" && !window.location.protocol.startsWith("file"))
  ? window.location.origin
  : "http://localhost:5000";

// Embedded Fallback Mock DB (Ensures 100% demo reliability in all conditions)
const LOCAL_MOCK_DB = {
  "users": {
    "user-123": {
      "id": "user-123",
      "fullName": "Aarav Sharma",
      "pan": "ABCDE1234F",
      "mobile": "+91 98765 43210",
      "email": "aarav.sharma@example.com",
      "dob": "1994-06-18",
      "city": "Bengaluru, Karnataka",
      "emergencyContact": {
        "name": "Priya Sharma",
        "relation": "Spouse",
        "mobile": "+91 98765 01234",
        "accessAuthorized": true
      }
    }
  },
  "policies": {
    "user-123": [
      {
        "policyId": "POL-LIC-88291",
        "insurer": "Life Insurance Corp of India",
        "insurerLogo": "lic",
        "policyName": "Jeevan Amar Term Plan",
        "policyType": "TERM_LIFE",
        "policyCategory": "Life Insurance",
        "coverageAmount": 10000000,
        "currency": "INR",
        "premiumAmount": 14250,
        "premiumFrequency": "ANNUAL",
        "startDate": "2021-03-15",
        "expiryDate": "2051-03-14",
        "renewalDueDate": "2026-08-25",
        "status": "URGENT_DUE",
        "gracePeriodDays": 30,
        "nominee": "Priya Sharma (Spouse - 100%)",
        "policyBondUrl": "#",
        "daysRemaining": 3,
        "urgencyLevel": "high"
      },
      {
        "policyId": "POL-STAR-44120",
        "insurer": "Star Health & Allied Insurance",
        "insurerLogo": "star",
        "policyName": "Family Health Optima Comprehensive",
        "policyType": "HEALTH",
        "policyCategory": "Health Insurance",
        "coverageAmount": 1500000,
        "currency": "INR",
        "premiumAmount": 19800,
        "premiumFrequency": "ANNUAL",
        "startDate": "2023-08-01",
        "expiryDate": "2026-07-31",
        "renewalDueDate": "2026-08-01",
        "status": "IN_GRACE_PERIOD",
        "gracePeriodDays": 30,
        "gracePeriodEnd": "2026-08-31",
        "membersCovered": ["Aarav Sharma (Self)", "Priya Sharma (Spouse)", "Kabir Sharma (Son)"],
        "nominee": "Priya Sharma (Spouse)",
        "daysRemaining": 9,
        "urgencyLevel": "critical"
      },
      {
        "policyId": "POL-HDFC-99214",
        "insurer": "HDFC ERGO General Insurance",
        "insurerLogo": "hdfc",
        "policyName": "Private Car Comprehensive Cover",
        "policyType": "MOTOR",
        "policyCategory": "Motor Insurance",
        "vehicleNumber": "KA-01-MJ-4590",
        "vehicleModel": "Hyundai Creta SX 2022",
        "coverageAmount": 1250000,
        "currency": "INR",
        "premiumAmount": 16400,
        "premiumFrequency": "ANNUAL",
        "startDate": "2025-11-10",
        "expiryDate": "2026-11-09",
        "renewalDueDate": "2026-11-09",
        "status": "ACTIVE",
        "nominee": "Priya Sharma (Spouse)",
        "daysRemaining": 79,
        "urgencyLevel": "low"
      },
      {
        "policyId": "POL-MAX-10294",
        "insurer": "Max Life Insurance Co.",
        "insurerLogo": "max",
        "policyName": "Smart Wealth Plan (ULIP)",
        "policyType": "INVESTMENT_INSURANCE",
        "policyCategory": "Life & Savings",
        "coverageAmount": 2500000,
        "currency": "INR",
        "premiumAmount": 60000,
        "premiumFrequency": "ANNUAL",
        "startDate": "2022-01-20",
        "expiryDate": "2042-01-19",
        "renewalDueDate": "2027-01-20",
        "status": "ACTIVE",
        "fundValue": 284500,
        "nominee": "Not Registered (⚠️ Missing Nominee)",
        "daysRemaining": 151,
        "urgencyLevel": "medium_warning"
      }
    ]
  },
  "holdings": {
    "user-123": [
      {
        "folioId": "MF-CAMS-77321",
        "schemeName": "Parag Parikh Flexi Cap Fund - Direct Growth",
        "category": "Mutual Fund",
        "assetClass": "EQUITY",
        "units": 2450.41,
        "nav": 92.15,
        "currentValue": 225805,
        "investedValue": 160000,
        "returns": { "absolute": 65805, "percentage": 41.13 },
        "sipAmount": 5000,
        "nextSipDate": "2026-09-05",
        "nomineeRegistered": true
      },
      {
        "folioId": "MF-KFIN-19087",
        "schemeName": "HDFC Corporate Bond Fund - Direct Growth",
        "category": "Mutual Fund",
        "assetClass": "DEBT",
        "units": 4510.12,
        "nav": 28.40,
        "currentValue": 128087,
        "investedValue": 115000,
        "returns": { "absolute": 13087, "percentage": 11.38 },
        "sipAmount": 3000,
        "nextSipDate": "2026-09-10",
        "nomineeRegistered": true
      },
      {
        "folioId": "NPS-CRA-559012",
        "schemeName": "National Pension System (NPS) - Tier I",
        "category": "Retirement Pension",
        "assetClass": "RETIREMENT",
        "units": null,
        "nav": null,
        "currentValue": 580000,
        "investedValue": 440000,
        "returns": { "absolute": 140000, "percentage": 31.81 },
        "maturityDate": "2054-06-18",
        "nomineeRegistered": true
      },
      {
        "folioId": "SGB-RBI-2021-V",
        "schemeName": "Sovereign Gold Bond 2021-22 Series V",
        "category": "Gold",
        "assetClass": "COMMODITY",
        "units": 25,
        "unitPrice": 7250,
        "currentValue": 181250,
        "investedValue": 119750,
        "returns": { "absolute": 61500, "percentage": 51.35 },
        "maturityDate": "2029-10-25",
        "nomineeRegistered": false
      }
    ]
  },
  "bankAccounts": {
    "user-123": {
      "savings": [
        {
          "accountNumber": "XXXXXX4512",
          "bankName": "HDFC Bank",
          "accountType": "SAVINGS",
          "balance": 184500.75,
          "currency": "INR",
          "branch": "Indiranagar, Bengaluru",
          "nomineeRegistered": true
        },
        {
          "accountNumber": "XXXXXX8890",
          "bankName": "State Bank of India",
          "accountType": "SAVINGS",
          "balance": 45210.00,
          "currency": "INR",
          "branch": "Koramangala, Bengaluru",
          "nomineeRegistered": true
        }
      ],
      "fixedDeposits": [
        {
          "fdNumber": "FD-HDFC-99120",
          "bankName": "HDFC Bank",
          "principal": 300000,
          "interestRate": 7.25,
          "startDate": "2024-02-15",
          "maturityDate": "2027-02-15",
          "maturityValue": 371940,
          "status": "ACTIVE",
          "nominee": "Priya Sharma"
        },
        {
          "fdNumber": "FD-SBI-33019",
          "bankName": "State Bank of India",
          "principal": 150000,
          "interestRate": 6.80,
          "startDate": "2025-05-10",
          "maturityDate": "2026-11-10",
          "maturityValue": 165680,
          "status": "ACTIVE",
          "nominee": "Priya Sharma"
        }
      ]
    }
  },
  "familyMembers": {
    "user-123": [
      {
        "id": "fam-1",
        "name": "Priya Sharma",
        "relationship": "Spouse",
        "dob": "1995-11-04",
        "hasDirectAccount": true,
        "isEmergencyContact": true,
        "policiesLinkedAsNominee": 4
      },
      {
        "id": "fam-2",
        "name": "Kabir Sharma",
        "relationship": "Son",
        "dob": "2022-04-12",
        "hasDirectAccount": false,
        "isEmergencyContact": false,
        "policiesLinkedAsNominee": 0
      },
      {
        "id": "fam-3",
        "name": "Rajendra Sharma",
        "relationship": "Father",
        "dob": "1963-02-10",
        "hasDirectAccount": false,
        "isEmergencyContact": false,
        "policiesLinkedAsNominee": 0
      }
    ]
  }
};

// Application State
const state = {
  currentStep: 1,
  userId: "user-123",
  currentToken: null,
  currentConsentId: null,
  consentRecord: null,
  aggregateData: null,
  activeFilter: "ALL",
  isBackendConnected: false,
  charts: {}
};

// Helper to generate mock client-side JWT when offline
function generateClientToken(payload) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const sig = btoa("mock-simulated-hmac-sha256-signature-sih2026");
  return `${header}.${body}.${sig}`;
}

// Check backend connectivity on startup
async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { mode: 'cors' });
    if (res.ok) {
      state.isBackendConnected = true;
      const dot = document.getElementById("globalStatusDot");
      const text = document.getElementById("globalStatusText");
      if (dot && text && !state.currentToken) {
        dot.className = "badge-dot";
        text.innerText = "DPI Gateway (Online)";
      }
      return;
    }
  } catch (e) {
    state.isBackendConnected = false;
  }
  const dot = document.getElementById("globalStatusDot");
  const text = document.getElementById("globalStatusText");
  if (dot && text) {
    dot.className = "badge-dot";
    text.innerText = "Simulated DPI Environment (Ready)";
  }
}

// ============================================================================
// Step Navigation & UI Transitions
// ============================================================================

function goToStep(step) {
  state.currentStep = step;

  // Update Stepper Indicators
  document.querySelectorAll(".step-item").forEach((el, idx) => {
    el.classList.remove("active", "completed");
    if (idx + 1 < step) el.classList.add("completed");
    if (idx + 1 === step) el.classList.add("active");
  });

  // Toggle View Panels
  document.getElementById("step1-view").style.display = step === 1 ? "block" : "none";
  document.getElementById("step2-view").style.display = step === 2 ? "block" : "none";
  document.getElementById("step3-view").style.display = step === 3 ? "block" : "none";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateConsentBoxStyle(boxId, checkbox) {
  const box = document.getElementById(boxId);
  if (checkbox.checked) {
    box.classList.add("checked");
  } else {
    box.classList.remove("checked");
  }
}

// ============================================================================
// Step 1: Demo Auth & Identity Verification
// ============================================================================

function handleAuthSubmit(e) {
  e.preventDefault();
  const pan = document.getElementById("panInput").value.trim().toUpperCase();
  const mobile = document.getElementById("mobileInput").value.trim();
  const otpGroup = document.getElementById("otpGroup");
  const authBtn = document.getElementById("authBtn");

  if (otpGroup.style.display === "none") {
    otpGroup.style.display = "block";
    authBtn.innerHTML = `<i data-lucide="shield-check"></i> Confirm OTP & Grant Consent`;
    lucide.createIcons();
    logInspector("DEMO_KYC_AUTH", { status: "OTP_DISPATCHED", pan, mobile, demoOtp: "123456" });
    return;
  }

  logInspector("DEMO_KYC_VERIFIED", { status: "SUCCESS", pan, mobile, verifiedAt: new Date().toISOString() });
  goToStep(2);
}

// ============================================================================
// Step 2: DPDP Act Consent Issuance
// ============================================================================

async function handleIssueConsent() {
  const scopes = [];
  if (document.getElementById("scope-ins").checked) scopes.push("INSURANCE_READ");
  if (document.getElementById("scope-inv").checked) scopes.push("INVESTMENT_READ");
  if (document.getElementById("scope-bnk").checked) scopes.push("BANK_READ");

  if (scopes.length === 0) {
    alert("Please select at least one Financial Information Provider (FIP) scope.");
    return;
  }

  const purpose = document.getElementById("consentPurpose").value;
  const dataLifeDays = Number(document.getElementById("dataLifeSlider").value) || 30;

  // Attempt server fetch first, fallback to robust embedded simulation
  let issuedData = null;
  try {
    const res = await fetch(`${API_BASE}/consent/issue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: state.userId,
        scopes,
        purpose,
        dataLifeDays,
        fetchType: "PERIODIC"
      })
    });

    if (res.ok) {
      issuedData = await res.json();
      state.isBackendConnected = true;
    }
  } catch (err) {
    console.warn("Backend fetch failed, activating embedded local DPI simulation:", err.message);
  }

  // Fallback / Offline generator
  if (!issuedData) {
    const consentId = "CONSENT-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    const consentHandle = "HNDL-" + Math.random().toString(36).substring(2, 11).toUpperCase();
    const nowSec = Math.floor(Date.now() / 1000);
    const expSec = nowSec + (dataLifeDays * 86400);

    const payload = {
      consentId,
      consentHandle,
      userId: state.userId,
      scopes,
      purpose,
      fetchType: "PERIODIC",
      dataLifeDays,
      fiuId: "FINVIEW-FIU-LOCAL-SIM",
      iat: nowSec,
      exp: expSec
    };

    issuedData = {
      consentId,
      consentHandle,
      token: generateClientToken(payload),
      expiresAt: new Date(expSec * 1000).toISOString(),
      record: { ...payload, revoked: false }
    };
  }

  state.currentToken = issuedData.token;
  state.currentConsentId = issuedData.consentId;
  state.consentRecord = issuedData.record;

  // Update Global Badge
  document.getElementById("globalStatusDot").className = "badge-dot";
  document.getElementById("globalStatusText").innerText = `Consent Active (${scopes.length} FIPs Linked)`;

  logInspector("POST /consent/issue (200 OK)", issuedData);
  updateCurlSnippet(issuedData.token);

  await fetchAggregateData();
  goToStep(3);
}

// ============================================================================
// Step 3: Multi-FIP Aggregation & Dashboard Render
// ============================================================================

async function fetchAggregateData(isManualSync = false) {
  if (!state.currentToken) {
    alert("No active consent token. Please complete consent authorization.");
    goToStep(2);
    return;
  }

  let data = null;

  // Try server aggregation first
  if (state.isBackendConnected) {
    try {
      const res = await fetch(`${API_BASE}/api/v1/aggregate`, {
        headers: { Authorization: `Bearer ${state.currentToken}` }
      });

      if (res.status === 403) {
        handleRevokedState();
        return;
      }

      if (res.ok) {
        data = await res.json();
      }
    } catch (err) {
      console.warn("Server aggregate fetch failed, using local dataset:", err);
    }
  }

  // Fallback / Local Aggregator engine
  if (!data) {
    const scopes = (state.consentRecord && state.consentRecord.scopes) || ["INSURANCE_READ", "INVESTMENT_READ", "BANK_READ"];
    const hasInsurance = scopes.includes("INSURANCE_READ");
    const hasInvestment = scopes.includes("INVESTMENT_READ");
    const hasBank = scopes.includes("BANK_READ");

    const rawPolicies = LOCAL_MOCK_DB.policies[state.userId] || [];
    const notifs = [];

    rawPolicies.forEach((p) => {
      if (p.status === "IN_GRACE_PERIOD") {
        notifs.push({
          id: "NOTIF-GRACE-" + p.policyId,
          type: "CRITICAL_LAPSE_RISK",
          title: `🚨 Grace Period Alert: ${p.policyName}`,
          message: `Your premium of ₹${p.premiumAmount.toLocaleString("en-IN")} was due on ${p.renewalDueDate}. Grace period ends ${p.gracePeriodEnd}! Policy will lapse permanently if unpaid.`,
          severity: "critical",
          policyId: p.policyId,
          insurer: p.insurer,
          dueDate: p.renewalDueDate,
          amount: p.premiumAmount
        });
      } else if (p.daysRemaining <= 7 && p.status === "URGENT_DUE") {
        notifs.push({
          id: "NOTIF-DUE-" + p.policyId,
          type: "UPCOMING_RENEWAL",
          title: `⏳ Payment Due in ${p.daysRemaining} Days: ${p.policyName}`,
          message: `Annual premium of ₹${p.premiumAmount.toLocaleString("en-IN")} for ${p.policyId} (${p.insurer}) is due on ${p.renewalDueDate}. Pay now to maintain continuous coverage.`,
          severity: "urgent",
          policyId: p.policyId,
          insurer: p.insurer,
          dueDate: p.renewalDueDate,
          amount: p.premiumAmount
        });
      }
    });

    data = {
      userId: state.userId,
      consentId: state.currentConsentId,
      aggregatedAt: new Date().toISOString(),
      userProfile: LOCAL_MOCK_DB.users[state.userId],
      familyMembers: LOCAL_MOCK_DB.familyMembers[state.userId],
      insurance: {
        consented: hasInsurance,
        data: hasInsurance ? rawPolicies : null,
        fip: hasInsurance ? "FIP-IRDAI-INSURER-01" : null
      },
      investments: {
        consented: hasInvestment,
        data: hasInvestment ? LOCAL_MOCK_DB.holdings[state.userId] : null,
        fip: hasInvestment ? "FIP-SEBI-RTA-INVESTMENT-01" : null
      },
      banking: {
        consented: hasBank,
        data: hasBank ? LOCAL_MOCK_DB.bankAccounts[state.userId] : null,
        fip: hasBank ? "FIP-RBI-BANKING-01" : null
      },
      notifications: notifs
    };
  }

  state.aggregateData = data;
  logInspector("GET /api/v1/aggregate (200 OK)", data);
  renderDashboard(data);

  if (isManualSync) {
    alert("✅ Data successfully re-synchronized from all authorized FIPs!");
  }
}

function renderDashboard(data) {
  const profile = data.userProfile || {};
  const policies = (data.insurance && data.insurance.data) || [];
  const holdings = (data.investments && data.investments.data) || [];
  const banking = (data.banking && data.banking.data) || { savings: [], fixedDeposits: [] };
  const notifications = data.notifications || [];

  // Update User Greeting
  if (profile.fullName) {
    document.getElementById("userGreeting").innerText = `Welcome, ${profile.fullName}`;
    document.getElementById("userSubtext").innerText = `PAN: ${profile.pan} • Mobile: ${profile.mobile} • ${profile.city}`;
  }

  // Calculate Metrics
  let totalCover = policies.reduce((acc, p) => acc + (p.coverageAmount || 0), 0);
  let upcomingDue = policies
    .filter((p) => p.status === "URGENT_DUE" || p.status === "IN_GRACE_PERIOD")
    .reduce((acc, p) => acc + (p.premiumAmount || 0), 0);

  let totalWealth = 0;
  holdings.forEach((h) => (totalWealth += h.currentValue || 0));
  (banking.savings || []).forEach((s) => (totalWealth += s.balance || 0));
  (banking.fixedDeposits || []).forEach((fd) => (totalWealth += fd.principal || 0));

  document.getElementById("card-total-cover").innerText = "₹" + totalCover.toLocaleString("en-IN");
  document.getElementById("card-upcoming-due").innerText = "₹" + upcomingDue.toLocaleString("en-IN");
  document.getElementById("card-total-wealth").innerText = "₹" + totalWealth.toLocaleString("en-IN");

  // Tab Pill Counters
  document.getElementById("badge-policy-count").innerText = policies.length;
  document.getElementById("badge-invest-count").innerText = holdings.length + (banking.fixedDeposits || []).length;
  document.getElementById("badge-urgent-count").innerText = `${notifications.length} Alerts`;

  // Render Sub-Views
  renderNotifications(notifications);
  renderPolicies(policies);
  renderLapseTimeline(policies, notifications);
  renderHoldingsAndBanking(holdings, banking);
  renderPrivacyHub();
  renderCharts(policies, holdings, banking);

  lucide.createIcons();
}

// ============================================================================
// Hub Renders
// ============================================================================

function renderNotifications(notifs) {
  const container = document.getElementById("notificationsContainer");
  container.innerHTML = "";

  if (notifs.length === 0) {
    container.innerHTML = `
      <div class="alert-banner alert-info">
        <div class="alert-content">
          <span class="alert-icon">✨</span>
          <div>
            <strong>All Policies Healthy:</strong>
            <p style="font-size: 0.85rem;">No immediate premium dues or grace period lapses detected.</p>
          </div>
        </div>
      </div>
    `;
    return;
  }

  notifs.forEach((n) => {
    const isCritical = n.severity === "critical";
    const bannerClass = isCritical ? "alert-danger" : "alert-warning";
    const icon = isCritical ? "🚨" : "⏳";

    const div = document.createElement("div");
    div.className = `alert-banner ${bannerClass}`;
    div.innerHTML = `
      <div class="alert-content">
        <span class="alert-icon">${icon}</span>
        <div>
          <strong style="font-size: 0.95rem;">${n.title}</strong>
          <p style="font-size: 0.85rem; margin-top: 2px;">${n.message}</p>
        </div>
      </div>
      <div>
        <button class="btn btn-sm ${isCritical ? 'btn-danger' : 'btn-primary'}" onclick="openReminderModal('${n.policyId}')">
          <i data-lucide="message-square"></i> Simulate Reminder
        </button>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderPolicies(policies) {
  const grid = document.getElementById("policiesGrid");
  grid.innerHTML = "";

  if (!state.aggregateData.insurance.consented) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; background: white; padding: 2rem; border-radius: 12px; text-align: center; border: 1px dashed #cbd5e1;">
        <h4 style="color: #64748b;">🔒 Insurance Scope Not Granted</h4>
        <p style="font-size: 0.85rem; color: #94a3b8; margin: 0.5rem 0 1rem;">You did not select INSURANCE_READ during consent authorization.</p>
        <button class="btn btn-secondary btn-sm" onclick="goToStep(2)">Update Consent Scopes</button>
      </div>
    `;
    return;
  }

  const filtered = policies.filter((p) => {
    if (state.activeFilter === "ALL") return true;
    if (state.activeFilter === "LIFE") return p.policyType.includes("LIFE");
    if (state.activeFilter === "HEALTH") return p.policyType.includes("HEALTH");
    if (state.activeFilter === "MOTOR") return p.policyType.includes("MOTOR");
    return true;
  });

  filtered.forEach((p) => {
    let cardType = "healthy";
    let statusBadge = `<span class="status-badge status-active">Active</span>`;

    if (p.status === "IN_GRACE_PERIOD") {
      cardType = "critical";
      statusBadge = `<span class="status-badge status-grace">Grace Period (${p.daysRemaining}d left)</span>`;
    } else if (p.status === "URGENT_DUE") {
      cardType = "urgent";
      statusBadge = `<span class="status-badge status-urgent">Due in ${p.daysRemaining} Days</span>`;
    }

    const card = document.createElement("div");
    card.className = `policy-card ${cardType}`;
    card.innerHTML = `
      <div>
        <div class="policy-top">
          <div>
            <div class="insurer-tag">${p.insurer}</div>
            <div class="policy-name">${p.policyName}</div>
          </div>
          ${statusBadge}
        </div>

        <div class="policy-details-grid">
          <div>
            <div class="detail-label">Sum Assured / Cover</div>
            <div class="detail-value">₹${p.coverageAmount ? p.coverageAmount.toLocaleString("en-IN") : "N/A"}</div>
          </div>
          <div>
            <div class="detail-label">Annual Premium</div>
            <div class="detail-value" style="color:#0284c7;">₹${p.premiumAmount.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div class="detail-label">Next Renewal Due</div>
            <div class="detail-value">${p.renewalDueDate}</div>
          </div>
          <div>
            <div class="detail-label">Policy ID</div>
            <div class="detail-value" style="font-family:monospace; font-size:0.75rem;">${p.policyId}</div>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.75rem; color: #475569; margin-bottom: 0.75rem;">
          <strong>Nominee:</strong> ${p.nominee || 'None'}
        </div>
      </div>

      <div class="policy-footer">
        <span style="color: var(--text-muted);">IRDAI Verified eIA</span>
        <button class="btn btn-primary btn-sm" onclick="openReminderModal('${p.policyId}')">
          <i data-lucide="bell"></i> Send Alert
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterPolicies(type) {
  state.activeFilter = type;
  renderPolicies((state.aggregateData.insurance && state.aggregateData.insurance.data) || []);
  lucide.createIcons();
}

function renderLapseTimeline(policies, notifs) {
  const timeline = document.getElementById("lapseTimeline");
  timeline.innerHTML = "";

  const urgentItems = policies.filter((p) => p.status === "IN_GRACE_PERIOD" || p.status === "URGENT_DUE");

  urgentItems.forEach((p) => {
    const isGrace = p.status === "IN_GRACE_PERIOD";
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-dot ${isGrace ? 'critical' : 'urgent'}"></div>
      <div class="timeline-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <h4 style="font-size: 0.95rem; color: ${isGrace ? '#dc2626' : '#d97706'};">
            ${isGrace ? '⚠️ Critical Grace Period Risk' : '⏳ Action Required: 3-Day Countdown'}
          </h4>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${p.renewalDueDate}</span>
        </div>
        <p style="font-size: 0.85rem; color: #334155; margin-bottom: 0.5rem;">
          ${p.policyName} (${p.insurer}) — Premium: ₹${p.premiumAmount.toLocaleString("en-IN")}
        </p>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-sm btn-primary" onclick="openReminderModal('${p.policyId}')">
            <i data-lucide="send"></i> Trigger Multi-Tier Reminder
          </button>
          <button class="btn btn-sm btn-secondary" onclick="alert('Simulating direct gateway payment to ${p.insurer}...')">
            Pay Premium Direct
          </button>
        </div>
      </div>
    `;
    timeline.appendChild(item);
  });

  const healthy = policies.filter((p) => p.status === "ACTIVE");
  healthy.forEach((p) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
          <h4 style="font-size: 0.95rem; color: #0f172a;">Scheduled Renewal</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${p.renewalDueDate}</span>
        </div>
        <p style="font-size: 0.85rem; color: #64748b;">
          ${p.policyName} (${p.insurer}) — ₹${p.premiumAmount.toLocaleString("en-IN")}
        </p>
      </div>
    `;
    timeline.appendChild(item);
  });
}

function renderHoldingsAndBanking(holdings, banking) {
  const hGrid = document.getElementById("holdingsGrid");
  const bGrid = document.getElementById("bankingGrid");
  hGrid.innerHTML = "";
  bGrid.innerHTML = "";

  // Holdings
  if (state.aggregateData.investments.consented) {
    holdings.forEach((h) => {
      const card = document.createElement("div");
      card.className = "policy-card";
      card.innerHTML = `
        <div class="policy-top">
          <div>
            <div class="insurer-tag">${h.category}</div>
            <div class="policy-name">${h.schemeName}</div>
          </div>
          <span class="status-badge status-active">${h.assetClass}</span>
        </div>

        <div class="policy-details-grid">
          <div>
            <div class="detail-label">Current Value</div>
            <div class="detail-value" style="color:#10b981;">₹${h.currentValue.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div class="detail-label">Invested Value</div>
            <div class="detail-value">₹${h.investedValue.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div class="detail-label">Returns</div>
            <div class="detail-value" style="color:#10b981;">+${h.returns.percentage}%</div>
          </div>
          <div>
            <div class="detail-label">Nominee Status</div>
            <div class="detail-value">${h.nomineeRegistered ? '✓ Registered' : '⚠️ Missing'}</div>
          </div>
        </div>
      `;
      hGrid.appendChild(card);
    });
  } else {
    hGrid.innerHTML = `<p style="color:#64748b; font-size:0.85rem;">🔒 Investment scope not granted.</p>`;
  }

  // Banking
  if (state.aggregateData.banking.consented) {
    (banking.fixedDeposits || []).forEach((fd) => {
      const card = document.createElement("div");
      card.className = "policy-card";
      card.innerHTML = `
        <div class="policy-top">
          <div>
            <div class="insurer-tag">${fd.bankName}</div>
            <div class="policy-name">Fixed Deposit (${fd.fdNumber})</div>
          </div>
          <span class="status-badge status-active">${fd.interestRate}% p.a.</span>
        </div>

        <div class="policy-details-grid">
          <div>
            <div class="detail-label">Principal Amount</div>
            <div class="detail-value">₹${fd.principal.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div class="detail-label">Maturity Value</div>
            <div class="detail-value" style="color:#0284c7;">₹${fd.maturityValue.toLocaleString("en-IN")}</div>
          </div>
          <div>
            <div class="detail-label">Maturity Date</div>
            <div class="detail-value">${fd.maturityDate}</div>
          </div>
          <div>
            <div class="detail-label">Nominee</div>
            <div class="detail-value">${fd.nominee}</div>
          </div>
        </div>
      `;
      bGrid.appendChild(card);
    });
  } else {
    bGrid.innerHTML = `<p style="color:#64748b; font-size:0.85rem;">🔒 Banking scope not granted.</p>`;
  }
}

function renderPrivacyHub() {
  const rec = state.consentRecord;
  if (!rec) return;

  document.getElementById("lbl-consent-id").innerText = rec.consentId;
  document.getElementById("lbl-purpose").innerText = rec.purpose;
  document.getElementById("lbl-status").innerText = rec.revoked ? "REVOKED" : "ACTIVE (DPDP Valid)";
  document.getElementById("lbl-status").style.color = rec.revoked ? "#dc2626" : "#10b981";
  document.getElementById("lbl-expiry").innerText = new Date(rec.exp * 1000).toLocaleDateString();

  try {
    const payload = JSON.parse(atob(state.currentToken.split(".")[1]));
    document.getElementById("jwtClaimsBlock").textContent = JSON.stringify(payload, null, 2);
  } catch (e) {
    document.getElementById("jwtClaimsBlock").textContent = "// Token not available";
  }
}

// ============================================================================
// Visual Charts Integration (Chart.js)
// ============================================================================

function renderCharts(policies, holdings, banking) {
  const pieCtx = document.getElementById("coveragePieChart");
  if (pieCtx) {
    if (state.charts.pie) state.charts.pie.destroy();

    const lifeTotal = policies.filter(p => p.policyType.includes("LIFE")).reduce((a, b) => a + b.coverageAmount, 0);
    const healthTotal = policies.filter(p => p.policyType.includes("HEALTH")).reduce((a, b) => a + b.coverageAmount, 0);
    const motorTotal = policies.filter(p => p.policyType.includes("MOTOR")).reduce((a, b) => a + b.coverageAmount, 0);

    state.charts.pie = new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels: ["Life Cover", "Health Cover", "Motor/Asset"],
        datasets: [{
          data: [lifeTotal || 1, healthTotal || 1, motorTotal || 1],
          backgroundColor: ["#0284c7", "#10b981", "#6366f1"],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } }
        }
      }
    });
  }

  const barCtx = document.getElementById("wealthBarChart");
  if (barCtx) {
    if (state.charts.bar) state.charts.bar.destroy();

    let mfTotal = holdings.filter(h => h.assetClass === "EQUITY" || h.assetClass === "DEBT").reduce((a, b) => a + b.currentValue, 0);
    let npsTotal = holdings.filter(h => h.assetClass === "RETIREMENT").reduce((a, b) => a + b.currentValue, 0);
    let goldTotal = holdings.filter(h => h.assetClass === "COMMODITY").reduce((a, b) => a + b.currentValue, 0);
    let fdTotal = (banking.fixedDeposits || []).reduce((a, b) => a + b.principal, 0);

    state.charts.bar = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Mutual Funds", "NPS Pension", "Bank FDs", "Gold Bonds"],
        datasets: [{
          label: "Asset Value (₹)",
          data: [mfTotal, npsTotal, fdTotal, goldTotal],
          backgroundColor: ["#38bdf8", "#818cf8", "#34d399", "#fbbf24"],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v) => "₹" + (v / 1000) + "k" } }
        }
      }
    });
  }
}

// ============================================================================
// Revocation & DPDP Enforcement
// ============================================================================

async function revokeCurrentConsent() {
  if (!state.currentConsentId) return;

  const confirmRevoke = confirm("Are you sure you want to revoke consent under DPDP Act provisions? All FIP data streams will be severed immediately.");
  if (!confirmRevoke) return;

  if (state.isBackendConnected) {
    try {
      const res = await fetch(`${API_BASE}/consent/revoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consentId: state.currentConsentId })
      });
      const data = await res.json();
      logInspector("POST /consent/revoke (200 OK)", data);
    } catch (err) {
      console.warn("Backend revoke failed, proceeding with local revocation:", err);
    }
  }

  handleRevokedState();
  alert("Consent successfully revoked! All FIP connections terminated.");
}

function handleRevokedState() {
  document.getElementById("globalStatusDot").className = "badge-dot revoked";
  document.getElementById("globalStatusText").innerText = "Consent REVOKED (Access Cut)";

  const container = document.getElementById("notificationsContainer");
  container.innerHTML = `
    <div class="alert-banner alert-danger">
      <div class="alert-content">
        <span class="alert-icon">🔒</span>
        <div>
          <strong>Consent Revoked (DPDP 2023 Enforced):</strong>
          <p style="font-size: 0.85rem;">Token has been invalidated. Insurer, Investment, and Bank FIPs have severed connection.</p>
        </div>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="goToStep(2)">Re-Grant Consent</button>
    </div>
  `;

  document.getElementById("policiesGrid").innerHTML = `<p style="grid-column:1/-1; color:#ef4444; font-size:0.9rem; text-align:center;">🚫 Data stream disabled due to active consent revocation.</p>`;
  document.getElementById("holdingsGrid").innerHTML = `<p style="color:#ef4444; font-size:0.85rem;">🚫 Data stream disabled.</p>`;
  document.getElementById("bankingGrid").innerHTML = `<p style="color:#ef4444; font-size:0.85rem;">🚫 Data stream disabled.</p>`;

  if (state.consentRecord) {
    state.consentRecord.revoked = true;
    renderPrivacyHub();
  }
}

// ============================================================================
// Tab Switching & Inspector Drawer
// ============================================================================

function switchTab(tabName) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.style.display = "none");

  const activeContent = document.getElementById(`tab-${tabName}`);
  if (activeContent) activeContent.style.display = "block";

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(b => {
    if (b.innerText.toLowerCase().includes(tabName.toLowerCase())) b.classList.add("active");
  });

  lucide.createIcons();
}

function toggleInspector() {
  const drawer = document.getElementById("inspectorDrawer");
  drawer.classList.toggle("open");
}

function logInspector(action, data) {
  const logEl = document.getElementById("inspectorLog");
  logEl.textContent = `// [${new Date().toLocaleTimeString()}] ${action}\n` + JSON.stringify(data, null, 2);
}

function updateCurlSnippet(token) {
  const snippet = `curl -X GET "http://localhost:5000/api/v1/aggregate" \\\n  -H "Authorization: Bearer ${token}"`;
  document.getElementById("curlSnippet").textContent = snippet;
}

// ============================================================================
// Multi-Channel Reminder Modal Simulation
// ============================================================================

let currentModalPolicy = null;

function openReminderModal(policyId) {
  const policies = (state.aggregateData && state.aggregateData.insurance && state.aggregateData.insurance.data) || [];
  const policy = policies.find(p => p.policyId === policyId) || policies[0];
  currentModalPolicy = policy;

  const modal = document.getElementById("reminderModal");
  const msgEl = document.getElementById("modalMessageText");

  let bodyText = "";
  if (policy.status === "IN_GRACE_PERIOD") {
    bodyText = `⚠️ *CRITICAL LAPSE RISK ALERT*\n\nDear Aarav, your premium of *₹${policy.premiumAmount.toLocaleString("en-IN")}* for *${policy.policyName}* (${policy.insurer}) is currently in the 30-day grace period ending on *${policy.gracePeriodEnd || 'soon'}*.\n\nFailure to pay before grace period ends will result in policy lapse and loss of accumulated benefits.\n\n🔗 Tap to pay securely: https://finview.gov.in/pay/${policy.policyId}`;
  } else {
    bodyText = `🔔 *FinView Proactive Reminder*\n\nDear Aarav, annual renewal for *${policy.policyName}* (${policy.insurer}) is due on *${policy.renewalDueDate}* (Sum Assured: ₹${policy.coverageAmount ? policy.coverageAmount.toLocaleString("en-IN") : 'N/A'}).\n\nAmount: *₹${policy.premiumAmount.toLocaleString("en-IN")}*.\n\n🔗 Pay directly: https://finview.gov.in/pay/${policy.policyId}`;
  }

  msgEl.innerHTML = bodyText.replace(/\n/g, "<br>") + `<div class="whatsapp-time">Simulated • 10:45 AM ✓✓</div>`;
  modal.classList.add("active");
  lucide.createIcons();
}

function closeModal() {
  document.getElementById("reminderModal").classList.remove("active");
}

async function triggerMockDispatch() {
  if (!currentModalPolicy) return;
  alert(`📲 Simulation Alert Dispatched to +91 98765 43210 via WhatsApp API!`);
  closeModal();
}

// Global initialization
window.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  checkBackendHealth();
});
