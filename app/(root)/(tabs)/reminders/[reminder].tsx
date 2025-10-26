import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner-native';
import type { Id } from '@/convex/_generated/dataModel';
import { frequencyOptions } from '@/lib/util';
import { Picker } from '@react-native-picker/picker';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';
import { Button, ButtonText } from '@/components/ui/button';

export default function Edit() {
  const reminderId = useLocalSearchParams().reminder as string;
  const reminder = useQuery(api.reminders.getReminderById, {
    reminderId: reminderId as Id<'reminders'>,
  });
  const updateReminder = useMutation(api.reminders.updateReminder);
  const deleteReminder = useMutation(api.reminders.deleteReminder);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [frequency, setFrequency] = useState('none');
  const [earlyReminder, setEarlyReminder] = useState(false);

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title);
      setDate(new Date(reminder.date ?? Date.now()));
      setFrequency(reminder.frequency ?? 'none');
      setEarlyReminder(reminder.earlyReminder ?? false);
    }
  }, [reminder]);

  const handleEdit = async () => {
    const updatedReminder = {
      reminderId: reminder?._id as Id<'reminders'>,
      title: title,
      date: date,
      frequency: frequency,
      earlyReminder: earlyReminder,
    };

    try {
      await updateReminder({
        reminderId: updatedReminder.reminderId as Id<'reminders'>,
        title: updatedReminder.title,
        date: updatedReminder.date.getTime(),
        frequency: updatedReminder.frequency,
        earlyReminder: updatedReminder.earlyReminder,
      });

      toast.success('Reminder updated successfully!');
      router.back();
    } catch (error) {
      toast.error('Failed to update reminder. Please try again.');
      console.log('Error updating reminder:', error);
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert('Delete Reminder', 'Are you sure you want to delete this reminder?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await deleteReminder({
              reminderId: reminderId as Id<'reminders'>,
            });
            toast.success('Reminder deleted successfully!');
            router.back();
          },
          style: 'default',
        },
      ]);
    } catch (error) {
      toast.error('Failed to delete reminder. Please try again.');
      console.log('Error deleting reminder:', error);
    }
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
              <Text className="text-lg font-bold text-gray-900">Update Reminder</Text>
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

                <View className="mb-10 flex flex-row items-center gap-3  ">
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
          <View className="mb-4 flex flex-row justify-between gap-5 px-4">
            <Button onPress={handleDelete} size="lg" className="rounded-3xl h-12 flex-grow bg-red-700">
              <ButtonText className='color-white'>Delete</ButtonText>
            </Button>
            <Button onPress={handleEdit} size="lg" className="rounded-3xl h-12 flex-grow bg-[#1c120d]">
              <ButtonText className='color-white'>Update</ButtonText>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
