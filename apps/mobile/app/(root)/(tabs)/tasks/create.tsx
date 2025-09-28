import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Chip } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskPrioritySelector } from "@/components/tasks/TaskPrioritySelector";
import type { ChildTask, TaskPriority } from "@not.ed/shared";
import { useMutation } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { toast } from "sonner-native";

export default function Create() {
	const [description, setDescription] = useState("");
	const [childTasks, setChildTasks] = useState<ChildTask[]>([]);
	const [expireAt, setExpireAt] = useState<Date>(new Date());
	const [taskPriority, setTaskPriority] = useState<TaskPriority>("low");
	const addNewTask = useMutation(api.tasks.createTask);

	const addChildTask = () => {
		console.log("addding...");

		setChildTasks((prev) => [
			...prev,
			{
				title: "",
				completed: false,
			},
		]);
	};
	const updateChildTask = (index: number, title: string) =>
		setChildTasks((prev) =>
			prev.map((task, i) => (i === index ? { ...task, title } : task)),
		);
	const removeChildTask = (index: number) =>
		setChildTasks((prev) => prev.filter((_, i) => i !== index));

	const handleSave = async () => {
		const taskItem = {
			description,
			expireAt,
			childTasks,
			priority: taskPriority,
		};

		console.log("Saving task:", taskItem);

		try {
			await addNewTask({
				description: taskItem.description,
				expireAt: taskItem.expireAt ? taskItem.expireAt.getTime() : Date.now(),
				priority: taskItem.priority,
				childTasks: taskItem.childTasks.length
					? taskItem.childTasks.map((child) => ({
							title: child.title,
							completed: child.completed,
						}))
					: undefined,
			});

			toast.success("Task created successfully!");
			router.back();
		} catch (error) {
			toast.error("Failed to create task. Please try again.");
			console.log("Error creating task:", error);
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
							<Text className="text-lg font-bold text-gray-900">New Task</Text>
							<TouchableOpacity className="w-[20%]"></TouchableOpacity>
						</View>

						{/* Form */}
						<View className="px-4 pt-6 justify-between">
							<View>
								<View className="mb-6">
									<TextInput
										className="rounded-sm py-3  placeholder:text-gray-600 text-3xl h-auto"
										placeholder="Task Description"
										placeholderTextColor="#9CA3AF"
										value={description}
										onChangeText={setDescription}
										multiline
										textAlignVertical="top"
									/>
								</View>
								<View className="mb-6 flex flex-row items-center">
									<Text className="text-gray-900 text-md">Expire&apos;s</Text>
									<DateTimePicker
										mode="datetime"
										value={expireAt}
										onChange={(evt) =>
											setExpireAt(new Date(evt.nativeEvent.timestamp))
										}
										style={{ marginLeft: 0 }}
									/>
								</View>

								{/*------ Task Priority Section ------*/}
								<View className="mb-10 gap-3 flex flex-row items-center">
									<Text className="text-gray-900 text-md">Set Priority</Text>
									<TaskPrioritySelector
										selectedPriority={taskPriority}
										onSelectPriority={setTaskPriority}
									/>
								</View>

								{/*------ Add Child Task Section ------*/}
								<View className="mb-6">
									<Chip variant="secondary" onPress={addChildTask}>
										<Chip.StartContent className="pr-1">
											<Ionicons name="add" size={12} color="#F59E0B" />
										</Chip.StartContent>
										<Chip.LabelContent>{"Add child task"}</Chip.LabelContent>
									</Chip>
								</View>

								<View className="flex flex-col gap-3">
									{childTasks.map((value, index) => (
										<View key={value._id} className="flex-row items-center">
											<TextInput
												className="flex-1 placeholder:text-gray-600 text-xl h-auto min-h-11"
												placeholder={`Child Task #${index + 1}`}
												placeholderTextColor="#9CA3AF"
												value={value.title}
												onChangeText={(text) => updateChildTask(index, text)}
											/>
											<TouchableOpacity
												onPress={() => removeChildTask(index)}
												className="ml-2 px-3 py-2 rounded-sm bg-secondary"
											>
												<Ionicons name="remove" size={18} color="red" />
											</TouchableOpacity>
										</View>
									))}
								</View>
							</View>
						</View>
					</ScrollView>
					<View className="px-4">
						<Button
							onPress={handleSave}
							size="lg"
							className="rounded-4xl bg-[#1c120d]"
						>
							Add Task
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
