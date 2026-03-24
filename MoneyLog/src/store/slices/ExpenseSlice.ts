
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types';

interface ExpensesState {
  expenses: Expense[];
}

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    // Recibe un objeto Expense y lo agrega al array
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    // Recibe un array Expense[] y reemplaza el estado completo
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;