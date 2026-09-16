import { UI } from "@/utils/ui";
import { Button } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const GhanaCard = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  // Function to request permissions and launch camera
  const takePhoto = async (type: "front" | "back") => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to capture your Ghana Card.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      if (type === "front") {
        setFrontImage(result.assets[0].uri);
      } else {
        setBackImage(result.assets[0].uri);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Fixed Top Header */}
      <View className="h-10 flex-row justify-between items-center px-5 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Iconify icon="material-symbols:arrow-back-rounded" size={24} />
        </TouchableOpacity>
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

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-3xl mt-5"
        >
          Take a photo of your Ghana Card
        </Text>

        {/* Front Card Capture Area */}
        <View className="flex mt-5 justify-center items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => takePhoto("front")}
            className="h-40 w-[90%] rounded-3xl bg-light-gray1 overflow-hidden justify-center items-center border border-dashed border-gray-300"
          >
            {frontImage ? (
              <Image
                source={{ uri: frontImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center gap-1">
                <Iconify icon="solar:camera-outline" size={32} color="#666" />
                <Text className="text-xs text-gray-500">
                  Tap to capture front
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="mt-1">
            Front
          </Text>
        </View>

        {/* Back Card Capture Area */}
        <View className="flex mt-2 justify-center items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => takePhoto("back")}
            className="h-40 w-[90%] rounded-3xl bg-light-gray1 overflow-hidden justify-center items-center border border-dashed border-gray-300"
          >
            {backImage ? (
              <Image
                source={{ uri: backImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center gap-1">
                <Iconify icon="solar:camera-outline" size={32} color="#666" />
                <Text className="text-xs text-gray-500">
                  Tap to capture back
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="mt-1">
            Back
          </Text>
        </View>

        <Text
          style={{ fontFamily: "Inter_400Regular" }}
          className="text-sm mt-5"
        >
          To verify your identity please upload the front and back of your valid
          National Identity Card. You must be at least 21 years old.
        </Text>

        <Text style={{ fontFamily: "Inter_600SemiBold" }} className="my-2 ml-5">
          Follow these tips to upload your ID:
        </Text>

        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-black" />
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-sm flex-1"
          >
            Capture the front side first and then the back side second
          </Text>
        </View>

        <View className="flex-row items-center gap-2 mt-1">
          <View className="w-2 h-2 rounded-full bg-black" />
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-sm flex-1"
          >
            Make sure your full name, date of birth, and ID number are clearly
            visible.
          </Text>
        </View>

        <View className="flex-row items-center gap-2 mt-1">
          <View className="w-2 h-2 rounded-full bg-black" />
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-sm flex-1"
          >
            Check that the ID is valid (not expired) and free of damage or heavy
            glare.
          </Text>
        </View>

        <View className="flex-row items-center gap-2 mt-1">
          <View className="w-2 h-2 rounded-full bg-black" />
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-sm flex-1"
          >
            The name on your ID should match the name on your NorthRide’s
            profile and driver’s license.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Button */}
      <View className="px-6 absolute left-0 right-0 bottom-6 bg-white pt-2">
        <Button
          radius={20}
          disabled={!frontImage || !backImage}
          buttonStyle={{
            height: UI.buttonHeight,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
          onPress={() =>
            router.push({
              pathname: "/(riders-dashboard)/profile-photo",
              params: { frontImage, backImage },
            })
          }
        >
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-light-pink text-xl"
          >
            Continue
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default GhanaCard;
