import type { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface FABProps {
  onPress: () => void;
  className?: string;
  disabled?: boolean;
}

export const FAB: FC<FABProps> = ({ onPress, className = '', disabled = false }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <TouchableOpacity
      className={`android:elevation-6 absolute bottom-28 right-3 h-16 w-16 items-center justify-center rounded-full bg-[#1c120d] shadow-lg shadow-black/20 ${
        disabled ? 'opacity-70' : ''
      } ${className}`}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}>
      <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );
};
