import { days } from "@/lib/util";
import { Text, View } from "react-native";

type ReminderDayProps = {
  date: Date;
};

const ReminderDay = ({ date }: ReminderDayProps) => {
  return (
    <View className="flex flex-row flex-grow justify-end">
      <View className="flex flex-col items-center rounded-sm shadow-black bg-[#1c120d] p-2">
        <Text className="textmd font-bold text-yellow-600">{days[date.getDay()]}</Text>
        <Text className="text-md text-white font-bold">{date.getDate()}</Text>
      </View>
    </View>
  );
};

export default ReminderDay;
