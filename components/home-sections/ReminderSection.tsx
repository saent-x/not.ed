import { ReminderItem } from '@/shared';
import { formatDate } from '@/lib/util';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

type ReminderSectionProps = {
  reminders: ReminderItem[];
};

export const ReminderSection = ({ reminders }: ReminderSectionProps) => {
  return (
    <View className="pt-12">
      <Text className="text-xl font-bold">{'Upcoming Reminders'}</Text>
      <View className="flex gap-4 pt-5">
        {reminders.map((item) => (
          <TouchableOpacity key={item._id} className="flex flex-row items-center gap-4">
            <View className="h-18 w-18 flex items-center p-3 rounded-md justify-center bg-[#f2ede8]">
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={28} />
            </View>

            <View className="flex flex-col gap-1">
              <Text className="text-md">{item.title}</Text>
              <Text className="text-gray-500 text-md">
                {formatDate(new Date(item.date))}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
