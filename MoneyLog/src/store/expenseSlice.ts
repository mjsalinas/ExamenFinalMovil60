import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../types';

type ExpenseState = {
  expenses: Expense[];
};

const initialState: ExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {

    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
    },
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.expenses = action.payload;
    },
  },
});

export const { addExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;