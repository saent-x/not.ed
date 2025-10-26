import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '../ui/chip';
import { Button } from '../ui/button';
import { Checkbox, CheckboxIndicator, CheckboxLabel, CheckboxIcon } from '@/components/ui/checkbox';
import { CheckIcon } from '../ui/icon';

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  availableTags: string[];
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onChange,
  availableTags,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="mb-6">
      <Text className="text-md mb-2 text-gray-900">Tags</Text>
      <View className="flex-row flex-wrap">
        {selectedTags.map((tag) => (
          <Chip key={tag} variant="secondary" className="mb-2 mr-2">
            <Chip.LabelContent>{tag}</Chip.LabelContent>
            <Chip.EndContent>
              <TouchableOpacity onPress={() => onChange(selectedTags.filter((t) => t !== tag))}>
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </Chip.EndContent>
          </Chip>
        ))}
        <Chip variant="secondary" onPress={() => setModalVisible(true)}>
          <Chip.StartContent>
            <Ionicons name="add" size={16} />
          </Chip.StartContent>
          <Chip.LabelContent>Add Tag</Chip.LabelContent>
        </Chip>
      </View>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}></TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: '40%',
              width: '100%',
              backgroundColor: 'white',
              padding: 16,
            }}>
            <Text className="mb-4 text-xl font-bold">Select Tags</Text>
            {availableTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                onPress={() => {
                  if (selectedTags.includes(tag)) {
                    onChange(selectedTags.filter((t) => t !== tag));
                  } else {
                    onChange([...selectedTags, tag]);
                  }
                }}
                className="mb-2 flex-row items-center">
                <Checkbox
                  value=""
                  isChecked={selectedTags.includes(tag)}
                  onChange={() => {}}
                  size="md">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel>Label</CheckboxLabel>
                </Checkbox>
                <Text className="ml-2">{tag}</Text>
              </TouchableOpacity>
            ))}
            <Button onPress={() => setModalVisible(false)} className="bg-tertiary mt-4">
              Done
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
