import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriveBy = () => {
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

      {/* Option 1: Drive by Car */}
      <View className="flex flex-row justify-between items-center border-2 border-[#FFC100] bg-[#EEEEEE] rounded-2xl mt-7 px-4 py-4">
        <View className="flex-1 pr-2">
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="bg-[#FFC100] w-20 py-2 text-center rounded-xl"
          >
            Ride
          </Text>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base mt-2"
          >
            Drive by car
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
            Age: 25+
          </Text>
          <View className="flex flex-row items-center gap-1">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              Vehicle :
            </Text>
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm"
            >
              Car from 2000 or newer
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              License :
            </Text>
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm"
            >
              Valid Ghanaian driving license
            </Text>
          </View>
        </View>

        <View className="items-center justify-center">
          {/* Changed to car asset to match Figma */}
          <Image
            source={require("@/assets/images/motor.png")}
            className="w-28 h-20"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Option 2: Motorcycle */}
      <View className="flex flex-row justify-between items-center bg-[#EEEEEE] rounded-2xl mt-4 px-4 py-4">
        <View className="flex-1 pr-2">
          <View className="flex-row gap-3">
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="bg-[#FFC100] w-20 py-2 text-center rounded-xl"
            >
              Ride
            </Text>
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="bg-[#AAEFCD] w-24 py-2 text-center rounded-xl"
            >
              Delivery
            </Text>
          </View>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-base mt-2"
          >
            I want to ride and deliver with my motorcycle
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm">
            Age: 18+
          </Text>

          <View className="flex flex-row items-center gap-1">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-base"
            >
              License :
            </Text>
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm"
            >
              Valid Ghanaian driving license
            </Text>
          </View>
        </View>

        <View className="items-center justify-center">
          <Image
            source={require("@/assets/images/motor.png")}
            className="w-28 h-20"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Alternative Option Link */}
      <Text style={{ fontFamily: "Inter_400Regular" }} className="text-sm mt-4">
        Request a ride instead
      </Text>

      {/* Bottom Sticky Action Button */}
      <View className="px-6 absolute left-0 right-0 bottom-10">
        <Button
          onPress={() => router.push("/(riders-dashboard)/join-as")}
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
            Next
          </Text>
          <Iconify icon="akar-icons:arrow-right" size={24} color={"#FDBF07"} />
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DriveBy;
