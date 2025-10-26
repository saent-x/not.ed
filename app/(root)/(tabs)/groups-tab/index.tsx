import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

export default function Group() {
  const [selected, setSelected] = useState('');

  return (
    <ScrollView className="bg-background h-full p-5">
      <View className="flex flex-col gap-12">
        <View>
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                // selectedDotColor: "orange",
              },
            }}
          />{' '}
        </View>
        <View>
          <Text className="text-xl font-bold">{'Today'}</Text>
          {/*<TaskItems tasks={todayTasks} />*/}
        </View>
        <View>
          <Text className="text-xl font-bold">{'Tomorrow'}</Text>
          {/*<TaskItems tasks={tomorrowTasks} />*/}
        </View>
      </View>
    </ScrollView>
  );
}
