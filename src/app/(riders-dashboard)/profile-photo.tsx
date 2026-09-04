import { Button } from "@rneui/base";
import { Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfilePhoto = () => {
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
        Take your profile photo
      </Text>
      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm mt-5">
        NorthRide has partnered with trusted service providers to collect and
        verify your profile photo. This session is video enabled and may be
        recorded. Please note that once you submit your profile photo it can
        only be changed in limited circumstances.
      </Text>
      <View className="mt-2">
        <Text className="text-xs">
          1. Face the camera directly with your eyes and mouth clearly visible
        </Text>
        <Text className="text-xs">
          2. Make sure the photo is well lit, free of glare, and in focus
        </Text>
        <Text className="text-xs">
          3. No photos of a photo, filters, or alterations
        </Text>
      </View>
      <View className=" flex mt-2 justify-center items-center">
        <View className="h-56 w-[90%] rounded-xl bg-light-gray1"></View>
        <Text style={{ fontFamily: "Inter_600SemiBold" }} className=" mt-3">
          Upload Photo
        </Text>
      </View>

      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-xs mt-5">
        By taking your profile photo, you agree that NorthRide and our service
        providers may use facial recognition technology to verify your identity
        by comparing your profile photo to the photo on your ID document. This
        involves processing your personal information, which may include
        biometric data, as set out in the service provider’s respective privacy
        notice . NorthRide may also use your profile photo to check for
        duplication across other accounts. Learn More
      </Text>

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

export default ProfilePhoto;
