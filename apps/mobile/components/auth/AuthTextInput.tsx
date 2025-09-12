import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	type TextInputProps,
} from "react-native";
import {
	Controller,
	type Control,
	type RegisterOptions,
	type FieldValues,
	type Path,
	type FieldError,
} from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface BaseProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	placeholder: string;
	leftIcon: keyof typeof Ionicons.glyphMap;
	secure?: boolean;
	showToggle?: boolean;
	valueSecure?: boolean;
	onToggleSecure?: () => void;
	rules?: RegisterOptions<T, Path<T>>;
	error?: FieldError;
	keyboardType?: TextInputProps["keyboardType"];
	autoCapitalize?: TextInputProps["autoCapitalize"];
	autoComplete?: TextInputProps["autoComplete"];
}

export function AuthTextInput<T extends FieldValues>({
	name,
	control,
	placeholder,
	leftIcon,
	secure,
	showToggle,
	valueSecure = true,
	onToggleSecure,
	rules,
	error,
	keyboardType = "default",
	autoCapitalize = "none",
	autoComplete,
}: BaseProps<T>) {
	return (
		<View className="mx-4 my-2">
			<View className="android:elevation-2 flex-row items-center rounded-xl bg-secondary shadow-sm shadow-black/5">
				<Ionicons
					name={leftIcon}
					size={20}
					color="#89705B"
					className="ml-4 mr-3"
				/>
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder={placeholder}
							onBlur={onBlur}
							onChangeText={onChange}
							value={(value as string) ?? ""}
							className={`text-md flex-1 py-4 pr-4 text-gray-700 ${error ? "border-red-600" : ""}`}
							secureTextEntry={secure ? valueSecure : false}
							keyboardType={keyboardType}
							autoCapitalize={autoCapitalize}
							autoComplete={autoComplete}
						/>
					)}
				/>
				{showToggle && (
					<TouchableOpacity onPress={onToggleSecure} className="p-4">
						<Ionicons
							name={valueSecure ? "eye-off-outline" : "eye-outline"}
							size={20}
							color="#89705B"
						/>
					</TouchableOpacity>
				)}
			</View>
			{error && (
				<View className="ml-1 mt-1 flex-row items-center">
					<Ionicons name="alert-circle" size={16} color="#DC2626" />
					<Text className="ml-1 text-xs text-red-600">
						{error.type === "pattern"
							? "Please enter a valid value"
							: error.type === "minLength"
								? "Too short"
								: "This field is required"}
					</Text>
				</View>
			)}
		</View>
	);
}
