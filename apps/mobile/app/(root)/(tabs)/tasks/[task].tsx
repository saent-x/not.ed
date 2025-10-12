import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Checkbox, Chip } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskPrioritySelector } from "@/components/tasks/TaskPrioritySelector";
import type { ChildTask, TaskPriority } from "@not.ed/shared";
import { useMutation, useQuery } from "convex/react";
import { api } from "@not.ed/backend/convex/_generated/api";
import { toast } from "sonner-native";
import type { Id } from "@not.ed/backend/convex/_generated/dataModel";
import { mapToKey } from "@/lib/util";

export default function Edit() {
  const taskId = useLocalSearchParams().task as string;
  const task = useQuery(api.tasks.getTaskById, {
    taskId: taskId as Id<"tasks">,
  });
  const updateTask = useMutation(api.tasks.updateTask);
  const deleteTask = useMutation(api.tasks.deleteTask);

  const [description, setDescription] = useState("");
  type ChildTaskWithKey = ChildTask & { key?: number };
  const [childTasks, setChildTasks] = useState<ChildTaskWithKey[]>([]);
  const [expireAt, setExpireAt] = useState<Date>(new Date());
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("low");

  useEffect(() => {
    if (task) {
      setDescription(task.description);

      const _childTasks = mapToKey<ChildTask>(task.childTasks ?? []); // this adds a unique key to each child task
      setChildTasks(_childTasks as ChildTaskWithKey[]);

      setExpireAt(new Date(task.expireAt ?? Date.now()));
      setTaskPriority((task.priority as TaskPriority) ?? "low");
    }
  }, [task]);

  const addChildTask = () => {
    console.log("addding...");

    setChildTasks((prev) => [
      ...prev,
      {
        title: "",
        completed: false,
        key: (prev[prev.length - 1]?.key ?? 0) + 1,
      },
    ]);
  };
  const updateChildTask = (
    index: number,
    obj: { title?: string; completed?: boolean },
  ) =>
    setChildTasks((prev) =>
      prev.map((task, i) =>
        i === index
          ? {
              ...task,
              ...obj,
            }
          : task,
      ),
    );
  const removeChildTask = (index: number) =>
    setChildTasks((prev) => prev.filter((_, i) => i !== index));

  const handleEdit = async () => {
    const updatedTask = {
      taskId: taskId as Id<"tasks">,
      description,
      expireAt,
      childTasks,
      priority: taskPriority,
    };

    try {
      await updateTask({
        taskId: updatedTask.taskId,
        description: updatedTask.description,
        expireAt: updatedTask.expireAt.getTime(),
        priority: updatedTask.priority,
        ...(updatedTask.childTasks.length > 0
          ? {
              childTasks: updatedTask.childTasks.map((child) => ({
                title: child.title,
                completed: child.completed,
              })),
            }
          : {}),
      });
      toast.success("Task updated successfully!");
      router.back();
    } catch (error) {
      toast.error("Failed to update task. Please try again.");
      console.log("Error updating task:", error);
    }

    console.log("Updating task:", JSON.stringify(updatedTask, null, "\t"));
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: async () => {
            await deleteTask({
              taskId: taskId as Id<"tasks">,
            });
            toast.success("Task deleted successfully!");
            router.back();
          },
          style: "default",
        },
      ]);
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
      console.log("Error deleting task:", error);
    }
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
              <Text className="text-lg font-bold text-gray-900">New Task</Text>
              <TouchableOpacity className="w-[20%]"></TouchableOpacity>
            </View>

            {/* Form */}
            <View className="px-4 pt-6 justify-between">
              <View>
                <View className="mb-6">
                  <TextInput
                    className="rounded-sm py-3  placeholder:text-gray-600 text-3xl h-auto"
                    placeholder="Task Description"
                    placeholderTextColor="#9CA3AF"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    textAlignVertical="top"
                  />
                </View>
                <View className="mb-6 flex flex-row items-center">
                  <Text className="text-gray-900 text-md">Expire&apos;s</Text>
                  <DateTimePicker
                    mode="datetime"
                    value={expireAt}
                    onChange={(evt) =>
                      setExpireAt(new Date(evt.nativeEvent.timestamp))
                    }
                    style={{ marginLeft: 0 }}
                  />
                </View>

                {/*------ Task Priority Section ------*/}
                <View className="mb-10 gap-3 flex flex-row items-center">
                  <Text className="text-gray-900 text-md">Set Priority</Text>
                  <TaskPrioritySelector
                    selectedPriority={taskPriority}
                    onSelectPriority={setTaskPriority}
                  />
                </View>

                {/*------ Add Child Task Section ------*/}
                <View className="mb-6">
                  <Chip variant="secondary" onPress={addChildTask}>
                    <Chip.StartContent className="pr-1">
                      <Ionicons name="add" size={12} color="#F59E0B" />
                    </Chip.StartContent>
                    <Chip.LabelContent>{"Add child task"}</Chip.LabelContent>
                  </Chip>
                </View>

                <View className="flex flex-col gap-3">
                  {childTasks?.map((value, index) => (
                    <View
                      key={value?.key}
                      className="flex-row gap-3 p-2 rounded-md bg-white items-center"
                    >
                      <Checkbox
                        isSelected={value?.completed}
                        onSelectedChange={(isSelected) =>
                          updateChildTask(index, { completed: isSelected })
                        }
                      />
                      <TextInput
                        className="flex-1 p-0 placeholder:text-gray-600 text-lg h-auto "
                        placeholder={`Child Task #${index + 1}`}
                        placeholderTextColor="#9CA3AF"
                        value={value?.title}
                        multiline
                        onChangeText={(text) =>
                          updateChildTask(index, { title: text })
                        }
                      />
                      <TouchableOpacity
                        onPress={() => removeChildTask(index)}
                        className="ml-2 px-3 py-2 rounded-sm bg-secondary"
                      >
                        <Ionicons name="remove" size={18} color="red" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="px-4 flex flex-row justify-between mb-4 gap-5">
            <Button
              onPress={handleDelete}
              size="lg"
              variant="danger"
              className="rounded-4xl flex-grow"
            >
              Delete
            </Button>
            <Button
              onPress={handleEdit}
              size="lg"
              className="rounded-4xl bg-[#1c120d] flex-grow"
            >
              Update
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
