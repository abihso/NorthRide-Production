import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Text, View, Image } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriversLicense = () => {
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
        Take a photo of your Drivers License
      </Text>
      <View className=" flex mt-5 justify-center items-center">
        <View className="h-40 w-[90%] rounded-3xl bg-light-gray1"></View>
        <Text style={{ fontFamily: "Inter_600SemiBold" }}>Front</Text>
      </View>
      <View className=" flex mt-2 justify-center items-center">
        <View className="h-40 w-[90%] rounded-3xl bg-light-gray1"></View>
        <Text style={{ fontFamily: "Inter_600SemiBold" }}>Back</Text>
      </View>
      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm mt-5">
        To drive with Uber in Ghana, you must hold a valid Ghanaian driver’s
        license that meets DVLA requirements. This confirms you’re legally
        allowed to operate a vehicle and are at least 21 years old.
      </Text>
      <Text style={{ fontFamily: "Inter_600SemiBold" }} className="my-2 ml-5">
        Follow these tips to upload your ID:
      </Text>
      <View className="flex-row items-center gap-2">
        <View className="w-2 h-2 rounded-full bg-black" />
        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
          Capture the front side first and then the back side second
        </Text>
      </View>
      <View className="flex-row items-center gap-2 mt-1 ">
        <View className="w-2 h-2 rounded-full bg-black" />
        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
          Make sure your full name, date of birth, and ID number are clearly
          visible.
        </Text>
      </View>
      <View className="flex-row items-center gap-2 mt-1 ">
        <View className="w-2 h-2 rounded-full bg-black" />
        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
          Check that the ID is valid (not expired) and free of damage or heavy
          glare.
        </Text>
      </View>
      <View className="flex-row items-center gap-2 mt-1 ">
        <View className="w-2 h-2 rounded-full bg-black" />
        <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
          The name on your ID should match the name on your NorthRide’s profile
          and driver’s license.
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
          onPress={() => router.push("/(riders-dashboard)/roadworthiness")}
        >
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-light-pink text-xl"
          >
            Take Photo
          </Text>
          {/* <Iconify icon="akar-icons:arrow-right" size={24} color={"#FDBF07"} /> */}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DriversLicense;
