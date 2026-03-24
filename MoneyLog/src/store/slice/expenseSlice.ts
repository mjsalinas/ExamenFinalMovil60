import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Expense} from '../../types/expense';

interface ExpenseState {
    expenses: Expense[];
    selectedExpense: Expense | null;
};


const initialState: ExpenseState = {
    expenses: [],
    selectedExpense: null,
};

const ExpensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
        setExpense: (state, action: PayloadAction<Expense>) => {
            const index = state.expenses.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.expenses[index] = action.payload;
            }
        },
    }
});

export const { addExpense, setExpense} = ExpensesSlice.actions;
export default ExpensesSlice.reducer;
