import { TaskPriority } from "@/lib/models";
import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TaskPrioritySelectorProps = {
  selectedPriority: TaskPriority;
  onSelectPriority: (priority: TaskPriority) => void;
};

const priorityColors: Record<TaskPriority, string> = {
  low: "#93c5fd", // light blue
  medium: "#fbbf24", // yellow
  high: "#ef4444", // red
};

const priorityIcons: Record<TaskPriority, keyof typeof Ionicons.glyphMap> = {
  low: "flag-outline",
  medium: "flag",
  high: "warning",
};

const PriorityOption: FC<{
  priority: TaskPriority;
  isSelected: boolean;
  onPress: () => void;
}> = ({ priority, isSelected, onPress }) => {
  const color = priorityColors[priority];
  const iconName = priorityIcons[priority];
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-12 h-12 rounded-sm items-center justify-center mr-4 border-2 ${
        isSelected ? "" : "bg-white"
      }`}
      style={{
        backgroundColor: isSelected ? color : "white",
        borderColor: color,
      }}
    >
      <Ionicons
        name={iconName}
        size={20}
        color={isSelected ? "white" : color}
      />
    </TouchableOpacity>
  );
};

export const TaskPrioritySelector: FC<TaskPrioritySelectorProps> = ({
  selectedPriority,
  onSelectPriority,
}) => {
  return (
    <View className="flex-row items-center">
      <PriorityOption
        priority="low"
        isSelected={selectedPriority === "low"}
        onPress={() => onSelectPriority("low")}
      />
      <PriorityOption
        priority="medium"
        isSelected={selectedPriority === "medium"}
        onPress={() => onSelectPriority("medium")}
      />
      <PriorityOption
        priority="high"
        isSelected={selectedPriority === "high"}
        onPress={() => onSelectPriority("high")}
      />
    </View>
  );
};
