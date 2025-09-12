import { Tabs } from "expo-router";
import {
	ChartLine,
	House,
	NotebookText,
	SquareCheckBig,
	User,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { createCustomTabBarButton } from "@not.ed/mobile/components/ui/CustomTabBarButton";

const PRIMARY_ICON = "#cc9469"; // login button color
const INACTIVE = "#17140f"; // secondary text
const ACTIVE_TEXT = "#8a705c"; // black text for active label
const BG = "#FCFAF7";
const BORDER = "#f2edeb";

export default function TabLayout() {
	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				headerShown: true,
				tabBarActiveTintColor: ACTIVE_TEXT,
				tabBarInactiveTintColor: INACTIVE,
				headerTransparent: true,
				tabBarStyle: {
					backgroundColor: BG,
					borderTopColor: BORDER,
					height: 90,
					paddingBottom: 8,
					paddingTop: 6,
				},
				tabBarLabelStyle: { fontSize: 10, fontWeight: "500" },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarButton: createCustomTabBarButton(
						Haptics.ImpactFeedbackStyle.Medium,
					),
					tabBarIcon: ({ focused, size }) => (
						<House
							size={size ?? 22}
							color={focused ? PRIMARY_ICON : INACTIVE}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="activity"
				options={{
					title: "Activity",
					tabBarButton: createCustomTabBarButton(
						Haptics.ImpactFeedbackStyle.Medium,
					),
					tabBarIcon: ({ focused, size }) => (
						<SquareCheckBig
							size={size ?? 22}
							color={focused ? PRIMARY_ICON : INACTIVE}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="journals"
				options={{
					title: "Journals",
					tabBarButton: createCustomTabBarButton(
						Haptics.ImpactFeedbackStyle.Medium,
					),
					tabBarIcon: ({ focused, size }) => (
						<NotebookText
							size={size ?? 22}
							color={focused ? PRIMARY_ICON : INACTIVE}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="metrics"
				options={{
					title: "Metrics",
					tabBarButton: createCustomTabBarButton(
						Haptics.ImpactFeedbackStyle.Medium,
					),
					tabBarIcon: ({ focused, size }) => (
						<ChartLine
							size={size ?? 22}
							color={focused ? PRIMARY_ICON : INACTIVE}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarButton: createCustomTabBarButton(
						Haptics.ImpactFeedbackStyle.Medium,
					),
					tabBarIcon: ({ focused, size }) => (
						<User size={size ?? 22} color={focused ? PRIMARY_ICON : INACTIVE} />
					),
				}}
			/>
		</Tabs>
	);
}
