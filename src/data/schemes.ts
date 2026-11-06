/**
 * Government Scheme Records
 * Verified official government scheme records for Scheme Saathi.
 * All official portal links point to legitimate Indian government domains (.gov.in / official portals).
 * Last updated: 2026-11-05
 */

import { Scheme } from '../types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    shortName: 'PM-KISAN',
    aliases: [
      'pmkisan',
      'pm-kisan',
      'pm kisan',
      'kisan samman nidhi',
      'kisan samman',
      'pm-kisan samman nidhi',
      'kisan nidhi',
      'pm-kisan scheme'
    ],
    category: 'Farmers',
    level: 'central',
    benefit: '₹6,000 per year in three equal instalments of ₹2,000',
    financialDetails: '₹6,000 per financial year transferred directly to Aadhaar-seeded bank accounts in 3 four-monthly instalments of ₹2,000 each (April–July, August–November, and December–March) via Direct Benefit Transfer (DBT).',
    purpose: 'Provide supplementary income support to all landholding farmer families across the country to procure agricultural inputs and meet domestic needs.',
    summary: 'A 100% centrally funded scheme by the Government of India that provides direct income assistance to landholding farmer families across India.',
    beneficiaries: 'All landholding farmer families with cultivable landholding in their names.',
    howItWorks: 'State Governments and UT administrations identify eligible farmer families based on land records. Funds are transferred directly from the Central Government into the farmers Aadhaar-seeded bank accounts after mandatory e-KYC verification.',
    eligibility: 'Landholding farmer families with cultivable land, completed e-KYC, and an Aadhaar-linked bank account.',
    eligibilityCriteria: [
      'Must be a farmer family (husband, wife, and minor children) holding cultivable agricultural land registered in their name.',
      'Land records (Khasra, Khatauni, or RoR) must be updated and verifiable in state land record systems.',
      'Bank account must be seeded with Aadhaar and enabled for Direct Benefit Transfer (DBT).',
      'Mandatory e-KYC must be completed on the PM-KISAN portal (via OTP or biometric/facial authentication).'
    ],
    ineligibilityReasons: [
      'Institutional landholders.',
      'Farmer families holding or having held constitutional posts (present and former Ministers, MPs, MLAs, MLCs, Mayors, District Panchayat Chairpersons).',
      'Serving or retired officers and employees of Central/State Government, PSUs, and autonomous bodies (excluding Group D / Multi-Tasking Staff).',
      'All superannuated / retired pensioners receiving a monthly pension of ₹10,000 or more.',
      'All persons who paid Income Tax in the last assessment year.',
      'Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects registered with professional councils.'
    ],
    documents: [
      'Aadhaar Card (Mandatory for identification and e-KYC)',
      'Cultivable Land Records (Khasra / Khatauni / RoR / Patta in applicant name)',
      'Bank Passbook / Account details (Aadhaar-seeded and DBT enabled)',
      'Active Mobile Number (Linked to Aadhaar for OTP verification)'
    ],
    applicationSteps: [
      '1. Visit the official PM-KISAN portal at https://pmkisan.gov.in',
      '2. Navigate to "Farmers Corner" on the home page and click "New Farmer Registration".',
      '3. Select Rural or Urban Farmer Registration, enter your Aadhaar Number, select State, and input Mobile Number.',
      '4. Authenticate using the OTP received on your Aadhaar-registered mobile phone.',
      '5. Fill in personal details, land parcel details (survey number, khasra number, area in hectares), and upload certified land records.',
      '6. Submit the form and save the registration reference number to track status via "Know Your Status".'
    ],
    offlineApplication: 'Farmers can also register by visiting the nearest Common Service Centre (CSC) or local District / Block Agriculture Nodal Office with their Aadhaar card, land records, and bank passbook.',
    officialUrl: 'https://pmkisan.gov.in',
    source: 'pmkisan.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'pmfby',
    name: 'PM Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY',
    aliases: [
      'pmfby',
      'pm fasal bima',
      'fasal bima',
      'crop insurance',
      'fasal bima yojana',
      'pm fasal bima yojana'
    ],
    category: 'Farmers',
    level: 'central',
    benefit: 'Comprehensive crop insurance covering yield losses, natural calamities, and post-harvest damage at nominal farmer premium rates.',
    financialDetails: 'Farmers pay only 2.0% of the sum insured for Kharif food and oilseed crops, 1.5% for Rabi food and oilseed crops, and 5.0% for commercial/horticultural crops. The entire remaining actuarial premium is subsidized equally by Central and State Governments. Full insurance claims are credited directly to the farmers bank account.',
    purpose: 'Provide financial support and risk insurance to farmers suffering crop loss or damage arising out of unforeseen weather events, localized calamities, pests, and diseases.',
    summary: 'The flagship crop insurance scheme by the Ministry of Agriculture & Farmers Welfare providing end-to-end risk cover from pre-sowing to post-harvest.',
    beneficiaries: 'All farmers cultivating notified food, oilseed, and annual commercial/horticultural crops in notified areas (both loanee and non-loanee farmers, sharecroppers, and tenant farmers).',
    howItWorks: 'Farmers enroll before the seasonal cutoff deadline. In case of prevented sowing, mid-season adversity, localized calamities (hailstorm, landslide, cloudburst, inundation), or widespread yield loss assessed via Crop Cutting Experiments (CCEs), claims are computed and credited directly to the farmer bank account.',
    eligibility: 'Farmers cultivating notified crops in notified areas during Kharif or Rabi seasons, with valid crop sowing declaration.',
    eligibilityCriteria: [
      'Must be cultivating a notified crop in a notified area for the ongoing agricultural season.',
      'Can be an owner cultivator, tenant farmer, or sharecropper holding insurable interest in the crop.',
      'Application must be submitted before the state-notified seasonal enrollment deadline.'
    ],
    ineligibilityReasons: [
      'Crops or administrative units not notified by the respective State Government for that season.',
      'Applications submitted after the seasonal cut-off deadline.',
      'Losses caused by war, nuclear risks, malicious damage, or preventable human neglect.'
    ],
    documents: [
      'Aadhaar Card',
      'Land Records / Land Possession Certificate (LPC) or Tenant/Sharecropper Agreement',
      'Crop Sowing Certificate / Declaration issued by Village Patwari or Agriculture Officer',
      'Bank Passbook / Cancelled Cheque (Aadhaar linked)'
    ],
    applicationSteps: [
      '1. Visit the National Crop Insurance Portal at https://pmfby.gov.in',
      '2. Click on "Farmer Corner" and choose "Apply for Crop Insurance by yourself".',
      '3. Login with mobile OTP or register as a guest farmer.',
      '4. Enter residential details, select State, District, Block, and the Notified Crop.',
      '5. Provide land survey details and upload sowing certificate and bank passbook.',
      '6. Pay the small farmer premium share online via UPI, net banking, or debit card, and download your insurance acknowledgment.'
    ],
    offlineApplication: 'Farmers can also enroll through their local Commercial Bank, Regional Rural Bank (RRB), Primary Agricultural Credit Society (PACS), or the nearest Common Service Centre (CSC).',
    officialUrl: 'https://pmfby.gov.in',
    source: 'pmfby.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    shortName: 'KCC',
    aliases: [
      'kcc',
      'kisan credit card',
      'kisan credit',
      'farmer credit card',
      'kisan loan',
      'crop loan'
    ],
    category: 'Farmers',
    level: 'central',
    benefit: 'Short-term agricultural and allied credit up to ₹3 Lakh at a concessional interest rate of 4% per annum.',
    financialDetails: 'Credit limit up to ₹3 Lakh with 2% interest subvention and an additional 3% prompt repayment incentive, reducing the effective annual interest rate to just 4%. Collateral-free loans are available up to ₹1.60 Lakh (or ₹2.00 Lakh with tie-up arrangements).',
    purpose: 'Ensure adequate and timely institutional credit to farmers for crop cultivation, post-harvest expenses, farm maintenance, and allied activities like animal husbandry and fisheries.',
    summary: 'A single revolving credit facility issued through commercial, rural, and cooperative banks enabling farmers to draw cash and buy seeds, fertilizers, and equipment whenever needed.',
    beneficiaries: 'Owner cultivators, tenant farmers, oral lessees, sharecroppers, Self-Help Groups (SHGs), and farmers engaged in dairy, poultry, and fisheries.',
    howItWorks: 'Banks issue a RuPay KCC smart card with a revolving credit line valid for 5 years with annual review. Farmers withdraw funds via ATM, PoS, or branch counters as needed and repay after crop harvest.',
    eligibility: 'All farmers, tenant cultivators, and allied livestock/fisheries farmers aged 18 to 75 years.',
    eligibilityCriteria: [
      'Individual farmers or joint borrowers who are owner cultivators.',
      'Tenant farmers, oral lessees, and sharecroppers cultivating leased land with proof.',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.',
      'Fishers, dairy, and animal husbandry rearers for working capital requirements.'
    ],
    ineligibilityReasons: [
      'Default history or NPA status on prior institutional bank loans without regularisation.',
      'Inability to provide proof of farming cultivation or livestock activity.'
    ],
    documents: [
      'Duly completed KCC Application Form',
      'Identity Proof (Aadhaar Card, Voter ID, PAN Card)',
      'Address Proof (Aadhaar, Ration Card)',
      'Land Title Deeds / Records certified by revenue authorities or tenancy agreement',
      'Cropping pattern / cultivation proof',
      'Two passport-sized photographs'
    ],
    applicationSteps: [
      '1. Access scheme details and application guidelines at https://www.myscheme.gov.in/schemes/kcc',
      '2. Existing PM-KISAN beneficiaries can use the simplified one-page KCC application form from their bank portal or the PM-KISAN website.',
      '3. Fill out the application form with personal, land, and crop details.',
      '4. Attach copies of Aadhaar, land ownership records, and passport photos.',
      '5. Submit the application to your nearest commercial bank, regional rural bank, or cooperative bank branch.',
      '6. Banks are mandated to issue the KCC card within 14 days of receiving a complete application.'
    ],
    offlineApplication: 'Available directly at all branches of Public Sector Banks, Regional Rural Banks (RRBs), and State Cooperative Banks across India.',
    officialUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    source: 'myscheme.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'pm-kmy',
    name: 'PM Kisan Maan-Dhan Yojana (PM-KMY)',
    shortName: 'PM-KMY',
    aliases: [
      'pm-kmy',
      'pmkmy',
      'kisan maan dhan',
      'kisan pension',
      'farmer pension',
      'pm kisan pension'
    ],
    category: 'Farmers',
    level: 'central',
    benefit: 'Guaranteed minimum monthly pension of ₹3,000 after attaining the age of 60 years.',
    financialDetails: 'Subscribers contribute between ₹55 and ₹200 per month depending on entry age (18 to 40 years). The Central Government contributes an equal 50% matching amount into the Pension Fund managed by LIC of India. After age 60, a guaranteed pension of ₹3,000/month is disbursed directly into the beneficiary bank account.',
    purpose: 'Provide old age social security, dignity, and income protection to small and marginal farmers who have minimal or no personal retirement savings.',
    summary: 'A voluntary and contributory old-age pension scheme administered by the Ministry of Agriculture & Farmers Welfare in partnership with Life Insurance Corporation of India (LIC).',
    beneficiaries: 'Small and marginal farmers holding cultivable agricultural land up to 2 hectares, aged between 18 and 40 years.',
    howItWorks: 'Subscribers contribute monthly through auto-debit from their bank account (or can opt for auto-deduction directly from their PM-KISAN instalments). On reaching 60, LIC disburses ₹3,000 monthly. In the event of death, the spouse is entitled to 50% family pension (₹1,500/month).',
    eligibility: 'Small and marginal farmers aged 18 to 40 holding cultivable land up to 2 hectares.',
    eligibilityCriteria: [
      'Must be an Indian small or marginal farmer holding cultivable land up to 2 hectares in state land records.',
      'Entry age must be strictly between 18 and 40 years.',
      'Possess an Aadhaar card and an active savings bank account.'
    ],
    ineligibilityReasons: [
      'Farmers covered under any other statutory social security scheme like National Pension Scheme (NPS), Employees State Insurance (ESI), or Employees Provident Fund (EPF).',
      'Farmers who have joined PM-SYM or PM-LVM pension schemes.',
      'Institutional landholders, income tax payees, and constitutional post holders.'
    ],
    documents: [
      'Aadhaar Card',
      'Savings Bank Account Passbook / Cheque (with auto-debit consent)',
      'Landholding Proof (Khata / Khasra showing land up to 2 hectares)'
    ],
    applicationSteps: [
      '1. Visit the official Maan-Dhan portal at https://maandhan.in',
      '2. Choose "Self Enrollment" using your mobile number and OTP, or visit a nearby CSC.',
      '3. Enter your Aadhaar number, farmer name, and date of birth.',
      '4. Provide bank details (IFSC and account number) for auto-debit of the monthly contribution.',
      '5. Print and sign the auto-debit mandate form, upload the scanned mandate.',
      '6. Download the generated Kisan Pension Card with unique Pension Account Number.'
    ],
    offlineApplication: 'Enrollment is free through any Common Service Centre (CSC) across India. CSC Village Level Entrepreneurs (VLEs) facilitate complete assisted enrollment.',
    officialUrl: 'https://maandhan.in',
    source: 'maandhan.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY)',
    shortName: 'PM-JAY',
    aliases: [
      'ayushman',
      'ayushman bharat',
      'pmjay',
      'pm-jay',
      'ayushman card',
      'golden card',
      'health card',
      'ayushman yojana'
    ],
    category: 'Health',
    level: 'central',
    benefit: 'Cashless and paperless inpatient health cover up to ₹5 Lakh per eligible family per year.',
    financialDetails: 'Health insurance coverage of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization across all empannelled public and private hospitals across India on a family floater basis, with no restriction on family size, age, or gender.',
    purpose: 'Eliminate catastrophic out-of-pocket health expenditures and provide vulnerable families access to quality healthcare and medical treatments.',
    summary: 'The worlds largest government-funded healthcare assurance scheme, administered by the National Health Authority (NHA), covering over 12 crore vulnerable families and all citizens aged 70+.',
    beneficiaries: 'Deprived rural families, identified urban occupational worker categories as per SECC 2011 database, NFSA ration card holders in partner states, and all senior citizens aged 70+.',
    howItWorks: 'Beneficiaries show their Ayushman Card at any empannelled hospital. Hospitalization, diagnostics, medicines, surgeries, room charges, and 15 days of post-hospitalization follow-up care are delivered completely cashless.',
    eligibility: 'Eligible families as per SECC 2011 deprivation criteria, eligible state health lists, and all senior citizens aged 70 and above.',
    eligibilityCriteria: [
      'Families identified under rural deprivation categories or urban occupational categories in the SECC 2011 database.',
      'Active Ration Card holders under the National Food Security Act (NFSA) in eligible participating states.',
      'All Indian senior citizens aged 70 years and above (eligible for the Ayushman Vay Vandana Card regardless of family income).'
    ],
    ineligibilityReasons: [
      'Families owning motorized 3-4 wheelers or mechanized agricultural equipment.',
      'Families with a member who is a regular government employee or paying income/professional tax.',
      'Households living in pucca houses with more than two rooms.'
    ],
    documents: [
      'Aadhaar Card (Primary proof of identity for e-KYC)',
      'Ration Card / Family ID / SECC letter',
      'Active Mobile Number (Linked to Aadhaar for OTP verification)'
    ],
    applicationSteps: [
      '1. Visit the official National Health Authority Beneficiary Portal at https://beneficiary.nha.gov.in or https://pmjay.gov.in',
      '2. Select "Beneficiary" login and enter your mobile number to receive an authentication OTP.',
      '3. Search for your family record by State, Scheme (PM-JAY), District, and Search By (Aadhaar Number, Family ID, or PM-JAY ID).',
      '4. If your name is listed, click "e-KYC" and authenticate via Aadhaar OTP, Iris, or Face Authentication.',
      '5. Once e-KYC is approved, click "Download Ayushman Card" to download your digital PVC Ayushman Card instantly.'
    ],
    offlineApplication: 'Visit any Empannelled Public or Private Hospital and approach the "Pradhan Mantri Arogya Mitra" (PMAM) desk, or visit your local Common Service Centre (CSC) with your Aadhaar and Ration Card.',
    officialUrl: 'https://pmjay.gov.in',
    source: 'pmjay.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'pm-awas',
    name: 'PM Awas Yojana',
    shortName: 'PMAY',
    aliases: [
      'pm awas',
      'pmay',
      'pm-awas',
      'awas yojana',
      'housing yojana',
      'pmay-u',
      'pmay-g',
      'pradhan mantri awas yojana'
    ],
    category: 'Housing',
    level: 'central',
    benefit: 'Direct financial assistance up to ₹1.30 Lakh (Gramin) or interest subsidy up to ₹2.67 Lakh (Urban) to build or buy a pucca house.',
    financialDetails: 'PMAY-Gramin provides a direct grant of ₹1,20,000 in plains and ₹1,30,000 in hilly/difficult regions, plus 90–95 days of unskilled labor wages under MGNREGA (~₹25,000) and ₹12,000 for toilet construction under Swachh Bharat Mission. PMAY-Urban provides an interest subsidy of up to 6.5% on home loans under the Credit Linked Subsidy Scheme (CLSS).',
    purpose: 'Provide a pucca house with basic civic amenities (toilet, electricity, drinking water, clean cooking fuel) to all houseless families and those living in kutcha and dilapidated houses.',
    summary: 'A flagship national housing mission run by the Ministry of Rural Development (PMAY-G) and Ministry of Housing and Urban Affairs (PMAY-U) aiming for housing for all.',
    beneficiaries: 'Houseless families, households living in zero, one, or two-room kutcha houses, EWS (income up to ₹3 Lakh), and LIG (income up to ₹6 Lakh) families.',
    howItWorks: 'Under PMAY-G, funds are credited directly in instalments into the beneficiary bank account against geo-tagged photographic inspection of construction stages (Foundation, Lintel, Roof, Completion). Under PMAY-U, subsidy is credited upfront into the home loan account.',
    eligibility: 'Families without an existing pucca house anywhere in India, categorized under EWS, LIG, or eligible rural beneficiary lists.',
    eligibilityCriteria: [
      'The applicant family (husband, wife, unmarried children) must not own a pucca house anywhere in India.',
      'For PMAY-Gramin: Must be listed in the Awaas+ / SECC permanent waitlist verified by the Gram Sabha.',
      'For PMAY-Urban: Annual household income must be within EWS (up to ₹3 Lakh) or LIG (₹3 to ₹6 Lakh) limits.',
      'The house must be co-owned or owned by female head of household (for urban component).'
    ],
    ineligibilityReasons: [
      'Owning an existing pucca house in any part of India.',
      'Having received prior government assistance under any housing scheme (Indira Awaas Yojana, Rajiv Awas Yojana, etc.).',
      'Households possessing motorized two/three/four-wheelers, mechanized farm equipment, or paying income tax.'
    ],
    documents: [
      'Aadhaar Card of all family members',
      'Income Certificate issued by Revenue Authority',
      'Land Ownership / Title Record / Land Allotment Certificate',
      'Bank Passbook with clear IFSC code',
      'Self-declaration affidavit confirming no pucca house is owned in India',
      'MGNREGA Job Card number (for PMAY-Gramin beneficiaries)'
    ],
    applicationSteps: [
      '1. For PMAY-Urban: Visit https://pmaymis.gov.in, select "Citizen Assessment" and choose "Apply Online".',
      '2. Enter Aadhaar number and name as per Aadhaar for verification.',
      '3. Complete the assessment application with personal details, income, existing house details, and bank account.',
      '4. Save the generated Assessment ID to track application progress under "Track Your Assessment Status".',
      '5. For PMAY-Gramin: Selection is verified through the Gram Sabha; contact your Village Panchayat Secretary / Block Development Officer (BDO) to ensure inclusion in the Awaas+ list.'
    ],
    offlineApplication: 'Apply through your local Urban Local Body (Municipality/Corporation), Gram Panchayat Office, or nearest Common Service Centre (CSC).',
    officialUrl: 'https://pmaymis.gov.in',
    source: 'pmaymis.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'national-scholarship',
    name: 'National Scholarship Portal',
    shortName: 'NSP',
    aliases: [
      'scholarship',
      'scholarships',
      'nsp',
      'national scholarship',
      'student scholarship',
      'national scholarship portal',
      'post matric scholarship',
      'pre matric scholarship'
    ],
    category: 'Students',
    level: 'central',
    benefit: 'Full course fee reimbursement, maintenance allowances, and merit scholarships from ₹10,000 to ₹1,00,000+ per year.',
    financialDetails: 'Financial support varies by scheme (e.g. Central Sector Scheme: ₹12,000/year for undergraduate and ₹20,000/year for postgraduate studies; Technical & professional courses offer full tuition fee waiver plus maintenance allowance). Disbursed directly into student Aadhaar-seeded bank accounts via DBT.',
    purpose: 'Provide a common, transparent digital portal for electronic application and direct disbursement of central, state, and UGC/AICTE scholarships to students across India.',
    summary: 'The single-window scholarship hub operated by the Ministry of Electronics & IT (MeitY) hosting dozens of schemes for school, college, and university students.',
    beneficiaries: 'Pre-matric and post-matric students, college undergraduates, postgraduates, and research scholars from SC, ST, OBC, Minority, and General EWS categories, plus persons with disabilities.',
    howItWorks: 'Students complete One-Time Registration (OTR), apply for matching schemes, applications are digitally verified by Institute Nodal Officers (INO) and State Nodal Officers (SNO), and funds are credited via PFMS/DBT.',
    eligibility: 'Regular students enrolled in recognized schools, colleges, or universities with qualifying academic percentage and family income limits.',
    eligibilityCriteria: [
      'Must be enrolled in a recognised school, college, university, or polytechnic registered on the NSP portal.',
      'Must have scored at least 50% to 60% marks in the previous qualifying examination.',
      'Annual family income must not exceed the scheme ceiling (typically ₹1.5 Lakh to ₹2.5 Lakh, or up to ₹4.5 Lakh for Central Sector Scheme).'
    ],
    ineligibilityReasons: [
      'Availing more than one government scholarship for the same course of study.',
      'Enrolled in unrecognised educational institutions or unapproved distance courses without scheme sanction.',
      'Family income exceeding the specific scheme ceiling.'
    ],
    documents: [
      'Aadhaar Card (Mandatory for OTR e-KYC)',
      'Previous Class/Semester Marksheets and Passing Certificates',
      'Income Certificate issued by Revenue Authority / Tehsildar',
      'Community / Caste / Minority Certificate (where applicable)',
      'Bonafide Student Certificate issued by Head of Institution',
      'Student Bank Passbook (Aadhaar linked and DBT enabled)',
      'Current Academic Session Fee Receipt'
    ],
    applicationSteps: [
      '1. Visit the National Scholarship Portal at https://scholarships.gov.in',
      '2. Complete the One-Time Registration (OTR) using face authentication or Aadhaar OTP via the NSP OTR mobile app.',
      '3. Log in with your 14-digit OTR Number and password.',
      '4. Fill out the common application form and select eligible schemes displayed according to your academic qualifications.',
      '5. Upload required certificates (mark sheets, income certificate, bonafide slip).',
      '6. Submit the application and take a printout to submit along with photocopies to your institution nodal officer for verification.'
    ],
    offlineApplication: 'Online application is mandatory, but institutional verification is handled in-person by your school, college, or university nodal officer.',
    officialUrl: 'https://scholarships.gov.in',
    source: 'scholarships.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'pm-mudra',
    name: 'PM Mudra Yojana',
    shortName: 'PM Mudra',
    aliases: [
      'mudra',
      'pm mudra',
      'mudra loan',
      'pmmy',
      'small business loan',
      'business loan',
      'mudra yojana'
    ],
    category: 'Business',
    level: 'central',
    benefit: 'Collateral-free business loans up to ₹20 Lakh across Shishu, Kishor, Tarun, and Tarun Plus tiers.',
    financialDetails: 'Collateral-free credit across four categories: Shishu (loans up to ₹50,000), Kishor (loans from ₹50,001 to ₹5,00,000), Tarun (loans from ₹5,00,001 to ₹10,00,000), and Tarun Plus (loans up to ₹20,00,000 for previous successful borrowers). No processing fees for Shishu and Kishor loans, and competitive interest rates linked to bank MCLR/RLLR.',
    purpose: 'Provide institutional credit to micro and small non-farm, non-corporate enterprises to fund income-generating activities in manufacturing, trading, and services.',
    summary: 'A benchmark financial inclusion programme providing collateral-free credit backed by the National Credit Guarantee Trustee Company (NCGTC).',
    beneficiaries: 'Small business owners, shopkeepers, fruit/vegetable vendors, artisans, transport operators, food processing units, repair workshops, and women entrepreneurs.',
    howItWorks: 'Entrepreneurs submit their business proposal to any commercial bank, regional rural bank, small finance bank, MFI, or NBFC. The financial institution assesses business viability and sanctions the loan with Mudra card credit facility.',
    eligibility: 'Non-farm small business owners, micro enterprises, and aspiring entrepreneurs with a viable project proposal.',
    eligibilityCriteria: [
      'Indian citizen having a viable business plan for a non-farm manufacturing, processing, trading, or service enterprise.',
      'Applicant must not be in default to any bank or financial institution.',
      'Age of applicant must be 18 years and above.'
    ],
    ineligibilityReasons: [
      'Default history on existing bank loans or presence in CIBIL defaulter lists.',
      'Agricultural activities (which are covered separately under KCC).',
      'Large industrial corporations or speculative enterprises.'
    ],
    documents: [
      'Mudra Loan Application Form in prescribed format',
      'Identity Proof (Aadhaar Card, Voter ID, PAN Card, Driving License)',
      'Address Proof (Aadhaar, Electricity bill, Ration card)',
      'Business Registration / Trade License / Udyam Registration Certificate',
      'Bank Account Statements for the last 6 months',
      'Project Report / Business Plan detailing machinery or working capital requirements'
    ],
    applicationSteps: [
      '1. Visit the digital lending portal at https://www.udyamimitra.in or https://www.mudra.org.in',
      '2. Register and select "Apply for Mudra Loan".',
      '3. Choose the required loan tier (Shishu, Kishor, or Tarun) based on your funding requirement.',
      '4. Complete the digital application form with personal, business, and financial projections.',
      '5. Upload KYC documents, business registration, and bank statements.',
      '6. Submit the application to your preferred lending institutions and track loan processing online.'
    ],
    offlineApplication: 'Walk into any Commercial Bank, Regional Rural Bank (RRB), Small Finance Bank, or NBFC branch with your business plan and KYC documents.',
    officialUrl: 'https://www.mudra.org.in',
    source: 'mudra.org.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    shortName: 'APY',
    aliases: [
      'atal pension',
      'apy',
      'atal pension yojana',
      'pension scheme',
      'atal yojana',
      'old age pension'
    ],
    category: 'Seniors',
    level: 'central',
    benefit: 'Guaranteed minimum monthly pension of ₹1,000 to ₹5,000 after 60 years of age for unorganised-sector workers.',
    financialDetails: 'Guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 until death, followed by lifetime pension to the spouse, and return of the full accumulated pension corpus (up to ₹8.5 Lakh) to the nominee upon demise of both.',
    purpose: 'Provide old age income security and a dignified retirement life to unorganised sector workers who do not have formal workplace pensions.',
    summary: 'A government-backed social security pension scheme administered by the Pension Fund Regulatory and Development Authority (PFRDA) under the National Pension System (NPS).',
    beneficiaries: 'All Indian citizens working in the unorganised sector aged between 18 and 40 years holding a savings bank or post office account.',
    howItWorks: 'Subscribers contribute monthly, quarterly, or half-yearly via auto-debit from their bank account. The monthly contribution depends on entry age and selected pension amount (e.g. ₹210/month at age 18 for ₹5,000 pension). The Central Government guarantees the minimum pension amount.',
    eligibility: 'Indian citizens aged strictly between 18 and 40 years with a savings bank account.',
    eligibilityCriteria: [
      'Must be an Indian citizen.',
      'Entry age must be between 18 and 40 years at the time of joining.',
      'Must maintain a savings bank account or post office savings account with auto-debit facility enabled.'
    ],
    ineligibilityReasons: [
      'Any individual who is or has been an Income Tax payer (as per rules effective October 1, 2022).',
      'Age below 18 or above 40 years at the time of enrollment.'
    ],
    documents: [
      'Aadhaar Card (Primary identification)',
      'Savings Bank Account Passbook / Account details',
      'Signed Auto-Debit Mandate Authorization',
      'Nominee and spouse identification details'
    ],
    applicationSteps: [
      '1. Visit your bank internet banking portal or the official CRA website at https://www.npscra.nsdl.co.in or https://enps.nsdl.co.in',
      '2. Navigate to "Atal Pension Yojana" under Government Schemes or Social Security.',
      '3. Enter your bank account number and Aadhaar number for authentication.',
      '4. Choose your desired pension amount (₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000) and contribution frequency (monthly/quarterly/half-yearly).',
      '5. Provide nominee and spouse details and submit the auto-debit consent.',
      '6. Download your permanent PRAN (Permanent Retirement Account Number) card acknowledgment.'
    ],
    offlineApplication: 'Fill out the APY Subscriber Registration Form at any branch of your Bank or Post Office where you have a savings account.',
    officialUrl: 'https://www.npscra.nsdl.co.in',
    source: 'npscra.nsdl.co.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'pm-svanidhi',
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    shortName: 'PM SVANidhi',
    aliases: [
      'svanidhi',
      'pm svanidhi',
      'street vendor loan',
      'vendor loan',
      'pm svanidhi scheme',
      'vendor scheme'
    ],
    category: 'Business',
    level: 'central',
    benefit: 'Collateral-free working capital loan of ₹10,000 (1st tranche), ₹20,000 (2nd tranche), and up to ₹50,000 (3rd tranche) with 7% interest subsidy.',
    financialDetails: 'Collateral-free working capital credit starting with ₹10,000 for 1 year. Upon timely repayment, vendors qualify for an enhanced loan of ₹20,000 in the second tranche and up to ₹50,000 in the third tranche. Timely or early repayment earns a 7% interest subsidy per annum credited via DBT, plus cashback up to ₹1,200/year on digital transactions.',
    purpose: 'Empower urban and peri-urban street vendors to resume and scale up their livelihoods with formal working capital credit and encourage digital payments.',
    summary: 'A micro-credit scheme initiated by the Ministry of Housing and Urban Affairs (MoHUA) to provide affordable working capital loans to urban street vendors.',
    beneficiaries: 'Street vendors, hawkers, thelewale, cart pullers, and roadside sellers operating in urban and semi-urban areas.',
    howItWorks: 'Vendors apply online or via banking correspondents. Loans are disbursed directly to bank accounts without any processing fee. Regular repayment unlocks higher subsequent loan limits and government interest subsidy.',
    eligibility: 'Street vendors in urban areas possessing a Vending Certificate / Identity Card or Letter of Recommendation (LoR).',
    eligibilityCriteria: [
      'Must be a street vendor operating in an urban or surrounding peri-urban area.',
      'Possess a Certificate of Vending / ID card issued by Urban Local Bodies (ULBs) or a Letter of Recommendation (LoR) from Town Vending Committee (TVC).'
    ],
    ineligibilityReasons: [
      'Non-vendors or vendors operating without verification from local municipal authority or TVC.',
      'Prior default on existing non-repaired institutional loans.'
    ],
    documents: [
      'Aadhaar Card',
      'Vending Certificate / Identity Card or Letter of Recommendation (LoR) from ULB/Town Vending Committee',
      'Bank Account Passbook / Details'
    ],
    applicationSteps: [
      '1. Visit the official PM SVANidhi portal at https://pmsvanidhi.mohua.gov.in',
      '2. Click on "Apply for Loan: 10K, 20K or 50K".',
      '3. Verify your mobile number with OTP.',
      '4. Select your Vendor Category (possession of Vending Card / LoR number).',
      '5. Fill in personal details, select preferred bank/lender, and upload KYC.',
      '6. Submit the application and track status online or through your municipal Town Vending Committee.'
    ],
    offlineApplication: 'Apply through your local Municipal Ward Office, Banking Correspondent (BC), or local Common Service Centre (CSC).',
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    source: 'pmsvanidhi.mohua.gov.in',
    lastUpdated: '2026-11-05',
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (SSY)',
    shortName: 'Sukanya Samriddhi',
    aliases: [
      'sukanya',
      'sukanya samriddhi',
      'ssy',
      'beti bachao',
      'girl child scheme',
      'sukanya scheme'
    ],
    category: 'Women',
    level: 'central',
    benefit: 'High-interest government small savings scheme (8.2% p.a.) with complete triple tax exemption (EEE) under Section 80C for girl children.',
    financialDetails: 'Account earns an attractive government-backed interest rate (currently 8.2% p.a. compounded annually). Deposits range from a minimum of ₹250 to a maximum of ₹1,50,000 per financial year. Triple tax exemption (EEE) applies: investment, interest earned, and maturity proceeds are 100% tax-free under Section 80C.',
    purpose: 'Promote financial security and long-term savings for the higher education and marriage expenses of female children under the Beti Bachao Beti Padhao campaign.',
    summary: 'A dedicated small-deposit savings scheme by the Government of India for parents/guardians of girl children to build an educational and marriage corpus.',
    beneficiaries: 'Parents or legal guardians of a girl child below 10 years of age (up to maximum two girl children per family, with exceptions for twins/triplets).',
    howItWorks: 'Account can be opened from the birth of the girl child until she attains 10 years of age. Deposits are made for 15 years from account opening date. Account matures after 21 years or upon marriage after age 18. Partial withdrawal up to 50% is permitted for higher education after age 18.',
    eligibility: 'Resident Indian girl child below 10 years of age, opened by her legal parent or guardian.',
    eligibilityCriteria: [
      'Girl child must be an Indian resident under the age of 10 years at account opening.',
      'Only one account can be opened per girl child, and a maximum of two accounts per family (with exception for twins/triplets).'
    ],
    ineligibilityReasons: [
      'Girl child aged 10 years or older at the time of application.',
      'Non-resident Indian (NRI) status.'
    ],
    documents: [
      'Birth Certificate of the girl child (Mandatory)',
      'Identity Proof of Parent / Guardian (Aadhaar Card, PAN Card)',
      'Address Proof of Parent / Guardian (Aadhaar, Passport, Utility Bill)',
      'Passport-size photographs of girl child and guardian'
    ],
    applicationSteps: [
      '1. Access scheme details and official guidelines at https://www.nsiindia.gov.in or your banks official portal.',
      '2. Download the Sukanya Samriddhi Account Opening Form (Form-1) or collect it from a post office or designated bank branch.',
      '3. Fill in the details of the girl child and parent/guardian.',
      '4. Attach the girl child birth certificate, parent Aadhaar, PAN card, and photographs.',
      '5. Deposit the initial amount (minimum ₹250) in cash, cheque, or demand draft.',
      '6. Receive the official SSY Passbook containing account details, interest updates, and deposit records.'
    ],
    offlineApplication: 'Available at all Post Offices and authorized branches of commercial banks (SBI, PNB, Canara Bank, HDFC Bank, ICICI Bank, Axis Bank, etc.) across India.',
    officialUrl: 'https://www.nsiindia.gov.in',
    source: 'nsiindia.gov.in',
    lastUpdated: '2026-11-05',
  }
];
