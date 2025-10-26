import type { GenericCtx } from '@convex-dev/better-auth';
import type { DataModel } from './_generated/dataModel';
import { authComponent } from './auth';

export const AuthGuard = async (ctx: GenericCtx<DataModel>) => {
  const currentUser = await authComponent.getAuthUser(ctx);
  if (!currentUser) {
    return;
  }

  return currentUser;
};