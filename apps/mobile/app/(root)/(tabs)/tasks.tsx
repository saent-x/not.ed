import { TaskItems } from "@/components/tasks/TaskItems";
import { TaskItem } from "@/lib/models";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function Day() {
  const [selected, setSelected] = useState("");
  
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate an API call or async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const todayTasks: TaskItem[] = [
    {
      id: 1,
      title: "Meeting with Ethan",
      completed: false,
      expireAt: "10:00AM",
    },
    {
      id: 2,
      title: "Lunch with Benita",
      completed: false,
      expireAt: "07:00AM",
    },
    {
      id: 3,
      title: "Project Review",
      completed: true,
      expireAt: "03:00PM",
    },
  ];

  const tomorrowTasks: TaskItem[] = [
    {
      id: 1,
      title: "Team Standup",
      completed: true,
      expireAt: "09:00AM",
    },
    {
      id: 2,
      title: "Client Presentation",
      completed: false,
      expireAt: "11:00AM",
    },
  ];
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } className="p-5 bg-background h-full">
      <View className="flex flex-col gap-12">
        <View>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                // selectedDotColor: "orange",
              },
            }}
          />
        </View>
        <View>
          <Text className="text-xl font-bold">{"Today"}</Text>
          <TaskItems tasks={todayTasks} />
        </View>
        <View>
          <Text className="text-xl font-bold">{"Tomorrow"}</Text>
          <TaskItems tasks={tomorrowTasks} />
        </View>
      </View>
    </ScrollView>
  );
}
