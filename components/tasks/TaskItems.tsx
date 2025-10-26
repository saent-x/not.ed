import { Text, TouchableOpacity, View } from 'react-native';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import type { TaskItem, TaskPriority } from '@/shared';
import { format } from 'date-fns';
import type { Id } from '@/convex/_generated/dataModel';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '../ui/icon';

type TaskItemsProps = {
  tasks: TaskItem[];
  onTaskStatusToggle: (taskId: Id<'tasks'>, completed: boolean) => void;
  onTaskClick?: (taskId: Id<'tasks'>) => void;
};

export const TaskItems = ({ tasks, onTaskStatusToggle, onTaskClick }: TaskItemsProps) => {
  return (
    <View className="flex gap-8 pt-5">
      {tasks.map((item) => (
        <View key={item._id}>
          <TouchableOpacity
            className="flex flex-row items-center gap-4"
            onPress={() => onTaskClick?.(item._id)}>
            <Checkbox
              value=""
              isChecked={item.completed}
              onChange={() => onTaskStatusToggle(item._id, !item.completed)}
              size="md">
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>

            <View className="flex flex-col gap-1">
              <Text
                className={`truncate text-lg font-semibold ${item.completed ? 'text-muted-foreground line-through' : ''}`}>
                {item.description}
              </Text>
              <Text
                className={`text-muted-foreground text-md ${item.completed ? 'line-through' : ''}`}>
                {format(new Date(item.expireAt), 'MMM d, yyyy h:mm a')}
              </Text>
            </View>
            <TaskPriorityBadge priority={(item.priority as TaskPriority) ?? 'low'} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
