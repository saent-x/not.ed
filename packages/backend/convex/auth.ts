import {
  createClient,
  type AuthFunctions,
  type GenericCtx,
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import type { Id, DataModel } from "./_generated/dataModel";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { requireEnv } from "@convex-dev/better-auth/utils";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  verbose: true,
  triggers: {
    user: {
      onCreate: async (ctx, user) => {
        const userId = await ctx.db.insert("users", {
          name: user.name,
        });

        await authComponent.setUserId(ctx, user._id, userId);
      },
      onUpdate: async (ctx, oldUser, newUser) => {},
      onDelete: async (ctx, user) => {
        await ctx.db.delete(user.userId as Id<"users">);
      },
    },
  },
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

const siteUrl = requireEnv("SITE_URL");

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  // Configure your Better Auth instance here
  betterAuth({
    trustedOrigins: [
      siteUrl,
      requireEnv("EXPO_MOBILE_URL"),
      "http://localhost:8081",
      "mobile://",
    ],
    database: authComponent.adapter(ctx),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
      microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID!,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      },
    },
    plugins: [expo(), convex()],
  });
