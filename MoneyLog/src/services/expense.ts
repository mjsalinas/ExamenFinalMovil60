import { supabase } from './supabaseClient';

export type Expense = {
  id?: string;
  title: string;
  amount: number;
  category: 'food' | 'transport' | 'entertainment' | 'other';
  created_at?: string;
};

// Obtener todos los gastos
export async function getExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Agregar un nuevo gasto
export async function addExpense(expense: Expense) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select();

  if (error) throw error;
  return data[0];
}