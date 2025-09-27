import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "heroui-native";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import type { TaskItem, TaskPriority } from "@not.ed/shared";
import { format } from "date-fns";
import type { Id } from "@not.ed/backend/convex/_generated/dataModel";

type TaskItemsProps = {
	tasks: TaskItem[];
	onTaskStatusToggle: (taskId: Id<"tasks">, completed: boolean) => void;
	onTaskClick?: (taskId: Id<"tasks">) => void;
};

export const TaskItems = ({ tasks, onTaskStatusToggle, onTaskClick }: TaskItemsProps) => {
	return (
		<View className="pt-5 flex gap-8">
			{tasks.map((item) => (
				<View key={item._id}>
					<TouchableOpacity className="flex flex-row items-center gap-4" onPress={() => onTaskClick?.(item._id)}>
						<Checkbox
							isSelected={item.completed}
							color="success"
							onSelectedChange={() =>
								onTaskStatusToggle(item._id, !item.completed)
							}
						/>

						<View className="flex flex-col gap-1">
							<Text
								className={`text-lg font-semibold truncate ${item.completed ? "line-through text-muted-foreground" : ""}`}
							>
								{item.description}
							</Text>
							<Text
								className={`text-muted-foreground text-md ${item.completed ? "line-through text-muted-foreground" : ""}`}
							>
								{format(new Date(item.expireAt ?? 0), "MMM d, yyyy h:mm a")}
							</Text>
						</View>
						<TaskPriorityBadge
							priority={(item.priority as TaskPriority) ?? "low"}
						/>
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
};
