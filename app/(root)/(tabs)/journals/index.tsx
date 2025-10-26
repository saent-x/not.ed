import { useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from '@/components/journals/SearchBar';
import { FilterButtons } from '@/components/journals/FilterButtons';
import { JournalList } from '@/components/journals/JournalList';
import type { JournalEntry } from '@/components/journals/JournalCard';
import { useHeaderHeight } from '@react-navigation/elements';
import { Spacer } from '@/components/Spacer';
import { FAB } from '@/components/FAB';
import { router } from 'expo-router';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'date' | 'tags' | 'sort' | undefined>();
  const headerHeight = useHeaderHeight();

  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      title: 'Weekly Reflection',
      description:
        "Reflecting on the week's achievements and challenges. A deeper dive into what went well and areas for improvement.",
      tag: 'Reflection',
      timestamp: 'Yesterday',
    },
    {
      id: '2',
      title: 'Project Kickoff',
      description:
        "Thoughts on the new project's kickoff meeting. Initial impressions and key takeaways from the discussion.",
      tag: 'Work',
      timestamp: '2 days ago',
    },
    {
      id: '3',
      title: 'City Exploration',
      description:
        "A day spent exploring the city's hidden gems. Documenting the discoveries and experiences of the urban adventure.",
      tag: 'Travel',
      timestamp: '3 days ago',
    },
    {
      id: '4',
      title: 'Campaign Ideas',
      description:
        'Brainstorming session for the upcoming campaign. Generating creative concepts and strategies for maximum impact.',
      tag: 'Marketing',
      timestamp: '4 days ago',
    },
  ];

  const handleEntryPress = (entry: JournalEntry) => {
    console.log('Journal entry pressed:', entry.title);
  };

  const handleDatePress = () => {
    setActiveFilter(activeFilter === 'date' ? undefined : 'date');
  };

  const handleTagsPress = () => {
    setActiveFilter(activeFilter === 'tags' ? undefined : 'tags');
  };

  const handleSortPress = () => {
    setActiveFilter(activeFilter === 'sort' ? undefined : 'sort');
  };

  return (
    <View style={{ paddingTop: headerHeight }} className="bg-background flex-1">
      <View className="flex-1 px-5 pt-4">
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} className="mb-4" />

        {/* Filter Buttons */}
        <FilterButtons
          onDatePress={handleDatePress}
          onTagsPress={handleTagsPress}
          onSortPress={handleSortPress}
          activeFilter={activeFilter}
          className="mb-6"
        />

        {/* Journal List */}
        <JournalList entries={journalEntries} onEntryPress={handleEntryPress} />
      </View>
      <Spacer size={100} />
      <FAB
        onPress={() => {
          // Handle add task action
          router.push('/journals/create');
        }}
      />
    </View>
  );
}
