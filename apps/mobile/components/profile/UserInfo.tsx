import { View, Text } from "react-native";

interface UserInfoProps {
	name: string;
	role: string;
	joinDate: string;
}

export function UserInfo({ name, role, joinDate }: UserInfoProps) {
	return (
		<View className="items-center mt-4">
			<Text className="text-2xl font-bold text-gray-900 mb-1">{name}</Text>
			<Text className="text-base text-tertiary mb-1">{role}</Text>
			<Text className="text-sm text-tertiary">Joined {joinDate}</Text>
		</View>
	);
}
