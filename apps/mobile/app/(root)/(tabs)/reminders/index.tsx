import type { ReminderItem } from "@/lib/models";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { FAB } from "@/components/ui/FAB";
import { Spacer } from "@/components/Spacer";
import { ReminderItems } from "@/components/reminders/ReminderItems";
import { router } from "expo-router";

export default function Index() {
	const [selected, setSelected] = useState("");
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		// Simulate an API call or async operation
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	const todayReminders: ReminderItem[] = [
		{
			id: 1,
			title: "Play Basketball",
			date: new Date(),
			frequency: "daily",
			completed: false,
		},
		{
			id: 2,
			title: "Do the laundry",
			date: new Date(),
			frequency: "weekly",
			completed: true,
		},
		{
			id: 3,
			title: "Do Project review",
			date: new Date(),
			frequency: "monthly",
			completed: false,
		},
	];

	return (
		<>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				className="px-5 bg-background"
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
			>
				<View className="flex flex-col gap-12">
					<View className="gap-5">
						<Text className="text-xl font-bold">{"Select Date"}</Text>
						<Calendar
							onDayPress={(day) => {
								setSelected(day.dateString);
							}}
							style={{
								borderRadius: 12,
							}}
							theme={{
								todayBackgroundColor: "#8a705c",
								calendarBackground: "#f2ede8",
								textSectionTitleColor: "#3b3b3b", // weekdays (Mon, Tue...)
								monthTextColor: "#3b3b3b",
								todayTextColor: "white",
								textDisabledColor: "#a8a29e",
								arrowColor: "#3b3b3b",
								dotColor: "#cc9469",
							}}
							markingType="multi-dot"
							markedDates={{
								[selected]: {
									selected: true,
									disableTouchEvent: true,
									dotColor: "#cc9469",
									selectedColor: "#45382e",
								},
							}}
						/>
					</View>
					<View>
						<Text className="text-xl font-bold">{"Today"}</Text>
						<ReminderItems reminders={todayReminders} />
					</View>
				</View>
				<Spacer />
			</ScrollView>
			<FAB
				onPress={() => {
					// Handle add task action
					router.push("/reminders/create");
				}}
			/>
		</>
	);
}
