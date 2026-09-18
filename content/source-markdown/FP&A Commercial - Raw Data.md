# FP&A Commercial Raw Source Data

This document is a faithful text extraction of the supplied source files. File boundaries, worksheet names, slide numbers, and PDF page numbers are retained for traceability.

## Source inventory

- `Cost Reporting.docx`
- `FCF Control on Revenue and PnL.docx`
- `MPC Planning Process.docx`
- `Mid-Month Forecast.docx`
- `NMPC Planning.docx`
- `Planning Review Preparation.docx`
- `Planning System Submission.docx`
- `PnL Planning.docx`
- `Preclose Analysis.docx`
- `Revenue Planning.docx`
- `Revenue Reporting.docx`

## Source file: Cost Reporting.docx

- Path: `Tower Subprocesses/FP&A Commercial/Cost Reporting.docx`
- Format: DOCX

**TRANSCRIPT 1 — COST REPORTING PROCESS**

**Phase 0: Purpose & Business Objective**

The **primary purpose** of the Cost Reporting process is to provide budget owners with a **holistic view of monthly spending** by consolidating actual expenditure against the planned budget.

The output enables budget owners to **effectively monitor, plan, and control costs** by comparing actual spending against the approved budget, thereby supporting informed financial decision-making across the business.

If this process is **not completed, delayed, or delivered inaccurately**, budget owners lose timely and accurate visibility into their monthly spend. The downstream consequences include delayed decision-making, reduced cost control, potential budget overruns, and inaccurate financial planning — all of which directly impact the organisation's ability to steer commercial performance.

**Phase 1: Trigger & Timing**

The Cost Reporting process is triggered **monthly**, immediately after the **Month-End Close (MEC)** is completed. The window for execution runs from **Working Day +2 (WD+2) to WD+5**, with the actual task itself taking **1 working day** to complete. The timeline remains consistent regardless of whether the month falls within a budget or forecast cycle.

**Pre-conditions that must be satisfied before the process can begin:**

- **\[System / Accounting Team\]** All MEC journals must be posted and reflected in SAP.

- **\[System\]** The distribution cycle must be run (typically at WD+2).

**Phase 2: Inputs & Data Sources**

The FP&A Analyst begins by gathering two primary data inputs:

- **\[FP&A Analyst → SAP\]** SAP transactional data (FBL3N line items and GD13 totals).

- **\[FP&A Analyst → CMR\]** CMR (Commercial Management Reporting) data for reconciliation and validation.

Before proceeding, the analyst validates completeness by **reconciling SAP and CMR data**. Common data quality issues include system-related discrepancies (data not flowing correctly between SAP and CMR) or manual errors such as outdated uplift values or FX rates.

**Phase 3: Step-by-Step Execution**

**Step 1 — Kick-off after MEC**

- **\[FP&A Analyst\]** Confirms MEC completion and initiates the cost reporting cycle.

**Step 2 — Extract and reconcile source data**

- **\[FP&A Analyst → SAP\]** Extract latest FBL3N line item data.

- **\[FP&A Analyst → SAP\]** Extract latest GD13 totals data.

- **\[FP&A Analyst → CMR\]** Extract CMR reference data.

- **\[FP&A Analyst\]** Perform reconciliation between SAP and CMR totals.

- **\[FP&A Analyst\]** Investigate and resolve any discrepancies (e.g., outdated FX rates, uplift values, or data flow issues) before proceeding.

**Step 3 — Consolidate SAP data into a master workbook**

- **\[FP&A Analyst → Excel VBA Macro\]** Launch the macro file.

- **\[Macro / System\]** Combine FBL3N and GD13 extracts into a single master workbook to prepare the data for splitting.

**Step 4 — Split data by cost category**

- **\[FP&A Analyst → Excel VBA Macro\]** Trigger the file-splitting macro.

- **\[Macro / System\]** Apply the **Cost Centre / GL mapping** logic to categorise entries.

- **\[Macro / System\]** Generate **12 separate Excel output files**, each containing three tabs for a specific cost category, including pivot tables at the level of Cost Centre, GL, Brand, and Text.

**Step 5 — Quality check the output**

- **\[FP&A Analyst\]** Open each of the 12 output files.

- **\[FP&A Analyst\]** Verify that the amounts reconcile back to CMR and SAP totals.

- **\[FP&A Analyst\]** Confirm the split logic has been applied correctly.

- **\[FP&A Analyst\]** Where an error is found, manually correct the discrepancy and regenerate as needed.

**Step 6 — Publish to SharePoint**

- **\[FP&A Analyst → SharePoint\]** Save the 12 finalised files to the designated SharePoint location for budget owner access.

**Phase 4: Validation & Controls**

The primary validation check ensures the **cost file amounts reconcile with both CMR and SAP** before release. There is **no formal approval or sign-off gate**, and the process typically goes through **zero revision cycles**. If an error is identified post-submission, the FP&A Analyst investigates the source and applies manual corrections. **No SOX or audit-relevant controls** are embedded in this task.

**Phase 5: Output & Handover**

The final deliverable consists of **12 Excel workbooks**, each with three tabs, containing highly granular SAP data (Cost Centre / GL / Brand / Text) presented via pivot tables. Templates vary **significantly across markets**. Files are stored on **SharePoint**, where they are accessed by **FBPs (Finance Business Partners)** and **local budget owners** for review — directly enabling the business objective of holistic monthly spend visibility and cost control.

**Phase 6: Downstream Dependencies**

Once complete, the cost reporting output feeds into the **Cost Planning Template** and supports local market OpEx tracking. A delay of 1–2 days can push back actualisation and cost monitoring during planning cycles. Errors that go undetected typically surface within the planning cycle template or in local market OpEx tracking files.

**Appendix A — Pain Points, Risks & Improvement Ideas (Cost Reporting)**

**Top pain points:**

- **Manual file splitting for unsupported markets**: Some market analysts must split files manually as the VBA macro has not yet been built for their countries.

- **Manual reconciliation checking**: Each of the 12 output files must be checked manually against CMR after the split.

- **Manual cost categorisation**: Cost categorisation logic varies by market requirement and is applied manually.

**Pain point categories:** Excessive manual effort; system limitation / lack of automation; lack of standardisation across markets.

**Key risk:** The heavily manual nature of the task creates exposure to undetected human error.

**Improvement ideas:**

- Build a **dashboard with Row-Level Security (RLS)** so budget owners can view only their own Cost Centres — eliminating the need to split cost files entirely. *(Currently in development.)*

## Source file: FCF Control on Revenue and PnL.docx

- Path: `Tower Subprocesses/FP&A Commercial/FCF Control on Revenue and PnL.docx`
- Format: DOCX

**FCF Control on Revenue and P&L *(Updated)***

**1. Objective / Purpose**

To obtain and formally track **monthly financial-control attestation approvals** for **FSC008 (Sales Trend Review)**, **FSC009 (Operating Expenses)**, and **FSC011 (Accruals & Prepayments)** across **14 APAC markets**, using the standardised **FAST+** solution (Power Apps / Power Automate) that replaces the previous manual, email-based approval workflow.

**2. Business Outcome Supported**

The approved (or rejected) FAST+ record and supporting evidence enable the control owner to confirm monthly control performance and close it out. The approval record is subsequently uploaded into **OneGRC** for audit and compliance sign-off.

**3. Impact if Not Delivered**

Missed or late approvals mean the financial control cannot be evidenced as performed, creating **audit/compliance risk** and **control-failure exposure**. Incomplete evidence increases the risk of audit findings.

**4. Trigger & Timing**

- **Trigger**: Month-end close of underlying financial data; requestor opens FAST+ Power App and submits.

- **Start**: Working Day 1

- **Deadline**: Working Day 7 EOD

- **Duration**: ~7 days

- **Frequency**: Monthly

- **Budget/forecast impact**: None

**5. Inputs & Data Sources**

| **\#** | **Input** | **Source** | **How Received** |
|----|----|----|----|
| 1 | Supporting evidence — FSC008 (Sales Trend Review) | Market FP&A working files | Uploaded via FAST+ |
| 2 | Supporting evidence — FSC009 (Operating Expenses) | Market FP&A working files | Uploaded via FAST+ |
| 3 | Supporting evidence — FSC011 (Accruals & Prepayments) | Market FP&A working files | Uploaded via FAST+ |
| 4 | Country routing and approver/delegate setup | FAST+ configuration | System pull on submission |
| 5 | Approval decision, comments, consent declaration | Approver/Delegate | Captured in-system |

- **Data quality issues**: None reported.

- **Validation**: Limited to required-field enforcement at submission.

**6. Stakeholders & Responsibilities**

- **Input Provider**: GFS KL FP&A requestor

- **Executor**: FAST+ (system) + requestor

- **Reviewer/Challenger**: Approver and/or nominated Delegate

- **Approver/Sign-off**: Designated approver (CFO or nominated approver per market routing)

- **Final Recipient**: OneGRC (audit evidence); requestor (confirmation)

**7. Tools & Systems**

| **\#** | **Tool** | **Purpose** | **Type** |
|----|----|----|----|
| 1 | Power Apps | FAST+ UI | Primary |
| 2 | Power Automate | Routing, reminders, auto-delegation | Primary |
| 3 | SharePoint Online | Document storage & records | Primary |
| 4 | Outlook | Notifications | Supporting |
| 5 | Microsoft Teams | Approver notifications | Supporting |
| 6 | OneGRC | Downstream evidence repository (manual upload) | Supporting |

- **Automation level**: Mostly Automated with manual oversight.

