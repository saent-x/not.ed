import { api } from '@/convex/_generated/api';
import { Text, View } from 'react-native';

export const StatsSection = () => {
  const dailyStreak = 0; // Placeholder value
  // const totalJournals = useQuery(api.)
  return (
    <View>
      <View className="pt-3">
        <View className="flex flex-row justify-between pt-5">
          <View className="w-[49%] bg-[#f2ede8] p-5 rounded-md">
            <View className="gap-2">
              <Text className="text-foreground text-lg font-semibold">Daily Streak</Text>
              <Text className="text-2xl font-extrabold">7</Text>
            </View>
          </View>
          <View className="w-[49%] bg-[#f2ede8] p-5 rounded-md">
            <View className="gap-2">
              <Text className="text-foreground text-lg font-semibold">Journals Written</Text>
              <Text className="text-2xl font-extrabold">27</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-between pt-2">
          <View className="flex-grow bg-[#f2ede8] p-5 rounded-md">
            <View className="gap-2">
              <Text className="text-foreground text-lg font-semibold">Tasks Completed</Text>
              <Text className="text-2xl font-extrabold">150</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
