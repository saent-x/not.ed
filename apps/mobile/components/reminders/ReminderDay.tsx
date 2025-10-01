import { days } from "@/lib/util";
import { Text, View } from "react-native";

type ReminderDayProps = {
  date: number;
};

const ReminderDay = ({ date }: ReminderDayProps) => {
  const dateObj = new Date(date);
  
  return (
    <View className="flex flex-row flex-grow justify-end">
      <View className="flex flex-col items-center rounded-sm shadow-black bg-yellow-600 p-2">
        <Text className="text-md font-extrabold text-black">{days[dateObj.getDay()]}</Text>
        <Text className="text-md text-white font-bold">{dateObj.getDate()}</Text>
      </View>
    </View>
  );
};

export default ReminderDay;
