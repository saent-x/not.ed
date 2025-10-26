import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { ReminderItem } from '@/shared';
import { toast } from 'sonner-native';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { frequencyOptions } from '@/lib/util';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';

export default function Create() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState('none');
  const [earlyReminder, setEarlyReminder] = useState(false);

  const addNewReminder = useMutation(api.reminders.createReminder);

  const handleSave = async () => {
    // TODO: Validate input
    const reminderItem = {
      title: title,
      date: date.getTime(),
      completed: false,
      frequency: frequency,
      earlyReminder: earlyReminder,
    } as ReminderItem;

    await addNewReminder({
      title: reminderItem.title,
      date: reminderItem.date,
      completed: reminderItem.completed,
      frequency: reminderItem.frequency,
      earlyReminder: reminderItem.earlyReminder,
    });

    toast.success('Reminder created successfully!');
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="h-full">
          <ScrollView>
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-gray-200 px-5 py-4">
              <TouchableOpacity className="w-[20%]" onPress={handleCancel}>
                <Text className="text-primary text-base font-medium">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-gray-900">New Reminder</Text>
              <TouchableOpacity className="w-[20%]"></TouchableOpacity>
            </View>

            {/* Form */}
            <View className="justify-between px-4 pt-6">
              <View>
                <View className="mb-6">
                  <TextInput
                    className="h-auto rounded-sm  py-3 text-3xl placeholder:text-gray-600"
                    placeholder="Remind me..."
                    placeholderTextColor="#9CA3AF"
                    value={title}
                    onChangeText={setTitle}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
                <View className="mb-6 flex flex-row items-center">
                  <Text className="text-md text-gray-900">Date</Text>
                  <DateTimePicker
                    mode="datetime"
                    value={date}
                    onChange={(evt) => setDate(new Date(evt.nativeEvent.timestamp))}
                    style={{ marginLeft: 0 }}
                  />
                </View>

                <View className="mb-10 flex flex-row items-center gap-3">
                  <Checkbox
                    value=""
                    isChecked={earlyReminder}
                    onChange={setEarlyReminder}
                    isDisabled={false}
                    isInvalid={false}
                    size="md">
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                  </Checkbox>

                  <Text className="text-md text-gray-900">Set Early Reminders (optional)</Text>
                </View>

                {/*------ Frequency Section ------*/}
                <View className="mb-10 flex flex-row items-center gap-3  ">
                  <Text className="text-md text-gray-900">Set Frequency</Text>
                  <Picker
                    selectedValue={frequency}
                    onValueChange={setFrequency}
                    mode="dialog"
                    numberOfLines={1}
                    prompt="Select Frequency"
                    style={{
                      width: 250,
                      marginLeft: 10,
                      alignSelf: 'flex-start',
                    }}>
                    {frequencyOptions.map((option) => (
                      <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="px-4">
            <Button onPress={handleSave} size="lg" className="rounded-3xl h-12 bg-[#1c120d]">
              <ButtonText className='color-white'>Add Reminder</ButtonText>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
