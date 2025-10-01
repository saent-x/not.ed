import { Stack } from "expo-router";

export default function Layout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="create"
				options={{
					presentation: "modal",
				}}
			/>
			<Stack.Screen
				name="[reminder]"
				options={{
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}
