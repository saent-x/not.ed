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

interface ForgotForm {
  email: string;
}

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    defaultValues: { email: '' },
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async ({ email }: ForgotForm) => {
    setLoading(true);
    try {
      const res = await authClient.requestPasswordReset({
        email,
      });
      if (res) {
        setSent(true);
        toast.success('Email sent', {
          description: 'Check your inbox for reset link.',
        });
      } else {
        toast.error('Unable to send reset');
      }
    } catch (e) {
      console.error(e);
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
        <Ionicons className="my-5" name="lock-closed" size={46} color="#cc9469" />
        <Text className="text-primary my-2 mt-4 text-5xl font-extrabold">Forgot Password</Text>
        <Text className="text-md text-secondary mt-2 text-left">
          Enter the email associated with your account and we&apos;ll send you a reset link.
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
            className="mt-10"
            title="Send Reset Link"
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          />
        </>
      ) : (
        <View className="border-primary/30 bg-secondary mx-6 mt-4 rounded-lg border p-4">
          <Text className="text-secondary text-sm">
            If an account exists for that email, a reset link has been sent. You can close this
            screen.
          </Text>
        </View>
      )}

      <View className="mt-10 flex-row justify-center">
        <Text className="my-1 mr-1 text-center text-sm text-gray-500">{'Back to '}</Text>
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
