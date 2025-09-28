import type { QueryCtx } from "./_generated/server";
import { authComponent } from "./auth";

export const AuthGuard = async (ctx: QueryCtx) => {
	const currentUser = await authComponent.getAuthUser(ctx);
	if (!currentUser) {
		return;
	}

	return currentUser;
};
