import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getExpenses, addExpense, Expense } from '../services/expense';

export const ExpensesScreen = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<'food' | 'transport' | 'entertainment' | 'other'>('food');

  // Cargar gastos al inicio
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExpense = async () => {
    if (!title || !amount) return;

    try {
      const newExpense: Expense = {
        title,
        amount: parseFloat(amount),
        category,
      };
      const created = await addExpense(newExpense);
      setExpenses([created, ...expenses]); // agregar al inicio
      setTitle('');
      setAmount('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        {user?.name ? `Hola, ${user.name}` : `Hola, ${user?.email ?? 'Invitado'}`}
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Monto"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría (food, transport, entertainment, other)"
          value={category}
          onChangeText={(text) =>
            setCategory(
              text === 'food' || text === 'transport' || text === 'entertainment' ? text : 'other'
            )
          }
        />
        <Button title="Agregar Gasto" onPress={handleAddExpense} />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.title} - ${item.amount} ({item.category})
            </Text>
            <Text style={styles.date}>{new Date(item.created_at!).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  greeting: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  form: { marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 5 },
  item: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 16 },
  date: { fontSize: 12, color: '#999' },
});