import React, { useState } from "react";
import { TouchableOpacity, View, Text, Modal } from "react-native";
import { Button, Checkbox, Chip } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

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
      <Text className="text-gray-900 text-md mb-2">Tags</Text>
      <View className="flex-row flex-wrap">
        {selectedTags.map((tag) => (
          <Chip key={tag} variant="secondary" className="mr-2 mb-2">
            <Chip.LabelContent>{tag}</Chip.LabelContent>
            <Chip.EndContent>
              <TouchableOpacity
                onPress={() =>
                  onChange(selectedTags.filter((t) => t !== tag))
                }
              >
                <Ionicons name="close" size={16} color="white" />
              </TouchableOpacity>
            </Chip.EndContent>
          </Chip>
        ))}
        <Chip
          variant="tertiary"
          onPress={() => setModalVisible(true)}
        >
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
        transparent={true}
      >
        <View
          style={{ flex: 1 }}
        >
          <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
>

          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: "40%",
              width: "100%",
              backgroundColor: "white",
              padding: 16,
            }}
          >
            <Text className="text-xl font-bold mb-4">Select Tags</Text>
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
                className="flex-row items-center mb-2"
              >
                <Checkbox
                  isSelected={selectedTags.includes(tag)}
                  onSelectedChange={() => {}}
                />
                <Text className="ml-2">{tag}</Text>
              </TouchableOpacity>
            ))}
            <Button onPress={() => setModalVisible(false)} className="mt-4 bg-tertiary">
              Done
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};
