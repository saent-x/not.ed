import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { AuthTextInput } from "@/components/auth/AuthTextInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { toast } from "sonner-native";
import { useState } from "react";
import { router } from "expo-router";

interface ForgotForm {
	email: string;
}

export default function ForgotPasswordScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotForm>({
		defaultValues: { email: "" },
	});
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [oldPassword, setOldPassword] = useState("");

	const onSubmit = async ({ email }: ForgotForm) => {
		setLoading(true);
		try {
			const res = await authClient.requestPasswordReset({
				email,
			});
			if (res) {
				setSent(true);
				toast.success("Email sent", {
					description: "Check your inbox for reset link.",
				});
			} else {
				toast.error("Unable to send reset");
			}
		} catch (e) {
			console.error(e);
			toast.error("Error", {
				description: e instanceof Error ? e.message : "Unknown error",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className="bg-background h-full">
			<View className="mt-12 mb-6 items-center">
				<Ionicons name="lock-closed" size={46} color="#cc9469" />
				<Text className="mt-4 text-2xl font-bold text-primary">
					Forgot Password
				</Text>
				<Text className="mx-8 mt-2 text-center text-secondary">
					Enter the email associated with your account and we'll send you a
					reset link.
				</Text>
			</View>
			{!sent ? (
				<>
					<AuthTextInput
						name="email"
						control={control}
						placeholder="Email"
						leftIcon="mail-outline"
						keyboardType="email-address"
						autoComplete="email"
						rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
						error={errors.email}
					/>
					<AuthButton
						title="Send Reset Link"
						loading={loading}
						disabled={loading}
						onPress={handleSubmit(onSubmit)}
					/>
				</>
			) : (
				<View className="mx-6 mt-4 rounded-lg border border-primary/30 bg-secondary p-4">
					<Text className="text-sm text-secondary">
						If an account exists for that email, a reset link has been sent. You
						can close this screen.
					</Text>
				</View>
			)}
			<TouchableOpacity
				className="mt-8 items-center"
				onPress={() => {
					router.back();
				}}
			>
				<Text className="text-sm font-medium text-secondary">
					Back to Sign In
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
