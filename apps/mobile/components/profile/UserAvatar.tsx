import { View, Image } from "react-native";

interface UserAvatarProps {
	imageUri?: string;
	size?: number;
	backgroundColor?: string;
}

export function UserAvatar({
	imageUri,
	size = 100,
	backgroundColor = "#F59E0B",
}: UserAvatarProps) {
	return (
		<View
			className="rounded-full items-center justify-center"
			style={{
				width: size,
				height: size,
				backgroundColor,
			}}
		>
			{imageUri ? (
				<Image
					source={require('../../assets/dog.png')}
					className="rounded-full"
					style={{ width: size, height: size }}
				/>
			) : (
				<View
					className="rounded-full bg-gray-300"
					style={{ width: size, height: size }}
				/>
			)}
		</View>
	);
}
