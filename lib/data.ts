// Dummy data for demonstration purposes

// Account types and their icons
export const accountTypes = [
  { id: 'checking', name: 'Checking Account' },
  { id: 'savings', name: 'Savings Account' },
  { id: 'credit', name: 'Credit Card' },
  { id: 'investment', name: 'Investment Account' },
  { id: 'cash', name: 'Cash' },
  { id: 'digital', name: 'Digital Wallet' },
];

// Sample accounts
export const accounts = [
  {
    id: '1',
    name: 'Main Checking',
    type: 'checking',
    balance: 4250.65,
    currency: 'USD',
    lastUpdated: '2025-03-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 12680.42,
    currency: 'USD',
    lastUpdated: '2025-03-14T16:45:00Z',
  },
  {
    id: '3',
    name: 'Company Credit Card',
    type: 'credit',
    balance: -1240.30,
    currency: 'USD',
    lastUpdated: '2025-03-15T09:15:00Z',
  },
  {
    id: '4',
    name: 'Retirement Fund',
    type: 'investment',
    balance: 58620.75,
    currency: 'USD',
    lastUpdated: '2025-03-10T14:20:00Z',
  },
  {
    id: '5',
    name: 'Emergency Savings',
    type: 'savings',
    balance: 5000.00,
    currency: 'USD',
    lastUpdated: '2025-03-12T11:30:00Z',
  },
];

