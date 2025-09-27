import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SettingsItemProps {
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	type: "toggle" | "navigation" | "selection";
	value?: boolean | string;
	onPress?: () => void;
	onToggle?: (value: boolean) => void;
}

export function SettingsItem({
	icon,
	title,
	type,
	value,
	onPress,
	onToggle,
}: SettingsItemProps) {
	const renderRightElement = () => {
		switch (type) {
			case "toggle":
				return (
					<Switch
						value={value as boolean}
						onValueChange={onToggle}
						trackColor={{ false: "#E5E7EB", true: "#F59E0B" }}
						thumbColor={value ? "#FFFFFF" : "#FFFFFF"}
					/>
				);
			case "selection":
				return (
					<View className="flex-row items-center">
						<Text className="text-tertiary text-sm mr-2">
							{value as string}
						</Text>
						<Ionicons name="chevron-forward" size={16} color="#8a705c" />
					</View>
				);
			case "navigation":
				return <Ionicons name="chevron-forward" size={16} color="#8a705c" />;
			default:
				return null;
		}
	};

	return (
		<TouchableOpacity
			className="flex-row items-center py-4 px-1"
			onPress={onPress}
			disabled={type === "toggle"}
		>
			<View className="w-8 items-center mr-4">
				<Ionicons name={icon} size={20} color="#8a705c" />
			</View>
			<Text className="flex-1 text-base text-gray-900">{title}</Text>
			{renderRightElement()}
		</TouchableOpacity>
	);
}
