import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense, ExpenseCategory } from '../types';

type Props = {
  expense: Expense;
};

const CATEGORY_CONFIG: Record<
  ExpenseCategory,
  { label: string; color: string; bg: string; icon: string }
> = {
  food:          { label: 'Comida',        color: '#E65100', bg: '#FFF3E0', icon: '🍔' },
  transport:     { label: 'Transporte',    color: '#1565C0', bg: '#E3F2FD', icon: '🚗' },
  entertainment: { label: 'Entretenimiento', color: '#6A1B9A', bg: '#F3E5F5', icon: '🎬' },
  other:         { label: 'Otro',          color: '#37474F', bg: '#ECEFF1', icon: '📦' },
};

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatAmount(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export default function ExpenseCard({ expense }: Props) {
  const config = CATEGORY_CONFIG[expense.category];

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: config.bg }]}>
        <Text style={styles.icon}>{config.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{expense.title}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: config.bg }]}>
            <Text style={[styles.badgeText, { color: config.color }]}>{config.label}</Text>
          </View>
          <Text style={styles.date}>{formatDate(expense.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#90A4AE',
  },
  amount: {
    fontSize: 17,
    fontWeight: '800',
    color: '#004D40',
    marginLeft: 8,
  },
});
