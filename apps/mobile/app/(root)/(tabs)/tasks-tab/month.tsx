import { Text, ScrollView, View } from "react-native";
import { TaskItems } from "@/components/tasks/TaskItems";
import { TaskItem } from "@/lib/models";

export default function Month() {
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
    <ScrollView className="p-5 bg-background h-full">
      <View className="flex flex-col gap-12">
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
