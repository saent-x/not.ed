import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { StatsSection } from '@/components/home-sections/StatsSection';
import { ReminderSection } from '@/components/home-sections/ReminderSection';
import { JournalSection } from '@/components/home-sections/JournalSection';
import { Spacer } from '@/components/Spacer';
import { ExpandableFAB } from '@/components/ExpandableFAB';
import LottieView from 'lottie-react-native';

export default function Todos() {
  const user = useQuery(api.users.getCurrentUser);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate an API call or async operation
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getData = useQuery(api.shared.getFeaturedRemindersAndJournalEntry);

  return (
    <View style={{ flex: 1 }}>
      {/*---------------------- Header Section ------------------------*/}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        className="bg-background h-full p-5">
        {!user || !getData ? (
          <View className="flex-1 items-center justify-center h-[600px]">
            <LottieView
              style={{
                width: 400,
                height: 400,
              }}
              source={require('../../../assets/loading-animation.json')}
              autoPlay
              loop
            />
          </View>
        ) : (
          <>
            <View className="flex flex-row justify-end">
              <Text className="text-2xl font-extrabold">{`Hello, ${user?.name} 👋🏽`}</Text>
            </View>
            <StatsSection />
            <ReminderSection reminders={getData?.reminders ?? []} />
            <JournalSection journalEntries={getData?.journalEntries ?? []} />

            {/*---------------------- Some Space ------------------------*/}
            <Spacer />
          </>
        )}
      </ScrollView>

      <ExpandableFAB
        items={[
          {
            icon: 'checkmark-circle-outline',
            label: 'Add Task',
            onPress: () => console.log('Add task pressed'),
            showPlus: true,
          },
          {
            icon: 'alarm-outline',
            label: 'Add Reminder',
            onPress: () => console.log('Add reminder pressed'),
            showPlus: true,
          },
          {
            icon: 'book-outline',
            label: 'Add Journal',
            onPress: () => console.log('Add journal pressed'),
            showPlus: true,
          },
          {
            icon: 'people-outline',
            label: 'Add Group',
            onPress: () => console.log('Add group pressed'),
            showPlus: true,
          },
          {
            icon: 'mic-outline',
            label: 'AI Voice Chat',
            onPress: () => console.log('AI voice chat pressed'),
            showPlus: false,
          },
        ]}
      />
    </View>
  );
}
