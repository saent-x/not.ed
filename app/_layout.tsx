import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import '../global.css';
import { Stack } from 'expo-router';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
