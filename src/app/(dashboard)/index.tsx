import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
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
          style={{ fontFamily: "Inter_400Regular" }}
        >
          Safety and respect for all
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Inter_300Light" }}>
          We’re committed along with multiple riders and delivery guys to:
        </Text>
        <View className="flex-row  items-center gap-2 mt-7">
          <FontAwesome
            name="check"
            className="text-[#31373D] -mt-4"
            size={15}
          />
          <View className="border-b w-full pb-5 border-[#EAEAEA]">
            <Text
              className="text-xs text-[#333333]"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Treat everyone with kindness and respect
            </Text>
          </View>
        </View>
        <View className="flex-row  items-center gap-2 mt-7">
          <FontAwesome
            name="check"
            className="text-[#31373D] -mt-4"
            size={15}
          />
          <View className="border-b w-full pb-5 border-[#EAEAEA]">
            <Text
              className="text-xs text-[#333333]"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Help keep each other safe
            </Text>
          </View>
        </View>
        <View className="flex-row  items-center gap-2 mt-7">
          <FontAwesome
            name="check"
            className="text-[#31373D] -mt-4"
            size={15}
          />
          <View className="border-b w-full pb-5 border-[#EAEAEA]">
            <Text
              className="text-xs text-[#333333]"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Follow the law
            </Text>
          </View>
        </View>
        <Text
          className="text-xs mt-10"
          style={{ fontFamily: "Inter_300Light" }}
        >
          Everyone who uses NorthRide app is expected to
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Inter_300Light" }}>
          follow these guidlines.
        </Text>
        <Text className="text-xs mt-5" style={{ fontFamily: "Inter_300Light" }}>
          You can read about our Community Guidelines HERE
        </Text>
      </View>
      <View className="flex-row justify-center items-center pt-5 ">
        <Button onPress={() => router.push("/(dashboard)/paymentMethod")} className="" buttonStyle={{
            width : 300,
            height : 45,
            display : "flex",
            position : "relative"

        }} color={"black"} radius={"xl"} >
            <Text className="text-[#FFC100] text-lg " style={{ fontFamily: "Inter_300Light" }}>
                I understand
            </Text>
              <FontAwesome
            name="arrow-right"
            color={"#FFC100"}
            className=" -mt-4 absolute right-5 top-8"
            size={15}
          />
        </Button>

      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
