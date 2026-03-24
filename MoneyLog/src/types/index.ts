// ============================================================
// TIPOS GLOBALES DE LA APLICACIÓN — MoneyLog
// ============================================================

// ---------- Entidades de dominio ----------

export type ExpenseCategory = 'food' | 'transport' | 'entertainment' | 'other';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  created_at: string;
  userId?: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
};

// ---------- Navegación ----------

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomeTabs: undefined;
};

export type TabParamList = {
  Expenses: undefined;
  AddExpense: undefined;
};

// ---------- Props de componentes ----------

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export type InputType = 'text' | 'email' | 'password' | 'number';
