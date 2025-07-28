import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { ConvexReactClient } from 'convex/react';

import '../global.css';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

// SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <ConvexAuthProvider
        client={convex}
        storage={Platform.OS === 'android' || Platform.OS === 'ios' ? secureStorage : undefined}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ConvexAuthProvider>
    </>
  );
}
