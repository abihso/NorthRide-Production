import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const slideAnim = useRef(new Animated.Value(-350)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1700,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [slideAnim, scaleAnim]);

  return (
    <SafeAreaView className="flex-1 items-center bg-[#070706]">
      <View className="h-96 w-96 mt-10">
        <Animated.Image
          source={require("../../assets/images/waste.png")}
          style={{
            width: 350,
            height: 370,
            transform: [{ translateX: slideAnim }],
          }}
          resizeMode="contain"
        />

        <Animated.Text
          style={{
            fontFamily: "LuckiestGuy_400Regular",
            transform: [{ scale: scaleAnim }],
          }}
          className="text-white text-3xl -mt-36 ml-10 text-center"
        >
          North<Text className="text-[#DCA501]">Ride</Text>
        </Animated.Text>
      </View>

     <View className=" absolute bottom-10" >
       <ActivityIndicator size="large" color="#DCA501" className="mt-20" />
      
      <Text 
        style={{ fontFamily: "Inter_600SemiBold" }} 
        className="text-white text-4xl my-20"
      >
        WELCOME 
      </Text>
      <View className="flex flex-row justify-center gap-3 items-center" >
        <Text style={{ fontFamily: "Inter_600SemiBold" }}  className="text-white text-xs" >
          FAST
        </Text>
        <Text style={{ fontFamily: "Inter_600SemiBold" }}  className="text-white text-xs" >
          FAST
        </Text>
        <Text style={{ fontFamily: "Inter_600SemiBold" }}  className="text-white text-xs" >
          FAST
        </Text>
      </View>
     </View>
    </SafeAreaView>
  );
}
