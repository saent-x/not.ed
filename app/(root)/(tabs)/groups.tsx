import { authClient } from '@/lib/auth-client';
import { router } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView>
      <Text> I am Groups </Text>
    </SafeAreaView>
  );
}
