import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

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
      className={`${className} android:elevation-5 ml-4 mr-4 items-center rounded-lg bg-primary py-4 shadow-md shadow-black/10 ${disabled ? "opacity-70" : ""}`}
      onPress={onPress}
      disabled={disabled}
    >
      <View className="items-center">
        {loading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text className="text-sm font-semibold text-primary">
              Loading...
            </Text>
          </View>
        ) : (
          <Text className="text-sm font-semibold text-primary">{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
