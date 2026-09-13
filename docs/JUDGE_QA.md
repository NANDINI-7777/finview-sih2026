# 🎯 FinView — SIH 2026 Team Pitching & Judge Q&A Guide

> **Internal Team Guide** | Rehearsal notes, regulatory talking points, and Q&A breakdown.

---

## 📋 1. Judge Presentation Golden Rules

| ❌ NEVER CLAIM THIS TO JUDGES | ✅ ALWAYS SAY THIS INSTEAD |
| :--- | :--- |
| *"PAN and OTP automatically fetches all insurance policies directly."* | *"PAN/OTP handles citizen identity authentication; actual policy data is fetched via authorized AA Consent artifacts from participating FIPs."* |
| *"FinView is India's first single insurance repository."* | *"IRDAI Repositories (CAMSRep, NSDL, CIRL, Karvy) already store e-policies; FinView acts as the citizen-friendly monitoring & lapse prevention layer."* |
| *"We will make money by selling aggregated user data to insurers."* | *"Zero data selling (DPDP Act 2023). Revenue comes from freemium subscriptions, B2B insurer lapse-prevention services, and corporate plans."* |
| *"This demo connects directly to live government servers."* | *"This demo runs on a high-fidelity simulated FIP environment; production deployment will use authorized official onboarding."* |

---

## ⚡ 2. 20-Second Pitch Summary
> "FinView is a privacy-first, consent-governed monitoring platform that consolidates a citizen's insurance policies, mutual funds, NPS, and bank FDs into one unified dashboard. By leveraging India's Account Aggregator framework and IRDAI's e-Insurance Account infrastructure, FinView prevents policy lapses and reduces unclaimed financial assets through proactive multi-tier alerts."

---

## 💬 3. Top Judge Questions & Tactical Answers

### Q1. How is this different from DigiLocker or IRDAI Insurance Repositories?
* **Answer:** DigiLocker is a document repository (PDFs). Insurance Repositories are backend data custodians. FinView is an **active monitoring and intelligence layer** on top of repositories that tracks active statuses, computes lapse risks, audits nominee coverage, and sends proactive multi-channel renewal alerts before grace periods expire.

### Q2. How is this different from CRED Protect or Policybazaar?
* **Answer:** Policybazaar is a comparison and distribution marketplace focused on *selling new policies*. CRED Protect relies primarily on reading personal email/SMS parsers. FinView is an **insurance-first, DPI-native platform** that uses formal **Account Aggregator consent artifacts** and direct FIP connections without parsing inbox text.

### Q3. How do you comply with the DPDP Act 2023?
* **Answer:** 
  1. **Purpose Limitation:** Consents specify exact purposes (`PERSONAL_FINANCE_DASHBOARD`).
  2. **Scoped Authorization:** Granular permissions (`INSURANCE_READ`, `INVESTMENT_READ`, `BANK_READ`).
  3. **User-Controlled Data Life:** Time-bounded retention (e.g. 30 days).
  4. **Right to Withdraw:** 1-Click instant revocation cuts off data streams from all FIPs in real time.
  5. **No Data Commercialization:** User financial data is never sold or shared with advertisers.

### Q4. What is your Revenue / Business Model?
* **Answer:** A 4-pillar sustainable model without data selling:
  1. **Freemium Subscriptions:** Basic policy tracking and alerts are free; family multi-member vaults, document encryption, and deep coverage analysis are paid (₹49–₹99/mo).
  2. **B2B Insurer Partnerships:** Insurers pay SaaS API integration fees to reduce policy lapse rates and customer drop-offs.
  3. **Authorized Referral Partnerships:** IRDAI-compliant distribution/porting referrals when users voluntarily seek better coverage.
  4. **Corporate Wellness Plans:** B2B plans for companies offering financial wellness tools to employees.

### Q5. What happens if a user revokes consent during evaluation?
* **Answer:** We can demonstrate this live: when the user clicks "Revoke Consent", the cryptographic token is marked revoked in the Consent Registry. Subsequent requests to any FIP return `HTTP 403 Forbidden` (`consent_revoked`), and the dashboard immediately locks data streaming to respect citizen privacy.
