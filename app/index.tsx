import { useAuthActions } from '@convex-dev/auth/react';
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  useColorScheme,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { makeRedirectUri } from 'expo-auth-session';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import '../global.css';

type UserLogin = {
  email: string;
  password: string;
};
type Socials = 'google' | 'microsoft-entra-id' | 'github';

const redirectTo = makeRedirectUri();

export default () => {
  const { signIn } = useAuthActions();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      email: 'vangerwua@outlook.com',
      password: '123JOHNp@ul',
    },
  });
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  let colorScheme = useColorScheme();

  const onSubmit: SubmitHandler<UserLogin> = (data) => {
    router.replace('/(tabs)');
  };

  const onSubmitSocial: SubmitHandler<Socials> = async (social: Socials) => {
    try {
      setSigningIn(true);
      const { redirect } = await signIn(social, { redirectTo });
      if (Platform.OS === 'web') {
        return;
      }

      const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);
      if (result.type === 'success') {
        const { url } = result;
        const code = new URL(url).searchParams.get('code')!;
        console.log(code);
        await signIn(social, { code });

        // router.replace('/(tabs)');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSigningIn(false);
    }
  };

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView className="bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="h-full">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="bg-background h-full">
              <View>
                <View className="mt-10 items-center">
                  <Image
                    source={require('../assets/logo-color.png')}
                    style={{ height: 100, width: 100 }}
                  />
                </View>
                <Text className="text-primary mx-4 my-5 text-center text-3xl font-bold">
                  {'Welcome back'}
                </Text>
                <Text className="text-md text-secondary mx-4 mb-8 text-center">
                  {'Sign in to continue to your account'}
                </Text>
                <View className="mx-4 my-2">
                  <View className="android:elevation-2 bg-secondary flex-row items-center rounded-xl shadow-sm shadow-black/5">
                    <Ionicons name="mail-outline" size={20} color="#89705B" className="ml-4 mr-3" />
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Email"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          className={`text-md flex-grow py-4 pr-4 text-gray-700 ${errors.email ? 'border-red-600' : ''}`}
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
                        {errors.email.type === 'pattern'
                          ? 'Please enter a valid email'
                          : 'Email is required'}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="mx-4 my-2">
                  <View className="android:elevation-2 bg-secondary flex-row items-center rounded-xl shadow-sm shadow-black/5">
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
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Password"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          className={`text-md flex-1 py-4 pr-4 text-gray-700 ${errors.password ? 'border-red-600' : ''}`}
                          textContentType="password"
                          secureTextEntry={!showPassword}
                          autoComplete="password"
                        />
                      )}
                      name="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-4">
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#89705B"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <View className="ml-1 mt-1 flex-row items-center">
                      <Ionicons name="alert-circle" size={16} color="#DC2626" />
                      <Text className="ml-1 text-xs text-red-600">
                        {errors.password.type === 'minLength'
                          ? 'Password must be at least 6 characters'
                          : 'Password is required'}
                      </Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity className="my-1 mb-5 mr-4 mt-5 self-end">
                  <Text className="text-secondary text-sm font-medium">{'Forgot password?'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={`android:elevation-5 bg-primary ml-4 mr-4 items-center rounded-lg py-4 shadow-md shadow-black/10 ${signingIn ? 'opacity-70' : ''}`}
                  onPress={handleSubmit(onSubmit)}
                  disabled={signingIn}>
                  <View className="items-center">
                    {signingIn ? (
                      <View className="flex-row items-center gap-2">
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text className="text-primary text-sm font-semibold">
                          {'Signing in...'}
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-primary text-sm font-semibold">{'Sign In'}</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <View className="mx-4 my-5 flex-row items-center">
                  <View className="h-px flex-1 bg-gray-200" />
                  <Text className="text-secondary mx-4 my-1 text-center text-sm">
                    {'Or continue with'}
                  </Text>
                  <View className="h-px flex-1 bg-gray-200" />
                </View>

                <View className="flex-row justify-between gap-2 px-4 py-3">
                  <TouchableOpacity
                    className="android:elevation-2 bg-secondary flex-grow flex-row items-center justify-center rounded-xl py-3 shadow-sm shadow-black/5"
                    onPress={() => onSubmitSocial('google')}>
                    <Ionicons name="logo-google" size={20} color="17140F" />
                    <Text className="ml-2 text-sm font-bold text-gray-900">{'Gmail'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="android:elevation-2 bg-secondary flex-grow flex-row items-center justify-center rounded-xl py-3 shadow-sm shadow-black/5"
                    onPress={() => onSubmitSocial('microsoft-entra-id')}>
                    <Ionicons name="logo-microsoft" size={20} color="17140F" />
                    <Text className="ml-2 text-sm font-bold text-gray-900">{'Outlook'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="android:elevation-2 bg-secondary flex-grow flex-row items-center justify-center rounded-xl py-3 shadow-sm shadow-black/5"
                    onPress={() => onSubmitSocial('github')}>
                    <Ionicons name="logo-github" size={20} color="17140F" />
                    <Text className="ml-2 text-sm font-bold text-gray-900">{'Github'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mt-10 flex-row justify-center">
                <Text className="my-1 mr-1 text-center text-sm text-gray-500">
                  {"Don't have an account? "}
                </Text>
                <TouchableOpacity className="flex-row items-center justify-center">
                  <Text className="text-secondary text-sm font-semibold underline">
                    {'Sign up'}
                  </Text>
                </TouchableOpacity>
                <View className="h-5 bg-gray-50"></View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
