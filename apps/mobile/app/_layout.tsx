import { Stack } from "expo-router";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import { useColorScheme } from "react-native";

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl) {
	throw new Error("Missing EXPO_PUBLIC_CONVEX_URL environment variable");
}
const convex = new ConvexReactClient(convexUrl, {
	unsavedChangesWarning: false,
});

export default function RootLayout() {
	const theme = useColorScheme();
	return (
		<ConvexBetterAuthProvider client={convex} authClient={authClient}>
			<GestureHandlerRootView>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(auth)"
						options={{
							headerShown: false,
						}}
					/>
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
				</Stack>
				<Toaster />
			</GestureHandlerRootView>
		</ConvexBetterAuthProvider>
	);
}
