import { Stack } from "expo-router";
import { Image, useColorScheme, View } from "react-native";
import { useConvexAuth } from "convex/react";
import LoadingScreen from "@/components/LoadingScreen";
import { useQuery } from "convex/react";
import { Avatar, Surface } from "heroui-native";
import { getInitials } from "@/lib/util";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  const theme = useColorScheme();
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerTitle: "not.ed",
            headerBackVisible: true,
            headerTransparent: true,
            headerLeft: () => (
              <Image
                className="h-10 w-10"
                source={require("../../assets/dog.png")}
              />
            ),
            headerRight: () => (
              <View className="h-10 w-10 flex flex-row items-center justify-center">
                <Ionicons name="settings-outline" size={24} color="black" />
              </View>
            ),
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
