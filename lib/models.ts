import { Ionicons } from '@expo/vector-icons';

export type JournalEntry = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  date: Date;
};

export type TaskPriority = 'high' | 'medium' | 'low';

export type TaskItem = {
  id: number;
  title: string;
  expireAt: string;
  completed: boolean;
  childTasks?: ChildTask[];
  priority?: TaskPriority;
};

export type ChildTask = {
  id: number;
  title: string;
  status: string;
};

export type ReminderFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | Date;

export type ReminderItem = {
  id: number;
  title: string;
  date: Date;
  icon?: keyof typeof Ionicons.glyphMap;
  frequency?: ReminderFrequency;
  completed?: boolean;
};
