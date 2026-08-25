import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Avatar } from "@rneui/base";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView className="flex-1 px-5 py-3 bg-white">
      <ScrollView>
        <FontAwesome name="close" size={15} />
        <Text
          className="text-3xl mt-2"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Settings
        </Text>
        <Pressable>
          <View className="h-20 bg-light-gray1 rounded-full mt-4 flex-row justify-between items-center px-4">
            <View className="flex-row items-center gap-3">
              <Avatar
                size={44}
                rounded
                source={{
                  uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
                }}
              />
              <View className=" ">
                <Text
                  className="text-lg"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Antwi Boasiako Theophilus
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  +233 55 574 7931
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  antwiboasiakotheophilus88@gmail.com
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" />
          </View>
        </Pressable>
        <View className="h-16 mt-5 bg-light-pink rounded-full flex-row items-center px-8 gap-2 ">
          <Image
            className="w-10 h-10"
            source={require("@/assets/images/award.png")}
          />
          <View>
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              Enjoy smoother and safer delivery/rides
            </Text>
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              Verify your account
            </Text>
          </View>
        </View>
        <View className="min-h-40 bg-light-gray1 mt-3 rounded-3xl p-5">
          <Pressable onPress={() => router.push("/(dashboard)/(home)/(settings)/add-home")} >
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify icon="mynaui:home-solid" size={24} color="black" />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Add Home
              </Text>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify icon="gg:work-alt" size={24} color="black" />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Add Work
              </Text>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify icon="gg:work-alt" size={24} color="black" />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Shortcuts/Saved places
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Manage saved locations
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify
                icon="material-symbols:privacy-tip-outline-rounded"
                size={24}
                color="black"
              />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Privacy
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Manage the data you share with us
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify
                icon="famicons:accessibility-outline"
                size={24}
                color="black"
              />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Accessibility
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Manage your accessibility setings
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify
                icon="fluent:people-communication-24-regular"
                size={24}
                color="black"
              />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Communication
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Choose your prefered contact method
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 py-2 flex-row items-center gap-2">
              <Iconify icon="pajamas:appearance" size={24} color="black" />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Appearance
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Light mode
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
        </View>
        <View className="min-h-40 bg-light-gray1 mt-3 rounded-3xl p-5">
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify
                icon="pinhead:tipi-campsite-with-dollar"
                size={24}
                color="black"
              />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Tip Automatically
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Set a defualt tip amount for every ride/delivery
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
              <Iconify icon="tabler:reserved-line" size={24} color="black" />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Reserve
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Choose how you’re matched with riders when you book ahead
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
          <Pressable>
            <View className="h-14 py-2 flex-row items-center gap-2">
              <Iconify
                icon="streamline-freehand:alerts-warning-triangle"
                size={24}
                color="black"
              />
              <View>
                <Text
                  className="text-sm"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Commute alerts
                </Text>
                <Text
                  className="text-xs"
                  style={{ fontFamily: "Inter_300Light" }}
                  numberOfLines={1}
                >
                  Get notifications to request rides/delivery at the right time
                </Text>
              </View>
              <FontAwesome
                className=" absolute -right-2"
                name="chevron-right"
                size={10}
              />
            </View>
          </Pressable>
        </View>
        <View className="min-h-40 bg-light-gray1 mt-3 rounded-3xl p-5">
          <Pressable className=" border-b-[0.5px] py-3 border-[#C4BEBE]">
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              Switch Account
            </Text>
          </Pressable>
          <Pressable className=" border-b-[0.5px] py-3 border-[#C4BEBE]">
            <Text
              className="text-sm text-red-400"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
             Sign Out
            </Text>
          </Pressable>
          <Pressable className="py-3 border-[#C4BEBE]">
            <Text
              className="text-sm text-red-400"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
             Delete Account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
