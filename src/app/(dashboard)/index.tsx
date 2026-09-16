import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Scrollable content container */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-96">
          <Image
            resizeMode="stretch"
            className="h-full w-full"
            source={require("@/assets/images/teamwork.jpg")}
          />
        </View>

        <View className="px-7 py-2">
          <Text className="text-xl" style={{ fontFamily: "Inter_600SemiBold" }}>
            NorthRide’s Community Policy
          </Text>
          <Text
            className="text-base mt-3 text-[#333333]"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            Safety and respect for all
          </Text>
          <Text className="text-xs" style={{ fontFamily: "Inter_600SemiBold" }}>
            We’re committed along with multiple riders and delivery guys to:
          </Text>

          <View className="flex-row items-center gap-2 mt-7">
            <FontAwesome
              name="check"
              className="text-[#31373D] -mt-4"
              size={15}
            />
            <View className="border-b w-full pb-5 border-[#EAEAEA]">
              <Text
                className="text-xs text-[#333333]"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Treat everyone with kindness and respect
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mt-7">
            <FontAwesome
              name="check"
              className="text-[#31373D] -mt-4"
              size={15}
            />
            <View className="border-b w-full pb-5 border-[#EAEAEA]">
              <Text
                className="text-xs text-[#333333]"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Help keep each other safe
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mt-7">
            <FontAwesome
              name="check"
              className="text-[#31373D] -mt-4"
              size={15}
            />
            <View className="border-b w-full pb-5 border-[#EAEAEA]">
              <Text
                className="text-xs text-[#333333]"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Follow the law
              </Text>
            </View>
          </View>

          <Text
            className="text-xs mt-10"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            Everyone who uses NorthRide app is expected to
          </Text>
          <Text className="text-xs" style={{ fontFamily: "Inter_600SemiBold" }}>
            follow these guidlines.
          </Text>
          <Text
            className="text-xs mt-5"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            You can read about our Community Guidelines HERE
          </Text>
        </View>
      </ScrollView>

      {/* Floating fixed bottom action container */}
      <View className="absolute bottom-5 left-0 right-0 items-center bg-white py-2">
        <Button
          onPress={() => router.push("/(dashboard)/paymentMethod")}
          buttonStyle={{
            width: 300,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          color={"black"}
          radius={"xl"}
        >
          <Text
            className="text-[#FFC100] text-lg"
            style={{ fontFamily: "Inter_600SemiBold" }}
          >
            I understand
          </Text>
          <FontAwesome
            name="arrow-right"
            color={"#FFC100"}
            className="absolute right-5"
            size={15}
          />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
