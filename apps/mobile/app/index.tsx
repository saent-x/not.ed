import SignIn from "@/components/auth/signin";
import LoadingScreen from "@/components/LoadingScreen";
import { useConvexAuth } from "convex/react";
import { Redirect } from "expo-router";

export default function Index() {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (isAuthenticated) {
		return <Redirect href="/(tabs)" />;
	}

	return <Redirect href="/(auth)" />;
}
