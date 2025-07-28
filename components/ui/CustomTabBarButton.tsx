import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

interface CustomTabBarButtonProps {
  onPress?: (e: any) => void;
  feedbackStyle?: Haptics.ImpactFeedbackStyle;
  [key: string]: any;
}

export const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({
  onPress,
  feedbackStyle = Haptics.ImpactFeedbackStyle.Light,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={(e) => {
        Haptics.impactAsync(feedbackStyle);
        onPress?.(e);
      }}
    />
  );
};

export const createCustomTabBarButton = (feedbackStyle: Haptics.ImpactFeedbackStyle) => {
  return (props: any) => {
    return <CustomTabBarButton {...props} feedbackStyle={feedbackStyle} />;
  };
};
