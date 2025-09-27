import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/app/AppNavigator';
import { Buffer } from 'buffer';

if (typeof globalThis !== 'undefined' && !(globalThis as any).Buffer) {
  (globalThis as any).Buffer = Buffer;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
