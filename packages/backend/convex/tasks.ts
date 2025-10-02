import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isSameDay } from "date-fns";
import { filter } from "convex-helpers/server/filter";
import type { TaskItem } from "@not.ed/shared";
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
		const currentUser = await AuthGuard(ctx);

		const taskId = await ctx.db.insert("tasks", {
			description: args.description,
			userId: currentUser?.userId as Id<"users">,
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

export const getTasksByDate = query({
	args: {
		day: v.number(),
	},
	handler: async (ctx, args) => {
		const currentUser = await AuthGuard(ctx);

		const tasks = await filter(
			ctx.db
				.query("tasks")
				.withIndex("userId", (q) =>
					q.eq("userId", currentUser?.userId as Id<"users">),
				),
			(task) =>
				isSameDay(new Date(task.expireAt), new Date(args.day)),
		).collect();

		return tasks as TaskItem[];
	},
});

export const toggleTaskCompletion = mutation({
	args: {
		taskId: v.id("tasks"),
		completed: v.boolean(),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);
		await ctx.db.patch(args.taskId, { completed: args.completed });
	},
});

export const getTaskById = query({
	args: {
		taskId: v.id("tasks"),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);

		const task = await ctx.db.get(args.taskId);
		if (!task) {
			return null;
		}

		const childTasks = await ctx.db
			.query("childTasks")
			.withIndex("parentTaskId", (q) => q.eq("parentTaskId", args.taskId))
			.collect();

		return { ...task, childTasks };
	},
});

export const updateTask = mutation({
	args: {
		taskId: v.id("tasks"),
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
		await AuthGuard(ctx);

		await ctx.db.patch(args.taskId, {
			description: args.description,
			expireAt: args.expireAt,
			priority: args.priority,
		});

		// delete all previous child tasks
		const previousChildTasks = await ctx.db
			.query("childTasks")
			.withIndex("parentTaskId", (q) => q.eq("parentTaskId", args.taskId))
			.collect();

		previousChildTasks.forEach(
			async (previousChild) => await ctx.db.delete(previousChild._id),
		);

		args.childTasks?.forEach(async (childTask) => {
			await ctx.db.insert("childTasks", {
				title: childTask.title,
				completed: childTask.completed,
				parentTaskId: args.taskId,
			});
		});

		return;
	},
});

export const deleteTask = mutation({
	args: {
		taskId: v.id("tasks"),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);

		// delete associated child tasks
		const childTasks = await ctx.db
			.query("childTasks")
			.withIndex("parentTaskId", (q) => q.eq("parentTaskId", args.taskId))
			.collect();

		for (const childTask of childTasks) {
			await ctx.db.delete(childTask._id as Id<"childTasks">);
		}

		await ctx.db.delete(args.taskId);
	},
});
