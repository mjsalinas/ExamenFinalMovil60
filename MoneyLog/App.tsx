import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// ============================================================
// PUNTO DE ENTRADA — MoneyLog
// ============================================================
// TODO (Inciso A.4): Importa Provider desde react-redux e importa
// el store desde src/store/store.ts. Envuelve <AppNavigator />
// con <Provider store={store}>.
// ============================================================

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
