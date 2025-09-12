import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { AuthTextInput } from "@/components/auth/AuthTextInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { authClient } from "@/lib/auth-client";
import { Ionicons } from "@expo/vector-icons";
import { toast } from "sonner-native";
import { useState } from "react";

interface SignUpForm {
	email: string;
	password: string;
	name: string;
}

export default function SignUpScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpForm>({
		defaultValues: { email: "", password: "", name: "" },
	});
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async ({ email, password, name }: SignUpForm) => {
		setLoading(true);
		try {
			const res = await authClient.signUp.email({
				email,
				password,
				name,
			});
			if (res.data) {
				toast.success("Account created", {
					description: "Check your email to verify.",
				});
			} else {
				toast.error("Sign up failed");
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
				<Ionicons name="person-add" size={46} color="#cc9469" />
				<Text className="mt-4 text-2xl font-bold text-primary">
					Create Account
				</Text>
				<Text className="mx-8 mt-2 text-center text-secondary">
					Fill in the details below to get started.
				</Text>
			</View>
			<AuthTextInput<SignUpForm>
				name="name"
				control={control}
				placeholder="Name"
				leftIcon="person-outline"
				rules={{ required: true, minLength: 2 }}
				error={errors.name}
				autoCapitalize="words"
			/>
			<AuthTextInput<SignUpForm>
				name="email"
				control={control}
				placeholder="Email"
				leftIcon="mail-outline"
				rules={{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
				error={errors.email}
				keyboardType="email-address"
				autoComplete="email"
			/>
			<AuthTextInput<SignUpForm>
				name="password"
				control={control}
				placeholder="Password"
				leftIcon="lock-closed-outline"
				secure
				showToggle
				valueSecure={!showPassword}
				onToggleSecure={() => setShowPassword(!showPassword)}
				rules={{ required: true, minLength: 6 }}
				error={errors.password}
				autoComplete="password-new"
			/>
			<AuthButton
				title="Sign Up"
				loading={loading}
				disabled={loading}
				onPress={handleSubmit(onSubmit)}
			/>
			<TouchableOpacity
				className="mt-8 items-center"
				onPress={() => {
					/* navigate back */
				}}
			>
				<Text className="text-sm font-medium text-secondary">
					Have an account? Sign In
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
