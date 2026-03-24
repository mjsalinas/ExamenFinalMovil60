import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../types";

interface ExpensesState {
    expenses: Expense[];
}

const initialState: ExpensesState = {
    expenses: [],
};

const expenseSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
       
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        }, 
        setExpenses: (state, action: PayloadAction<Expense[]>) => {
            state.expenses = action.payload;
        },
    },
});

export const { addExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
