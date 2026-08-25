import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { SearchBar } from "@rneui/themed";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";
const AddHome = () => {
  const [search, setSearch] = useState("");
  const updateSearch = (search: string) => {
    setSearch(search);
  };
  const [showModal, setShowModal] = useState(false)
  return (
    <SafeAreaView className="flex-1 px-5 py-3 bg-white">
     <Pressable onPress={() => router.back()} >
         <FontAwesome className="p-1" name="long-arrow-left" size={15} />
     </Pressable>
      <Text
        className="text-3xl mt-2"
        style={{ fontFamily: "Inter_600SemiBold" }}
        numberOfLines={1}
      >
        Add Home
      </Text>

      <SearchBar
        placeholder="Search here"
        onChangeText={updateSearch}
        value={search}
        style={{ fontFamily: "Inter_600SemiBold" }}
        containerStyle={{
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          marginTop: 10,
        }}
        inputStyle={{
          backgroundColor: "#F2F2F2",
        }}
        inputContainerStyle={{
          backgroundColor: "#F2F2F2",
          borderRadius: 30,
        }}
      />
      <Text
        className="text-sm text-right my-2"
        style={{ fontFamily: "Inter_600SemiBold" }}
        numberOfLines={1}
      >
        Clear
      </Text>
      <View className="min-h-40 bg-light-gray1 mt-3 rounded-3xl p-5">
        <Pressable>
          <View className="h-14 border-b border-[#D0CCCC] py-2 flex-row items-center gap-2">
            <Iconify icon="weui:location-outlined" size={24} color="black" />
            <View>
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Kumasi
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                11km away from home now, last used 2nd January, 2026
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
            <Iconify icon="weui:location-outlined" size={24} color="black" />
            <View>
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Kumasi
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                11km away from home now, last used 2nd January, 2026
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
            <Iconify icon="weui:location-outlined" size={24} color="black" />
            <View>
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Kumasi
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                11km away from home now, last used 2nd January, 2026
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
            <Iconify icon="weui:location-outlined" size={24} color="black" />
            <View>
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Kronum
              </Text>
              <Text
                className="text-xs"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                11km away from home now, last used 2nd January, 2026
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
      <Button
        radius={"xl"}
        buttonStyle={{
          backgroundColor: "#F2F2F2",
          marginTop: 10,
          height: 45,
          display: "flex",
          justifyContent: "flex-start",
          gap: 15,
        }}
        onPress={() => setShowModal(true)}
      >
        <Iconify icon="iconamoon:location-light" size={24} color="black" />

        <Text
          className="text-sm"
          style={{ fontFamily: "Inter_600SemiBold" }}
          numberOfLines={1}
        >
          Current Location
        </Text>
      </Button>
     {
        showModal && (
             <View className="absolute inset-0 z-50 bg-black/40 px-6">
        <View className=" h-2/4 bg-white flex justify-center items-center absolute bottom-0 right-0 left-0">
            <Pressable onPress={() => setShowModal(false)} className=" absolute right-10 top-10" >
                <FontAwesome className="p-2" size={15} name="close" />
            </Pressable>
          <Image className="w-44 h-44" source={require("@/assets/images/womanatbeach_no_bg.png")} />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Allow location Access
          </Text>
          <Text
            className="text-sm"
            style={{ fontFamily: "Inter_400Regular" }}
            numberOfLines={1}
          >
            We need your location to find the nearby ride
          </Text>
          <Button
            radius={"xl"}
            buttonStyle={{
              backgroundColor: "black",
              marginTop: 15,
              height: 55,
              width : "100%"
            }}
          >

            <Text
              className="text-2xl text-light-pink"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              Open Setting
            </Text>
          </Button>
        </View>
      </View>
        )
     }
    </SafeAreaView>
  );
};

export default AddHome;
