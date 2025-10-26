import { query } from './_generated/server';
import { authComponent } from './auth';
import type { Id } from './_generated/dataModel';
import { JournalEntry, ReminderItem } from '@/shared';

// TODO: This should return the latest 3 added
export const getFeaturedRemindersAndJournalEntry = query({
  handler: async (ctx) => {
    try {
      const currentUser = await authComponent.getAuthUser(ctx);

      if (!currentUser) {
        return null;
      }
      const user = await ctx.db.get(currentUser.userId as Id<'users'>);
      if (user === null) {
        return null;
      }

      const reminders: ReminderItem[] = [
        {
          _id: '1' as Id<'reminders'>,
          icon: 'cart-outline',
          title: 'Grocery Shopping',
          date: new Date().getUTCMilliseconds(),
          _creationTime: 11,
          userId: '' as Id<'users'>,
          completed: false,
          frequency: '',
          earlyReminder: false,
        },
        {
          _id: '2' as Id<'reminders'>,
          icon: 'medkit-outline',
          title: "Doctor's Appointment",
          date: new Date().getUTCMilliseconds(),
          _creationTime: 11,
          userId: '' as Id<'users'>,
          completed: false,
          frequency: '',
          earlyReminder: false,
        },
      ];

      const journalEntries: JournalEntry[] = [
        {
          _id: 1,
          icon: 'cart-outline',
          title: 'Examination of Conscience for the Day',
          date: new Date().getUTCMilliseconds(),
        },
        {
          _id: 2,
          icon: 'medkit-outline',
          title: 'Reflections on the Week',
          date: new Date().getUTCMilliseconds(),
        },
      ];

      return { reminders, journalEntries };
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});
