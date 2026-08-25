import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const PaymentMethod = () => {
  return (
    <SafeAreaView className=" flex-1 bg-white px-7 py-5">
      <Text className="text-2xl" style={{ fontFamily: "Inter_600SemiBold" }}>
        How would you like to pay?
      </Text>
      <Text className="text-sm mt-1" style={{ fontFamily: "Inter_400Regular" }}>
        Select a preferred payment method
      </Text>
      <View className="min-h-72 bg-[#F2F2F2] rounded-3xl px-4 py-6 mt-10">
        <Pressable>
          <View className="border-b-2 border-[#EAEAEA] pb-3">
            <View className="flex-row  gap-3 items-center">
              <Image
                className="w-8 h-8"
                source={require("@/assets/images/pay.png")}
              />
              <Text
                className="mt-1 text-lg"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Apple pay
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              // color={"#FFC100"}
              className=" -mt-4 absolute right-0 top-8"
              size={15}
            />
          </View>
        </Pressable>
        <Pressable className="mt-4">
          <View className="border-b-2 border-[#EAEAEA] pb-3">
            <View className="flex-row  gap-3 items-center">
              <Image
                className="w-8 h-8"
                source={require("@/assets/images/money-transfer.png")}
              />
              <Text
                className="mt-1 text-lg"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                AirtelTigo money
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              // color={"#FFC100"}
              className=" -mt-4 absolute right-0 top-8"
              size={15}
            />
          </View>
        </Pressable>
        <Pressable className="mt-4">
          <View className="border-b-2 border-[#EAEAEA] pb-3">
            <View className="flex-row  gap-3 items-center">
              <Image
                className="w-8 h-8"
                source={require("@/assets/images/credit-card.png")}
              />
              <Text
                className="mt-1 text-lg"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                MTN Mobile money
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              // color={"#FFC100"}
              className=" -mt-4 absolute right-0 top-8"
              size={15}
            />
          </View>
        </Pressable>
        <Pressable className="mt-4">
          <View className="border-b-2 border-[#EAEAEA] pb-3">
            <View className="flex-row  gap-3 items-center">
              <Image
                className="w-8 h-8"
                source={require("@/assets/images/online-payment.png")}
              />
              <Text
                className="mt-1 text-lg"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Telecel Cash
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              // color={"#FFC100"}
              className=" -mt-4 absolute right-0 top-8"
              size={15}
            />
          </View>
        </Pressable>
        <Pressable className="mt-4">
          <View className="border-b-2 border-[#EAEAEA] pb-3">
            <View className="flex-row  gap-3 items-center">
              <Image
                className="w-8 h-8"
                source={require("@/assets/images/cash.png")}
              />
              <Text
                className="mt-1 text-lg"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Cash
              </Text>
            </View>
            <FontAwesome
              name="chevron-right"
              // color={"#FFC100"}
              className=" -mt-4 absolute right-0 top-8"
              size={15}
            />
          </View>
        </Pressable>
      </View>
      <View className="h-20 absolute bottom-10 left-0 right-0 flex justify-center items-center">
        <Button
          onPress={() => router.push("/(dashboard)/location")}
          className=""
          buttonStyle={{
            width: 300,
            height: 45,
            display: "flex",
            position: "relative",
          }}
          color={"black"}
          radius={"xl"}
        >
          <Text
            className="text-[#FFC100] text-lg "
            style={{ fontFamily: "Inter_300Light" }}
          >
           Set Up Later
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

export default PaymentMethod;
