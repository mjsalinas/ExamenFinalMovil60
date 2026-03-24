import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { InputType } from '../types';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  placeholder?: string;
  error?: string;
};

function getKeyboardType(type: InputType): KeyboardTypeOptions {
  if (type === 'email') return 'email-address';
  if (type === 'number') return 'numeric';
  return 'default';
}

export default function CustomInput({
  label,
  value,
  onChangeText,
  type = 'text',
  placeholder = '',
  error,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const secureTextEntry = isPassword && !showPassword;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : styles.inputNormal]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#90A4AE"
          keyboardType={getKeyboardType(type)}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          secureTextEntry={secureTextEntry}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeIcon}>
              {showPassword ? '🙈' : '👁'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
  },
  inputNormal: {
    borderColor: '#B0BEC5',
  },
  inputError: {
    borderColor: '#E53935',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
    paddingVertical: 12,
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 4,
    marginLeft: 2,
  },
});
