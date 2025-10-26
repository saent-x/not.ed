import type { FC } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  placeholder = 'Search journal entries',
  value,
  onChangeText,
  className = '',
}) => {
  return (
    <View className={`relative ${className}`}>
      <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <Ionicons name="search" size={20} color="#6B7280" />
      </View>
      <TextInput
        className="rounded-xl bg-gray-100 px-12 py-4 text-base text-gray-700"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
