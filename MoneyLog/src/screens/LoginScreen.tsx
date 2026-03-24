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
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const emailValid = email.includes('@');
  const passwordValid = password.length >= 6;
  const formValid = emailValid && passwordValid;

  function validate(): boolean {
    let valid = true;
    if (!emailValid) {
      setEmailError('El correo debe incluir @');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!passwordValid) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  }

  async function handleLogin() {
    setSubmitted(true);
    if (!validate()) return;
    try {
      await login(email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
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
          <Text style={styles.subtitle}>Controla tus gastos fácilmente</Text>
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>Iniciar sesión</Text>

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
            label="Iniciar Sesión"
            onPress={handleLogin}
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
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}> Regístrate</Text>
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
  subtitle: {
    fontSize: 15,
    color: '#00695C',
    marginTop: 4,
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
