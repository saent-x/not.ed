import {
  createClient,
  type AuthFunctions,
  type GenericCtx,
} from "@convex-dev/better-auth";
import { components, internal } from "./_generated/api";
import type { Id, DataModel } from "./_generated/dataModel";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions | undefined = internal.auth;

export const setUserId = mutation({
  args: {
    authId: v.id("users"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.authId, {
      userId: args.userId,
    });
  },
});

// Initialize the component
export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  verbose: true,
  triggers: {
    user: {
      onCreate: async (ctx, user) => {
        await ctx.db.insert("users", {
          name: user.name,
          userId: user._id,
          appSettings: {
            theme: "light",
          },
        });
      },
      onUpdate: async (ctx, newUser, oldUser) => {},
      onDelete: async (ctx, user) => {
        await ctx.db.delete(user.userId as Id<"users">);
      },
    },
  },
});

// export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi();

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  // Configure your Better Auth instance here
  betterAuth({
    trustedOrigins: [
      process.env.SITE_URL!,
      process.env.EXPO_MOBILE_URL!,
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
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      microsoft: {
        clientId: process.env.MICROSOFT_CLIENT_ID!,
        clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      },
    },
    plugins: [expo(), convex()],
  });
