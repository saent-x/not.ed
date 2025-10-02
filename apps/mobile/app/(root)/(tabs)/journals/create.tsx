import {
	Text,
	View,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useState } from "react";
import { Button } from "heroui-native";
import { TagSelector } from "@/components/journals/TagSelector";
import type { JournalItem } from "@not.ed/shared";
import RichTextEditor from "@/components/journals/RichTextEditor";

export default function Create() {
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const availableTags = [
		"Work",
		"Personal",
		"Health",
		"Travel",
		"Education",
		"Finance",
	];

	const handleSave = () => {
		const newJournal: JournalItem = {
			_id: Date.now(),
			title: title,
			content: content,
			tags: selectedTags,
		};

		console.log("New Journal:", newJournal);

		router.back();
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<SafeAreaView className="flex-1">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View className="h-full">
					<ScrollView>
						{/* Header */}
						<View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
							<TouchableOpacity className="w-[20%]" onPress={handleCancel}>
								<Text className="text-primary text-base font-medium">
									Cancel
								</Text>
							</TouchableOpacity>
							<Text className="text-lg font-bold text-gray-900">
								New Journal
							</Text>
							<TouchableOpacity className="w-[20%]"></TouchableOpacity>
						</View>

						{/* Form */}
						<View className="px-4 pt-6 justify-between">
							<View>
								<View className="mb-6">
									<TextInput
										className="rounded-sm py-3  placeholder:text-gray-600 text-3xl h-auto"
										placeholder="Title"
										placeholderTextColor="#9CA3AF"
										value={title}
										onChangeText={setTitle}
										multiline
										textAlignVertical="top"
									/>
								</View>

								<TagSelector
									selectedTags={selectedTags}
									onChange={setSelectedTags}
									availableTags={availableTags}
								/>

								<View className="mb-10 gap-3 flex flex-row items-center">
									<RichTextEditor dom={{ matchContents: true }} />
									{/* <TextInput
										className="rounded-sm py-3  placeholder:text-gray-600 text-2xl h-auto"
										placeholder="Content..."
										placeholderTextColor="#9CA3AF"
										value={content}
										onChangeText={setContent}
										multiline
										textAlignVertical="top"
									/> */}
								</View>
							</View>
						</View>
					</ScrollView>
					<View className="px-4">
						<Button
							onPress={handleSave}
							size="lg"
							className="rounded-4xl bg-[#1c120d]"
						>
							Add Journal
						</Button>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
