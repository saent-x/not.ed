import { ReminderItem, TaskItem } from "@/lib/models";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "heroui-native";
import ReminderDay from "./ReminderDay";
import { capitalize, formatDate } from "@/lib/util";

type ReminderItemsProps = {
	reminders: ReminderItem[];
};

export const ReminderItems = ({ reminders: tasks }: ReminderItemsProps) => {
	return (
		<View className="pt-5 flex gap-8">
			{tasks.map((item) => (
				<View key={item.id}>
					<TouchableOpacity
						key={item.id}
						className="flex flex-row items-center gap-4"
					>
						<Checkbox
							isSelected={item.completed}
							color="success"
							onSelectedChange={() => {}}
						/>

						<View className="flex flex-col gap-1">
							<Text
								className={`text-lg truncate font-semibold ${item.completed ? "line-through" : ""}`}
							>
								{item.title}
							</Text>
							<Text
								className={`text-muted-foreground truncate text-md ${item.completed ? "line-through" : ""}`}
							>
								{`${formatDate(item.date)} | `}
								<Text>
									{typeof item.frequency === "string" ? (
										<Text className="font-bold text-yellow-600">
											{capitalize(item.frequency)}
										</Text>
									) : (
										""
									)}{" "}
									🔔
								</Text>
							</Text>
						</View>
						<ReminderDay date={item.date} />
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
};
