import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../types';

type ExpensesState = {
  expenses: Expense[];
};

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    setExpenses(state, action: PayloadAction<Expense[]>) {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
