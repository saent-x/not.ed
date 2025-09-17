import { Ionicons } from "@expo/vector-icons";

export type Reminder = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  date: string;
};

export type JournalEntry = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  date: string;
};

export type TaskItem = {
  id: number;
  title: string;
  expireAt: string;
  completed: boolean;
  childTasks?: ChildTask[];
};

export type ChildTask = {
  id: number;
  title: string;
  status: string;
};
