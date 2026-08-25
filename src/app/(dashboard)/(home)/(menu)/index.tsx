import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  return (
    <SafeAreaView className="flex-1 px-5 py-3 bg-white">
      <ScrollView>
        <Text
          className="text-3xl mt-2"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Menu
        </Text>
        <Text
          className="text-xs"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Go anywhere, get anything
        </Text>
        <View className="h-14 bg-light-gray1 rounded-2xl mt-5 flex-row items-center justify-between px-4">
          <View className="flex-row items-center gap-5">
            <View className="w-10 h-10 bg-[#3BFF00] rounded-full flex-row items-center justify-center">
              <Iconify icon="eva:pricetags-fill" size={24} color="black" />
            </View>
            <View>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_400Regular" }}
                numberOfLines={1}
              >
                Get 50% discount on your first 3 rides
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_400Regular" }}
                numberOfLines={1}
              >
                View details
              </Text>
            </View>
          </View>
          <FontAwesome name="close" size={15} />
        </View>
        <Text
          className="text-2xl mt-5"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Ride
        </Text>
        <Pressable onPress={() => router.push("/(dashboard)/(orders)")} >
          <View className="h-28 bg-light-gray1 rounded-3xl mt-4 flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/scotter_no_bg.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Rides
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Let’s get moving
              </Text>
            </View>
          </View>
        </Pressable>
        <Text
          className="text-2xl mt-5"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Delivery
        </Text>
        <View className="min-h-48 bg-light-gray1 rounded-3xl mt-4 py-3">
          <View className="h-28 bg-light-gray1 rounded-3xl flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/maninfrontofwomandoor.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Send
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Do you want to send an item?
              </Text>
            </View>
          </View>
          <View className="border-b border-light-gray3 w-[80%] self-end mr-3" />
          <View className="h-28 bg-light-gray1 rounded-3xl flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/deliverying.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Receive
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Do you want to receive an item
              </Text>
            </View>
          </View>
        </View>
        <Text
          className="text-2xl mt-5"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Buy
        </Text>
        <View className="min-h-48 bg-light-gray1 rounded-3xl mt-4 py-3">
          <View className="h-28 bg-light-gray1 rounded-3xl flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/food.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Food
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Let’s get moving
              </Text>
            </View>
          </View>
          <View className="border-b border-light-gray3 w-[80%] self-end mr-3" />
          <View className="h-28 bg-light-gray1 rounded-3xl flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/scotter_no_bg.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Medicine
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Let’s get moving
              </Text>
            </View>
          </View>
          <View className="border-b border-light-gray3 w-[80%] self-end mr-3" />
          <View className="h-28 bg-light-gray1 rounded-3xl flex-row items-center gap-4 p-5">
            <View className=" w-20 h-20 bg-light-gray2 rounded-xl flex-row items-center justify-center">
              <Image
                className="w-16 h-16"
                source={require("@/assets/images/Groceries.png")}
              />
            </View>
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Groceries
              </Text>
              <Text
                className="text-xs text-light-black1"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Let’s get moving
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
