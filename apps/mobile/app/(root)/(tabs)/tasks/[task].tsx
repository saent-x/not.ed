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
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Checkbox, Chip } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskPrioritySelector } from "@/components/tasks/TaskPrioritySelector";
import type { ChildTask, TaskPriority } from "@not.ed/shared";
import { useMutation, useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { toast } from "sonner-native";
import { Id } from "@not.ed/backend/convex/_generated/dataModel";

export default function Edit() {
	const [description, setDescription] = useState("");
	const [childTasks, setChildTasks] = useState<ChildTask[]>([]);
	const [expireAt, setExpireAt] = useState<Date>(new Date());
	const [taskPriority, setTaskPriority] = useState<TaskPriority>("low");

	const taskId = useLocalSearchParams().task as string;
	const task = useQuery(api.tasks.getTaskById, {
		taskId: taskId as Id<"tasks">,
	});

	console.log("Editing task with ID:", taskId);

	const addChildTask = () => {
		console.log("addding...");

		setChildTasks((prev) => [
			...prev,
			{
				_id: Date.now() + prev.length,
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

	const handleEdit = async () => {};

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
										value={task?.description}
										onChangeText={setDescription}
										multiline
										textAlignVertical="top"
									/>
								</View>
								<View className="mb-6 flex flex-row items-center">
									<Text className="text-gray-900 text-md">Expire&apos;s</Text>
									<DateTimePicker
										mode="datetime"
										value={new Date(task?.expireAt ?? 0)}
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
										selectedPriority={task?.priority as TaskPriority}
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
									{task?.childTasks?.map((value, index) => (
										<View
											key={value?._id}
											className="flex-row gap-3 p-2 rounded-md bg-white items-center"
										>
											<Checkbox />
											<TextInput
												className="flex-1 p-0 placeholder:text-gray-600 text-lg h-auto "
												placeholder={`Child Task #${index + 1}`}
												placeholderTextColor="#9CA3AF"
												value={value?.title}
												multiline
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
							onPress={handleEdit}
							size="lg"
							className="rounded-4xl bg-[#1c120d]"
						>
							Update Task
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
