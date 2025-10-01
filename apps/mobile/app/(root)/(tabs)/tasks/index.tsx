import { TaskItems } from "@/components/tasks/TaskItems";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { FAB } from "@/components/ui/FAB";
import { Spacer } from "@/components/Spacer";
import { router } from "expo-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { formatISO } from "date-fns";

export default function Index() {
	const [selectedDate, setSelectedDate] = useState<number>(Date.now());
	const [refreshing, setRefreshing] = useState(false);
	const toggleCompletion = useMutation(
		api.tasks.toggleTaskCompletion,
	).withOptimisticUpdate((localStore, args) => {
		// Optimistically update the task's completion status in the local store
		const { taskId, completed } = args;
		const tasks = localStore.getQuery(api.tasks.getTasksByDate, {
			day: selectedDate,
		});

		if (tasks !== undefined) {
			localStore.setQuery(
				api.tasks.getTasksByDate,
				{ day: selectedDate },
				tasks.map((task) => {
					if (task._id === taskId) {
						return { ...task, completed };
					}
					return task;
				}),
			);
		}
	});

	const onRefresh = () => {
		setRefreshing(true);
		// Simulate an API call or async operation
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	const todayTasks = useQuery(api.tasks.getTasksByDate, {
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
							current={formatISO(new Date(selectedDate), {
								representation: "date",
							})}
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
						{todayTasks && (
							<TaskItems
								onTaskStatusToggle={(taskId, completed) =>
									toggleCompletion({ taskId, completed })
								}
								onTaskClick={(taskId) => router.push(`/tasks/${taskId}`)}
								tasks={todayTasks}
							/>
						)}
					</View>
				</View>
				<Spacer />
			</ScrollView>
			<FAB
				onPress={() => {
					router.push("/tasks/create");
				}}
			/>
		</>
	);
}
