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
	userId?: Id<"users"> | undefined;
	expireAt?: number | undefined;
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
	| Date;

export type ReminderItem = {
	_id: number;
	title: string;
	date: number;
	icon?: string;
	frequency?: ReminderFrequency;
	completed?: boolean;
};
