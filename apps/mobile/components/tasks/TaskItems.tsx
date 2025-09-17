import { TaskItem } from "@/lib/models";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "heroui-native";

type TaskItemsProps = {
  tasks: TaskItem[];
};

export const TaskItems = ({ tasks }: TaskItemsProps) => {
  return (
    <View className="pt-5 flex gap-8">
      {tasks.map((item) => (
        <View key={item.id}>
          <TouchableOpacity
            key={item.id}
            className="flex flex-row items-center gap-4"
          >
            <Checkbox isSelected={item.completed} onSelectedChange={() => {}} />

            <View className="flex flex-col gap-1">
              <Text
                className={`text-lg font-semibold truncate ${item.completed ? "line-through" : ""}`}
              >
                {item.title}
              </Text>
              <Text
                className={`text-muted-foreground text-md ${item.completed ? "line-through" : ""}`}
              >
                {item.expireAt}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
