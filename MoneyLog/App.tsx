import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from "./src/store/slices"

// ============================================================
// PUNTO DE ENTRADA — MoneyLog
// ============================================================
// TODO (Inciso A.4): Importa Provider desde react-redux e importa
// el store desde src/store/store.ts. Envuelve <AppNavigator />
// con <Provider store={store}>.
// ============================================================

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
    </Provider>
  );
}
