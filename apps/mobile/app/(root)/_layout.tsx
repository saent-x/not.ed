import { router, Stack } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { useConvexAuth } from "convex/react";
import LoadingScreen from "@/components/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
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
              <Pressable onPress={() => router.push("/profile")}>
                <Image
                  className="h-10 w-10"
                  source={require("../../assets/dog.png")}
                />
              </Pressable>
            ),
            // headerRight: () => (
            //   <Pressable onPress={() => router.push("/settings")}>
            //     <View className="h-10 w-10 flex flex-row items-center justify-center">
            //       <Ionicons name="settings-outline" size={24} color="black" />
            //     </View>
            //   </Pressable>
            // ),
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen
          name="(misc)"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
