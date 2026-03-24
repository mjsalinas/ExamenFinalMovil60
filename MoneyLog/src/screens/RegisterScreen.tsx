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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const { register, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const nameError = name.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '';
  const emailError = !email.includes('@') ? 'El correo debe incluir @' : '';
  const passwordError = password.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : '';
  const formValid = !nameError && !emailError && !passwordError;

  async function handleRegister() {
    setSubmitted(true);
    if (!formValid) return;
    try {
      await register(name.trim(), email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      Alert.alert('Error', message);
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>💰</Text>
          <Text style={styles.appName}>MoneyLog</Text>
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>Crear cuenta</Text>

          <CustomInput
            label="Nombre completo"
            value={name}
            onChangeText={setName}
            type="text"
            placeholder="Tu nombre"
            error={submitted ? nameError : undefined}
          />

          <CustomInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            type="email"
            placeholder="correo@ejemplo.com"
            error={submitted ? emailError : undefined}
          />

          <CustomInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            type="password"
            placeholder="Mínimo 6 caracteres"
            error={submitted ? passwordError : undefined}
          />

          <CustomButton
            label="Crear cuenta"
            onPress={handleRegister}
            disabled={submitted ? !formValid : false}
            loading={isLoading}
            style={styles.button}
          />

          {submitted && !formValid && (
            <Text style={styles.formError}>
              Por favor, corrige los errores para continuar.
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}> Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#004D40',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#004D40',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  formError: {
    textAlign: 'center',
    color: '#E53935',
    fontSize: 13,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#546E7A',
    fontSize: 14,
  },
  link: {
    color: '#00897B',
    fontWeight: '700',
    fontSize: 14,
  },
});
