import { v } from 'convex/values';
import { query } from './_generated/server';

export const getUserStats = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const userStat = await ctx.db
      .query('userStats')
      .withIndex('userId', (q) => q.eq('userId', args.userId))
      .collect();

    return { userStat };
  },
});
