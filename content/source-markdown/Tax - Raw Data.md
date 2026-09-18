# Tax Raw Source Data

This document is a faithful text extraction of the supplied source files. File boundaries, worksheet names, slide numbers, and PDF page numbers are retained for traceability.

## Source inventory

- `Tax Process Flow_MIRO_Aug2026.pptx`

## Source file: Tax Process Flow_MIRO_Aug2026.pptx

- Path: `Tower Subprocesses/Tax/Tax Process Flow_MIRO_Aug2026.pptx`
- Format: PPTX
- Slides: 9

### Slide 1: Tax Process Flow for Miro

#### Object (placeholder:TITLE (1); x=1219201; y=1793325; w=4876799; h=2649135)

Tax Process Flow for Miro

#### Object (placeholder:DATE (16); x=1219200; y=6027536; w=1828800; h=169277)

August 2026

### Slide 2: Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:OBJECT (7); x=232064; y=636846; w=11862954; h=7693089)

_Table content follows._

| Column 1 | Column 2 |
| --- | --- |
| Questions | Answers |
| Upstream information feed – which tower/process is immediately before this one? | User / Vendor and Vendor Master Data process, followed by P2P Invoice Receipt and Invoice Verification. The upstream feed starts from vendor registration or vendor master maintenance, then invoice verification before WHT determination. |
| What input is received? | The WHT Engine should receive key invoice and vendor data from P2P and vendor master, including:<br>Supplier / vendor name and vendor ID<br>Vendor tax status and country / locality code<br>PO number, goods receipt and invoice reference<br>Invoice amount and taxable base amount<br>Goods / services description<br>Contract / invoice details<br>Existing WHT code, if available<br>Historical WHT treatment, if applicable<br>Market specific WHT rules, tax base and rates<br>Location of the business (PE), location of the services being performed<br>Certificate of Residence |
| What are the main steps? | Invoice submitted by user / vendor<br>Vendor or user submits invoice into the P2P process<br><br>2) Invoice received by P2P<br>P2P captures invoice details such as PO number, supplier name, amount, tax / locality code and goods / services description<br><br>3) Invoice verification<br>P2P validates invoice against PO, goods receipt, vendor master data and basic invoice requirements<br><br>4) WHT engine determination<br>The WHT engine checks vendor tax status, service type, market rules, tax locality, existing WHT code and tax treaty or exemption logic where applicable<br><br>5) WHT calculation<br>The WHT engine calculates the applicable WHT amount based on the correct tax base and WHT rate<br><br>6) |
| Who does them? |  |
| What system/tool is used? |  |
| What output is created? |  |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

2

### Slide 3: Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:OBJECT (7); x=232064; y=636846; w=11862954; h=5388315)

_Table content follows._

| Column 1 | Column 2 |
| --- | --- |
| Questions | Answers |
| What are the main steps? | 6) Exception handling<br>If data is missing, inconsistent or not aligned with WHT rules, exception is routed to the right owner, for example, P2P, TDT, local market team or tax reviewer.<br><br>7) Invoice posting<br>Once WHT code and calculation are validated, invoice is posted with the correct WHT treatment<br><br>8) Payment and reporting<br>Payment is processed net of WHT where applicable, and WHT data flows into reconciliation, filing, certificate issuance and reporting |
| Who does them? | User / Vendor: submits invoice and provides supporting documentsP2P: owns invoice receipt, invoice verification, WHT code selection where embedded in invoice processing, invoice posting, payment and reportingWHT Engine: performs automated decisioning for WHT determination, rate selection, tax base identification and calculation TDT / Tax Delivery Team: reviews exceptions, performs gather and analyse, supports reconciliation and validates complex cases where requiredDirect Tax / Local Tax / Group Tax, where applicable: provides WHT technical rules, policy position, market-specific interpretation and approval for complex tax treatmentCFC / CCFO: reviews and approves where required under governance or payment approval process |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

3

### Slide 4: Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:OBJECT (7); x=232064; y=636846; w=11862954; h=4389734)

_Table content follows._

| Column 1 | Column 2 |
| --- | --- |
| Questions | Answers |
| What system/tool is used? | Coupa / invoice processing system, SAP and manual working papers.<br><br>Future-state WHT engine should connect with: • Vendor master data source • Invoice processing system / Coupa • SAP posting data • WHT rule table by country, vendor type, service type and tax code • Market WHT certificate and filing tracker • Exception dashboard / workflow tool • Reconciliation and analytics layer, for example Power BI or Finance AI Assistance |
| What output is created? | The WHT engine should create: • Correct WHT code recommendation • Applicable WHT rate • Tax base for WHT calculation • Calculated WHT amount • Reason code / audit trail for the WHT decision • Exception report for missing or incorrect data • Posted invoice with correct WHT treatment • Data feed for WHT reconciliation, return filing, payment process and WHT certificate issuance |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

