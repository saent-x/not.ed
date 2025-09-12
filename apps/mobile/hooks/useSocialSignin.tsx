import { useCallback, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { authClient } from "@not.ed/mobile/lib/auth-client";
import { toast } from "sonner-native";
import { router } from "expo-router";

export type SocialProvider = "google" | "microsoft" | "github";
export type SocialAuthStatus =
	| "idle"
	| "launching"
	| "dismissed"
	| "success"
	| "error";

interface UseSocialSigninResult {
	status: SocialAuthStatus;
	signingIn: boolean;
	signInWith: (provider: SocialProvider) => Promise<void>;
	reset: () => void;
}

export function useSocialSignin(): UseSocialSigninResult {
	const [status, setStatus] = useState<SocialAuthStatus>("idle");
	const [signingIn, setSigningIn] = useState(false);

	const reset = useCallback(() => {
		setStatus("idle");
		setSigningIn(false);
	}, []);

	const signInWith = useCallback(
		async (provider: SocialProvider) => {
			if (signingIn) return;
			setSigningIn(true);
			setStatus("launching");
			try {
				const { data, error } = await authClient.signIn.social({
					provider,
					disableRedirect: true,
				});
				if (error) throw error;
				if (!data?.url) throw new Error("No social auth URL returned");

				const redirectUri = AuthSession.makeRedirectUri({});
				const authUrl = data.url.includes("redirect_uri=")
					? data.url
					: `${data.url}${data.url.includes("?") ? "&" : "?"}redirect_uri=${encodeURIComponent(redirectUri)}`;

				const result = await WebBrowser.openAuthSessionAsync(
					authUrl,
					AuthSession.makeRedirectUri({}),
				);

				if (result.type === "success") {
					setStatus("success");
					toast.success("Success!", {
						id: "social-signin",
						style: { backgroundColor: "white" },
						description: "Logged in successfully.",
						duration: 6000,
						icon: <Ionicons name="checkmark-circle" size={24} color="black" />,
					});
					router.replace("/(tabs)");
				} else if (result.type === "dismiss" || result.type === "cancel") {
					setStatus("dismissed");
					toast("Cancelled", {
						description: "You closed the sign-in window.",
					});
				} else {
					setStatus("error");
					toast.error("Unexpected result", {
						description: result.type,
					});
				}
			} catch (err) {
				console.error("Social sign-in error:", err);
				setStatus("error");
				toast.error("Operation failed!", {
					style: { backgroundColor: "white" },
					description:
						err instanceof Error ? err.message : "Social login failed",
					duration: 6000,
					icon: <Ionicons name="alert-circle" size={24} color="black" />,
				});
			} finally {
				setSigningIn(false);
			}
		},
		[signingIn],
	);

	return { status, signingIn, signInWith, reset };
}
