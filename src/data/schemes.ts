/**
 * Sample Government Scheme Records
 * Note: These are curated sample records for Scheme Saathi informational prototype.
 * All official portal links point to legitimate Indian government domains (.gov.in / official portals).
 * Last updated: 2026-11-03
 */

import { Scheme } from '../types';

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    category: 'Farmers',
    level: 'central',
    benefit: '₹6,000 per year in three ₹2,000 instalments',
    eligibility: 'Landholding farmer families with e-KYC and an Aadhaar-linked bank account',
    documents: ['Aadhaar', 'Land records', 'Bank passbook'],
    officialUrl: 'https://pmkisan.gov.in',
    source: 'pmkisan.gov.in',
    lastUpdated: '2026-11-03',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat (PM-JAY)',
    category: 'Health',
    level: 'central',
    benefit: 'Health cover for eligible low-income families',
    eligibility: 'Eligible families as per the official beneficiary list',
    documents: ['Aadhaar', 'Ration card', 'Mobile number'],
    officialUrl: 'https://pmjay.gov.in',
    source: 'pmjay.gov.in',
    lastUpdated: '2026-11-03',
  },
  {
    id: 'pm-awas',
    name: 'PM Awas Yojana',
    category: 'Housing',
    level: 'central',
    benefit: 'Assistance to build or buy a home',
    eligibility: 'Families without a pucca house, per scheme criteria',
    documents: ['Aadhaar', 'Income certificate', 'Bank passbook'],
    officialUrl: 'https://pmaymis.gov.in',
    source: 'pmaymis.gov.in',
    lastUpdated: '2026-11-03',
  },
  {
    id: 'national-scholarship',
    name: 'National Scholarship Portal',
    category: 'Students',
    level: 'central',
    benefit: 'Central and state scholarships',
    eligibility: 'Students enrolled in recognised institutions, as per each scholarship',
    documents: ['Aadhaar', 'Marksheets', 'Income certificate', 'Bank passbook'],
    officialUrl: 'https://scholarships.gov.in',
    source: 'scholarships.gov.in',
    lastUpdated: '2026-11-03',
  },
  {
    id: 'pm-mudra',
    name: 'PM Mudra Yojana',
    category: 'Business',
    level: 'central',
    benefit: 'Collateral-free loans for small businesses',
    eligibility: 'Non-farm small business owners and entrepreneurs',
    documents: ['Aadhaar', 'PAN', 'Business plan', 'Bank statements'],
    officialUrl: 'https://www.mudra.org.in',
    source: 'mudra.org.in',
    lastUpdated: '2026-11-03',
  },
  {
    id: 'atal-pension',
    name: 'Atal Pension Yojana',
    category: 'Seniors',
    level: 'central',
    benefit: 'Monthly pension after 60 for unorganised-sector workers',
    eligibility: 'Citizens aged 18 to 40 with a bank account',
    documents: ['Aadhaar', 'Bank account', 'Mobile number'],
    officialUrl: 'https://www.npscra.nsdl.co.in',
    source: 'npscra.nsdl.co.in',
    lastUpdated: '2026-11-03',
  },
];
