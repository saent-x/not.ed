import type { GenericCtx } from "@convex-dev/better-auth";
import type { DataModel } from "./_generated/dataModel";
import { authComponent } from "./auth";

export const AuthGuard = async (ctx: GenericCtx<DataModel>) => {
  const currentUser = await authComponent.getAuthUser(ctx);
  if (!currentUser) {
    return;
  }

  return currentUser;
};

export const requireEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
};
