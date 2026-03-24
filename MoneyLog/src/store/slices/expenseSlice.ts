import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../types";

interface ExpensesState {
    expenses: Expense[]; // Cambiado a 'expenses' para ser consistente
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
            const index = state.expenses.findIndex((e: { id: string; }) => e.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
        clearExpenses: () => initialState,
    },
});

export const { addExpense, updateExpense, clearExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;