import { Text, TouchableOpacity, View } from 'react-native';
import ReminderDay from './ReminderDay';
import type { ReminderItem } from '@/shared';
import { format } from 'date-fns';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '../ui/icon';

type ReminderItemsProps = {
  reminders: ReminderItem[];
  onReminderClick: (reminderId: string) => void;
};

export const ReminderItems = ({ reminders: tasks, onReminderClick }: ReminderItemsProps) => {
  return (
    <View className="flex gap-8 pt-5">
      {tasks.map((item) => (
        <View key={item._id}>
          <TouchableOpacity
            key={item._id}
            className="flex flex-row items-center gap-4"
            onPress={() => onReminderClick(item._id as string)}>
            <Checkbox value="" isChecked={item.completed} onChange={() => {}} size="md">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
            <View className="flex flex-grow flex-col gap-1">
              <Text
                className={`truncate text-lg font-semibold ${item.completed ? 'text-muted-foreground line-through' : ''}`}>
                {item.title}
              </Text>
              <Text
                className={`text-muted-foreground text-md truncate ${item.completed ? 'line-through' : ''}`}>
                {`${format(new Date(item.date ?? 0), 'MMM d, yyyy h:mm a')}`}
                {typeof item.frequency === 'string' && item.frequency !== 'none' ? (
                  <>
                    <Text>{' • '}</Text>
                    <Text
                      className={`font-bold uppercase ${item.completed ? 'text-muted-foreground line-through' : 'text-yellow-600'}`}>
                      {item.frequency}
                    </Text>
                  </>
                ) : (
                  ''
                )}
              </Text>
            </View>
            <ReminderDay date={item.date ?? 0} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
