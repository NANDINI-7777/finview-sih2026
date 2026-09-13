# 🛡️ FinView — Unified Financial Asset & Insurance Management Platform
**Smart India Hackathon (SIH) 2026 Prototype**

> A privacy-first, consent-governed monitoring layer built on India's Digital Public Infrastructure (DPI), aligning with **IRDAI e-Insurance Accounts (eIA)**, **Account Aggregator (AA) framework**, and **DPDP Act 2023**.

---

## 🚀 Quickstart (Zero Dependencies)

FinView backend is built with pure Node.js standard modules (`http`, `crypto`, `fs`, `path`). **No `npm install` needed.**

```bash
# 1. Navigate to the project root
cd "d:/PROJECT/SIH 2026"

# 2. Start the prototype server
node server.js

# 3. Open in your browser
# Visit http://localhost:5000
```

---

## 🌟 Key Features & SIH Innovations

1. **Consent-Governed Data Flow (DPDP Act 2023 Compliant)**:
   - Scoped authorization (`INSURANCE_READ`, `INVESTMENT_READ`, `BANK_READ`).
   - Defined purpose limitation and user-controlled data life duration.
   - **Instant 1-Click Revocation** with real-time cryptographic token cutoff across all FIPs.

2. **Proactive Smart Lapse Prevention Engine**:
   - Multi-tier alert hierarchy (30-day, 15-day, 7-day, 3-day countdowns).
   - Critical **Grace Period Warning Banner** (preventing policy lapse and loss of accumulated bonuses).
   - Multi-channel notification simulation (WhatsApp Business / SMS).

3. **Consolidated Financial Portfolio & Protection Score**:
   - Single-screen aggregation of Life, Health, Motor policies alongside Mutual Funds, NPS Tier-1, and Bank Fixed Deposits.
   - Real-time **Financial Protection Score (84/100)** with actionable insights.

4. **Family & Nominee Governance Vault**:
   - Automated **Nominee Gap Scanner** (detects missing nominees to prevent unclaimed assets).
   - Authorized Emergency Contact access preview for claims facilitation.

5. **Judge API & Architecture Inspector**:
   - Built-in slide-over inspector displaying live cryptographic JWT claims, HTTP request/response payloads, and reproducible cURL snippets.

---

## 🏛️ System Architecture

```
+-------------------------------------------------------------+
|                  Citizen / User Interface                   |
|     (Identity Verification -> DPDP Scoped Consent Form)     |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|          Consent Manager (AA & DPDP Act Standard)           |
|        - Issues Scoped HMAC-SHA256 Signed AA Tokens         |
|        - Real-Time Revocation & Consent Status Registry     |
+------------------------------+------------------------------+
                               | (Bearer Token with Scopes)
                               v
+-------------------------------------------------------------+
|               FinView Multi-FIP Gateway Engine              |
+---------------+--------------+--------------+---------------+
|               |              |              |               |
v               v              v              v               v
[Insurer FIP]   [RTA/MF FIP]   [Bank FIP]     [Lapse Engine]  [Nominee Vault]
(IRDAI / eIA)   (SEBI / NPS)   (RBI Banking)  (Multi-tier)    (Audit & Gap)
```

---

## 📋 SIH Judge Presentation Golden Rules

| ❌ NEVER SAY THIS TO JUDGES | ✅ ALWAYS SAY THIS INSTEAD |
| :--- | :--- |
| *"PAN and OTP automatically fetches all insurance policies directly."* | *"PAN/OTP handles citizen authentication; actual data is fetched via authorized AA Consent from participating FIPs."* |
| *"FinView is India's first ever single insurance repository."* | *"IRDAI Repositories (CAMSRep, NSDL) already store e-policies; FinView acts as the citizen-friendly monitoring & lapse prevention layer."* |
| *"We will make money by selling aggregated user data to insurers."* | *"Zero data selling (DPDP Act). Revenue comes from freemium subscriptions, B2B insurer lapse-prevention services, and corporate plans."* |
| *"This demo connects directly to live government servers."* | *"This demo runs on a high-fidelity simulated FIP environment; production deployment will use authorized official onboarding."* |

---

## 📂 Project Structure

```
d:/PROJECT/SIH 2026/
├── server.js               # Zero-dependency Node server (Consent Manager + 3 Mock FIPs + Static Router)
├── data/
│   └── mock_db.json        # Rich test dataset (urgent dues, grace periods, NPS, FDs, nominees)
├── public/
│   ├── index.html          # Interactive Single-Page App layout & Judge Inspector
│   ├── app.js              # State manager, Chart.js integrations & API handlers
│   └── styles.css          # Fintech UI design system, animations & responsive styling
└── README.md               # Documentation & Judge presentation guide
```
