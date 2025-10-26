import type { FC } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';

interface FABItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  showPlus?: boolean;
}

interface ExpandableFABProps {
  items: FABItem[];
  className?: string;
}

interface MiniFABProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isVisible: boolean;
  showPlus?: boolean;
}

const MiniFAB: FC<MiniFABProps> = ({ onPress, icon, isVisible, showPlus = false }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 60,
          delay: 0, // All animate at the same time
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 60,
          delay: 0, // All animate at the same time
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 50,
          delay: 0, // All animate at the same time
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 50,
          delay: 0, // All animate at the same time
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, scaleAnim, opacityAnim]);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}>
      <TouchableOpacity
        className="android:elevation-4 h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-black/20"
        style={{ backgroundColor: '#1c120d' }}
        onPress={handlePress}
        activeOpacity={0.8}>
        <View className="relative">
          <Ionicons name={icon} size={20} color="white" />
          {showPlus && (
            <View className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full bg-white">
              <Ionicons name="add" size={10} color="#966E4F" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ExpandableFAB: FC<ExpandableFABProps> = ({ items, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const handleMainPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotationAnim]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View className={`absolute bottom-28 right-3 ${className}`}>
      {/* Mini FABs - arranged in a vertical line above main FAB */}
      <View className="mb-2 flex flex-col-reverse gap-2">
        {items.map((item) => (
          <MiniFAB
            key={item.label}
            icon={item.icon}
            label={item.label}
            isVisible={isExpanded}
            onPress={item.onPress}
            showPlus={item.showPlus}
          />
        ))}
      </View>

      {/* Main FAB */}
      <TouchableOpacity
        className="android:elevation-6 h-16 w-16 items-center justify-center rounded-full shadow-lg shadow-black/20"
        style={{ backgroundColor: '#1c120d' }}
        onPress={handleMainPress}
        activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Ionicons name="add" size={24} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};
