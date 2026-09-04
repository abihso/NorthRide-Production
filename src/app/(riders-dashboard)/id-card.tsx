import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const IdCard = () => {
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

      {/* Sub-Header info */}
      <Text style={{ fontFamily: "Inter_300Light" }} className="text-xs mt-5">
        Signing up for
      </Text>
      <View className="flex-row items-center gap-2 mt-1">
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm">
          Accra
        </Text>
        <View className="w-1.5 h-1.5 bg-black rounded-full" />
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-sm">
          Rides
        </Text>
        <View className="w-1.5 h-1.5 bg-black rounded-full" />
        <Image
          source={require("@/assets/images/motor.png")}
          className="w-6 h-6"
          resizeMode="contain"
        />
      </View>

      {/* Greeting Title */}
      <Text
        style={{ fontFamily: "Inter_600SemiBold" }}
        className="text-3xl mt-5"
      >
        Welcome, Antwi Boasiako
      </Text>
      <Text
        style={{ fontFamily: "Inter_400Regular" }}
        className="text-sm mt-2 text-gray-600"
      >
        Complete 5 more steps to start earning
      </Text>

      {/* Steps List Card */}
      <View className="bg-light-gray1 rounded-3xl mt-8 px-5 py-2">
        {/* Step 1: Ghana Card */}
        <View className="flex-row justify-between items-center border-b py-4 border-light-gray3">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <Iconify icon="boxicons:user-id-card" size={24} />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Ghana Card
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#888888" />
        </View>

        {/* Step 2: Profile Picture */}
        <View className="flex-row justify-between items-center border-b py-4 border-light-gray3">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <Iconify icon="iconamoon:profile-circle-bold" size={24} />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Profile Picture
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#888888" />
        </View>

        {/* Step 3: Drivers License */}
        <View className="flex-row justify-between items-center border-b py-4 border-light-gray3">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <Iconify icon="ph:cardholder-bold" size={24} />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Drivers License
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#888888" />
        </View>

        {/* Step 4: Roadworthiness Sticker */}
        <View className="flex-row justify-between items-center border-b py-4 border-light-gray3">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <Iconify icon="tdesign:shortcut" size={24} />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Roadworthiness sticker from DVLA
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#888888" />
        </View>

        {/* Step 5: Insurance Sticker */}
        <View className="flex-row justify-between items-center py-4">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <Iconify
              icon="material-symbols:privacy-tip-outline-rounded"
              size={24}
            />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Insurance Sticker
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#888888" />
        </View>
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
          onPress={() => router.push("/(riders-dashboard)/ghana-card")}
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

export default IdCard;
