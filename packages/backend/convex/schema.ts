import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		name: v.string(),
		appSettings: v.optional(
			v.object({
				theme: v.string(),
			}),
		),
	}),

	userStats: defineTable({
		userId: v.id("users"),
		dailyStreak: v.number(),
		totalJournals: v.number(),
		totalTasksCompleted: v.number(),
	}).index("userId", ["userId"]),

	tasks: defineTable({
		userId: v.id("users"),
		description: v.string(),
		completed: v.boolean(),
		expireAt: v.number(),
		priority: v.string(),
		childTasks: v.optional(v.array(v.id("childTasks"))),
	}).index("userId", ["userId"]),

	childTasks: defineTable({
		title: v.string(),
		completed: v.boolean(),
		parentTaskId: v.id("tasks"),
	}).index("parentTaskId", ["parentTaskId"]),

	reminders: defineTable({
		userId: v.id("users"),
		title: v.string(),
		completed: v.boolean(),
		date: v.number(),
		frequency: v.string(),
		earlyReminder: v.boolean(),
	}).index("userId", ["userId"]),

	journals: defineTable({
		userId: v.id("users"),
		title: v.string(),
		content: v.string(),
	}),
});
