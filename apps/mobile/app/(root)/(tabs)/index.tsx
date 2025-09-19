import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { useState } from "react";
import { StatsSection } from "@/components/home-sections/StatsSection";
import { ReminderSection } from "@/components/home-sections/ReminderSection";
import { JournalSection } from "@/components/home-sections/JournalSection";
import { JournalEntry, Reminder } from "@/lib/models";

export default function Todos() {
  const user = useQuery(api.users.getCurrentUser);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate an API call or async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const reminders: Reminder[] = [
    {
      id: 1,
      icon: "cart-outline",
      title: "Grocery Shopping",
      date: "Tomorrow, 9:00AM",
    },
    {
      id: 2,
      icon: "medkit-outline",
      title: "Doctor's Appointment",
      date: "Tomorrow, 12:00PM",
    },
  ];

  const journalEntries: JournalEntry[] = [
    {
      id: 1,
      icon: "cart-outline",
      title: "Examination of Conscience for the Day",
      date: "September 12, 2025",
    },
    {
      id: 2,
      icon: "medkit-outline",
      title: "Reflections on the Week",
      date: "September 20, 2025",
    },
  ];

  return (
    /*---------------------- Header Section ------------------------*/
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      className="p-5 h-full bg-background"
    >
      {user && (
        <View className="flex flex-row justify-end">
          <Text className="text-3xl font-extrabold">{`Hello, ${user?.name} 👋🏽`}</Text>
        </View>
      )}
      <StatsSection />
      <ReminderSection reminders={reminders} />
      <JournalSection journalEntries={journalEntries} />

      {/*---------------------- Some Space ------------------------*/}
      <View className="mt-10" />
    </ScrollView>
  );
}
