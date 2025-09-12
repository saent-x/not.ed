import { expoClient } from "@better-auth/expo/client";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_SITE_URL,
  plugins: [
    convexClient(),
    expoClient({
      scheme: "mobile", // scheme from app.json
      storagePrefix: "mobile", // can be anything
      storage: SecureStore,
    }),
  ],
});
