import type { Id } from './_generated/dataModel';
import { query } from './_generated/server';
import { authComponent } from './auth';

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await authComponent.safeGetAuthUser(ctx);
    if (!userMetadata) {
      return null;
    }
    // Get user data from your application's database
    // (skip this if you have no fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<'users'>);
    return {
      ...user,
      ...userMetadata,
    };
  },
});

export const getUserStats = query({
  args: {},
  handler: async (ctx) => {},
});
