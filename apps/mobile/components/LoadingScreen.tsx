import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingScreen() {
  return (
    <View className="flex-1 bg-primary justify-center items-center">
      <View className="bg-primary rounded-full p-5">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
}
