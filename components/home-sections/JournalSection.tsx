import { JournalEntry } from '@/shared';
import { formatDate } from '@/lib/util';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

type JournalEntrySectionProps = {
  journalEntries: JournalEntry[];
};

export const JournalSection = ({ journalEntries }: JournalEntrySectionProps) => {
  return (
    <View className="pt-12">
      <Text className="text-xl font-bold">{'Recent Journal Entries'}</Text>
      <View className="flex gap-4 pt-5">
        {journalEntries.map((item) => (
          <TouchableOpacity key={item._id} className="flex flex-row items-center gap-4">
            <View className="h-18 w-18 flex items-center justify-center rounded-md bg-[#f2ede8] p-3">
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={28} />
            </View>

            <View className="flex flex-col gap-1">
              <Text className="text-md truncate">{item.title}</Text>
              <Text className="text-md text-gray-500">{formatDate(new Date(item.date))}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
