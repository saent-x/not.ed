import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface AuthButtonProps {
  title: string;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  loading,
  onPress,
  disabled,
  className,
}) => {
  return (
    <TouchableOpacity
      className={`${className} android:elevation-5 bg-primary ml-4 mr-4 items-center rounded-lg py-4 shadow-md shadow-black/10 ${disabled ? 'opacity-70' : ''}`}
      onPress={onPress}
      disabled={disabled}>
      <View className="items-center">
        {loading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text className="text-primary text-sm font-semibold">Loading...</Text>
          </View>
        ) : (
          <Text className="text-primary text-sm font-semibold">{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
