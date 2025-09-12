import { authClient } from "@/lib/auth-client";
import { router } from "expo-router";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
	return (
		<SafeAreaView>
			<Text> I am Profile </Text>
			<Button
				title="Logout"
				onPress={async () => {
					try {
						await authClient.signOut();
						// Use replace so user can't go back into protected tabs
						router.replace("/(auth)");
					} catch (e) {
						console.warn("Sign out failed", e);
					}
				}}
			/>
		</SafeAreaView>
	);
}
