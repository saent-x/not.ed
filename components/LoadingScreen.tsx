import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
  return (
    <View className="bg-primary flex-1 items-center justify-center">
      <View className="bg-primary rounded-full p-5">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
}
