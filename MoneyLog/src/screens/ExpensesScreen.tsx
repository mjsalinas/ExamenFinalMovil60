import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Expense } from '../types';
import ExpenseCard from '../components/ExpenseCard';
import { useAuth } from '../context/AuthContext';
import { RootState } from '../store/store';

// ============================================================
// DATOS DUMMY — Solo para desarrollo visual
// ============================================================
// TODO (Inciso D.3): Reemplaza DUMMY_EXPENSES con los datos
// obtenidos de Supabase a través del store de Redux.
// Usa useSelector para leer del store y useEffect para
// despachar la carga inicial de datos desde Supabase.
// ============================================================

function calculateTotal(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export default function ExpensesScreen() {
  const { user, logout } = useAuth();

  const expenses = useSelector((state: RootState) => state.expenses.expenses);

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
