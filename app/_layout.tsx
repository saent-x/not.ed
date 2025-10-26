import { Slot } from 'expo-router';
import { ConvexReactClient } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { authClient } from '@/lib/auth-client';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error('Missing EXPO_PUBLIC_CONVEX_URL environment variable');
}

const convex = new ConvexReactClient(convexUrl, {
  unsavedChangesWarning: false,
  expectAuth: true,
  // verbose: true
});

export default function Layout() {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode="light">
          <Slot />
          <Toaster />
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </ConvexBetterAuthProvider>
  );
}
