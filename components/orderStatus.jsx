import { Text, View, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

export default function OrderStatus() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <View className="bg-white flex flex-row items-center justify-between w-full px-6">
      <Text className="font-rubik-semibold text-xl">Order Status</Text>

      {/* Switch Section */}
      <View className="flex flex-row items-center justify-between gap-2">
        <Text
          className={`${
            !isChecked
              ? "text-gray-500 font-rubik-medium"
              : "text-gray-400 font-rubik"
          } text-xl `}
        >
          Off
        </Text>
        <Switch
          value={isChecked}
          onValueChange={handleToggle}
          thumbColor={isChecked ? "#1e90ff" : "#f4f3f4"}
          trackColor={{ false: "#ccc", true: "#87cefa" }}
        />
        <Text
          className={`${
            isChecked
              ? "text-blue-600 font-rubik-medium"
              : "text-gray-400 font-rubik"
          } text-xl `}
        >
          On
        </Text>
      </View>
    </View>
  );
}
