import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Insurance = () => {
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
      <Text
        style={{ fontFamily: "Inter_600SemiBold" }}
        className="text-3xl mt-5"
      >
        Take your Insurance Sticker from the insurance company
      </Text>
      <View className=" flex mt-5 justify-center items-center">
        <View className="h-96 w-[90%] rounded-3xl bg-light-gray1"></View>
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className=" mt-3">
          Upload Photo
        </Text>
      </View>

      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs mt-5">
        Your vehicle must have a valid DVLA Roadworthiness sticker. This
        confirms your vehicle meets the safety standards required by the Driver
        and Vehicle Licensing Authority (DVLA).
      </Text>
      <Text
        style={{ fontFamily: "Inter_600SemiBold" }}
        className="text-sm mt-5 "
      >
        Follow these tips to upload your sticker:
      </Text>
      <View className="mt-2">
        <Text className="text-xs" style={{ fontFamily: "Inter_400Regular" }}>
          1. Make sure the DVLA logo, QR code, and serial number are clearly
          visible.
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Inter_400Regular" }}>
          2. The license plate on the sticker must match your vehicle’s plate.
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Inter_400Regular" }}>
          3. The sticker must not be expired.
        </Text>
        <Text className="text-xs" style={{ fontFamily: "Inter_400Regular" }}>
          4. Show all four corners of the sticker to avoid rejections.
        </Text>
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
          onPress={() => router.push("/(riders-dashboard)/payment-details")}
        >
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-light-pink text-xl"
          >
            Take Photo
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Insurance;
