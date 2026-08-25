import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Location = () => {
  return (
    <SafeAreaView className=" flex-1 bg-white px-7 py-5">
        <View className="h-96 mt-10">
        <Image
          resizeMode="stretch"
          className="h-full w-full"
          source={require("@/assets/images/globe.jpeg")}
        />
      </View>
      <Text className="text-2xl mt-5" style={{ fontFamily: "Inter_600SemiBold" }}>
        Share Your Location To find
      </Text>
      <Text className="text-2xl" style={{ fontFamily: "Inter_600SemiBold" }}>
       The best Ride/Delivery 
      </Text>
      <Text className="text-2xl" style={{ fontFamily: "Inter_600SemiBold" }}>
       Around
      </Text>
      <Text className="text-[8px] mt-1 text-[#767676]" style={{ fontFamily: "Inter_400Regular" }}>
        Your Location
      </Text>
      <Text className="text-xs mt-1" style={{ fontFamily: "Inter_400Regular" }}>
        NO ACCESS
      </Text>
      
      <View className="h-20 absolute bottom-10 left-0 right-0 flex justify-center items-center">
        <Button
          onPress={() => router.push("/(dashboard)/(home)")}
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

export default Location;