4

### Slide 5: Order to Invoice [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Order to Invoice [WHT Engine Process Input]

#### Object (TABLE; x=387350; y=817513; w=8127999; h=2839720)

_Table content follows._

| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Current Challenge | Target Improvement | Expected Benefit |
| P2P relies on user knowledge to select correct WHT treatment | Embed WHT Engine before invoice processing | Reduces incorrect WHT code selection |
| WHT code and rate may only be checked after invoice posting | Automate WHT validation before posting | Prevents downstream corrections and manual adjustments |
| TDT spends time reconciling SAP and return working papers | Create one WHT data source from the engine into SAP and return working paper | Reduces reconciliation effort |
| Manual adjustment is required where WHT code or rate is incorrect | Use exception routing before posting | Reduces rework and late corrections |
| Incorrect WHT certificate issuance can happen downstream | Link WHT calculation data to certificate issuance logic | Improves accuracy of WHT certificates |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

5

### Slide 6: Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:OBJECT (7); x=232064; y=522546; w=11862954; h=7172623)

_Table content follows._

| Column 1 | Column 2 |
| --- | --- |
| Questions | Answers |
| Upstream information feed – which tower/process is immediately before this one? | The immediate upstream processes are Procurement, Vendor Master Data, Requisition to Purchase Order (R2R), Contract Management, and P2P Invoice Receipt & Verification. Tax relevant should already be available from supplier onboarding, PO creation and invoice processing before payment is executed. |
| What input is received? | Supplier / vendor master data (tax residency, tax ID, vendor type)<br>PO details<br>Contract and service descriptions<br>Supplier invoice data<br>Invoice approval status<br>Cost centre and GL coding<br>WHT tax code and tax classification<br>Gross invoice amount and payment amount<br>Tax treaty or exemption documentation (where applicable) |
| What are the main steps? | Supplier invoice received via Coupa / Kofax OCR<br>Invoice validation and matching against PO, contract and vendor data<br>Tax determination including WHT applicability review<br>Invoice approval workflow<br>Invoice posting into SAP<br>Payment proposal generated<br>Payment execution<br>WHT deduction and accounting entries generated<br>Payment reporting and reconciliation<br>Data flows into tax return preparation, WHT certificates and compliance reporting |
| Who does them? | Procurement: creates supplier and PO information<br>Business user: approves goods / services received<br>P2P: invoice processing, matching, posting and payment preparation<br>TDT: WHT rules, exception reviews and compliance oversight<br>Controlling: accounting validation and accrual review<br>CNB: payment execution<br>R2R: accounting and reconciliation support |
| What system/tool is used? |  |
| What output is created? |  |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

6

### Slide 7: Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:OBJECT (7); x=232064; y=522546; w=11862954; h=4968854)

_Table content follows._

| Column 1 | Column 2 |
| --- | --- |
| Questions | Answers |
| What system/tool is used? | Current state:<br>Coupa<br>Kofax OCR<br>SAP<br>Excel working papers<br>Local tax filings / portals<br><br>Future state:<br>Coupa<br>Central WHT Engine<br>Vendor Tax Repository<br>Power BI Dashboard<br>Automated workflow/exception management |
| What output is created? | Approved invoice<br>Posted accounting document<br>Correct WHT code and WHT amount<br>Net payment amount<br>Payment confirmation<br>Tax posting entries<br>WHT audit trail<br>Reconciliation data<br>WHT return data<br>WHT certificate issuance data<br>Compliance and reporting outputs |

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

7

### Slide 8: Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:TITLE (1); x=232064; y=82295; w=10972800; h=657226)

Spend to Payment [WHT Engine Process Input]

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

8

### Slide 9

#### Object (placeholder:SLIDE_NUMBER (13); x=0; y=6344085; w=487680; h=309145)

9

### Embedded media inventory

| Column 1 | Column 2 | Column 3 | Column 4 |
| --- | --- | --- | --- |
| ppt/media/image1.svg | svg |  | 2642 |
| ppt/media/image2.png | png | 4902 x 1330 | 66197 |
| ppt/media/image3.png | png | 640 x 286 | 16603 |
| ppt/media/image4.png | png | 571 x 636 | 33865 |
| ppt/media/image5.png | png | 558 x 460 | 59847 |
