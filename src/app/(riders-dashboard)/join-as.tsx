import { Button } from "@rneui/base";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const JoinAs = () => {
  const [selectedRole, setSelectedRole] = useState<"rider" | "fleet">("rider");

  return (
    <SafeAreaView className="flex-1 py-3 px-5 bg-white">
      {/* Header */}
      <View className="h-10 flex-row justify-between items-center">
        <Iconify icon="material-symbols:arrow-back-rounded" size={24} />
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-lg">
          NorthRide
        </Text>
        <Text
          className="py-2 bg-light-gray1 px-4 rounded-2xl"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          Help
        </Text>
      </View>

      {/* Title */}
      <Text
        style={{ fontFamily: "Inter_600SemiBold" }}
        className="text-3xl mt-5"
      >
        Choose how you want to
      </Text>
      <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-3xl">
        earn with NorthRide
      </Text>

      {/* Selection Cards */}
      <View className="mt-10 gap-5">
        {/* Option 1: Join as a Rider */}
        <Pressable
          onPress={() => setSelectedRole("rider")}
          className={`py-5 px-4 rounded-3xl flex-row justify-between items-center border-2 ${
            selectedRole === "rider"
              ? "border-[#FFC100] bg-white"
              : "border-transparent bg-[#EEEEEE]"
          }`}
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base"
          >
            Join as a rider
          </Text>
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              selectedRole === "rider" ? "border-[#FFC100]" : "border-gray-400"
            }`}
          >
            {selectedRole === "rider" && (
              <View className="w-3 h-3 rounded-full bg-[#FFC100]" />
            )}
          </View>
        </Pressable>

        {/* Option 2: Join as a Fleet */}
        <Pressable
          onPress={() => setSelectedRole("fleet")}
          className={`py-5 px-4 rounded-3xl flex-row justify-between items-center border-2 ${
            selectedRole === "fleet"
              ? "border-[#FFC100] bg-white"
              : "border-transparent bg-[#EEEEEE]"
          }`}
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base"
          >
            Join as a fleet
          </Text>
          <View
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              selectedRole === "fleet" ? "border-[#FFC100]" : "border-gray-400"
            }`}
          >
            {selectedRole === "fleet" && (
              <View className="w-3 h-3 rounded-full bg-[#FFC100]" />
            )}
          </View>
        </Pressable>
      </View>

      {/* Bottom Sticky Action Button */}
      <View className="px-6 absolute left-0 right-0 bottom-10">
        <Button
          radius={20}
          buttonStyle={{
            height: 50,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
          onPress={() => router.push("/(riders-dashboard)/id-card")}
        >
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-light-pink text-xl"
          >
            Next
          </Text>
          <Iconify icon="akar-icons:arrow-right" size={24} color={"#FDBF07"} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default JoinAs;
