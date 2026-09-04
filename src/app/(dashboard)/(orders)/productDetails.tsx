import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@rneui/base";
import * as Contacts from "expo-contacts/legacy";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";
interface Country {
  code: string;
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  { code: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
];

const ProductDeatils: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isCountryModalVisible, setIsCountryModalVisible] =
    useState<boolean>(false);
  const { screenName } = useLocalSearchParams<{ screenName: string }>();

  // Form State for Name and Phone
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Validation Error State
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Phone Number Selection Modal States (for contacts with multiple numbers)
  const [isPhoneModalVisible, setIsPhoneModalVisible] =
    useState<boolean>(false);
  const [availableNumbers, setAvailableNumbers] = useState<
    Contacts.PhoneNumber[]
  >([]);

  // Helper function to resolve Contact name safely across all expo-contacts types
  const getContactName = (
    contact: Contacts.ExistingContact | Contacts.Contact,
  ): string => {
    const safeContact = contact as {
      name?: string;
      firstName?: string;
      middleName?: string;
      lastName?: string;
    };

    if (safeContact.name) return safeContact.name;

    const parts = [
      safeContact.firstName,
      safeContact.middleName,
      safeContact.lastName,
    ].filter(Boolean);

    return parts.join(" ") || "Unknown Contact";
  };

  // Helper function to format and set selected phone number
  const applyPhoneNumber = (rawNumber: string) => {
    let cleaned = rawNumber.replace(/[^\d+]/g, "");

    if (cleaned.startsWith(selectedCountry.code)) {
      cleaned = cleaned.replace(selectedCountry.code, "").trim();
    } else if (cleaned.startsWith("+")) {
      const foundCountry = COUNTRIES.find((c) => cleaned.startsWith(c.code));
      if (foundCountry) {
        setSelectedCountry(foundCountry);
        cleaned = cleaned.replace(foundCountry.code, "").trim();
      }
    }

    setPhone(cleaned);
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  // Main Handler to request permissions & open phone contacts UI safely
  const handleSelectContact = async (): Promise<void> => {
    try {
      // 1. Explicitly request permissions before calling any contact picker
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "NorthRide needs access to your contacts to easily select receiver details.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }

      // 2. Safely attempt Native Picker UI with fallback
      let contact: Contacts.ExistingContact | Contacts.Contact | null = null;
      try {
        contact = await Contacts.presentContactPickerAsync();
      } catch (pickerError) {
        console.warn(
          "Native contact picker failed, falling back to direct fetch:",
          pickerError,
        );

        // Fallback for Android devices where presentContactPickerAsync crashes or fails
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
          pageSize: 1,
        });

        if (data && data.length > 0) {
          contact = data[0];
        }
      }

      // 3. Process Selected Contact
      if (contact) {
        const contactName = getContactName(contact);
        setName(contactName);
        if (contactName) {
          setErrors((prev) => ({ ...prev, name: undefined }));
        }

        const phoneNumbers = contact.phoneNumbers || [];

        if (phoneNumbers.length === 1 && phoneNumbers[0]?.number) {
          applyPhoneNumber(phoneNumbers[0].number);
        } else if (phoneNumbers.length > 1) {
          setAvailableNumbers(phoneNumbers);
          setIsPhoneModalVisible(true);
        }
      }
    } catch (error: any) {
      console.error("Error selecting contact: ", error);
      Alert.alert(
        "Contact Access Error",
        "Unable to retrieve contact details. Please check app permissions in settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }
  };

  // Form Submission Validation Handler
  const handleContinue = async () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter receiver's name";
    }
    if (!phone.trim()) {
      newErrors.phone = "Please enter phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any remaining errors and proceed
    setErrors({});
    console.log("Proceeding with details:", {
      name,
      phone,
      country: selectedCountry.code,
    });
    // await AsyncStorage.setItem("phone", JSON.stringify(phone));
    router.push({
      pathname: "/(dashboard)/(orders)/comfirmroute",
      params: {
        screenName,
        phone
      },
    });
  };

  return (
    <SafeAreaView className="px-5 py-2 flex-1 bg-white">
      {/* Fixed Header Content */}
      <Pressable className="p-1">
        <Iconify icon="material-symbols:arrow-back-rounded" size={24} />
      </Pressable>
      <Text
        style={{ fontFamily: "Inter_600SemiBold" }}
        className="text-2xl mt-2"
      >
        Delivery details
      </Text>

      {/* Scrollable Main Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="h-52 mt-5 rounded-3xl bg-light-gray1 p-5 flex gap-5 ">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <View className="bg-white p-3 rounded-full flex-row justify-center items-center">
                <Image
                  className="w-10 h-10"
                  source={require("@/assets/images/motor.png")}
                />
              </View>
              <View>
                <Text
                  style={{ fontFamily: "Inter_300Light" }}
                  className="text-xs"
                >
                  Pickup in 19 min
                </Text>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-sm"
                >
                  Kronum, kumasi
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={15} />
          </View>
          <View className="border-b border-light-gray2 w-[95%] self-end  " />
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <View className="bg-white p-3 rounded-full flex-row justify-center items-center">
                <Image
                  className="w-10 h-10"
                  source={require("@/assets/images/motor.png")}
                />
              </View>
              <View>
                <Text
                  style={{ fontFamily: "Inter_300Light" }}
                  className="text-xs"
                >
                  Pickup in 19 min
                </Text>
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-sm"
                >
                  Kronum, kumasi
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={15} />
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-5">
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xl">
            Receiver
          </Text>
          <Pressable onPress={handleSelectContact}>
            <Text
              style={{ fontFamily: "Inter_400Regular" }}
              className="text-sm text-[#1B9100]"
            >
              Add from Contacts
            </Text>
          </Pressable>
        </View>

        <View className="mt-5 rounded-3xl bg-light-gray1 p-5 flex gap-2">
          {/* Name Input */}
          <Input
            style={{ fontFamily: "Inter_300Light" }}
            placeholder="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            errorMessage={errors.name}
            errorStyle={{ color: "#D92D20", marginLeft: 5, marginTop: 4 }}
            containerStyle={{ paddingHorizontal: 0 }}
            inputContainerStyle={{
              borderColor: errors.name ? "#D92D20" : "#DEDEDE",
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 12,
              backgroundColor: "#F5F5F5",
            }}
          />

          <View className="flex-row items-start gap-2">
            {/* Country Code Trigger Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsCountryModalVisible(true)}
              className="flex-row items-center justify-between px-3 h-[50px] bg-[#F5F5F5] border border-[#DEDEDE] rounded-[20px] min-w-[105px]"
            >
              <Text className="text-base mr-1">{selectedCountry.flag}</Text>
              <Text
                className="text-sm text-black mr-1"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {selectedCountry.code}
              </Text>
              <FontAwesome name="chevron-down" size={12} color="#555" />
            </TouchableOpacity>

            {/* Phone Number Input */}
            <View className="flex-1">
              <Input
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                errorMessage={errors.phone}
                errorStyle={{ color: "#D92D20", marginLeft: 5, marginTop: 4 }}
                containerStyle={{ paddingHorizontal: 0 }}
                inputContainerStyle={{
                  borderColor: errors.phone ? "#D92D20" : "#DEDEDE",
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  backgroundColor: "#F5F5F5",
                  height: 50,
                }}
                inputStyle={{
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 14,
                }}
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        <View className="h-52 mt-5 rounded-3xl bg-light-gray1 p-5 flex-row justify-between items-center ">
          <View>
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-xl mb-3"
            >
              Check requirements
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="h-2 w-2 bg-black rounded-full" />
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-sm"
              >
                Fits in delivery bag
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <View className="h-2 w-2 bg-black rounded-full" />
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-sm"
              >
                Fits on delivery bike
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <View className="h-2 w-2 bg-black rounded-full" />
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-sm"
              >
                Up to 30 kg
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <View className="h-2 w-2 bg-black rounded-full" />
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-sm"
              >
                Up to 120*80*60 cm
              </Text>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <View className="h-2 w-2 bg-black rounded-full" />
              <Text
                style={{ fontFamily: "Inter_300Light" }}
                className="text-sm"
              >
                Max GHS 500 value
              </Text>
            </View>
          </View>
          <View className="mr-5">
            <Image
              className="w-24 h-24"
              source={require("@/assets/images/motor.png")}
            />
          </View>
        </View>

        <View className="h-28 mt-5 rounded-3xl bg-light-gray1 p-5">
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xl">
            Check requirements
          </Text>
          <Text style={{ fontFamily: "Inter_300Light" }} className="text-xs">
            Prescription medication, drugs (both legal and illegal), alcohol,
            firearms, weapons, illegal items, or any dangerous item
          </Text>
        </View>

        <View className="h-28 mt-5 rounded-3xl bg-light-gray1 p-5">
          <Text style={{ fontFamily: "Inter_300Light" }} className="text-xs">
            By using NorthRide send, you accept the Terms and Conditions.
            Parcels must comply with our local laws. Illegal activities will be
            reported to authorities and can result in loss of access to the
            NorthRide’s platform. All items are sent at your own risk{" "}
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Button Container */}
      <View className="pt-2 pb-1 bg-white">
        <Button
          radius={"xl"}
          buttonStyle={{ backgroundColor: "black", height: 50 }}
          onPress={handleContinue}
        >
          <Text
            className="text-xl text-light-pink"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Continue
          </Text>
        </Button>
      </View>

      {/* Country Code Picker Modal */}
      <Modal
        visible={isCountryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setIsCountryModalVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-5 max-h-[50%]">
            <Text
              className="text-lg mb-3"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Select Country
            </Text>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row items-center py-3 border-b border-gray-100"
                  onPress={() => {
                    setSelectedCountry(item);
                    setIsCountryModalVisible(false);
                  }}
                >
                  <Text className="text-xl mr-3">{item.flag}</Text>
                  <Text
                    className="flex-1 text-base"
                    style={{ fontFamily: "Inter_400Regular" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-base text-gray-600"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {item.code}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal to Select Phone Number when Contact has multiple numbers */}
      <Modal
        visible={isPhoneModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPhoneModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-end"
          activeOpacity={1}
          onPress={() => setIsPhoneModalVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-5 max-h-[50%]">
            <Text
              className="text-lg mb-3"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Select Phone Number
            </Text>
            <FlatList
              data={availableNumbers}
              keyExtractor={(item, index) =>
                item.id || item.number || index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-100"
                  onPress={() => {
                    if (item.number) {
                      applyPhoneNumber(item.number);
                    }
                    setIsPhoneModalVisible(false);
                  }}
                >
                  {item.label && (
                    <Text
                      className="text-xs text-gray-400 capitalize mb-1"
                      style={{ fontFamily: "Inter_400Regular" }}
                    >
                      {item.label}
                    </Text>
                  )}
                  <Text
                    className="text-base text-black"
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  >
                    {item.number}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductDeatils;
