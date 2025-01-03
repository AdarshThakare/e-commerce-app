import {
  Text,
  View,
  StyleSheet,
  Switch,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import { Circle, Image } from "react-native-svg";
import icons from "../constants/icons";

export default function CustomBarChart({
  data_1 = [12, 303, 834, 1923, 900, 210],
  data_2 = [403, 54, 654, 628, 354, 434],
  title_1,
  title_2,
  bgColor_1 = "#007bff",
  bgColor_2 = "#ff6347",
  horizontal = false,
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
}) {
  const chartData = {
    labels: labels,
    legend: [title_1, title_2],
    data: data_1.map((value, index) => [value, data_2[index] || 0]),
    barColors: [bgColor_1, bgColor_2],
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView className="w-full h-500 bg-white" horizontal>
      <View className="flex flex-col justify-start items-start p-2 mx-4 my-2">
        <Text className="py-2 text-3xl font-bold ">
          REVENUE & TRANSACTION CHART
        </Text>
        <View className="px-6 py-2 bg-white w-full">
          <View className="flex flex-row items-center justify-between">
            <Text className="font-medium text-sm">Revenue - Blue</Text>
            <Image
              source={icons.bluecircle}
              width={20}
              height={20}
              className="size-2"
            />
          </View>
          <View>
            <Text className="font-medium text-sm">Transaction - Orange</Text>
            <Image
              source={icons.orangecircle}
              width={20}
              height={20}
              className="size-2"
            />
          </View>
        </View>
        <StackedBarChart
          data={chartData}
          width={Math.max(screenWidth, chartData.labels.length * 80)} // Makes the chart scrollable
          height={300}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hideLegend={true}
          fromZero // Start y-axis from 0
          withVerticalLabels={true}
          withHorizontalLabels={true}
        />
      </View>
    </ScrollView>
  );
}
