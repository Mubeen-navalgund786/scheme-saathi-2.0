/**
 * All 28 States and 8 Union Territories of India
 */

export const INDIAN_STATES_AND_UTS = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

export const CITIZEN_CATEGORIES = [
  { id: 'Farmer', label: 'Farmer', description: 'Agricultural landholders, tenant cultivators, and allied workers' },
  { id: 'Student', label: 'Student', description: 'School, diploma, college, or university scholars' },
  { id: 'Woman', label: 'Woman', description: 'Women empowerment, maternity, and self-help group members' },
  { id: 'Senior citizen', label: 'Senior citizen', description: 'Elderly citizens planning retirement or pensions' },
  { id: 'Small business owner', label: 'Small business owner', description: 'Micro-entrepreneurs, shopkeepers, and artisans' },
  { id: 'Other', label: 'Other', description: 'Wage workers, gig workers, and general citizens' },
];

export const OCCUPATIONS = [
  'Farmer',
  'Student',
  'Business owner',
  'Homemaker',
  'Employee',
  'Other',
];

export const INCOME_RANGES = [
  'below 1 lakh',
  '1 to 3 lakh',
  '3 to 8 lakh',
  'above 8 lakh',
] as const;
