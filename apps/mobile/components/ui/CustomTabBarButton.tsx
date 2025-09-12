import React from "react";
import { TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

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
			activeOpacity={1}
			onPress={(e) => {
				Haptics.impactAsync(feedbackStyle);
				onPress?.(e);
			}}
		/>
	);
};

import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

export const createCustomTabBarButton = (
	feedbackStyle: Haptics.ImpactFeedbackStyle,
) => {
	return (props: BottomTabBarButtonProps) => (
		<CustomTabBarButton {...props} feedbackStyle={feedbackStyle} />
	);
};
