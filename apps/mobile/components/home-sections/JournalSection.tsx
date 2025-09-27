import { JournalEntry } from "@not.ed/shared";
import { formatDate } from "@/lib/util";
import { Ionicons } from "@expo/vector-icons";
import { Surface } from "heroui-native";
import { Text, TouchableOpacity, View } from "react-native";

type JournalEntrySectionProps = {
	journalEntries: JournalEntry[];
};

export const JournalSection = ({
	journalEntries,
}: JournalEntrySectionProps) => {
	return (
		<View className="pt-12">
			<Text className="text-xl font-bold">{"Recent Journal Entries"}</Text>
			<View className="pt-5 flex gap-4">
				{journalEntries.map((item) => (
					<TouchableOpacity
						key={item._id}
						className="flex flex-row items-center gap-4"
					>
						<Surface
							variant="none"
							className="flex items-center justify-center bg-[#f2ede8] h-18 w-18"
						>
							<Ionicons
								name={item.icon as keyof typeof Ionicons.glyphMap}
								size={28}
							/>
						</Surface>

						<View className="flex flex-col gap-1">
							<Text className="text-md font-semibold truncate">
								{item.title}
							</Text>
							<Text className="text-muted-foreground text-md">
								{formatDate(new Date(item.date))}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};
