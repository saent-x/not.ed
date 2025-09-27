import { View, Text } from "react-native";
import { SettingsItem } from "./SettingsItem";

interface Setting {
	id: string;
	icon: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;
	title: string;
	type: "toggle" | "navigation" | "selection";
	value?: boolean | string;
}

interface SettingsSectionProps {
	title: string;
	settings: Setting[];
	onSettingPress?: (settingId: string) => void;
	onSettingToggle?: (settingId: string, value: boolean) => void;
}

export function SettingsSection({
	title,
	settings,
	onSettingPress,
	onSettingToggle,
}: SettingsSectionProps) {
	return (
		<View className="mt-8">
			<Text className="text-lg font-bold text-gray-900 mb-4 px-1">{title}</Text>
			<View className="bg-white rounded-lg">
				{settings.map((setting, index) => (
					<View key={setting.id}>
						<SettingsItem
							icon={setting.icon}
							title={setting.title}
							type={setting.type}
							value={setting.value}
							onPress={() => onSettingPress?.(setting.id)}
							onToggle={(value) => onSettingToggle?.(setting.id, value)}
						/>
						{index < settings.length - 1 && (
							<View className="h-px bg-gray-200 ml-12" />
						)}
					</View>
				))}
			</View>
		</View>
	);
}
