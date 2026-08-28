import { ScrollView, Text, View } from "react-native";
import Iconify from "react-native-iconify/native";

const Past = () => {
  return (
    <ScrollView className="px-7 py-10 bg-white">
      <Text style={{ fontFamily: "Inter_600SemiBold" }}>July, 2026</Text>
      <View className="min-h-52 bg-light-gray1 py-3 px-7 rounded-3xl mt-5">
        {[1, 2, 3,4].map((item, index) => (
          <View key={index} className="flex-row justify-between border-b py-2 border-light-gray2">
            <View className="flex-row items-center gap-5">
              <Iconify
                icon="weui:location-outlined"
                size={24}
                color={"black"}
              />
              <View>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  Yesterday
                </Text>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Kumasi - Kumasi
                </Text>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  11km ride
                </Text>
              </View>
            </View>
            <View className="justify-end">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-light-black1 text-xs  "
              >
                GH₵ 20.00
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text className="mt-5" style={{ fontFamily: "Inter_600SemiBold" }}>July, 2026</Text>
      <View className="min-h-52 bg-light-gray1 py-3 px-7 rounded-3xl mt-5">
        {[1, 2, 3,4].map((item, index) => (
          <View key={index} className="flex-row justify-between border-b py-2 border-light-gray2">
            <View className="flex-row items-center gap-5">
              <Iconify
                icon="weui:location-outlined"
                size={24}
                color={"black"}
              />
              <View>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  Yesterday
                </Text>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Kumasi - Kumasi
                </Text>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  11km ride
                </Text>
              </View>
            </View>
            <View className="justify-end">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-light-black1 text-xs  "
              >
                GH₵ 20.00
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text className="mt-5" style={{ fontFamily: "Inter_600SemiBold" }}>July, 2026</Text>
      <View className="min-h-52 bg-light-gray1 py-3 px-7 rounded-3xl mt-5">
        {[1, 2, 3,4].map((item, index) => (
          <View key={index} className="flex-row justify-between border-b py-2 border-light-gray2">
            <View className="flex-row items-center gap-5">
              <Iconify
                icon="weui:location-outlined"
                size={24}
                color={"black"}
              />
              <View>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  Yesterday
                </Text>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Kumasi - Kumasi
                </Text>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-light-black1 text-xs"
                >
                  11km ride
                </Text>
              </View>
            </View>
            <View className="justify-end">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-light-black1 text-xs  "
              >
                GH₵ 20.00
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Past;
