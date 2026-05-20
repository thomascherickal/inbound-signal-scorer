# 🎯 RECRUITED — Inbound Readiness Scorer (Tool 1)

[![Patreon](https://img.shields.io/badge/Patreon-thomascherickal-orange?style=for-the-badge&logo=patreon)](https://patreon.com/thomascherickal)
[![Release Status](https://img.shields.io/badge/Release-Active-success?style=for-the-badge)](https://thomascherickal.com)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Static%20HTML-blue?style=for-the-badge)](#)
[![Theme](https://img.shields.io/badge/Theme-Premium%20Dark-black?style=for-the-badge)](#)
[![Tests](https://img.shields.io/badge/Unit%20Tests-1110%20passing-brightgreen?style=for-the-badge)](#)
[![File Size](https://img.shields.io/badge/Bundle-292%20KB%20%7C%20zero%20deps-lightgrey?style=for-the-badge)](#)

> **"Before you can fix what's keeping you invisible to recruiters, you need to know exactly where your gaps are."**  
> *— Chapter 1, RECRUITED: The Inbound Recruitment Blueprint*

Welcome to the production repository for **Tool 1: Inbound Readiness Scorer**, a premium, high-fidelity, single-file interactive web application. This tool is designed to diagnose, score, and guide your transition from active applicant to inbound talent magnet. It represents the flagship digital product of the **12 Patreon Digital Tools series** accompanying the book **RECRUITED** by Thomas Cherickal.

---

## 💎 Design Philosophy & User Experience

The application is engineered entirely as a highly polished, interactive single-file workspace (`inbound-readiness-scorer.html`) with zero dependencies, zero tracking, and instant client-side performance.

*   **Sleek Cyber-Dark Aesthetic**: Styled with custom CSS Custom Properties featuring a rich dark mode colour system (`#050505` to `#111111`), gold and crimson accents, and smooth hardware-accelerated transitions.
*   **Zero-Click Reactive Calculations**: Interactive checklist diagnostics update instantly. Every checkmark automatically recomputes pillar values, letter grades, benchmark gaps, progress tracking arrays, action items, and the full content roadmap.
*   **Fully Responsive & Accessible**: Designed to work beautifully on mobile viewports, high-DPI desktop screens, and printable PDF assets alike.
*   **Local Persistence**: Automated session recovery records your diagnostics and streaks directly in standard `localStorage`, allowing you to close the browser and return exactly where you left off.
*   **Multi-Screen Flow**: Four distinct screens guide the user from profile selection → 8-pillar assessment → scored dashboard with calendar → priority action plan, with full back-navigation at every stage.

---

## 📊 Core Diagnostic Pillars & Scoring Architecture

The scorer evaluates candidate preparedness across the **8 core pillars of inbound recruitment**, assigning custom weights that sum to an absolute composite score out of 100:

| # | Pillar | Weight | Focus Areas |
| :---: | :--- | :---: | :--- |
| **1** | **LinkedIn Presence & Posting Consistency** | `20%` | Posting cadence, profile details, Creator Mode engagement, view velocity |
| **2** | **Personal Brand Clarity & Niche Positioning** | `18%` | Narrow niche target, single-sentence clarity, visual consistency |
| **3** | **Proof of Work & Dynamic Portfolio** | `15%` | High-quality GitHub repositories, published articles, active case studies |
| **4** | **AI-Native Job Search & Co-Pilot Efficiency** | `12%` | Mastery of NotebookLM, Perplexity, Google AI Studio, and GitHub Copilot |
| **5** | **Content Ecosystem & Audience Organic Reach** | `12%` | Quantity and quality of original vs. curated articles in the last 30 days |
| **6** | **Network Depth & Relationship Equity** | `10%` | Dynamic tiers (Inner/Middle/Outer), value-first contact history |
| **7** | **Hidden Market Access** | `8%` | Referral lines, tracking engineering blogs and hiring signals |
| **8** | **Thought Leadership Signal Strength** | `5%` | Unique perspectives, citation frequency, guest expert opportunities |

### Scoring Bands & Grading Engine

| Grade | Range | Label | Recruiter Signal |
| :---: | :---: | :--- | :--- |
| **A** | 85–100 | Magnetic | Inbound engine is humming. Recruiters are booking your calendar. |
| **B** | 70–84 | Visible | Steady profile views, occasional messages, needs final polishing. |
| **C** | 55–69 | Emerging | Foundation is secure, but signal output is inconsistent. |
| **D** | 40–54 | Passive | Classic resume profile. Invisible to algorithms. |
| **F** | 0–39 | Invisible | Gaps across all major pillars. High automated-rejection risk. |

Each grade also triggers a recruiter-eye interpretation: what your profile looks like today, what the most common objection to hiring you would be, and what single change would move your score the most.

---

## 🖥️ Four-Screen Application Flow

```
Screen 0 — Profile Selection & AI Content Preview
     ↓
Screen 1 — 8-Pillar Diagnostic Assessment (sliders + checkboxes)
     ↓
Screen 2 — Scored Dashboard (composite score · pillar breakdown · 10-week calendar · 10 content blueprints)
     ↓
Screen 3 — Priority Action Plan (ranked actions + content roadmap)
```

### Screen 0 — Profile Selection & AI Content Preview

*   Choose your **experience tier** (Fresher / Professional / Management) via profile cards **or** the new inline Experience Level dropdown next to the role selector.
*   Select your **target career role** from the 24-role dropdown to instantly generate a **10-piece content roadmap preview** with bullet-point summaries — before the assessment even begins.
*   Both the role and experience level dropdowns are fully synced: changing one updates the other and immediately regenerates all content.
*   The 10-week calendar is **not shown here** — it appears exclusively on the Scorecard screen after the assessment is completed, keeping the pre-assessment view focused and uncluttered.

### Screen 1 — 8-Pillar Diagnostic Assessment

*   Each pillar has a manual 0–10 slider **and** a set of diagnostic checkboxes. Ticking checkboxes automatically drives the slider value (e.g. 2 of 6 boxes checked → score of 3.3).
*   Pillar descriptions adapt their text to the selected experience tier (Fresher / Professional / Management) to keep guidance contextually relevant.
*   Real-time emoji status indicators (🔴🟡🟢🔵) reflect each pillar's score tier as you work through the assessment.

### Screen 2 — Scored Dashboard

*   **Composite score circle** with letter grade and recruiter-interpretation text.
*   **Pillar performance breakdown** with horizontal benchmark lines set per experience tier.
*   **Profile Benchmarks Context** card: shows how your score compares to the average and top-25% for your profile tier.
*   **10-Week Inbound Content Strategy Calendar** — rendered exclusively on this screen after assessment completion. Each week card has a unique accent colour (10-colour rotation: green, blue, gold, purple, coral, teal, crimson, olive, bronze, indigo), a numbered circle badge, format pill, focal point, and action plan.
*   **10 Content Blueprints** — role-specific and experience-level-specific post summaries with left-border colour accents matching the same 10-colour palette.
*   **Dual dynamic dropdowns** (Target Career Role + Experience Level) — changing either one immediately regenerates the full calendar and all 10 blueprints with no page reload.
*   The Experience Level dropdown is fully bi-directionally synced with the welcome screen selector and the profile cards.

### Screen 3 — Priority Action Plan

*   Ranked list of 3–5 specific actions derived from the pillars falling furthest below benchmark, each tagged Critical / High / Medium.
*   Actions include a "Why it matters" rationale, numbered step-by-step instructions, a platform integration guide, effort estimate, and expected composite score impact.
*   **Content Roadmap block** appended below the action cards — the same 10 blueprints from the dashboard, re-rendered with coloured left-border cards and the active experience level clearly labelled in the section header.
*   Changing the Role or Experience Level on the dashboard now **instantly updates the action plan** if Screen 3 is currently visible, with no navigation required.
*   Mark-as-complete buttons trigger a re-evaluation modal and update the score history log.

---

## 🛠️ The 24-Role Expert System & Strategy Hub

The built-in **Expert System** (`ROLE_EXPERT_SYSTEM`) contains a fully populated, zero-latency database customised for **all 24 career roles** in the book. Every role defines:

*   A core strategic **theme** used to personalise all generated content
*   At least **3 crawler keyword topics** for SEO and recruiter discoverability
*   At least **3 domain-specific tools/frameworks** substituted into post summaries
*   A list of **retrieved benchmark posts** from that discipline
*   **10 suggested article titles** in Title Case, used as the roadmap post headings
*   A **10-week content calendar** for each of the three experience tiers

### Covered Role Blueprints

| # | Role | # | Role |
| :---: | :--- | :---: | :--- |
| 1 | AI/ML Engineer | 13 | Content Writer/Strategist |
| 2 | Cloud Architect | 14 | Technical Writer |
| 3 | Data Scientist | 15 | Book Author |
| 4 | DevOps Engineer | 16 | AI Graphic Designer |
| 5 | Full-Stack Developer | 17 | AI Artist |
| 6 | Cybersecurity Engineer | 18 | AI Musician |
| 7 | Product Manager | 19 | Project Manager |
| 8 | Solutions Architect | 20 | Sales Professional |
| 9 | Data Engineer | 21 | Marketing Manager |
| 10 | UX/UI Designer | 22 | HR Manager |
| 11 | Engineering Manager | 23 | Financial Analyst |
| 12 | Prompt/LLM Engineer | 24 | Customer Success Manager |

---

## 📝 Three-Level Content Roadmap System

The content roadmap is generated fresh every time the Role or Experience Level changes. It is **not** a static template — the body text, voice, format types, and article length targets all vary completely by level.

### Fresher (0–1 years experience)
Posts are written from the perspective of a student or recent graduate learning in public. Templates cover learning journals, first projects, honest failure debriefs, weekend builds, and portfolio summaries.
*   **Format types**: Learning Journal Post, Tutorial Write-up, GitHub Project Showcase, Honest Reflection Post, Weekend Build Log, Study Log, Tool Comparison, Capstone Write-up, Failure Debrief, Portfolio Summary
*   **Est. article lengths**: 600–1,100 words

### Professional (2–10 years experience)
Posts lead with measurable outcomes from real production systems. Templates cover case studies, diagnostic post-mortems, architecture breakdowns, performance audits, and automation playbooks.
*   **Format types**: LinkedIn Case Study, Technical Deep-Dive, Architecture Breakdown, Diagnostic Post, Code Quality Essay, Performance Engineering Post, Automation Playbook, Observability Post, Benchmark Analysis, Edge Architecture Guide
*   **Est. article lengths**: 1,000–2,000 words

### Management (10+ years experience)
Posts take executive-level strategic positions on contested industry questions. Templates cover org design essays, board-level business cases, maturity frameworks, contrarian leadership takes, and Centre of Excellence guides.
*   **Format types**: Strategic Opinion Piece, Leadership Essay, Executive Briefing, Organisation Design Post, Maturity Framework, Contrarian Take, CoE Guide, Board-Level Business Case, Vendor Strategy Framework, Leadership Framework
*   **Est. article lengths**: 1,200–2,400 words

> **Note on word counts**: The word count displayed on each blueprint card is the **estimated length of the final published article**, not the length of the summary shown in the card. Card summaries are always ~100-word bullet-point outlines.

---

## 🎨 Colour System

The application uses a **10-colour accent rotation** across all dynamically generated cards to add visual variety while maintaining the premium dark-theme aesthetic. The same palette is applied consistently across the Scorecard calendar weeks, the Scorecard blueprint cards, the welcome screen roadmap grid, and the Action Plan roadmap block.

| Slot | Colour | Use |
| :---: | :--- | :--- |
| 1 | Green `#60b060` | Week 1 / Blueprint 1 |
| 2 | Blue `#5090c0` | Week 2 / Blueprint 2 |
| 3 | Gold `#c9a84c` | Week 3 / Blueprint 3 |
| 4 | Purple `#b060c0` | Week 4 / Blueprint 4 |
| 5 | Coral `#c07050` | Week 5 / Blueprint 5 |
| 6 | Teal `#50c0b0` | Week 6 / Blueprint 6 |
| 7 | Crimson `#c05060` | Week 7 / Blueprint 7 |
| 8 | Olive `#609050` | Week 8 / Blueprint 8 |
| 9 | Bronze `#a08050` | Week 9 / Blueprint 9 |
| 10 | Indigo `#5070c0` | Week 10 / Blueprint 10 |

---

## 🧪 Test Suite

The repository includes a comprehensive Node.js unit testing framework (`test_scorer.js`) that validates all scoring logic, data integrity, and content generation entirely in a sandboxed VM context — no browser required.

```bash
node test_scorer.js
```

### Test Coverage Summary

| # | Test | Assertions |
| :---: | :--- | :---: |
| 1 | Pillar definitions & weight sum | 2 |
| 2 | Composite score — all zeros | 1 |
| 3 | Composite score — all tens | 1 |
| 4 | Composite score — mixed values (expected 44.2) | 1 |
| 5 | Grade letter boundary cases (A/B/C/D/F) | 9 |
| 6 | Priority action generation | 1 |
| 7 | Action object schema (id, title, why, steps) | 5 |
| 8 | Profile benchmark adaptation per tier | 6 |
| 9 | Actions database — all 8 pillars × 5 brackets | 41 |
| 10 | Checkbox-driven dynamic score updates | 3 |
| 11 | Status emoji icon boundary mapping | 8 |
| 12 | Content copilot — 10 posts, ~100-word summaries | 31 |
| 13 | LinkedIn URL validation | skipped (deprecated) |
| 14 | 24-role expert system — full schema per role & tier | 672 |
| 15 | 50-line summary — exact line count & prefix format | 51 |
| **—** | **Total assertions** | **1,110 ✅** |

All 1,110 assertions pass on Node.js v22+. Zero failures. Zero skipped (excluding the deprecated Test 13).

---

## 🚀 Getting Started

### 1. Launching the App

Simply open the HTML file in any modern web browser. No build step, no server, no dependencies.

```bash
# Linux / Firefox
firefox "inbound-readiness-scorer.html"

# macOS / Chrome
open -a "Google Chrome" inbound-readiness-scorer.html

# Windows
start inbound-readiness-scorer.html
```

### 2. Recommended Workflow

1. **Select your experience tier** on the welcome screen (profile card or Experience Level dropdown).
2. **Select your target role** — the 10-piece content roadmap preview generates instantly.
3. Click **Begin Assessment** and work through the 8 pillars using checkboxes and sliders.
4. Click **View My Score** to reach the Scorecard dashboard.
5. Review the **10-week calendar** and **10 content blueprints** — adjust Role or Experience Level to see the content regenerate live.
6. Click **See My Action Plan** for your ranked priority actions with the content roadmap appended below.

### 3. Running the Test Suite

```bash
node test_scorer.js
```

### 4. Updating the Actions Database

`update_database.js` is a utility script that programmatically serialises a new `ACTIONS_DATABASE` object back into the HTML file. Use it when adding new action templates.

```bash
node update_database.js
```

---

## 📁 Repository Structure

```
RECRUITED Digital Products/
├── inbound-readiness-scorer.html        # Flagship web application (HTML5/CSS3/vanilla JS, 292 KB)
├── test_scorer.js                       # Node.js unit test suite (1,110 assertions)
├── update_database.js                   # Actions database serialisation utility
├── 12 Patreon Digital Products.md       # Full catalogue description of all 12 Patreon tools
├── Tool 1 - Inbound Readiness Scorer.md # Chapter context and original feature specification
└── README.md                            # This documentation file
```

---

## 📚 The 12 Patreon Digital Product Collection

| # | Tool | Available | Primary Output |
| :---: | :--- | :---: | :--- |
| **1** | **Inbound Readiness Scorer** | **Now** | **Composite score + 10-week calendar + priority action list** |
| **2** | Hidden Job Market Navigator | Week 2 | Company intelligence + outreach sequence |
| **3** | LinkedIn Profile Audit & Optimizer | Week 3 | Recruiter Magnet Score + rewrite guidance |
| **4** | Personal Brand Niche Finder | Week 4 | Niche score + 3-format positioning statement |
| **5** | Skills Gap Analyser | Week 5 | Gap report + 30/90/180-day learning path |
| **6** | Salary Intelligence Dashboard | Week 6 | Personalised negotiation floor/ceiling + offer matrix |
| **7** | 6-Month Roadmap Tracker | Week 7 | Week-by-week execution + compound curve |
| **8** | Job Application Pipeline (Kanban) | Week 8 | Inbound/outbound ratio + pipeline analytics |
| **9** | Network Depth Map | Week 9 | Equity scores + target company coverage gaps |
| **10** | Role Blueprint Deep-Dive | Week 10 | Full role-specific inbound strategy |
| **11** | AI Tool Stack Selector | Week 11 | Task → tool → step-by-step workflow |
| **12** | Career Compounding Roadmap | Week 12 | 12-month 5-track visual career architecture |

---

## 📋 Changelog

### v2.0 — Current Release

*   **10-week calendar moved to Scorecard screen only** — no longer shown on the welcome screen. The calendar renders exclusively after the assessment is completed, keeping the pre-assessment view focused.
*   **Experience Level dropdown added to welcome screen** — Fresher / Professional / Management selector placed inline next to the role selector. All three selectors (welcome screen dropdown, profile cards, dashboard dropdown) are fully bi-directionally synced.
*   **Three distinct content template sets** — the content roadmap now generates completely different post summaries depending on the active experience level. Fresher templates use a student learning-in-public voice; Professional templates lead with measurable production outcomes; Management templates take executive-level strategic positions.
*   **Per-level format types and article lengths** — format names (e.g. "Learning Journal Post" vs. "LinkedIn Case Study" vs. "Strategic Opinion Piece") and estimated published article lengths (600–1,100 / 1,000–2,000 / 1,200–2,400 words) all vary by experience level.
*   **Word count label corrected** — card badges now display `Est. article: X words` to clearly communicate that the figure is the target length of the final published article, not the length of the card summary itself.
*   **Action Plan updates live** — changing Role or Experience Level on the Scorecard dashboard now instantly regenerates the Action Plan content roadmap block if Screen 3 is currently visible, with no navigation required.
*   **10-colour accent palette** — all dynamically generated cards (calendar weeks, blueprint cards, action plan roadmap) use a consistent 10-colour rotation (green, blue, gold, purple, coral, teal, crimson, olive, bronze, indigo) with left-border accents, coloured numbered badges, and tinted backgrounds.
*   **Toast notifications** — a toast confirms the active role and level whenever the roadmap regenerates.

### v1.0 — Initial Release

*   8-pillar weighted scoring engine with composite grade (F → A).
*   24-role Expert System with per-role keywords, tools, and 10-week content calendars.
*   3-tier profile benchmarks (Fresher / Professional / Management).
*   Priority Action List with step-by-step integration guides.
*   localStorage persistence, score history drawer, and progress line chart.
*   Downloadable dark-theme PDF content plan.
*   Node.js unit test suite with VM sandbox execution.

---

> *"The compound curve is unforgiving in Month 1 and unreasonable in Month 12. The only difference between those two outcomes is whether you started."*  
> **— Thomas Cherickal, RECRUITED · Chapter 24**

For support, feedback, or custom integrations, visit [thomascherickal.com](https://thomascherickal.com) or join the community at [patreon.com/thomascherickal](https://patreon.com/thomascherickal).
