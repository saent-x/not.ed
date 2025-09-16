import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useConvexAuth } from "convex/react";

export default function RootLayout() {
  const theme = useColorScheme();
  const { isAuthenticated } = useConvexAuth();

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
            headerShown: false,
            headerLargeTitle: true,
            headerTransparent: true,
            headerTintColor: theme === "dark" ? "white" : "black",
            headerLargeStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
