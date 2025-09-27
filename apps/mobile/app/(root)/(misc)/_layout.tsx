import { Stack } from "expo-router";

export default function MiscLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
    </Stack>
  );
}