// Transaction categories
export const categories = [
  { id: 'housing', name: 'Housing', type: 'expense' },
  { id: 'transportation', name: 'Transportation', type: 'expense' },
  { id: 'food', name: 'Food & Dining', type: 'expense' },
  { id: 'utilities', name: 'Utilities', type: 'expense' },
  { id: 'insurance', name: 'Insurance', type: 'expense' },
  { id: 'medical', name: 'Medical & Healthcare', type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', type: 'expense' },
  { id: 'clothing', name: 'Clothing', type: 'expense' },
  { id: 'education', name: 'Education', type: 'expense' },
  { id: 'gifts', name: 'Gifts & Donations', type: 'expense' },
  { id: 'savings', name: 'Savings', type: 'transfer' },
  { id: 'income', name: 'Income', type: 'income' },
  { id: 'investments', name: 'Investments', type: 'income' },
  { id: 'other', name: 'Other', type: 'expense' },
];

// Sample transactions
export const transactions = [
  {
    id: 't1',
    date: '2025-03-15T08:30:00Z',
    amount: -85.43,
    description: 'Grocery Shopping',
    category: 'food',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't2',
    date: '2025-03-14T12:15:00Z',
    amount: -42.99,
    description: 'Fuel Station',
    category: 'transportation',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't3',
    date: '2025-03-14T18:45:00Z',
    amount: -120.00,
    description: 'Electricity Bill',
    category: 'utilities',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't4',
    date: '2025-03-13T09:30:00Z',
    amount: 2450.00,
    description: 'Salary Payment',
    category: 'income',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't5',
    date: '2025-03-12T14:20:00Z',
    amount: -65.99,
    description: 'Internet Subscription',
    category: 'utilities',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't6',
    date: '2025-03-12T19:15:00Z',
    amount: -34.50,
    description: 'Dinner at Restaurant',
    category: 'food',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't7',
    date: '2025-03-11T10:45:00Z',
    amount: -1200.00,
    description: 'Rent Payment',
    category: 'housing',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't8',
    date: '2025-03-10T16:30:00Z',
    amount: -500.00,
    description: 'Transfer to Savings',
    category: 'savings',
    accountId: '1',
    status: 'completed',
  },
  {
    id: 't9',
    date: '2025-03-10T16:30:00Z',
    amount: 500.00,
    description: 'Transfer from Checking',
    category: 'savings',
    accountId: '2',
    status: 'completed',
  },
  {
    id: 't10',
    date: '2025-03-09T13:45:00Z',
    amount: -89.99,
    description: 'Clothing Purchase',
    category: 'clothing',
    accountId: '3',
    status: 'completed',
  },
  {
    id: 't11',
    date: '2025-03-08T11:20:00Z',
    amount: -28.55,
    description: 'Book Store',
    category: 'education',
    accountId: '3',
    status: 'completed',
  },
  {
    id: 't12',
    date: '2025-03-07T15:10:00Z',
    amount: -15.40,
    description: 'Coffee Shop',
    category: 'food',
    accountId: '3',
    status: 'completed',
  },
];

// Monthly financial data for charts
export const monthlyFinancialData = [
  { month: 'Jan', income: 4500, expenses: 3200, savings: 1300 },
  { month: 'Feb', income: 4500, expenses: 3400, savings: 1100 },
  { month: 'Mar', income: 4800, expenses: 3300, savings: 1500 },
  { month: 'Apr', income: 4700, expenses: 3600, savings: 1100 },
  { month: 'May', income: 4900, expenses: 3800, savings: 1100 },
  { month: 'Jun', income: 5100, expenses: 3700, savings: 1400 },
  { month: 'Jul', income: 5000, expenses: 3900, savings: 1100 },
  { month: 'Aug', income: 5200, expenses: 4000, savings: 1200 },
  { month: 'Sep', income: 5400, expenses: 3800, savings: 1600 },
  { month: 'Oct', income: 5300, expenses: 3900, savings: 1400 },
  { month: 'Nov', income: 5500, expenses: 4100, savings: 1400 },
  { month: 'Dec', income: 5800, expenses: 4500, savings: 1300 },
];

// Category spending data for charts
export const categorySpendingData = [
  { category: 'Housing', amount: 1200, percentage: 30 },
  { category: 'Food', amount: 800, percentage: 20 },
  { category: 'Transportation', amount: 400, percentage: 10 },
  { category: 'Utilities', amount: 300, percentage: 7.5 },
  { category: 'Healthcare', amount: 200, percentage: 5 },
  { category: 'Entertainment', amount: 500, percentage: 12.5 },
  { category: 'Education', amount: 200, percentage: 5 },
  { category: 'Other', amount: 400, percentage: 10 },
];

// Budget data
export const budgetData = [
  { category: 'Housing', budget: 1300, spent: 1200, remaining: 100 },
  { category: 'Food', budget: 900, spent: 800, remaining: 100 },
  { category: 'Transportation', budget: 500, spent: 400, remaining: 100 },
  { category: 'Utilities', budget: 350, spent: 300, remaining: 50 },
  { category: 'Healthcare', budget: 300, spent: 200, remaining: 100 },
  { category: 'Entertainment', budget: 600, spent: 500, remaining: 100 },
  { category: 'Education', budget: 250, spent: 200, remaining: 50 },
  { category: 'Other', budget: 500, spent: 400, remaining: 100 },
];

// Daily expense data
export const dailyExpenseData = [
  { day: '01', amount: 120 },
  { day: '02', amount: 85 },
  { day: '03', amount: 110 },
  { day: '04', amount: 90 },
  { day: '05', amount: 150 },
  { day: '06', amount: 130 },
  { day: '07', amount: 75 },
  { day: '08', amount: 95 },
  { day: '09', amount: 120 },
  { day: '10', amount: 105 },
  { day: '11', amount: 130 },
  { day: '12', amount: 140 },
  { day: '13', amount: 125 },
  { day: '14', amount: 85 },
  { day: '15', amount: 95 },
  { day: '16', amount: 110 },
  { day: '17', amount: 130 },
  { day: '18', amount: 145 },
  { day: '19', amount: 120 },
  { day: '20', amount: 100 },
  { day: '21', amount: 90 },
  { day: '22', amount: 105 },
  { day: '23', amount: 115 },
  { day: '24', amount: 125 },
  { day: '25', amount: 130 },
  { day: '26', amount: 105 },
  { day: '27', amount: 95 },
  { day: '28', amount: 110 },
  { day: '29', amount: 120 },
  { day: '30', amount: 115 },
];

// Account balance history
export const accountBalanceHistory = [
  { date: '2025-01-01', balance: 3000 },
  { date: '2025-01-15', balance: 3450 },
  { date: '2025-02-01', balance: 3200 },
  { date: '2025-02-15', balance: 3800 },
  { date: '2025-03-01', balance: 3600 },
  { date: '2025-03-15', balance: 4250 },
];

// Financial summary
export const financialSummary = {
  totalBalance: 79311.52,
  totalIncome: 5800,
  totalExpenses: 4300,
  savingsRate: 25.86,
  netWorth: 78071.22,
  monthlyChange: 3.2,
  yearlyChange: 12.5,
};