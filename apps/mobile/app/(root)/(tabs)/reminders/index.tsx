import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { FAB } from "@/components/ui/FAB";
import { Spacer } from "@/components/Spacer";
import { router } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { formatISO } from "date-fns";
import { ReminderItems } from "@/components/reminders/ReminderItems";

export default function Index() {
	const [selectedDate, setSelectedDate] = useState<number>(Date.now());
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = () => {
		setRefreshing(true);
		// Simulate an API call or async operation
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	const todayReminders = useQuery(api.reminders.getRemindersByDate, {
		day: selectedDate,
	});

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
								setSelectedDate(day.timestamp);
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
								[formatISO(new Date(selectedDate), {
									representation: "date",
								})]: {
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
						{todayReminders && <ReminderItems reminders={todayReminders} />}
					</View>
				</View>
				<Spacer />
			</ScrollView>
			<FAB
				onPress={() => {
					router.push("/reminders/create");
				}}
			/>
		</>
	);
}
