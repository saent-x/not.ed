import type { FC } from "react";
import { ScrollView, View } from "react-native";
import { JournalCard, type JournalEntry } from "./JournalCard";

export type { JournalEntry };

interface JournalListProps {
	entries: JournalEntry[];
	onEntryPress?: (entry: JournalEntry) => void;
	className?: string;
}

export const JournalList: FC<JournalListProps> = ({
	entries,
	onEntryPress,
	className = "",
}) => {
	return (
		<ScrollView
			className={`flex-1 ${className}`}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 20 }}
		>
			<View className="gap-4">
				{entries.map((entry) => (
					<JournalCard key={entry.id} entry={entry} onPress={onEntryPress} />
				))}
			</View>
		</ScrollView>
	);
};
