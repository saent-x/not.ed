import { Surface } from "heroui-native";
import { Text, View } from "react-native";

export const StatsSection = () => {
  return (
    <View>
      <View className="pt-8">
        <Text className="text-xl font-bold">{"Your Stats"}</Text>
        <View className="pt-5 flex flex-row justify-between">
          <Surface className="bg-[#f2ede8] w-[49%]" variant="none">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">
                Daily Streak
              </Text>
              <Text className="font-extrabold text-2xl">7</Text>
            </View>
          </Surface>
          <Surface className="bg-[#f2ede8] w-[49%]" variant="none">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">
                Journals Written
              </Text>
              <Text className="font-extrabold text-2xl">27</Text>
            </View>
          </Surface>
        </View>

        <View className="pt-2 flex flex-row justify-between">
          <Surface className="bg-[#f2ede8] flex-grow" variant="none">
            <View className="gap-2">
              <Text className="text-lg font-semibold text-foreground">
                Tasks Completed
              </Text>
              <Text className="font-extrabold text-2xl">150</Text>
            </View>
          </Surface>
        </View>
      </View>
    </View>
  );
};
