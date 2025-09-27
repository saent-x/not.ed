import type { FC } from "react";
import { TouchableOpacity, Text, View } from "react-native";

export interface JournalEntry {
	id: string;
	title: string;
	description: string;
	tag: string;
	timestamp: string;
}

interface JournalCardProps {
	entry: JournalEntry;
	onPress?: (entry: JournalEntry) => void;
	className?: string;
}

export const JournalCard: FC<JournalCardProps> = ({
	entry,
	onPress,
	className = "",
}) => {
	const handlePress = () => {
		onPress?.(entry);
	};

	return (
		<TouchableOpacity
			className={`bg-secondary rounded-sm p-4 ${className}`}
			onPress={handlePress}
			activeOpacity={1}
		>
			<View className="mb-2">
				<Text className="text-lg font-bold text-gray-900 mb-1">
					{entry.title}
				</Text>
				<Text className="text-base text-gray-600 leading-5">
					{entry.description}
				</Text>
			</View>

			<View className="flex-row justify-between items-center">
				<View className="bg-gray-200 px-3 py-1 rounded-full">
					<Text className="text-sm font-medium text-gray-700">{entry.tag}</Text>
				</View>
				<Text className="text-sm font-bold text-gray-500">{entry.timestamp}</Text>
			</View>
		</TouchableOpacity>
	);
};
