import { expoClient } from '@better-auth/expo/client';
import { convexClient, crossDomainClient } from '@convex-dev/better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_SITE_URL,
  plugins: [
    convexClient(),
    ...(Platform.OS === 'web'
      ? [crossDomainClient()]
      : [
          expoClient({
            scheme: 'mobile', // scheme from app.json
            storagePrefix: 'mobile', // can be anything
            storage: SecureStore,
          }),
        ]),
  ],
});
