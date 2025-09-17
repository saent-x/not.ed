import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { authClient } from "@not.ed/mobile/lib/auth-client";
import { toast } from "sonner-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SocialProvider, useSocialSignin } from "@/hooks/useSocialSignin";
import { router } from "expo-router";

type UserLogin = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      email: "vangerwua@outlook.com",
      password: "12345678",
    },
  });
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    signInWith,
    status: socialStatus,
    signingIn: socialSigning,
  } = useSocialSignin();

  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    setSigningIn(true);
    try {
      console.log(data);

      const result = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      console.log(`result -> ${result}`);

      if (result.error) {
        console.log(`error -> ${result.error}`);
        throw result.error;
      }

      if (result.data) {
        toast.success("Operation successful!", {
          style: { backgroundColor: "white" },
          description: "Successfully signed in.",
          duration: 6000,
          icon: <Ionicons name="checkmark-circle" size={24} color="black" />,
        });

        setSigningIn(false);
      }
    } catch (error) {
      console.log("Sign-in error:", error);
      toast.error("Operation failed!", {
        style: { backgroundColor: "white" },
        description: `Sign in failed: ${error instanceof Error ? error.message : "Invalid credentials"}`,
        duration: 6000,
        icon: <Ionicons name="alert-circle" size={24} color="black" />,
      });

      setSigningIn(false);
    }
  };

  const onSubmitSocial = async (provider: SocialProvider) => {
    await signInWith(provider);
  };

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="h-full">
          <View>
            <View className="mt-10 pb-5">
              <Image
                source={require("../../../assets/logo-color.png")}
                style={{ height: 80, width: 80 }}
              />
            </View>
            <Text className="mx-4 my-2 text-left text-5xl font-extrabold text-primary">
              {"Welcome back"}
            </Text>
            <Text className="text-md mx-4 mb-10 text-left text-lg text-secondary">
              {"Sign in to continue to your account"}
            </Text>
            <View className="mx-4 my-2">
              <View className="android:elevation-2 flex-row items-center rounded-xl bg-secondary shadow-sm shadow-black/5">
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#89705B"
                  className="ml-4 mr-3"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                  }: {
                    field: {
                      onChange: (v: string) => void;
                      onBlur: () => void;
                      value: string;
                    };
                  }) => (
                    <TextInput
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`text-md flex-grow py-4 pr-4 text-gray-700 ${errors.email ? "border-red-600" : ""}`}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  )}
                  name="email"
                />
              </View>
              {errors.email && (
                <View className="ml-1 mt-1 flex-row items-center">
                  <Ionicons name="alert-circle" size={16} color="#DC2626" />
                  <Text className="ml-1 text-xs text-red-600">
                    {errors.email.type === "pattern"
                      ? "Please enter a valid email"
                      : "Email is required"}
                  </Text>
                </View>
              )}
            </View>

            <View className="mx-4 my-2">
              <View className="android:elevation-2 flex-row items-center rounded-xl bg-secondary shadow-sm shadow-black/5">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#89705B"
                  className="ml-4 mr-3"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                  }: {
                    field: {
                      onChange: (v: string) => void;
                      onBlur: () => void;
                      value: string;
                    };
                  }) => (
                    <TextInput
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      className={`text-md flex-1 py-4 pr-4 text-gray-700 ${errors.password ? "border-red-600" : ""}`}
                      textContentType="password"
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                    />
                  )}
                  name="password"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-4"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#89705B"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <View className="ml-1 mt-1 flex-row items-center">
                  <Ionicons name="alert-circle" size={16} color="#DC2626" />
                  <Text className="ml-1 text-xs text-red-600">
                    {errors.password.type === "minLength"
                      ? "Password must be at least 6 characters"
                      : "Password is required"}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(auth)/forgot-password")}
              className="my-1 mb-5 mr-4 mt-5 self-end"
            >
              <Text className="text-sm font-medium text-secondary">
                {"Forgot password?"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`android:elevation-5 ml-4 mr-4 items-center rounded-lg bg-primary py-4 shadow-md shadow-black/10 ${signingIn ? "opacity-70" : ""}`}
              onPress={handleSubmit(onSubmit)}
              disabled={socialSigning}
            >
              <View className="items-center">
                {signingIn ? (
                  <View className="flex-row items-center gap-2">
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text className="text-sm font-semibold text-primary">
                      {"Signing in..."}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-sm font-semibold text-primary">
                    {"Sign In"}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            <View className="mx-4 my-5 flex-row items-center">
              <View className="h-px flex-1 bg-gray-200" />
              <Text className="mx-4 my-1 text-center text-sm text-secondary">
                {"Or continue with"}
              </Text>
              <View className="h-px flex-1 bg-gray-200" />
            </View>

            <View className="flex-row justify-between gap-2 px-4 py-3">
              <TouchableOpacity
                className={`android:elevation-2 flex-grow flex-row items-center justify-center rounded-xl bg-secondary py-3 shadow-sm shadow-black/5 ${socialStatus === "launching" ? "opacity-50" : ""}`}
                onPress={() => onSubmitSocial("google")}
                disabled={signingIn || socialSigning}
              >
                <Ionicons name="logo-google" size={20} color="#17140F" />
                <Text className="ml-2 text-sm font-bold text-gray-900">
                  {"Gmail"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`android:elevation-2 flex-grow flex-row items-center justify-center rounded-xl bg-secondary py-3 shadow-sm shadow-black/5 ${socialStatus === "launching" ? "opacity-50" : ""}`}
                onPress={() => onSubmitSocial("microsoft")}
                disabled={signingIn || socialSigning}
              >
                <Ionicons name="logo-microsoft" size={20} color="#17140F" />
                <Text className="ml-2 text-sm font-bold text-gray-900">
                  {"Outlook"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`android:elevation-2 flex-grow flex-row items-center justify-center rounded-xl bg-secondary py-3 shadow-sm shadow-black/5 ${socialStatus === "launching" ? "opacity-50" : ""}`}
                onPress={() => onSubmitSocial("github")}
                disabled={signingIn || socialSigning}
              >
                <Ionicons name="logo-github" size={20} color="#17140F" />
                <Text className="ml-2 text-sm font-bold text-gray-900">
                  {"Github"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-10 flex-row justify-center">
            <Text className="my-1 mr-1 text-center text-sm text-gray-500">
              {"Don't have an account? "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(auth)/signup")}
              className="flex-row items-center justify-center"
            >
              <Text className="text-sm font-semibold text-secondary underline">
                {"Sign up"}
              </Text>
            </TouchableOpacity>
            <View className="h-5 bg-gray-50"></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
