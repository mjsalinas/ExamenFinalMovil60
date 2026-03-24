import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definimos la interfaz para un gasto (Expense)
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [], // Estado inicial: un arreglo vacío
};

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Acción addExpense: agrega un gasto al array
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    // Acción setExpenses: reemplaza todo el estado
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;