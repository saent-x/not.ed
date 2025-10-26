import { View, Text, ScrollView } from 'react-native';
import { UserAvatar } from '@/components/profile/UserAvatar';
import { UserInfo } from '@/components/profile/UserInfo';
import { SettingsSection } from '@/components/profile/SettingsSection';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { authClient } from '@/lib/auth-client';
import { Button, ButtonText } from '@/components/ui/button';

export default function Profile() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const user = useQuery(api.users.getCurrentUser);

  const settings = [
    {
      id: 'notifications',
      icon: 'notifications' as const,
      title: 'Notifications',
      type: 'toggle' as const,
      value: notifications,
    },
    {
      id: 'darkMode',
      icon: 'moon' as const,
      title: 'Dark Mode',
      type: 'toggle' as const,
      value: darkMode,
    },
    {
      id: 'language',
      icon: 'globe' as const,
      title: 'Language',
      type: 'selection' as const,
      value: 'English',
    },
    {
      id: 'help',
      icon: 'help-circle' as const,
      title: 'Help & Support',
      type: 'navigation' as const,
    },
    {
      id: 'about',
      icon: 'information-circle' as const,
      title: 'About',
      type: 'navigation' as const,
    },
  ];

  const handleSettingPress = (settingId: string) => {
    console.log('Setting pressed:', settingId);
    // Handle navigation to specific settings
  };

  const handleSettingToggle = (settingId: string, value: boolean) => {
    if (settingId === 'notifications') {
      setNotifications(value);
    } else if (settingId === 'darkMode') {
      setDarkMode(value);
    }
  };

  return (
    <ScrollView
      className="bg-background flex-1"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic">
      {/* Header */}
      <View className="flex-row items-center justify-center px-5 py-4">
        <Text className="text-xl font-bold text-gray-900">Profile</Text>
      </View>

      {/* User Profile Section */}
      {user && (
        <View className="items-center px-5">
          <UserAvatar imageUri="../../assets/dog.png" size={120} />
          <UserInfo
            name={user.name}
            role="Editor"
            joinDate={new Date(user.createdAt).getFullYear().toString()}
          />
        </View>
      )}

      {/* Settings Section */}
      <View className="px-5">
        <SettingsSection
          title="Settings"
          settings={settings}
          onSettingPress={handleSettingPress}
          onSettingToggle={handleSettingToggle}
        />
      </View>

      <View className="mt-10 px-5">
        <Button
          variant='solid'
          action='primary'
          size="lg"
          className="rounded-3xl bg-tertiary"
          onPress={async () => {
            try {
              await authClient.signOut();
            } catch (e) {
              console.warn('Sign out failed', e);
            }
          }}>
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
    </ScrollView>
  );
}