- **Workaround**: Manual download and upload of evidence into OneGRC.

**8. Step-by-Step Process Flow**

| **Step** | **Action** | **Performer** | **Tool** | **Duration** |
|----|----|----|----|----|
| 1 | Create and submit request (type, month, country/entity, attachments) | Requestor | FAST+ | 3 mins |
| 2 | Documents auto-saved to SharePoint | System | SharePoint | Auto |
| 3 | SharePoint record created with unique ticket ID (Market-YYYYMM-Number) | System | SharePoint | Auto |
| 4 | **Decision — Routing logic**: Assigned to **Group 2** or **Group 3** based on the **existing approval route in the market** | System | Power Automate | Auto |
| 5 | Approver notified via **Email and Teams (parallel)** | System | Outlook / Teams | Auto |
| 6 | Daily reminder sent (12:00 PM MYT) until action taken | System | Power Automate | Daily, auto |
| 7 | **Decision — Approved by cut-off?** If not, auto-delegate to nominated delegate | System | Power Automate | Auto |
| 8 | Approver/Delegate reviews documents, confirms consent, **Approves or Rejects** | Approver / Delegate | FAST+ | N/A |
| 9 | System records outcome and updates status | System | FAST+ / SharePoint | Auto |
| 10 | Confirmation email sent to requestor with attachments, timestamp, consent | System | Outlook | Auto |
| 11 | Requestor downloads approval record and confirmation as evidence | Requestor | Manual | 2 mins |
| 12 | Requestor manually uploads evidence into OneGRC | Requestor | OneGRC | 2 mins |

**Decision points**: (i) Routing to Group 2 or Group 3 based on market's existing approval route; (ii) Approval by cut-off (Yes → proceed / No → auto-delegate); (iii) Approve vs Reject. **Parallel steps**: Email and Teams notifications.

**9. Output & Deliverable**

- **Output**: Completed FSC control approval record with comments, consent, and supporting documents; uploaded to OneGRC.

- **Format**: System entry (FAST+ / SharePoint) + email summary.

- **Granularity**: By Market/Country; by Control type.

- **Standardisation**: Fully standardised.

- **Storage**: GFS KL FP&A SharePoint; then manual upload to OneGRC.

**10. Validation, Controls & Approval**

| **\#** | **Validation** | **Type** | **Criteria** |
|----|----|----|----|
| 1 | Consent declaration by approver/delegate | Manual | Must be completed before approve/reject |
| 2 | Approver flow / status check | Manual | Reviewed before acting |
| 3 | Required fields & attachments | Automated | Enforced at submission |

- **Formal sign-off**: Yes — CFO or nominated delegate.

- **Iterations**: Typically 1 (first-time right).

- **SOX/Audit relevance**: Yes — FSC008/009/011 attestations; evidence retained in OneGRC.

**11. Dependencies & Interconnections**

- **Predecessor**: Month-end close (Pre-close Analysis).

- **Successor**: OneGRC audit record.

- **Delay impact**: Missed cut-off triggers auto-delegation; risk to monthly audit evidence.

- **Error surfacing**: During OneGRC upload or later audit review.

**12. Pain Points, Risks & Improvements**

- **Pain Point**: Manual evidence compilation and OneGRC upload post-approval.

- **Categories**: Excessive manual effort; system limitations.

- **Risks**: Missing/incomplete/inconsistent evidence; visibility ends at FAST+ approval.

- **Improvement**: Automate generation of a **OneGRC-ready evidence package** from FAST+ metadata.

- **Quick win**: Standardise evidence package format (auto-compiled PDF from FAST+).

**Process Steps Summary — FCF Control**

