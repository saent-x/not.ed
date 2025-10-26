import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { AuthTextInput } from '@/components/auth/AuthTextInput';
import { AuthButton } from '@/components/auth/AuthButton';
import { authClient } from '@/lib/auth-client';
import { Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { useState } from 'react';
import { router } from 'expo-router';

interface SignUpForm {
  email: string;
  password: string;
  name: string;
}

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: { email: '', password: '', name: '' },
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
        toast.success('Account created', {
          description: 'Check your email to verify.',
        });
      } else {
        toast.error('Sign up failed');
      }
    } catch (e) {
      console.log(e);
      toast.error('Error', {
        description: e instanceof Error ? e.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-background h-full">
      <View className="mx-4 my-5 mb-10 mt-12 items-start">
        <Ionicons className="my-5" name="person-add" size={46} color="#cc9469" />
        <Text className="text-primary my-2 mt-4 text-5xl font-extrabold">Create Account</Text>
        <Text className="text-secondary mt-2 text-left text-lg">
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
        className="mt-10"
        title="Sign Up"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />
      <View className="mt-10 flex-row justify-center">
        <Text className="my-1 mr-1 text-center text-sm text-gray-500">{'Have an account? '}</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center justify-center">
          <Text className="text-secondary text-sm font-semibold underline">{'Sign In'}</Text>
        </TouchableOpacity>
        <View className="h-5 bg-gray-50"></View>
      </View>
    </SafeAreaView>
  );
}
