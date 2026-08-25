import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "@rneui/base";
import { Avatar, SearchBar } from "@rneui/themed";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [search, setSearch] = useState("");
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Fixed Header */}
      <View className="h-14 bg-light-gray flex-row justify-between items-center px-5">
        <FontAwesome name="ellipsis-v" color="black" size={24} />
        <View className="flex-row gap-3">
          <Iconify icon="mdi:bell-outline" size={24} color="black" />
          <Iconify icon="ant-design:message-outlined" size={24} color="black" />
        </View>
      </View>

      {/* Vertical Scrollable Main Screen */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5">
          <View className="flex-row justify-between items-center mt-5">
            <View className="flex-row gap-2">
              <Iconify icon="weui:location-outlined" size={24} color="black" />
              <View>
                <Text
                  className="text-base"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Tamale, Nothern Region
                </Text>
                <Text
                  className="text-xs text-light-black"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Last Visit, Yesterday
                </Text>
              </View>
            </View>
            <Avatar
              size={44}
              rounded
              source={{
                uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
              }}
            />
          </View>

          <Text
            className="text-2xl mt-5 truncate"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Welcome, Theophilus...
          </Text>

          <View>
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
          </View>

          <Text
            className="text-xl mt-2"
            style={{ fontFamily: "Inter_400Regular" }}
            numberOfLines={1}
          >
            Shops
          </Text>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex-row gap-4 pt-3"
            >
              <View className="h-36 rounded-xl bg-[#F0F0F0] w-[140px] flex-col justify-center items-center">
                <Image
                  className="w-20 h-20"
                  source={require("@/assets/images/Groceries.png")}
                />
                <Text
                  className="text-xl mt-1 truncate"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  Groceries
                </Text>
              </View>
              <View className="h-36 rounded-xl bg-[#F0F0F0] w-[140px] flex-col justify-center items-center">
                <Image
                  className="w-20 h-20"
                  source={require("@/assets/images/food.png")}
                />
                <Text
                  className="text-xl mt-1 truncate"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  Food
                </Text>
              </View>
              <View className="h-36 rounded-xl bg-[#F0F0F0] w-[140px] flex-col justify-center items-center">
                <Image
                  className="w-20 h-20"
                  source={require("@/assets/images/motor.png")}
                />
                <Text
                  className="text-xl mt-1 truncate"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  Rides
                </Text>
              </View>
              <View className="h-36 rounded-xl bg-[#F0F0F0] w-[140px] flex-col justify-center items-center">
                <Image
                  className="w-20 h-20"
                  source={require("@/assets/images/Groceries.png")}
                />
                <Text
                  className="text-xl mt-1 truncate"
                  style={{ fontFamily: "Inter_400Regular" }}
                  numberOfLines={1}
                >
                  Groceries
                </Text>
              </View>
            </ScrollView>
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <Text
              className="text-xl mt-2"
              style={{ fontFamily: "Inter_400Regular" }}
              numberOfLines={1}
            >
              Promotion
            </Text>
            <Button
              radius={"xl"}
              buttonStyle={{
                display: "flex",
                gap: 10,
                paddingHorizontal: 25,
                backgroundColor: "#D9D9D9",
                height: 35,
              }}
            >
              <Text
                className="text-base text-black"
                style={{ fontFamily: "Inter_400Regular" }}
                numberOfLines={1}
              >
                See all
              </Text>
              <FontAwesome name="long-arrow-right" size={15} />
            </Button>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex-row gap-4 pt-3"
            >
              <View className="h-48 bg-[#ECECEC] rounded-2xl w-[250px]">
                <View className="h-32">
                  <Image
                    className="w-full h-full overflow-hidden rounded-t-2xl"
                    resizeMode="cover"
                    source={require("@/assets/images/yam.png")}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <Text
                    className="text-sm truncate"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    Assorted Jollof
                  </Text>
                  <View className="flex-row items-center">
                    <Iconify icon="ion:link-outline" size={24} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      15 KM away
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <View className="flex-row items-center">
                    <Iconify icon="weui:location-outlined" size={15} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      Tamale, Nothern Region
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Iconify icon="line-md:star-filled" size={14} color="black" />
                    <Text
                      className="text-[10px] truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
              </View>
              <View className="h-48 bg-[#ECECEC] rounded-2xl w-[250px]">
                <View className="h-32">
                  <Image
                    className="w-full h-full overflow-hidden rounded-t-2xl"
                    resizeMode="cover"
                    source={require("@/assets/images/yam.png")}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <Text
                    className="text-sm truncate"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    Assorted Jollof
                  </Text>
                  <View className="flex-row items-center">
                    <Iconify icon="ion:link-outline" size={24} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      15 KM away
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <View className="flex-row items-center">
                    <Iconify icon="weui:location-outlined" size={15} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      Tamale, Nothern Region
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Iconify icon="line-md:star-filled" size={14} color="black" />
                    <Text
                      className="text-[10px] truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View className="flex-row justify-between items-center mt-3">
            <Text
              className="text-xl mt-2"
              style={{ fontFamily: "Inter_400Regular" }}
              numberOfLines={1}
            >
              Suggested for you
            </Text>
            <Button
              radius={"xl"}
              buttonStyle={{
                display: "flex",
                gap: 10,
                paddingHorizontal: 25,
                backgroundColor: "#D9D9D9",
                height: 35,
              }}
            >
              <Text
                className="text-base text-black"
                style={{ fontFamily: "Inter_400Regular" }}
                numberOfLines={1}
              >
                See all
              </Text>
              <FontAwesome name="long-arrow-right" size={15} />
            </Button>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex-row gap-4 pt-3"
            >
              <View className="h-48 bg-[#ECECEC] rounded-2xl w-[250px]">
                <View className="h-32">
                  <Image
                    className="w-full h-full overflow-hidden rounded-t-2xl"
                    resizeMode="cover"
                    source={require("@/assets/images/yam.png")}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <Text
                    className="text-sm truncate"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    Assorted Jollof
                  </Text>
                  <View className="flex-row items-center">
                    <Iconify icon="ion:link-outline" size={24} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      15 KM away
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <View className="flex-row items-center">
                    <Iconify icon="weui:location-outlined" size={15} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      Tamale, Nothern Region
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Iconify icon="line-md:star-filled" size={14} color="black" />
                    <Text
                      className="text-[10px] truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
              </View>
              <View className="h-48 bg-[#ECECEC] rounded-2xl w-[250px]">
                <View className="h-32">
                  <Image
                    className="w-full h-full overflow-hidden rounded-t-2xl"
                    resizeMode="cover"
                    source={require("@/assets/images/yam.png")}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <Text
                    className="text-sm truncate"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    Assorted Jollof
                  </Text>
                  <View className="flex-row items-center">
                    <Iconify icon="ion:link-outline" size={24} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      15 KM away
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <View className="flex-row items-center">
                    <Iconify icon="weui:location-outlined" size={15} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      Tamale, Nothern Region
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Iconify icon="line-md:star-filled" size={14} color="black" />
                    <Text
                      className="text-[10px] truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
              </View>
              <View className="h-48 bg-[#ECECEC] rounded-2xl w-[250px]">
                <View className="h-32">
                  <Image
                    className="w-full h-full overflow-hidden rounded-t-2xl"
                    resizeMode="cover"
                    source={require("@/assets/images/yam.png")}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <Text
                    className="text-sm truncate"
                    style={{ fontFamily: "Inter_400Regular" }}
                    numberOfLines={1}
                  >
                    Assorted Jollof
                  </Text>
                  <View className="flex-row items-center">
                    <Iconify icon="ion:link-outline" size={24} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      15 KM away
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between items-center mt-1 px-3">
                  <View className="flex-row items-center">
                    <Iconify icon="weui:location-outlined" size={15} color="black" />
                    <Text
                      className="text-xs truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      Tamale, Nothern Region
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Iconify icon="line-md:star-filled" size={14} color="black" />
                    <Text
                      className="text-[10px] truncate"
                      style={{ fontFamily: "Inter_400Regular" }}
                      numberOfLines={1}
                    >
                      4.5
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;