import type { Id } from "@not.ed/backend/convex/_generated/dataModel";

export type JournalEntry = {
	_id: number;
	icon: string;
	title: string;
	date: number;
};

export type JournalItem = {
	_id: number;
	title: string;
	content: string;
	createdAt?: Date;
	tags?: string[];
};

export type TaskPriority = "high" | "medium" | "low";

export type TaskItem = {
	_id: Id<"tasks">;
	_creationTime: number;
	userId: Id<"users">;
	expireAt: number;
	childTasks?: Id<"childTasks">[] | undefined;
	description: string;
	completed: boolean;
	priority: string;
};

export type ChildTask = {
	_id?: Id<"childTasks">;
	_creationTime?: number;
	completed: boolean;
	title: string;
	parentTaskId?: Id<"tasks">;
};

export type ReminderFrequency =
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "every monday"
	| "every tuesday"
	| "every wednesday"
	| "every thursday"
	| "every friday"
	| "every saturday"
	| "every sunday";

export type ReminderItem = {
	_id: Id<"reminders">;
    _creationTime: number;
    userId: Id<"users">;
    date: number;
    completed: boolean;
    title: string;
    frequency: string;
	earlyReminder: boolean;
};
