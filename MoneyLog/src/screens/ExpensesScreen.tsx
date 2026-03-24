import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Expense } from '../types';
import ExpenseCard from '../components/ExpenseCard';
import { useAuth } from '../context/AuthContext';

// ============================================================
// DATOS DUMMY — Solo para desarrollo visual
// ============================================================
// TODO (Inciso D.3): Reemplaza DUMMY_EXPENSES con los datos
// obtenidos de Supabase a través del store de Redux.
// Usa useSelector para leer del store y useEffect para
// despachar la carga inicial de datos desde Supabase.
// ============================================================
const DUMMY_EXPENSES: Expense[] = [
  {
    id: '1',
    title: 'Café y desayuno',
    amount: 85,
    category: 'food',
    createdAt: '2025-03-22T09:15:00Z',
  },
  {
    id: '2',
    title: 'Transporte Uber',
    amount: 62,
    category: 'transport',
    createdAt: '2025-03-22T08:00:00Z',
  },
  {
    id: '3',
    title: 'Cine con amigos',
    amount: 150,
    category: 'entertainment',
    createdAt: '2025-03-21T20:30:00Z',
  },
  {
    id: '4',
    title: 'Supermercado semanal',
    amount: 480,
    category: 'food',
    createdAt: '2025-03-21T16:00:00Z',
  },
  {
    id: '5',
    title: 'Gasolina',
    amount: 320,
    category: 'transport',
    createdAt: '2025-03-20T11:00:00Z',
  },
  {
    id: '6',
    title: 'Suscripción streaming',
    amount: 199,
    category: 'entertainment',
    createdAt: '2025-03-19T00:00:00Z',
  },
  {
    id: '7',
    title: 'Medicamento',
    amount: 95,
    category: 'other',
    createdAt: '2025-03-18T14:00:00Z',
  },
];

function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export default function ExpensesScreen() {
  const { user, logout } = useAuth();

  // TODO (Inciso D.3): Reemplaza esta línea con useSelector
  const expenses = DUMMY_EXPENSES;

  const total = calculateTotal(expenses);

  function renderEmpty() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyTitle}>Sin gastos registrados</Text>
        <Text style={styles.emptySubtitle}>
          Ve a la pestaña "Agregar" para registrar tu primer gasto.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Resumen superior */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <View>
            <Text style={styles.greetingLabel}>Hola, {user?.name ?? user?.email} 👋</Text>
            <Text style={styles.summaryLabel}>Total del período</Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutIcon}>↩</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        <Text style={styles.expenseCount}>
          {expenses.length} gasto{expenses.length !== 1 ? 's' : ''} registrado
          {expenses.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Lista */}
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ExpenseCard expense={item} />}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  summaryCard: {
    backgroundColor: '#00897B',
    padding: 24,
    paddingTop: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  greetingLabel: {
    fontSize: 14,
    color: '#B2DFDB',
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#E0F2F1',
  },
  totalAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
  },
  expenseCount: {
    fontSize: 13,
    color: '#B2DFDB',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
  },
  logoutIcon: {
    fontSize: 18,
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#455A64',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#90A4AE',
    textAlign: 'center',
    lineHeight: 22,
  },
});