**Submit request (FAST+) → Auto-save to SharePoint → Generate ticket ID → \[Decision: Group 2 vs Group 3 per market's existing approval route\] → Notify approver (Email + Teams, parallel) → Daily reminders → \[Decision: Approved by cut-off?\] → If no, auto-delegate → Approver/Delegate reviews & consents → \[Decision: Approve/Reject\] → Record outcome → Requestor confirmation → Download evidence → Manual upload to OneGRC.**

## Source file: MPC Planning Process.docx

- Path: `Tower Subprocesses/FP&A Commercial/MPC Planning Process.docx`
- Format: DOCX

**1. Purpose and Business Objective**

The MPC Planning process exists to **plan, forecast, and validate manpower costs and headcount** across the relevant business area. It ensures that workforce-related costs — salaries, benefits, and contractor spend — are accurately reflected in financial plans and aligned to business priorities.

The output directly enables leadership decisions on **budget setting, hiring, workforce allocation, vacancy management, and cost control**, and supports actions such as approving recruitment, adjusting forecasts, reallocating resources, and managing delivery against financial targets. When the process is delayed or inaccurate, the downstream impact is significant: **poor financial forecasting, budget misalignment, delayed hiring decisions, overspend or underspend, and reduced confidence in planning data**, all of which affect resource allocation and the organisation's ability to meet strategic objectives.

**2. Trigger and Timing**

The process is triggered by AstraZeneca's three budget cycles: **RBU2** (covering CY and CY+1), **MTP** (CY through CY+3), and **PB** (next year). While timing varies slightly by market, the cycles generally begin in **February for RBU2** (completing in May), **May for MTP** (completing in September), and **October for PB** (completing in December).

Each cycle typically requires around **five working days of active effort**, though duration flexes depending on the volume of changes requested. Market timelines are adjusted as needed to meet overall cycle goals.

**3. Inputs and Data Sources**

The process draws on three primary inputs. First, **FTE, MPC, and MPDC cost data** originate from **AZ FORCE and HR** — AZ FORCE pre-populates FTE details and MPC assumptions, and HR validates and amends. Second, **FTE by Brand (SMM)** is collected via an **Excel template** that Finance sends to HR for input, with data also flowing through CMR. Third, the **FTE, MPC, and MPDC review template** is built by downloading AZ FORCE data into Excel and reviewing jointly with HR.

Data quality is an ongoing concern. AZ FORCE frequently has **missing data during actualization**, and **newly created cost centres are often unavailable for planning**. To validate completeness and accuracy before starting work, the team builds **total check lines** into templates to ensure summations tie back to expected totals.

**4. Stakeholders and Responsibilities**

Input is provided by **HR and BUD**, who also serve as executors for their respective data inputs. **Finance FP&A** acts as reviewer and challenger, while **HR and the CFO** are the approvers and sign-off authorities. The final recipients and consumers of the output are **Business Unit Directors**.

The process is heavily dependent on external teams — HR and BUD for inputs, AZ FORCE for system data, and CMR for review templates. **Delayed inputs from HR and BUD occur frequently** and are a persistent source of friction.

**5. Tools and Methods**

Three tools underpin the process: **AZ FORCE** as the primary planning system for FTE, MPC, MPDC, and VR% inputs; **CMR** for consolidated review and downstream data flow; and **Excel templates** for FTE by Brand collection, review, and analysis.

The overall automation level is best described as **mostly manual with some system support**. AZ FORCE handles the system entry, but collection, review, and consolidation activities remain Excel-driven. Two significant workarounds exist: **FTE by Brand collection and review is done entirely in Excel** because AZ FORCE does not support brand-level input, and **output review is also done in Excel** because the AZ FORCE review layout is not user-friendly.

**6. Step-by-Step Process Flow**

The process runs as follows:

**Step 1 — Template preparation (FP&A, Excel, ~4 hrs):** At the start of each budget cycle, FP&A prepares Excel templates for FTE by Brand across Sales, Marketing, and Medical, with further splits by Therapy Area, ready for BUD input.

**Step 2 — BUD input (BUD, Excel):** FP&A shares the templates with BUDs, who plan FTE at brand level for the requested period.

**Step 3 — Completeness and variance review (FP&A, Excel, ~4 hrs):** Once completed templates are returned, FP&A performs a completeness check, reviews key assumptions, and analyses variances against the comparator.

**Step 4 — Consolidation (FP&A, Excel, ~1 hr):** All BUD inputs are consolidated into a total Sales, Marketing, and Medical view, and the consolidated file is shared with HR.

**Step 5 — HR system input (HR, AZ FORCE):** HR verifies FTE by Brand and inputs total FTE for Sales, Marketing, Medical, and G&A into AZ FORCE, along with planning assumptions such as MPC, MPDC, and VR%.

**Step 6 — Output review with HR (FP&A, Excel, ~4 hrs):** FP&A downloads the AZ FORCE output, performs analysis, and reviews with HR to challenge assumptions and confirm completeness.

**Step 7 — Push to PMR / CMR (FP&A, AZ FORCE, ~5 mins):** Once review is complete, data is pushed to PMR via AZ FORCE, and opex rules are run in Flex Form so the data and brand allocation calculation flows into CMR .

**Step 8 — Linking to P&L templates (FP&A, Excel, ~0.5 hrs):** The AZ FORCE MPC/MPDC cost template is linked to the cost templates used for the projected P&L and analytical review files.

**Step 9 — Iterative alignment (FP&A / HR / BUD):** All relevant steps are repeated as needed to ensure alignment with HR, BUDs, and other stakeholders based on the numbers of internal review.

A key **decision point** exists during MPC and FTE review (Steps 3–6): Finance engages with BUD and HR to clarify inputs, discuss assumptions, and resolve issues. **The review cycle loops until full alignment is achieved**, after which the process proceeds. Additionally, **HR may input G&A data in parallel** while SMM FTE planning is still in progress.

**7. Output and Deliverable Structure**

The final outputs are the **MPC Review Report, FTE Reports, and the MTP MPC/FTE presentation slides**, delivered in a combination of **Excel files, PowerPoint slides, and system entries** (AZ FORCE flowing to CMR). Outputs are structured at **brand/product, P&L line, and cost centre** levels of granularity.

Templates are **mostly standardised with minor variations by market and BU**. All final outputs are stored on **Box and SharePoint**.

**8. Validation, Controls, and Approval**

Four manual validation checks are performed before release: the **FTE review templates**, the **MPC/MPDC review templates**, the **total projected P&L review**, and the **ROI / operating leverage by brand review**. All are manual.

A formal approval gate exists, with the **CFO providing sign-off**. Iteration is heavy — the process typically goes through **four or more revision cycles** before final approval. When errors are found post-submission, the team assesses the financial impact; if severe, the issue is **escalated to the CFO** and corrections are cascaded across all systems and Excel files.

**9. Dependencies and Interconnections**

The process cannot begin until **AZ FORCE actualized data is ready and system is open for input**. Once complete, AZ FORCE data readiness enables HR to review employee data at detail level and feeds directly into MPC Review templates, MTP templates, and other downstream planning deliverables.

A delay of even one to two days pushes back the entire MPC planning exercise, cascading into MTP timelines. Uncaught errors would surface downstream in **MPC Review templates, MTP templates, and the projected P&L**. The process **receives input from Revenue Planning** and **feeds into MPC Planning, System Submission, Deck Preparation, Pre-close Analysis, and Monthly Revenue & Cost Reporting**.

**10. Pain Points, Risks, and Improvement Opportunities**

Three pain points dominate the current state. First, there are **ongoing disagreements and misalignment between BUD, HR, and Finance**, which delay reaching a final conclusion. Second, **MPC is revised multiple times** when total company operating profit does not meet target, requiring repeated re-alignment of MPC by brand. Third, **preparing Excel templates** for FTE by Brand collection, review, and analysis consumes disproportionate effort.

These pain points fall across multiple categories: **data quality and completeness issues, excessive manual effort, system limitations, stakeholder responsiveness, lack of standardisation across markets, and frequent rework loops**.

The most significant risk is that **FTE by Brand and MPC allocations are highly subjective and manually adjusted**, which creates a **mismatch between planning and actuals** and can give top management a **misleading view of brand-level resource investment**.

Three targeted improvements would materially reshape the process: **enabling brand allocation inputs directly within AZ FORCE** so the business can input and review in-system; **making the AZ FORCE review tab customisable** for a friendlier layout; and **enabling direct flow from AZ FORCE to CMR**, skipping the need to run rules in PMR. As an immediate quick win, **standardising the Excel FTE-by-Brand templates across markets** and pre-linking them to AZ FORCE downloads would reduce manual preparation effort significantly.

## Source file: Mid-Month Forecast.docx

- Path: `Tower Subprocesses/FP&A Commercial/Mid-Month Forecast.docx`
- Format: DOCX

**Transcript 1 — Mid-Month Forecast (MMF)**

**1. Purpose and Business Objective**

The Mid-Month Forecast process exists to **collect the latest mid-month sales forecast** from business teams, consolidate the updates, and provide management with timely visibility of any **risks and opportunities against the current sales outlook**. It ensures the forecast reflects the most recent market dynamics, commercial performance, and business assumptions.

The output enables management to **assess whether the business is performing in line with expectations** and to take corrective action where needed. It supports decisions on sales performance management, resource allocation, risk mitigation, opportunity capture, and the likely achievement of monthly or period-end targets, while also helping leadership align on priorities and communicate an updated outlook to stakeholders.

When the process is delayed or inaccurate, management loses reliable visibility of expected sales performance. This can lead to **poor decision-making, missed opportunities to address emerging risks, delayed corrective actions, and misalignment across teams**. It also reduces confidence in reported outlooks and increases the risk of missing financial targets.

**2. Trigger and Timing**

The process runs monthly and is triggered by the **international / group MMF submission deadline in mid-month**. It begins on **Working Day 1**, immediately after sales close, and typically completes by **WD7**, though the exact deadline varies by market. The overall duration is around **seven working days**, and the timeline does not shift during budget or forecast cycles. However for quarter month forecast, the timeline is tight whereby submission need to be completed by WD+2 or WD+3.

**3. Inputs and Data Sources**

Two primary inputs are required. First, **actual sales data for the previous month** is pulled from **CMR via system refresh**. Second, **sales forecast input from BUs** is provided by **brand managers and BUDs via email**.

Data quality is inconsistent — **actual sales data can continue to change after WD1**, meaning early template distribution to BUs may result in mismatched actuals. To validate inputs, the team performs **total checks and validation checks against CMR** before proceeding.

**4. Stakeholders and Responsibilities**

Input is provided by **brand managers and BUDs** (external to FP&A), and execution is shared between **brand managers, BUDs, and FP&A**. The **CFO, CP/GM, BUD, and CBP** act as reviewers and challengers, while the **CFO and CP/GM** provide final sign-off.

The process is dependent on the sales team, who build the bottoms-up revenue forecast, and on brand managers or BUDs who validate it. **Delays are common**, particularly when the sales forecast does not meet leadership expectations, prompting rework.

**5. Tools and Methods**

The process relies primarily on the **Mid-Month Sales Forecast file**, an Excel workbook used to consolidate inputs and review sales by brand. The overall automation level is **semi-automated** — a mix of manual data collection and some system-supported refreshes. The Excel file contains **multiple tabs** and is shared simultaneously across contributors. Sales forecast collection is done entirely via Excel, with no system workaround in place.

**6. Step-by-Step Process Flow**

The process begins with **Step 1**, where FP&A refreshes the MMF sales file with actuals and comparator data. In **Step 2**, FP&A collects the latest sales forecast from BUDs, either via email or completed Excel templates. **Step 3** involves consolidating the forecast inputs and performing analysis versus the latest planning cycles and actuals. Finally, in **Step 4**, FP&A reviews the consolidated MMF with CBP, CFO, BUD, and CP, aligning on the final submitted forecast.

A **key decision point** is that the previous month's sales numbers must be finalised before the coming month's forecast can proceed. The **bottoms-up sales forecast can run in parallel** with sales team work while templates await actual month refresh.

**7. Output and Deliverable Structure**

The final output is the **Mid-Month Sales Forecast submission** for the market, delivered as an **Excel file** and supported by an **email summary**. Granularity is at **market/country and brand/product** levels. Templates are **mostly standardised with minor variations**, and outputs are stored on **SharePoint, Box, or shared via email**.

**8. Validation, Controls, and Approval**

Validation consists of a **manual completeness check** of MMF files against BUD forecasts and actuals against CMR. A formal approval gate exists, with the **CFO, CP, or GM signing off**. The process typically goes through **four or more revision cycles** before final sign-off. When errors are found post-submission, the team **assesses financial impact and escalates to the CFO if severe**, performing corrections across all systems and Excel files. There are **no SOX-relevant or audit-relevant controls** embedded in this task.

**9. Dependencies and Interconnections**

Month-end close must be completed before this task can begin, as actual sales data is a prerequisite. The output feeds directly into the **MMF review process with the leadership team**. A one to two day delay pushes back both submission and leadership review, and uncaught errors typically surface during MMF review discussions.

**10. Pain Points, Risks, and Improvement Opportunities**

Three pain points dominate. First, **sales forecast collection from BUDs is entirely manual** — there is no online platform for data collection. Second, **multiple changes and rework** in the sales forecast are routine. Third, the process **coincides with month-end close**, creating peak workload pressure on FP&A, particularly during planning cycles.

Pain points fall across the categories of **tight timelines, system limitations, stakeholder responsiveness, and frequent rework loops**. The most significant risk is that **there is no system submission** — all data is recorded manually in Excel, creating audit and accuracy exposure.

The primary improvement opportunity is to **implement a system or online platform for data collection and review**, replacing the current email-based Excel workflow.

## Source file: NMPC Planning.docx

- Path: `Tower Subprocesses/FP&A Commercial/NMPC Planning.docx`
- Format: DOCX

**Transcript 2 — NMPC Planning (Non-Manpower Cost Planning)**

**1. Purpose and Business Objective**

The NMPC Planning process supports the **planning, consolidation, and reporting of non-manpower costs** for the budgeting cycle, ensuring financial data is accurately prepared for review and decision-making on the future commercial activities.

The output enables leaders and stakeholders to **review projected non-manpower costs, assess budget allocation, and make informed decisions** during planning and budget review discussions. If delayed or inaccurate, the process can result in **incorrect budget figures, delays in the planning cycle, inefficient review discussions, and poor financial decision-making particular on what are the projects or investment to do for commercial activities in order to grow company revenue.** .

**2. Trigger and Timing**

The process is triggered by AstraZeneca's three budget cycles: **RBU2** (CY and CY+1), **MTP** (CY through CY+3), and **PB** (next year). Timing varies by market but generally aligns with: **RBU2** starting in February and completing in May; **MTP** starting in May and completing in September; and **PB** starting in October and completing in December.

Each cycle typically requires around **1-2 weeks of active effort on NMPC planning**, adjusted based on the number of changes requested. Market timelines are based on planning cycle submission timeline.

**3. Inputs and Data Sources**

Two primary inputs are required. First, **Non-Manpower Cost planning templates** (Warsaw cost tool) draw from **CMR, SAP, and Excel which for cost consolidation purpose**. Second, **cost centre owner and brand manager forecast inputs** are captured via cost planning templates which sent to them at the beginning of each cycle.

Data quality is a persistent challenge. When preparing NMPC templates, **duplicated data can appear** in actuals or planning because multiple lines with the same GL/CC combination were created in previous cycles to accommodate different activity purposes, while actual NMPC data is recorded only at GL and CC level as we can’t split it by activities while future months planning is by activities. This requires additional review and manual validation. Validation is performed by **running total checks on NMPC templates** and reconciling previous planning data or actuals against CMR.

**4. Stakeholders and Responsibilities**

Input is provided by **cost centre owners, brand managers, and BUDs** (external), who also execute the input activity alongside FP&A. **FP&A, the CFO, BUD, and GM** act as reviewers and challengers, while the **CFO and GM** provide final sign-off. Final recipients are **Business Unit stakeholders**.

The process depends on the **Warsaw templates** and on **business forecast inputs** to complete. **Delays in business team submissions** are the most common cause of downstream slippage and multiple reminders need to send out to ensure all inputs are collected.

**5. Tools and Methods**

Two tools drive the process: the **Excel Cost Template**, used to prepare templates for business input and consolidate all inputs (warsaw cost tool); and **CMR / SAP**, used to refresh actuals and previous planning data in Excel templates. The automation level is **semi-automated** — a mix of manual and automated steps. The Excel workbook contains **multiple tabs, uses macros/VBA, and is shared simultaneously**.

A workaround exists because **SAP details are sometimes added for certain cost centres based on owner requests for them to understand what are the actual spend detail**, while original actual and planning data are only available at WRAP GL level, requiring manual alignment.

**6. Step-by-Step Process Flow**

The process begins in **Step 1** with FP&A preparing the NMPC Excel Template via the Cost Tool (~8 hours). In **Step 2**, FP&A shares the template with cost centre owners via SharePoint, Box, or email (~1 hour). **Step 3** involves reviewing completed inputs and advising changes, with the loop repeated where inputs contain errors or invalid entries (~8 hours). In **Step 4**, FP&A consolidates all inputs into the Cost Tool and runs allocation by brand — the allocation percentage is either assigned based on cost centre nature, collected from owners, or derived from bases such as revenue or FTE ratio (~4 hours).

**Step 5** enables review at total cost level by department, cost centre, or GL (~8 hours). In **Step 6**, FP&A consolidates the Cost Tool output into the PnL consolidation file and generates analytical files for total view review, including revenue/MPC and brand-level review (~8 hours). Once complete, **Step 7** uses the consolidation file to generate the pivot for NMPC and the allocation file for Flex Form upload (~1 hour). **Step 8** covers repeat cycles as needed following review.

A **key decision point** applies: depending on the target received, NMPC planning is adjusted after balancing the total company view to align with target. **Brand allocation planning can run in parallel** with NMPC planning.

**7. Output and Deliverable Structure**

The final output is a combination of the **Cost Tool, analytical files, and ultimately the presentation deck**, as NMPC forms part of the total cost reviewed during budget presentations. Formats include **Excel files, PowerPoint slides, and email summaries**. Granularity spans **market/country, brand/product, P&L line, and cost centre**.

Templates are **mostly standardised with minor variations** — most country FP&A teams supported by KL have adopted the Warsaw Cost Tool. Outputs are stored on **SharePoint and Box**.

**8. Validation, Controls, and Approval**

Four manual validation checks are performed: **Cost Tool template review**, **Cost Tool consolidation review**, **analytical tool review**, and **international Excel template review**. All are manual in excel form.

A formal approval gate exists, with the **CFO and GM signing off**. The process typically requires **four or more revision cycles**. When errors are found post-submission, the team **assesses financial impact and escalates to the CFO if severe**, performing corrections across systems and Excel files. There are **no SOX-relevant or audit-relevant controls** embedded in this task.

**9. Dependencies and Interconnections**

The process can run **in parallel with MPC Planning and Revenue Planning**, though a complete view of the total financial picture is only available once all three are complete. NMPC Planning feeds directly into **Planning System Submission and Planning Deck Preparation**. A one to two day delay pushes back the consolidated total company view and the deck preparation. Uncaught errors typically surface in the **presentation slides during the rehearsal or deck review session**.

**10. Pain Points, Risks, and Improvement Opportunities**

Three pain points dominate. First, **cost template preparation is not straightforward** — it involves copying past planning cycle details, matching against actuals on the same lines, and requires careful scrutiny and total checks. Second, **macros in the Cost Tool sometimes run with errors** that the team cannot resolve without contacting the tool owner. Third, **repetitive rework** occurs every time changes happen.

Pain points fall across **data quality, excessive manual effort, system limitations, stakeholder responsiveness, and frequent rework loops**. The most significant risk is **heavy reliance on the Cost Tool with multiple macro functions** — if the macro crashes, significant troubleshooting effort is required.

The primary improvement opportunity is to **enable direct cost input by budget owners via an online platform**, eliminating the need for FP&A to prepare Excel templates and perform consolidations, and freeing capacity to focus on variance analysis and target vs. potential assessments.

## Source file: Planning Review Preparation.docx

- Path: `Tower Subprocesses/FP&A Commercial/Planning Review Preparation.docx`
- Format: DOCX

**Transcript 3 — Planning Deck Preparation**

**1. Purpose and Business Objective**

The Planning Deck Preparation process supports the **preparation of finance-related slides for planning review**, including RBU2, and MTP.

The output enables Area or International leaders to **clearly understand the current position of the marketing company** and supports **efficient, structured discussions** for decision-making during planning reviews. If delayed or inaccurate, planning number reviews become **slower, less efficient, and less structured**, affecting the quality and timeliness of decision-making.

**2. Trigger and Timing**

The process is triggered when **international shares out the planning review deck** and market has completed the submission of planning data into system. There is no fixed calendar start date but there is a pre-read submission date that decided by Area or International Finance team. Typical windows for the planning deck preparation are part of the planning cycle which **March for RBU2** (completing in April) and **July for MTP** (completing in August). No presentation for Phased Budget whereby no review for Phased Budget.

Total duration depends on the number of revisions and ad hoc slide requests, with a **standard baseline of around 2 working dats**. The process runs during planning cycles (RBU2 and MTP), and market planning timelines are adjusted to meet the required deadlines set by Area or International.

**3. Inputs and Data Sources**

Three primary inputs are required: **planning numbers for each forecast cycle** (loaded from PMR into CMR by the FP&A team); the **refreshed international Excel template** (shared by the international team); and the **refreshed international deck**, where FP&A refreshes the Excel template and copies content into the PowerPoint deck.

Data quality is a recurring issue — **Excel templates from the international team often contain formula errors or outdated structures**, requiring manual correction before data can be transferred into the deck. Validation is performed **manually, slide by slide**, comparing the working deck against the original international deck to identify missing slides or discrepancies.

**4. Stakeholders and Responsibilities**

Input is provided by **FP&A and Business Units**, execution sits with **FP&A**, and reviewers include the **GM, CFO, FP&A, and Business Units**. Sign-off rests with the **GM and CFO**, and the final recipient is the **International Finance team**.

The process is dependent on the **international finance team to distribute the Excel templates and review deck**. **Delays typically originate from late distribution** of these materials from international.

**5. Tools and Methods**

The process uses **Excel templates and PowerPoint** to provide graphs and tables for planning review. Automation level is **semi-automated**. The Excel workbook contains **multiple tabs**, does not use macros, and is shared simultaneously to all the markets. A presentation tool exists which is  **AZcreate is used to link Excel templates to the PowerPoint deck** which help the analyst reduce works. The data of the excel templates are retrieved from CMR after the completion of planning submission in P&MR.

**6. Step-by-Step Process Flow**

The process begins in **Step 1** when the international finance team shares the Excel template and deck with the market. At the same time, analyst has submitted the number into system and get market finance sign off to start on presentation deck preparation. In **Step 2**, FP&A performs completeness and error checks on the Excel templates and validates them against the requirements in the PowerPoint deck. **Step 3** involves refreshing the Excel templates with the latest numbers from CMR and copying and pasting content into the PowerPoint presentation deck. **Step 4** is a repeat cycle triggered every time system numbers change.

A **key decision point** is that the deck must be refreshed every time a decision on numbers changes in the system.

**7. Output and Deliverable Structure**

The final output is the **planning presentation slide deck**, delivered as **PowerPoint slides**. Granularity spans **market/country, brand/product, and P&L line**. Templates are **mostly standardised with minor variations**, with variation occurring where a market has a specific need to present a particular financial condition which is to align with the main message the market wants to deliver during the review with Area or International SET. Outputs are stored on **Box and SharePoint** and shared with the embedded finance, and business. Eventually a pre-read will be sent to Area team or international finance team before the review.

**8. Validation, Controls, and Approval**

Validation consists of a **manual slide-by-slide check** of the presentation deck against the template to ensure completeness and error-proofing. A formal approval gate exists, with the **GM and CFO signing off**. The process typically requires **four or more revision cycles**. When errors are found post-submission, the team revises the Excel templates and PowerPoint deck. There are **no SOX-relevant or audit-relevant controls** embedded in this task.

**9. Dependencies and Interconnections**

The **full planning exercise** — Revenue, MPC, NMPC, and Planning System Submission — must be completed before this task can begin. The output feeds into **Planning Review by the leadership team**. A one to two day delay pushes back the leadership planning review. Uncaught errors typically surface during review by the GM, CFO, or BUD.

**10. Pain Points, Risks, and Improvement Opportunities**

Three pain points dominate. First, **repeated refresh of templates and copy-paste into PowerPoint** every time numbers change is time-consuming. Second, **error checking of Excel templates shared by international** creates significant overhead. Third, **Excel template format is not always aligned with the requested PowerPoint deck**, requiring reformatting.

Pain points fall across **data quality, excessive manual effort, and frequent rework loops**. The primary risk is that **incorrect numbers presented in the deck** can lead to confusion, inefficient review discussions, and potentially incorrect decision-making.

Three targeted improvements would reshape the process: **reducing the number of slides requested in the international deck**; **standardising Excel template formats to align with the deck** before distribution to markets; and **enabling direct refresh within PowerPoint** rather than refreshing Excel templates and copying content across.

## Source file: Planning System Submission.docx

- Path: `Tower Subprocesses/FP&A Commercial/Planning System Submission.docx`
- Format: DOCX

**Planning System Submission**

**1. Objective**

The purpose of the Planning System Submission process is to ensure that all **Sales, Cost, Manpower, and Brand Allocation** planning data are accurately consolidated, validated, and uploaded into **PMR (Planning System)**. This ensures the planning system reflects the latest approved assumptions and provides a reliable source of financial data for downstream reporting, management review, and decision-making via **CMR (Reporting Hub)**.

**2. Business Rationale**

The output enables business leaders and finance teams to review the latest financial plan — covering revenue, cost, margin, and resource allocation — supporting business performance management, budgeting, forecasting, resource planning, and strategic initiatives. Failure to complete this task accurately or on time may result in incorrect PMR/CMR positions, inaccurate forecasts, delayed management reporting, and misaligned resource decisions.

**3. Trigger and Timing**

The process is triggered once the **Sales Tool, Cost Tool, and related planning files** have been finalised and consolidated by the **Embedded Finance team**. The submission timeline aligns to the planning cycle calendar:

- **RBU2:** March

- **MTP:** July

- **PhB:** November

For KZ (MTP cycle reference), the task commences **two weeks after the Commercial Planning Hub opens (30 July)** and must be completed **before the R&E internal review on 5 August**. Under normal conditions the task is completed within **one working day**; if system or master data issues arise, completion may extend to **two working days**. The process is repeated for any resubmissions within the cycle.

**4. Inputs and Sources**

All inputs are received via **email** from the **Embedded Finance team (FBP)** and include Sales data, Cost data, Brand Allocation, and AZForce data. Note that **FTE and VR% data feed directly from AZForce into PMR** and are not required as separate manual inputs.

**5. Stakeholders**

| **Role** | **Party** | **Position Relative to FP&A** |
|----|----|----|
| Input Provider | Embedded Finance | Internal |
| Executor | GFS team | Internal |
| Reviewer / Challenger | GFS team | Internal |
| Approver / Sign-off | Embedded Finance (CFO / Embedded Finance) | Internal |
| Final Recipient | Embedded Finance | Internal |

**6. Tools and Systems**

The process is **semi-automated** and uses the following **primary** tools and systems:

- **AZForce** — source system for Manpower, Manpower-Driven Costs, FTE, and VR% data; feeds PMR directly.

- **PMR (Planning System)** — target system for all planning data submissions via FlexForms.

- **CMR (Reporting Hub)** — downstream reporting system fed by PMR via the PMR–CMR bridge.

- **Excel** — used for the Sales Tool, Cost Tool – Conso Check, Consolidation file, PMR Load file, PMR vs Analytics Check file, and Analytics file. Excel tabs contain all planning dimensions required by PMR, including Sales Volume, GtN, VSE, NMPC Cost by Cost Centre, Brand Allocation by Planning Level, and Sales by Indication (for Rare Disease). All dimensions are submitted to PMR using FlexForms.

**7. Detailed Process Steps**

Sales Upload and Cost Upload **can technically run in parallel**; however, because one analyst is assigned to one market, they are typically executed **sequentially**.

**7.1 Sales Upload**

**Step 1 — Generate Sales and VSE FlexForms**

- Open the *Sales Tool – International* file.

- Click **Sales to FlexForm** to generate the Sales upload file.

- Click **VSE to FlexForm** to generate the VSE upload file.

**Step 2 — Upload Sales and VSE Data to PMR**

- Open the *PMR Load* file and connect to PMR.

- Copy Sales data into the Sales FlexForm → click **Submit Data**.

- Click **Refresh Data** and verify successful submission.

- Repeat for the VSE FlexForm.

**Step 3 — Run Margin Rules**

- Log in to **COM_IR** via Microsoft Edge.

- Navigate to *Task Lists \> Margin: Template Upload \> One Click Rule Options*.

- Select *Product Markets \> Margin Aggregation, Submission & RDU Indication Split*.

- Enter the relevant MU Market → click **Launch**. Wait for completion.

**Step 4 — Update Gross Margin Pay Away**

- Open the *Gross Margin Pay Away Review & Update* form.

- Select the alliance brand (e.g., Enhertu).

- Verify submitted volume matches planned Sales volume.

- Calculate and enter the required adjustment under *Gross Margin Pay Away – Input* → click **Submit Data**.

- Verify Gross Margin Share on Alliances.

- Open the *Gross Margin Pay Away Volume & Phasing* form → enter phasing → click **Submit Data**.

- Repeat for all alliance brands (**three brands for KZ**).

**Step 5 — Re-run Margin Rules**

- Return to *One Click Rule Options* and re-run the Sales rules to finalise the upload.

**7.2 Cost Upload**

**Step 6 — Consolidate the Cost Tool**

- Open *Cost Tool – Conso Check* → click **Consolidate** to verify no mapping issues.

- If clean, open the *Consolidation* file → click **Update Costs** → **Consolidate**.

- Review for error messages. If none, click **Costs to FlexForm** and **Allocation to FlexForm** to generate the upload files.

**Step 7 — Upload Non-Manpower Costs to PMR**

- Open *PMR Load* file → connect to PMR.

- Copy Cost data into Cost FlexForm → **Submit Data** → **Refresh Data** → verify.

- Repeat for the Brand Allocation FlexForm.

**Step 8 — Upload Manpower Costs via AZForce**

- Open **AZForce**.

- Copy the planning Version to Final — this uploads Manpower and Manpower-Driven Costs (as well as FTE and VR%) directly to PMR.

**Step 9 — Run Opex Rules**

- Log in to COM_IR.

- Navigate to *Task Lists \> Preplanning: Opex: Template: Brand Allocation: One Click Agg & Submission*.

- Click **One Click Rule Options** → select *Brand Allocation \> Aggregation, Opex & OIE Submission*.

- Enter MU Market → click **Launch**. Wait for completion.

**7.3 Analytics File Generation and PMR Validation**

**Step 10 — Generate Analytics File**

- Download *Review Active FTE and Manpower Cost Report* and *Review FTE Report* from AZForce.

- Update Manpower Cost data into *Cost Tool – Conso Check* → **Consolidate**.

- Open *Consolidation* file → **Update Costs**.

- Copy FTE and VR% data into the Consolidation file → **Consolidate** to generate the Analytics file.

**Step 11 — Validate PMR vs Analytics**

- Open *PMR vs Analytics Check* file → connect to PMR.

- Refresh R1 and R2 tabs.

- Change data source to the latest Analytics file → click **Calculate Now**.

- Review any variances.

**Step 12 — Validate PMR vs CMR (Reporting Hub)**

- Once the CMR Bridge Schedule is available, extract topline data from both PMR and CMR.

- Compare results and investigate variances before finalising.

- *Note:* A wait time of **30 minutes to 1 hour** is currently required post PMR–CMR bridge before data fully reflects in CMR.

**7.4 Validation, Approval and Rework**

**Step 13 — Final Validation Checks**

- Wait for data to reflect in CMR → retrieve CMR data → cross-check against the consolidated template → verify Sales amount, Sales volume, cost by department, and cost by brand.

**Step 14 — Review and Sign-off by Embedded Finance**

- Once loading and checking are complete, GFS sends the finalised dataset to **Embedded Finance** for review.

- Sign-off is obtained from **CFO or Embedded Finance** via **email or Teams conversation**.

- The task typically undergoes **4 or more iteration cycles** before final sign-off.

**Step 15 — Exception Handling (Rework Loop)**

- If errors or discrepancies are identified post-submission, GFS investigates the root cause, corrects the source file, reconsolidates, resubmits to PMR, and repeats validation checks.

**8. Output and Storage**

The final deliverable is a **completed and validated planning submission in CMR**, containing Sales, VSE, Non-Manpower Cost, Brand Allocation, Manpower, and Manpower-Driven Cost data. The output is stored in the **Reporting Hub (CMR)**, provided in **Excel and system-entry format**, at granularity of **Market/Country, Brand/Product, and P&L Line**. The template is **fully standardised** across markets.

**9. Dependencies**

**Upstream processes (feed into this task):**

- Revenue Planning

- MPC Planning

- NMPC Planning

- Review

**Downstream processes (fed by this task):**

- Deck Preparation

- Monthly Reporting (Monthly Revenue & Cost Reporting)

A delay of 1–2 days impacts Analytics completion, PMR reconciliation, CMR validation, and management review timelines. Undetected errors surface in PMR reports, Analytics files, CMR, and management reporting outputs.

**10. Controls**

There are **no formal SOX or audit-relevant controls** embedded in this task. However, a **standard review control** is in place: upon completion of loading and validation, GFS circulates the finalised data to Embedded Finance for **review and sign-off via email or Teams**.

**11. Pain Points and Improvement Opportunities**

**Key Pain Points:**

- Late receipt of source files or last-minute changes from Embedded Finance.

- Heavy manual consolidation and reconciliation across multiple Excel files and systems.

- System and master data issues during upload and rule execution (e.g., new cost centre missing in PMR after push to Final Version).

**Risks:**

- Dependency on timely and accurate Embedded Finance inputs threatens submission timelines.

- Key-person risk and frequent rework loops.

**Improvement Ideas:**

- Reduce reliance on multiple Excel files; ensure Manpower Costs are fully updated in AZForce before generating the Cost file for submission to avoid macro upload errors.

- Reduce the need to regenerate the Analytics file after every change.

- Improve timeliness of data feed into CMR to enable faster validation and reporting.

**Quick Win:**

- Reduce the current 30-minute to 1-hour PMR–CMR bridge processing lag to enable faster validation.

## Source file: PnL Planning.docx

- Path: `Tower Subprocesses/FP&A Commercial/PnL Planning.docx`
- Format: DOCX

**P&L Planning *(Updated with Excel Complexity)***

**1. Objective / Purpose**

To generate a **total company P&L for the planning period**, depending on the planning cycle (**PB, RBU2, MTP**), providing an overall anticipated company profit view for future months or years.

**2. Business Outcome Supported**

Determines expected **gross margin** and **operating profit** for a market over the next 2 years or mid-term, informing **investment levels** and **anticipated revenue size**. Market P&Ls roll up to SET, then consolidate globally into the Group P&L, forming the basis of **external investor guidance**.

**3. Impact if Not Delivered**

Delays P&L completion, review cycles, and market leadership visibility into future revenue and profit.

**4. Trigger & Timing**

- **Trigger**: Start of the planning cycle; for GFS, triggered when revenue and cost are consolidated.

- **Start Date**: Aligned with market planning calendar.

- **Deadline**: ~1 day turnaround after sales and cost consolidation.

- **Duration**: ~2–4 hours per consolidation; multiple iterations required.

- **Frequency**: Based on planning cycle.

- **Cycle impact**: Delays in business input or review extend the P&L submission timeline.

**5. Inputs & Data Sources**

| **\#** | **Input** | **Source** | **How Received** |
|----|----|----|----|
| 1 | Revenue planning | Excel | Input from business |
| 2 | Product Cost (SCC) & Royalty rates | Planning system | Retrieved when planning system opens |
| 3 | Cost planning | Excel | Input from business |

- **Data quality issues**: Wrong SCC/royalty rates; formula errors; incorrect revenue/cost inputs.

- **Validation**: Reasonableness checks against prior cycles (OP%, growth rate).

**6. Stakeholders & Responsibilities**

- **Input Provider**: Business (BUs, Brand Managers, HR)

- **Executor**: GFS FP&A Analyst

- **Reviewer/Challenger**: GFS FP&A or Country Business Partner

- **Approver/Sign-off**: **CFO and Country President (both sign-off P&L)**

- **Final Recipient**: CFO

- **External dependencies**: Business team (inputs); HR (MPC cost).

- **Delays**: From business team and HR.

**7. Tools & Systems**

| **\#** | **Tool**               | **Type**   |
|--------|------------------------|------------|
| 1      | Excel                  | Primary    |
| 2      | P&MR (planning system) | Primary    |
| 3      | CMR (reporting system) | Supporting |

- **Automation level**: Semi-Automated.

- **Workaround**: Excel used for consolidation where system cannot support.

**Excel Model Complexity:**

- **Number of tabs**: More than **15 tabs**.

- **Number of linked files**: **20–30 files**, depending on the number of stakeholders providing input.

- **Macros / VBA**: **Yes** — VBA macros are used to (i) run **brand allocation** to produce brand-level P&L and (ii) **consolidate the full market P&L**.

- **File size**: ~**10 MB per file**.

- **Shared with**: Country Business Partner, CFO, and Business Unit (when their input is required).

**8. Step-by-Step Process Flow**

| **Step** | **Action** | **Performer** | **Tool** | **Duration** |
|----|----|----|----|----|
| 1 | Receive input from business users (revenue and cost) | BUs, Brand Managers, HR | Excel (20–30 linked files) | ~1 week sales; ~1 week cost (sometimes parallel) |
| 2 | Consolidate revenue and cost into master Excel model (\>15 tabs, ~10 MB) | GFS FP&A Analyst | Excel | 2 days |
| 3 | Check SCC and royalty rates from planning system (or prior cycle) | GFS FP&A Analyst | Excel + P&MR | 5 hours |
| 4 | Run **VBA macro** for brand allocation and full market P&L consolidation | GFS FP&A Analyst | Excel (VBA) | 2 hours per iteration (~4–5 iterations) |
| 5 | Share output with CBP, CFO (and BU if required) for review | GFS FP&A Analyst | Excel / Email | — |
| 6 | **Decision — Alignment obtained from CFO and Country President?** If no, re-run iteration (return to Step 4) | GFS FP&A Analyst | Excel / Email | — |
| 7 | Submit to planning system once aligned | GFS FP&A Analyst | P&MR | 4 hours per iteration |
| 8 | Reconcile CMR against Excel after bridge run | GFS FP&A Analyst | CMR + Excel | 1 hour per iteration |
| 9 | Sign off planning system after CFO and Country President sign-off | GFS FP&A Analyst | P&MR | 5 mins per iteration |

**Decision points**: Alignment required from both **CFO and Country President** before system sign-off. **Parallel steps**: Revenue and cost input collection sometimes runs in parallel.

**9. Output & Deliverable**

- **Output**: Excel template used for review presentation deck preparation.

- **Format**: Excel file; system entries in P&MR and CMR.

- **Granularity**: By Market/Country, Brand/Product, P&L Line, Cost Centre.

- **Standardisation**: Mostly standardised with minor variations (e.g., Malaysia BUD combines CVRM and central TA like Nexium — manual template adjustment).

- **Storage**: SharePoint (accessible to GFS, CFO, BU, CBP).

**10. Validation, Controls & Approval**

- **Validation**: Manual check of Excel data against expectation.

- **Formal sign-off**: Yes — **CFO and Country President via email**.

- **Iterations**: 4 or more.

- **Rework**: Corrections before deadline; otherwise deferred to next cycle.

- **SOX/Audit**: No.

**11. Dependencies & Interconnections**

- **Predecessor**: Revenue and cost consolidation from business.

- **Successor**: Planning review deck preparation; monthly reporting comparator.

- **Delay impact**: Delays review.

- **Error surfacing**: During monthly variance analysis.

**12. Pain Points, Risks & Improvements**

- **Pain Point 1**: Multiple iterations; VBA macro must be re-run for every new input; ~1 hour lag vs instant reflection.

- **Pain Point 2**: Formula or macro errors on a \>15-tab, ~10 MB file linked to 20–30 stakeholder files take significant analyst time to root-cause.

- **Categories**: Data quality; tight timelines; excessive manual effort; system limitations; stakeholder responsiveness; frequent rework.

- **Risks**: Key-person dependency — back-up (manager) takes time to learn file structure, especially given complexity (\>15 tabs, 20–30 linked files, VBA logic).

- **Improvements**:

  - Replace macro-driven Excel with a system/tool that instantly reflects revenue/cost changes.

  - Remove Excel; plan directly via system.

- **Quick wins**: None identified.

**Process Steps Summary — P&L Planning**

**Receive business inputs (revenue + cost, sometimes parallel, 20–30 linked files) → Consolidate in master Excel (\>15 tabs, ~10 MB) → Check SCC & royalty rates → Run VBA macro (brand allocation + full market P&L) → Share with CBP, CFO, BU → \[Decision: Aligned with CFO and Country President?\] → If no, iterate → If yes, submit to P&MR → Reconcile CMR vs Excel → CFO + Country President sign-off (email) → Sign off in P&MR → Feed output into Deck Preparation and Monthly Reporting.**

## Source file: Preclose Analysis.docx

- Path: `Tower Subprocesses/FP&A Commercial/Preclose Analysis.docx`
- Format: DOCX

**Transcript 4 — Pre-close Analysis**

**1. Purpose and Business Objective**

The Pre-close Analysis process performs **month-end pre-close review** of current financial performance and estimates the expected month-end position **before formal close is completed**. It identifies significant variances, unusual transactions, and potential risks or opportunities early, ensuring key issues are investigated and communicated in a timely manner while supporting a smoother and more accurate close.

The output enables management and finance teams to **assess whether the business is tracking in line with expectations** and to take pre-close action where needed. It supports decisions on variance investigation, issue escalation, accrual or adjustment review, forecast updates, and communication of expected results to stakeholders.

When delayed or inaccurate, **key financial issues may not be identified early enough** for proper review or action before close. This can lead to inaccurate reporting, delayed escalation, weaker decision-making, close-process inefficiencies, reduced confidence in reported numbers, and missed financial risks or opportunities.

**2. Trigger and Timing**

The process runs monthly and is triggered by month-end close activity. It typically begins at **WD-4**, once payroll booking is complete, with PO accruals posted at **WD-3**. The deadline for completion is **WD-1 or WD1**, depending on the market, and the total duration is around **four to five working days**. The timeline does not change during budget or forecast cycles.

**3. Inputs and Data Sources**

Two primary inputs are required: **month-end closing data** (sales, COGS, cost data) from **SAP and CMR**; and **planning cycle data** from **CMR**.

Data quality is inconsistent — **booked data in SAP can be inaccurate due to incorrect source inputs**. Validation occurs during closing, when analysts review SAP data to ensure alignment with accounting standards.

**4. Stakeholders and Responsibilities**

Input is drawn from **SAP and CMR**, with execution performed by **FP&A**. Reviewers and challengers include **FP&A, the Controller, and the CFO**, with **CFO sign-off** required. Final recipients are the **CFO and CP**.

The process depends on **financial functions that book data into SAP** and on **controllers who post journal accruals**. **Delays occur when requested correction journals are not booked in time**.

**5. Tools and Methods**

The process uses the **Preclose File, SAP, and CMR data** to present the latest SAP data in P&L or department format and compare against planning cycles. Automation level is **semi-automated**. The Excel workbook contains **multiple tabs, uses macros/VBA, and is shared simultaneously**.

**6. Step-by-Step Process Flow**

The process begins in **Step 1** with FP&A downloading actual SAP details and refreshing planning numbers into the Preclose file. In **Step 2**, FP&A reviews and analyses revenue and cost by comparing actuals against planning and deep-diving into SAP details. **Step 3** involves identifying variances, preparing commentary, or requesting corrections for inaccurate journal postings. **Step 4** repeats Steps 1 to 3 as needed until numbers are finalised for closing.

In **Step 5**, FP&A prepares commentary on variances and readies the pre-close presentation for CBP and CFO review. **Step 6** captures CFO comments and applies required changes. Finally, **Step 7** ensures the final Preclose file numbers align to CMR.

A **key decision point** is that Preclose analysis is highly dependent on the quality of SAP booked data — high inaccuracy increases the correction burden and delays commentary output. Additionally, **SAP data is extracted multiple times daily during pre-close** to ensure corrections are captured and the latest data is used.

**7. Output and Deliverable Structure**

The final output is the **Preclose File**, delivered as an **Excel file**. Granularity spans **market/country, brand/product, P&L line, and cost centre**. Templates are **mostly standardised with minor variations**, and outputs are stored on **SharePoint and Box**.

**8. Validation, Controls, and Approval**

Two manual validation checks are performed: a **full P&L line and cost centre level check**, and a **total check against extracted actuals and CMR**. A formal approval gate exists, with the **CFO signing off**. The process typically requires **four or more revision cycles**. When errors are found post-submission, corrections are applied based on CFO comments, with typically one to two working days of correction runway available. There are **no SOX-relevant or audit-relevant controls** embedded in this task.

**9. Dependencies and Interconnections**

Detail journal booking in SAP must be complete or available at **WD-3** before this task can begin. The output feeds into the **Preclose Review with the CFO**. A one to two day delay eliminates the Preclose review window and prevents any month-end number amendments. Uncaught errors typically surface in **downstream revenue or cost reporting** or in the Preclose file itself.

**10. Pain Points, Risks, and Improvement Opportunities**

Three pain points dominate. First, **inaccurate bookings of raw data** require multiple corrections and scrutiny before real analysis can occur. Second, **delayed replies from budget owners** on variance queries slow the process. Third, **SAP data changes frequently**, requiring close monitoring to ensure alignment with month-end expectations.

Pain points fall across **data quality, tight timelines, and frequent rework loops**. The primary risk is that if this task is not done correctly, **financial numbers reported for the month will be inaccurate**, potentially leading to wrong business decisions.

The primary improvement opportunity is to establish a **standard Preclose review online platform across all markets**. FCT is currently used, but it sources from CMR, which has a data capture lag compared to SAP.

## Source file: Revenue Planning.docx

- Path: `Tower Subprocesses/FP&A Commercial/Revenue Planning.docx`
- Format: DOCX

Revenue Planning

**Revenue Planning — End-to-End Process Documentation**

**1. Process Overview**

**Revenue Planning** is a company-wide financial exercise designed to establish a structured and accurate view of projected revenues across SKUs and brands. The primary purpose of this process is to ensure alignment across five key dimensions:

- **Revenue Setup** by SKU & Brand

- **Supply Planning** coordination

- **Commercial Launch Planning**

- **Resource Allocation**

- **Scorecard Deliverable** management

When executed effectively, revenue planning enables the organization to achieve clear **pipeline prioritization**, establish **pricing and market access strategies**, drive **launch readiness**, support **business development decisions**, and guide **supply chain and manufacturing planning**.

**Consequences of Incomplete Revenue Planning**

Failure to complete revenue planning accurately carries significant downstream risks. These include incorrect leadership decision-making, gaps in manpower resource allocation, disrupted manufacturing and supply decisions that may cause **supply shortages**, and — most critically — a **direct impact on existing patients** who depend on product availability.

**2. Planning Cycles**

Revenue planning is conducted across three distinct annual cycles, each covering a different planning horizon:

| **Planning Cycle** | **Coverage Period** | **Timing** |
|----|----|----|
| **Annual Budget Cycle** | Full financial year | Mid-November to Mid-December (prior to financial year start) |
| **Annual RBU2 Planning Cycle** | Current year (3 months actual + remaining forecast) & Current Year +1 (full year forecast) | March to Mid-May |
| **Annual MTP Planning Cycle** | Current year (7 months actual + remaining forecast) & Current Year +3 (full year forecast) | Mid-July to Mid-September |

**3. Data Inputs**

The table below outlines the key data inputs required for revenue planning, their origin, and how they are received.

| **Data Input** | **Source System / Origin** | **How Received** |
|----|----|----|
| **Projected Volume by SKU** | Excel revenue template — Brand Manager input | Stored in SharePoint with restricted access to selected PIC |
| **Projected Revenue by SKU** | Excel revenue template — Brand Manager input | Stored in SharePoint with restricted access to selected PIC |
| **Listed Price by SKU** | Excel revenue template — Brand Manager input | Stored in SharePoint with restricted access to selected PIC |
| **Discounting by SKU** | Excel revenue template — Brand Manager input | Stored in SharePoint with restricted access to selected PIC |

**Common Data Quality Issues**

The most frequently encountered data quality issues in this process are new SKUs created that are **not reflected in the revenue template**, **missing listed prices**, and **missing volume entries** and also missing gross margin calculation where a revenue forecast exists, or vice versa.

**Validation Approach**

Standard validation tasks include applying **conditional formatting** to cross-check that any SKU carrying a revenue projection also has an associated listed price and quantity. Results are also compared against the **expected total company target** and benchmarked against the **previous planning cycle** to identify and document variances and their underlying drivers.

**4. Roles & Responsibilities**

| **Role**                            | **Internal / External to FP&A**     |
|-------------------------------------|-------------------------------------|
| **Input Provider(s)**               | Brand Manager *(External to FP&A)*  |
| **Executor(s)** — who does the work | *Commercial FP&A GFSKL*             |
| **Reviewer / Challenger**           | Finance CBP *(Internal to FP&A)*    |
| **Approver / Sign-off**             | CFO / BUD / CP *(External to FP&A)* |
| **Final Recipient / Consumer**      | Group                               |

**Process Dependencies**

Revenue planning has critical dependencies across multiple stakeholders — **Brand Managers**, **Business Unit Directors**, **CFO**, **Finance CBP**, and **CP** — all of whom are integral to the process flow, spanning input provision, review, challenge, endorsement, and final acceptance by GFS FP&A.

⚠️ **Note:** The process frequently experiences delays and idle time due to ongoing discussions, alignment activities within commercial stakeholders, and the embedding of different assumptions and scenario planning. This deliberation is an expected and necessary part of the review process before numbers are accepted as final for system reporting.

**5. Current System & Tools**

The revenue planning process is **entirely Microsoft Excel-based**. Actual results are sourced from **SAP and also local market sales tool like Enpire**, while remaining-year budget and forecast scenarios are manually entered by the respective Brand Managers.

**Excel Template Description**

The working file is a complex, multi-tab workbook with the following characteristics:

- **More than 10 assumption input tabs**, covering volume, price tabs (from gross to net price), final revenue, various discounting types, product cost, royalty, VSE, CGM and associated reporting outputs like sales by brand, volume by brand, PVV.

- **Reporting tabs** covering total company results by brand and total company revenue and CGM outlook

- Built using **Microsoft VBA macros**

- File size exceeds **15 MB**

- Hosted on **SharePoint** to allow simultaneous multi-user input

- **No automated version control** — the current workaround is manual file backups at each change to track submitted versions

**6. Step-by-Step Process**

**Phase 1 — Template Preparation**

1.  **Master Data Validation** — Check SKU master data against SAP using the *MM60 T-code* to ensure data completeness. *(Estimated time: ~2 hours for extraction and checking)*

2.  **Template Column Build-Out** — Prepare the necessary columns within each assumption tab, expanding phasing by month and building total columns, ensuring all formulas are correctly ranged and calculating every assumption accordingly. *(Estimated time: ~ 2 days)*

3.  **Historical Actual Phasing** — Phase historical actuals from SAP posted data into the revenue template at the SKU level across every assumption. *(Estimated time: ~8 hours, including data accuracy checking)*

4.  **File Splitting by Therapeutic Area (TA)** — Replicate the core file and split it by TA so that each Brand Manager receives a separate, dedicated input template.

5.  **Template Distribution** — Save the TA-level templates to the designated SharePoint folder and cascade the folder path to respective Brand Managers via email. *(Estimated time: ~20 minutes)*

**Phase 2 — Stakeholder Input & Review**

Brand Managers complete their respective input templates in volume and net price and the rest tabs including reporting will be populated based on the formulas that input by FP&A before. Some of the markets will need Commercial FP&A analyst to consolidate it into the template. The consolidated output is then prepared as a reporting package for **CP / CFO / BUD** to review and discuss before approving it as the final submission.

Reporting is produced by copying and pasting from the Excel reporting format into **Microsoft PowerPoint** for presentation and discussion purposes. The reporting scope includes:

- Revenue by total company, by product, by TA, and by country

- Discount by brand and volume by brand

- Price-Volume-Value variance analysis by SKU and brand

- All reports follow a **standardized format** consistent across all Business Units and TAs

Output deliverables are stored in SharePoint, with presentation materials distributed to participants via email.

**Phase 3 — Revision & Final Submission**

The process typically undergoes **at least 3 revision cycles** before final submission into the **PMR system**. If a submission does not align with expectations, a deep-dive is conducted to identify which assumption is misaligned and rectified accordingly.

**7. Process Linkages**

**Upstream Dependencies**

The process usually begin after the Business Strategy Meetings completed. Followed by planning timeline discussion with local market. With the calendar, GFS KL commercial FP&A team will kick start the Revenue to Gross margin template building and subsequently sending it to Brand managers to input.

**Downstream Impact**

The completion of revenue planning feeds directly into the **consolidation of the total company P&L**. As a core P&L component, it directly impacts **P&L accuracy and completeness**.

This process also serves as an input to the following downstream activities: system submission, deck preparation, pre-closing analysis, mid-month forecast, monthly revenue reporting, and **FCF control on revenue** (planning data as comparator).

**8. Pain Points & Risks**

**Top 3 Pain Points**

1.  **Lack of Automation** — The Excel file suffers from performance degradation due to an excessive number of embedded formulas, making it slow in terms of performance and prone to Excel formula errors.

2.  **Data Quality & Completeness Issues** — SKU validation against SAP master data is entirely manual, creating risk of omissions and inconsistencies.

3.  **Excessive Manual Effort** — The actualization of historical revenue and assumption data prior to distributing the template to Brand Managers is a time-intensive, fully manual task. There is also actualization that required after the review as the time spent from planning to area review is taking long time and actual data will be available especially when resubmission is needed. Hence there is also the actualization required and involves a lot of manual efforts.

**Foreseeable Operational Risk**

The most significant operational risk associated with the current approach is **template corruption**, which could disrupt the entire planning cycle.

**9. Improvement Opportunities**

**Targeted Enhancements**

- **Auto-validation and auto-actualization** of SKU master data and historical actuals, eliminating the need for manual checks and data phasing

- **Backend system-based calculation engine** to reduce dependency on Excel formula logic and improve performance and reliability

- **Single source of truth** — replacing the current multi-version Excel workbook approach with a unified platform to eliminate version confusion and consolidation risk

**Strategic Quick Win**

The most impactful near-term improvement would be the **adoption of an existing global solution** that fulfils end-to-end commercial revenue forecasting needs — replacing the current manual methodology with a standardized, scalable platform already proven within the organization.

## Source file: Revenue Reporting.docx

- Path: `Tower Subprocesses/FP&A Commercial/Revenue Reporting.docx`
- Format: DOCX

**TRANSCRIPT 2 — REVENUE REPORTING PROCESS**

**Phase 0: Purpose & Business Objective**

The **primary purpose** of the Revenue Reporting process is to provide the brand team with a **holistic view of monthly revenue** by consolidating actual revenue against the planned budget.

The output enables the brand team to **effectively monitor revenue performance** by comparing actual revenue against the planned budget, thereby supporting informed financial planning, forecasting, and commercial decision-making.

If this process is **not completed, delayed, or delivered inaccurately**, the brand team loses timely and accurate visibility into monthly revenue performance. The downstream consequences include delayed decision-making, inaccurate forecasting, missed revenue opportunities, and ineffective financial planning — undermining the organisation's ability to react to market dynamics and capitalise on commercial performance.

**Phase 1: Trigger & Timing**

The Revenue Reporting process is triggered **monthly**, once sales are finalised. The execution window runs from **WD-1 to WD+2**, with the task itself taking **1 working day** to complete. The timeline does not change during budget or forecast cycles.

**Pre-conditions that must be satisfied before the process can begin:**

- **\[System / Accounting Team\]** All MEC journals must be posted and reflected in SAP.

- **\[Sales Ops / System\]** Sales postings in SAP must be finalised.

**Phase 2: Inputs & Data Sources**

The FP&A Analyst gathers three primary data inputs:

- **\[FP&A Analyst → SAP\]** SAP sales, volume, discount, and list price data.

- **\[FP&A Analyst → Offline Working File\]** Manual working file used to split self-pay versus reimbursement SKUs.

- **\[FP&A Analyst → CMR\]** CMR data for SCC (Standard Cost of COGS), royalties, and reconciliation.

The analyst validates data completeness by **reconciling SAP, Pre-Close, and CMR** before proceeding. Common data quality issues include SAP-to-CMR discrepancies, outdated SCC rates, and outdated royalty rates.

**Phase 3: Step-by-Step Execution**

**Step 1 — Finalise sales postings**

- **\[FP&A Analyst / Sales Ops → SAP\]** Confirm that all sales postings for the month are finalised in SAP.

**Step 2 — Perform initial reconciliation**

- **\[FP&A Analyst\]** Reconcile sales, volume, product cost, royalty, and VSE (Variable Selling Expenses) between SAP, Pre-Close, and CMR.

- **\[FP&A Analyst\]** Investigate any discrepancies (e.g., outdated SCC or royalty rates) before starting the reporting build.

**Step 3 — Populate list price**

- **\[FP&A Analyst → SAP\]** Download list price data.

- **\[FP&A Analyst → Excel\]** Paste list prices into the sales reporting file.

**Step 4 — Populate volume and sales amounts**

- **\[FP&A Analyst → SAP\]** Download volume and sales amount data.

- **\[FP&A Analyst → Excel\]** Paste volume and sales figures into the reporting file.

**Step 5 — Split self-pay vs. reimbursement SKUs**

- **\[FP&A Analyst → Offline Working File\]** Reference the manual mapping file.

- **\[FP&A Analyst → Excel\]** Manually split volume and sales between self-pay and reimbursement product lines (system does not support this split natively).

**Step 6 — Populate discounts**

- **\[FP&A Analyst → SAP\]** Download discount data.

- **\[FP&A Analyst → Excel\]** Paste discount amounts into the reporting file.

- **\[FP&A Analyst → Excel\]** Manually include any manual accruals and reversals recorded during the month.

**Step 7 — Calculate PAP discount**

- **\[FP&A Analyst → Excel\]** Manually calculate PAP (Patient Assistance Program) discount.

- **\[FP&A Analyst → Excel\]** Include the calculated amount in the reporting file.

**Step 8 — Include PVA rebate**

- **\[FP&A Analyst → Excel\]** Manually include the PVA rebate amount into the reporting file.

**Step 9 — Sense-check discount trends**

- **\[FP&A Analyst\]** Review discount figures for unusual trends or outliers once volume, sales, and all discounts are populated.

**Step 10 — Update SCC, Royalty, and VSE**

- **\[FP&A Analyst → CMR\]** Retrieve SCC, royalty, and VSE data.

- **\[FP&A Analyst → Excel\]** Populate the respective tabs in the reporting file.

**Step 11 — Validate PVV calculation**

- **\[FP&A Analyst → Excel\]** Check the Price-Volume-Variance (PVV) calculation for unusual variances.

**Step 12 — Update Overview tab**

- **\[FP&A Analyst → CMR\]** Retrieve CMR headline numbers.

- **\[FP&A Analyst → Excel\]** Update the Overview tab of the reporting file.

**Step 13 — Split files by Therapeutic Area (TA)**

- **\[FP&A Analyst → Excel\]** Split the master reporting file into **4 separate TA files** (5 files in total including master/overview).

**Step 14 — Publish to SharePoint**

- **\[FP&A Analyst → SharePoint\]** Save all finalised files to SharePoint for brand team access.

**Phase 4: Validation & Controls**

The core validation check ensures that **all amounts up to Contribution Gross Margin (CGM) reconcile with both CMR and SAP** before release. There is **no formal approval or sign-off gate**, and the process typically goes through **zero revision cycles**. Post-submission errors are investigated and corrected manually. **No SOX or audit-relevant controls** are embedded in this task.

**Phase 5: Output & Handover**

The final deliverable consists of **5 Excel files** (one master workbook of 37 tabs plus 4 TA-specific splits), containing highly granular data at SKU level with a full breakdown of each Gross-to-Net (GTN) line item. Templates vary **significantly across markets**. Files are stored on **SharePoint**, where they are accessed by **FBPs** and **local brand managers** for review — directly enabling the business objective of holistic monthly revenue visibility and performance monitoring.

**Phase 6: Downstream Dependencies**

The revenue reporting output feeds into the **Revenue Planning Template**. The broader flow is: *Revenue Planning → Mid-Month Forecast → Pre-Close Analysis → Revenue Reporting*. A delay of 1–2 days can push back actualisation and revenue monitoring during planning cycles. Undetected errors typically surface within the planning cycle template or in local market sales tracking files.

**Appendix B — Pain Points, Risks & Improvement Ideas (Revenue Reporting)**

**Top pain points:**

- **Highly manual multi-source consolidation**: Combining SAP, CMR, and the offline working file into a single reporting file is entirely manual.

- **Manual self-pay vs. reimbursement SKU split**: The system does not support this split, requiring a manual workaround via an offline mapping file.

**Pain point categories:** Excessive manual effort; system limitation / lack of automation; lack of standardisation across markets.

**Key risk:** The fully manual nature of the process creates significant exposure to undetected human error.

**Improvement ideas:**

- No immediate quick wins identified. The team hopes to **explore automation and simplification** of individual steps over time. Market-specific granularity requirements currently limit the scope for standardisation.

<!-- -->

- .
