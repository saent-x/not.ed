import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isSameDay } from "date-fns";
import { filter } from "convex-helpers/server/filter";
import type { TaskItem } from "@not.ed/shared";
import { authComponent } from "./auth";
import type { Id } from "./_generated/dataModel";
import { AuthGuard } from "./util";

export const createTask = mutation({
	args: {
		description: v.string(),
		expireAt: v.number(),
		priority: v.string(),
		childTasks: v.optional(
			v.array(
				v.object({
					title: v.string(),
					completed: v.boolean(),
				}),
			),
		),
	},
	handler: async (ctx, args) => {
		const currentUser = await authComponent.getAuthUser(ctx);
		if (!currentUser) {
			return [];
		}

		const taskId = await ctx.db.insert("tasks", {
			description: args.description,
			userId: currentUser.userId as Id<"users">,
			completed: false,
			priority: args.priority,
			expireAt: args.expireAt,
		});

		if (args.childTasks) {
			for (const childTask of args.childTasks) {
				await ctx.db.insert("childTasks", {
					title: childTask.title,
					completed: childTask.completed,
					parentTaskId: taskId,
				});
			}
		}

		return taskId;
	},
});
