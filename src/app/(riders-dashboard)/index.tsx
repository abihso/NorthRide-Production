import { Button } from "@rneui/base";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const CITIES = ["Tamale", "Accra", "Kumasi", "Takoradi"];

const EarnWithNorthRide = () => {
  const [selectedCity, setSelectedCity] = useState("Tamale");
  const [referralCode, setReferralCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 py-3 px-5">
          {/* Header */}
          <View className="h-10 flex-row justify-between items-center">
            <Iconify icon="material-symbols:arrow-back-rounded" size={24} />
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-lg"
            >
              NorthRide
            </Text>
            <Text
              className="py-2 bg-light-gray1 px-4 rounded-2xl"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Help
            </Text>
          </View>

          {/* Main Content */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View>
              <Image
                source={require("@/assets/images/income.png")}
                className="w-40 h-40 mt-10 ml-2"
              />
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-3xl mt-2"
              >
                Earn with NorthRide
              </Text>
              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-lg mt-2"
              >
                Decide when, where, and how you want to earn.
              </Text>

              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-lg mt-5"
              >
                Where would you like to earn?
              </Text>

              {/* Custom City Selector */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
                className="h-16 bg-light-gray1 rounded-3xl mt-2 flex-row justify-between items-center px-5"
              >
                <Text
                  style={{ fontFamily: "Inter_400Regular" }}
                  className="text-lg text-black"
                >
                  {selectedCity}
                </Text>
                <Iconify
                  icon="akar-icons:chevron-down"
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>

              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-lg mt-8"
              >
                Referral code (optional)
              </Text>

              {/* Referral Code Input */}
              <View className="h-16 bg-light-gray1 rounded-3xl mt-2 justify-center px-5">
                <TextInput
                  value={referralCode}
                  onChangeText={setReferralCode}
                  placeholder="Enter code"
                  placeholderTextColor="#8E8E93"
                  style={{ fontFamily: "Inter_400Regular" }}
                  className="text-lg text-black w-full h-full"
                  autoCapitalize="characters"
                />
              </View>

              <Text
                style={{ fontFamily: "Inter_400Regular" }}
                className="text-sm mt-8 text-light-black2 mb-5"
              >
                By proceeding, I agree that Uber or its representatives may
                contact me by email, phone, or SMS (including by automatic
                telephone dialing system) at the email address or number I
                provide, including for marketing purposes.
              </Text>
            </View>

            {/* Bottom Button inside ScrollView */}
            <View className="py-4">
              <Button
                onPress={() => router.push("/(riders-dashboard)/drive-by")}
                radius={20}
                className="h-34"
                buttonStyle={{
                  height: 50,
                  backgroundColor: "black",
                  display: "flex",
                  gap: 3,
                }}
              >
                <Text
                  style={{ fontFamily: "Inter_400Regular" }}
                  className="text-light-pink text-2xl"
                >
                  Next
                </Text>
                <Iconify
                  icon="akar-icons:arrow-right"
                  size={24}
                  color={"#FDBF07"}
                />
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {/* Custom Picker Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="flex-1 justify-center items-center bg-black/50 px-5">
            <View className="w-full bg-white rounded-3xl p-5 max-h-80">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-xl mb-3 text-center"
              >
                Select City
              </Text>
              <FlatList
                data={CITIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="py-3 border-b border-gray-100 flex-row justify-between items-center"
                    onPress={() => {
                      setSelectedCity(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{ fontFamily: "Inter_400Regular" }}
                      className="text-lg text-black"
                    >
                      {item}
                    </Text>
                    {selectedCity === item && (
                      <Iconify icon="akar-icons:check" size={20} color="#000" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default EarnWithNorthRide;
