import { TaskPriority } from '@/lib/models';
import { FC } from 'react';
import { Text, View } from 'react-native';

type TaskPriorityProps = {
  priority: TaskPriority;
};

type PriorityBadgeProps = {
  badgeColor: string;
  text: string;
};

const PriorityBadge = ({ badgeColor, text }: PriorityBadgeProps) => {
  return (
    <View className="flex h-10 flex-grow flex-row items-center justify-end">
      <View
        className="mr-1 h-9 rounded-full border-l-4"
        style={{
          backgroundColor: badgeColor,
          borderLeftColor: badgeColor,
        }}
      />
      <Text className="text-sm font-extrabold" style={{ color: badgeColor }}>
        {text}
      </Text>
    </View>
  );
};

export const TaskPriorityBadge: FC<TaskPriorityProps> = ({ priority }) => {
  if (priority === 'high') {
    return <PriorityBadge badgeColor="#f5a623" text="High" />;
  } else if (priority === 'medium') {
    return <PriorityBadge badgeColor="#f8d7da" text="Medium" />;
  } else if (priority === 'low') {
    return <PriorityBadge badgeColor="#a0aec0" text="Low" />;
  } else {
    return <PriorityBadge badgeColor="#9E9E9E" text="Low" />;
  }
};
