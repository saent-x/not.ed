import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { isSameDay } from "date-fns";
import { filter } from "convex-helpers/server/filter";
import type { ReminderItem } from "@not.ed/shared";
import type { Id } from "./_generated/dataModel";
import { AuthGuard } from "./util";

export const createReminder = mutation({
	args: {
		title: v.string(),
		date: v.number(),
		completed: v.boolean(),
		frequency: v.string(),
		earlyReminder: v.boolean(),
	},
	handler: async (ctx, args) => {
		const currentUser = await AuthGuard(ctx);

		const reminderId = await ctx.db.insert("reminders", {
			userId: currentUser?.userId as Id<"users">,
			title: args.title,
			date: args.date,
			completed: args.completed,
			frequency: args.frequency,
			earlyReminder: args.earlyReminder,
		});

		return reminderId;
	},
});

export const getRemindersByDate = query({
	args: {
		day: v.number(),
	},
	handler: async (ctx, args) => {
		const currentUser = await AuthGuard(ctx);

		const reminders = await filter(
			ctx.db
				.query("reminders")
				.withIndex("userId", (q) =>
					q.eq("userId", currentUser?.userId as Id<"users">),
				),
			(reminder) =>
				isSameDay(new Date(reminder.date), new Date(args.day)),
		).collect();

		return reminders as ReminderItem[];
	},
});

export const toggleReminderCompletion = mutation({
	args: {
		reminderId: v.id("reminders"),
		completed: v.boolean(),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);
		await ctx.db.patch(args.reminderId, { completed: args.completed });
	},
});

export const getReminderById = query({
	args: {
		reminderId: v.id("reminders"),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);

		const reminder = await ctx.db.get(args.reminderId);
		if (!reminder) {
			return null;
		}

		return reminder;
	},
});

export const updateReminder = mutation({
	args: {
		reminderId: v.id("reminders"),
		title: v.string(),
		date: v.number(),
		frequency: v.string(),
		earlyReminder: v.boolean(),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);

		await ctx.db.patch(args.reminderId, {
			title: args.title,
			date: args.date,
			frequency: args.frequency,
			earlyReminder: args.earlyReminder,
		});

		return;
	},
});

export const deleteReminder = mutation({
	args: {
		reminderId: v.id("reminders"),
	},
	handler: async (ctx, args) => {
		await AuthGuard(ctx);

		await ctx.db.delete(args.reminderId);
	},
});
