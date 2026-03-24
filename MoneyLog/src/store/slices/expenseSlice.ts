import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { Expense } from "../../types"

interface ExpensesState {
    expenses: Expense[];
    selectedExpense: Expense | null;
}

const initialState: ExpensesState = {
    expenses: [],
    selectedExpense: null,
}

const expenseSlice = createSlice ({
name: "expenses",
initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
            },

        updateExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.expenses.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }

    },
}
})

export const { addExpense, updateExpense} = expenseSlice.actions;
export default expenseSlice.reducer;