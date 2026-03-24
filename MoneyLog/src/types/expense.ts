
export type ExpenseCategory = 'food' | 'transport' | 'entertainment' | 'other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
  userId?: string;
};