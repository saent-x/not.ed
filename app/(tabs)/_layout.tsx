import { Tabs } from 'expo-router';
import { ChartLine, House, NotebookText, SquareCheckBig, User } from 'lucide-react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { createCustomTabBarButton } from '../../components/ui/CustomTabBarButton';

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1C120D',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarButton: createCustomTabBarButton(Haptics.ImpactFeedbackStyle.Light),
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome6 name="house" size={24} color="black" />
            ) : (
              <House size={28} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="journals"
        options={{
          title: 'Journals',
          headerShown: false,
          tabBarButton: createCustomTabBarButton(Haptics.ImpactFeedbackStyle.Medium),
          tabBarIcon: ({ color }) => <NotebookText size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: 'Todos',
          headerShown: false,
          tabBarButton: createCustomTabBarButton(Haptics.ImpactFeedbackStyle.Light),
          tabBarIcon: ({ color }) => <SquareCheckBig size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="metrics"
        options={{
          title: 'Metrics',
          headerShown: false,
          tabBarButton: createCustomTabBarButton(Haptics.ImpactFeedbackStyle.Heavy),
          tabBarIcon: ({ color }) => <ChartLine size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarButton: createCustomTabBarButton(Haptics.ImpactFeedbackStyle.Medium),
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
};
