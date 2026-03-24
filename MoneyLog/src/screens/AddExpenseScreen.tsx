import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addExpense } from '../expenseSlice/addExpense';
import { ExpenseCategory } from '../types';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

// ============================================================
// PANTALLA: Agregar Gasto
// ============================================================

type CategoryOption = {
  value: ExpenseCategory;
  label: string;
  icon: string;
};

const CATEGORIES: CategoryOption[] = [
  { value: 'food',          label: 'Comida',          icon: '🍔' },
  { value: 'transport',     label: 'Transporte',      icon: '🚗' },
  { value: 'entertainment', label: 'Entretenimiento', icon: '🎬' },
  { value: 'other',         label: 'Otro',            icon: '📦' },
];

export default function AddExpenseScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const titleError = title.trim().length === 0 ? 'El nombre del gasto es obligatorio' : '';
  const amountError =
    amount.trim() === '' || isNaN(Number(amount)) || Number(amount) <= 0
      ? 'Ingresa un monto válido mayor a 0'
      : '';
  const formValid = !titleError && !amountError;

  function clearForm() {
    setTitle('');
    setAmount('');
    setCategory('food');
    setSubmitted(false);
  }

  async function handleSave() {
    setSubmitted(true);
    if (!formValid) return;

    setIsLoading(true);
    try {
      // TODO (Inciso D.2): Reemplaza la llamada a Supabase cuando esté disponible.
      // Por ahora se despacha addExpense directamente al store de Redux.

      const newExpense = {
        id: Date.now().toString(),
        title: title.trim(),
        amount: Number(amount),
        category,
        createdAt: new Date().toISOString(),
      };

      dispatch(addExpense(newExpense));

      Alert.alert(
        ' Gasto guardado',
        `"${newExpense.title}" por $${newExpense.amount} fue registrado correctamente.`,
        [{ text: 'OK', onPress: clearForm }]
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar el gasto';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Nuevo gasto</Text>

        {/* Campos de texto */}
        <View style={styles.card}>
          <CustomInput
            label="Nombre del gasto"
            value={title}
            onChangeText={setTitle}
            type="text"
            placeholder="Ej. Café, Gasolina, Cine..."
            error={submitted ? titleError : undefined}
          />

          <CustomInput
            label="Monto ($)"
            value={amount}
            onChangeText={setAmount}
            type="number"
            placeholder="0.00"
            error={submitted ? amountError : undefined}
          />
        </View>

        {/* Selector de categoría */}
        <Text style={styles.categoryLabel}>Categoría</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map(cat => {
            const selected = category === cat.value;
            return (
              <TouchableOpacity
                key={cat.value}
                style={[styles.categoryChip, selected && styles.categoryChipSelected]}
                onPress={() => setCategory(cat.value)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryChipLabel,
                    selected && styles.categoryChipLabelSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botón guardar */}
        <CustomButton
          label="Guardar Gasto"
          onPress={handleSave}
          disabled={submitted ? !formValid : false}
          loading={isLoading}
          style={styles.saveButton}
        />

        {submitted && !formValid && (
          <Text style={styles.formError}>
            Por favor, corrige los errores para continuar.
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#004D40',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 10,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#B0BEC5',
    backgroundColor: '#fff',
  },
  categoryChipSelected: {
    borderColor: '#00897B',
    backgroundColor: '#E0F2F1',
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryChipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#607D8B',
  },
  categoryChipLabelSelected: {
    color: '#004D40',
  },
  saveButton: {
    marginTop: 4,
  },
  formError: {
    textAlign: 'center',
    color: '#E53935',
    fontSize: 13,
    marginTop: 10,
  },
});
