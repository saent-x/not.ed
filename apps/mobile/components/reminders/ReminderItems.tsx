import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "heroui-native";
import ReminderDay from "./ReminderDay";
import type { ReminderItem } from "@not.ed/shared";
import { format } from "date-fns";

type ReminderItemsProps = {
	reminders: ReminderItem[];
	onReminderClick: (reminderId: string) => void;
};

export const ReminderItems = ({
	reminders: tasks,
	onReminderClick,
}: ReminderItemsProps) => {
	return (
		<View className="pt-5 flex gap-8">
			{tasks.map((item) => (
				<View key={item._id}>
					<TouchableOpacity
						key={item._id}
						className="flex flex-row items-center gap-4"
						onPress={() => onReminderClick(item._id)}
					>
						<Checkbox
							isSelected={item.completed}
							color="success"
							onSelectedChange={() => {}}
						/>

						<View className="flex flex-col gap-1 flex-grow">
							<Text
								className={`text-lg truncate font-semibold ${item.completed ? "line-through text-muted-foreground" : ""}`}
							>
								{item.title}
							</Text>
							<Text
								className={`text-muted-foreground truncate text-md ${item.completed ? "line-through" : ""}`}
							>
								{`${format(new Date(item.date ?? 0), "MMM d, yyyy h:mm a")} • `}
								<Text>
									{typeof item.frequency === "string" ? (
										<Text
											className={`font-bold uppercase ${item.completed ? "line-through text-muted-foreground" : "text-yellow-600"}`}
										>
											{item.frequency}
										</Text>
									) : (
										""
									)}
								</Text>
							</Text>
						</View>
						<ReminderDay date={item.date ?? 0} />
					</TouchableOpacity>
				</View>
			))}
		</View>
	);
};
