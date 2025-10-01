import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Checkbox, Chip } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskPrioritySelector } from "@/components/tasks/TaskPrioritySelector";
import type { ChildTask, TaskPriority } from "@not.ed/shared";
import { useMutation, useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { toast } from "sonner-native";
import type { Id } from "@not.ed/backend/convex/_generated/dataModel";
import { frequencyOptions } from "@/lib/util";
import { Picker } from "@react-native-picker/picker";

export default function Edit() {
	const reminderId = useLocalSearchParams().reminder as string;
	const reminder = useQuery(api.reminders.getReminderById, {
		reminderId: reminderId as Id<"reminders">,
	});
	const updateReminder = useMutation(api.reminders.updateReminder);
	const deleteReminder = useMutation(api.reminders.deleteReminder);

	const [title, setTitle] = useState("");
	const [date, setDate] = useState<Date>(new Date());
	const [frequency, setFrequency] = useState("none");
	const [earlyReminder, setEarlyReminder] = useState(false);

	useEffect(() => {
		if (reminder) {
			setTitle(reminder.title);
			setDate(new Date(reminder.date ?? Date.now()));
			setFrequency(reminder.frequency ?? "none");
			setEarlyReminder(reminder.earlyReminder ?? false);
		}
	}, [reminder]);

	const handleEdit = async () => {
		const updatedReminder = {
			reminderId: reminder?._id as Id<"reminders">,
			title: title,
			date: date,
			frequency: frequency,
			earlyReminder: earlyReminder,
		};

		try {
			await updateReminder({
				reminderId: updatedReminder.reminderId as Id<"reminders">,
				title: updatedReminder.title,
				date: updatedReminder.date.getTime(),
				frequency: updatedReminder.frequency,
				earlyReminder: updatedReminder.earlyReminder,
			});

			toast.success("Reminder updated successfully!");
			router.back();
		} catch (error) {
			toast.error("Failed to update reminder. Please try again.");
			console.log("Error updating reminder:", error);
		}
	};

	const handleDelete = async () => {
		try {
			Alert.alert(
				"Delete Reminder",
				"Are you sure you want to delete this reminder?",
				[
					{
						text: "Cancel",
						style: "cancel",
					},
					{
						text: "Confirm",
						onPress: async () => {
							await deleteReminder({
								reminderId: reminderId as Id<"reminders">,
							});
							toast.success("Reminder deleted successfully!");
							router.back();
						},
						style: "default",
					},
				],
			);
		} catch (error) {
			toast.error("Failed to delete child task. Please try again.");
			console.log("Error deleting child task:", error);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<SafeAreaView className="flex-1">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View className="h-full">
					<ScrollView>
						{/* Header */}
						<View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
							<TouchableOpacity className="w-[20%]" onPress={handleCancel}>
								<Text className="text-primary text-base font-medium">
									Cancel
								</Text>
							</TouchableOpacity>
							<Text className="text-lg font-bold text-gray-900">
								Update Reminder
							</Text>
							<TouchableOpacity className="w-[20%]"></TouchableOpacity>
						</View>

						{/* Form */}
						<View className="px-4 pt-6 justify-between">
							<View>
								<View className="mb-6">
									<TextInput
										className="rounded-sm py-3  placeholder:text-gray-600 text-3xl h-auto"
										placeholder="Remind me..."
										placeholderTextColor="#9CA3AF"
										value={title}
										onChangeText={setTitle}
										multiline
										textAlignVertical="top"
									/>
								</View>
								<View className="mb-6 flex flex-row items-center">
									<Text className="text-gray-900 text-md">Date</Text>
									<DateTimePicker
										mode="datetime"
										value={date}
										onChange={(evt) =>
											setDate(new Date(evt.nativeEvent.timestamp))
										}
										style={{ marginLeft: 0 }}
									/>
								</View>

								<View className="mb-10 gap-3 flex flex-row items-center  ">
									<Checkbox
										isSelected={earlyReminder}
										onSelectedChange={setEarlyReminder}
									/>
									<Text className="text-gray-900 text-md">
										Set Early Reminders (optional)
									</Text>
								</View>

								{/*------ Frequency Section ------*/}
								<View className="mb-10 gap-3 flex flex-row items-center  ">
									<Text className="text-gray-900 text-md">Set Frequency</Text>
									<Picker
										selectedValue={frequency}
										onValueChange={setFrequency}
										mode="dialog"
										numberOfLines={1}
										prompt="Select Frequency"
										style={{
											width: 250,
											marginLeft: 10,
											alignSelf: "flex-start",
										}}
									>
										{frequencyOptions.map((option) => (
											<Picker.Item
												key={option.value}
												label={option.label}
												value={option.value}
											/>
										))}
									</Picker>
								</View>
							</View>
						</View>
					</ScrollView>
					<View className="px-4 flex flex-row justify-between mb-4 gap-5">
						<Button
							onPress={handleDelete}
							size="lg"
							variant="danger"
							className="rounded-4xl flex-grow"
						>
							Delete
						</Button>
						<Button
							onPress={handleEdit}
							size="lg"
							className="rounded-4xl bg-[#1c120d] flex-grow"
						>
							Update
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
