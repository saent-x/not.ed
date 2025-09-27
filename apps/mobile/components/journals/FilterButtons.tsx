import type { FC } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FilterButtonProps {
	label: string;
	onPress: () => void;
	isActive?: boolean;
}

const FilterButton: FC<FilterButtonProps> = ({
	label,
	onPress,
	isActive = false,
}) => {
	return (
		<TouchableOpacity
			className={`flex-row items-center px-2 py-1 rounded-sm bg-primary text-white`}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<Text
				className={`text-sm font-medium mr-1 text-white`}
			>
				{label}
			</Text>
			<Ionicons
				name="chevron-down"
				size={16}
				color={"white"}
			/>
		</TouchableOpacity>
	);
};

interface FilterButtonsProps {
	onDatePress: () => void;
	onTagsPress: () => void;
	onSortPress: () => void;
	activeFilter?: "date" | "tags" | "sort";
	className?: string;
}

export const FilterButtons: FC<FilterButtonsProps> = ({
	onDatePress,
	onTagsPress,
	onSortPress,
	activeFilter,
	className = "",
}) => {
	return (
		<View className={`flex-row gap-3 ${className}`}>
			<FilterButton
				label="Date"
				onPress={onDatePress}
				isActive={activeFilter === "date"}
			/>
			<FilterButton
				label="Tags"
				onPress={onTagsPress}
				isActive={activeFilter === "tags"}
			/>
			<FilterButton
				label="Sort"
				onPress={onSortPress}
				isActive={activeFilter === "sort"}
			/>
		</View>
	);
};
