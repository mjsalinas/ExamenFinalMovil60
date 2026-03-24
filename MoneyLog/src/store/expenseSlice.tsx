
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../types/index";

interface ExpensesState {
    expenses: Expense[];
    selectedExpense: Expense | null;
}

const initialState: ExpensesState = {
    expenses: [],
    selectedExpense: null,
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.expenses.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
        deleteExpense: (state, action: PayloadAction<string>) => {
            state.expenses = state.expenses.filter(e => e.id !== action.payload);
        },
        selectExpense: (state, action: PayloadAction<Expense | null>) => {
            state.selectedExpense = action.payload;
        },
        clearExpenses: () => initialState,
    },
});

export const { addExpense, updateExpense, deleteExpense, selectExpense, clearExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
