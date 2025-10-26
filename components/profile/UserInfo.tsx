import { View, Text } from 'react-native';

interface UserInfoProps {
  name: string;
  role: string;
  joinDate: string;
}

export function UserInfo({ name, role, joinDate }: UserInfoProps) {
  return (
    <View className="mt-4 items-center">
      <Text className="mb-1 text-2xl font-bold text-gray-900">{name}</Text>
      <Text className="text-tertiary mb-1 text-base">{role}</Text>
      <Text className="text-tertiary text-sm">Joined {joinDate}</Text>
    </View>
  );
}
