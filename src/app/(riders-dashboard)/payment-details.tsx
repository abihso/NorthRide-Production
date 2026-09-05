import { Button } from "@rneui/base";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentDetails = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "bank">("momo");
  const [billingType, setBillingType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const billingOptions = ["Personal", "NorthRide delivery ltd"];

  const handleSelectBillingType = (option: string) => {
    setBillingType(option);
    setIsModalVisible(false);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleSaveAndContinue = () => {
    router.push("/(riders-dashboard)/driver-license");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="h-10 flex-row justify-between items-center mt-3">
          <Pressable onPress={handleBack}>
            <Iconify icon="material-symbols:arrow-back-rounded" size={24} />
          </Pressable>
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
          Payment Details
        </Text>

        {/* Payment Method Toggle */}
        <View className="bg-light-gray1 p-1 h-14 rounded-3xl mt-5 border border-light-gray5 flex-row justify-between items-center">
          <Pressable
            onPress={() => setPaymentMethod("momo")}
            className="w-[48%] h-full items-center justify-center rounded-3xl"
            style={
              paymentMethod === "momo"
                ? { backgroundColor: "white" }
                : undefined
            }
          >
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className={`text-base ${
                paymentMethod === "momo" ? "text-black" : "text-gray-500"
              }`}
            >
              Mobile Money
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setPaymentMethod("bank")}
            className="w-[48%] h-full items-center justify-center rounded-3xl"
            style={
              paymentMethod === "bank"
                ? { backgroundColor: "white" }
                : undefined
            }
          >
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className={`text-base ${
                paymentMethod === "bank" ? "text-black" : "text-gray-500"
              }`}
            >
              Bank
            </Text>
          </Pressable>
        </View>

        {/* Billing Type Selector (Dropdown) */}
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-xl mt-5"
        >
          Billing type <Text className="text-red-500">*</Text>
        </Text>
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="h-14 rounded-3xl mt-2 border border-light-gray5 bg-light-gray1 flex-row items-center justify-between px-4"
        >
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className={`text-base ${
              billingType ? "text-black" : "text-gray-400"
            }`}
          >
            {billingType || "Personal / NorthRide delivery ltd"}
          </Text>
          <Iconify icon="ri:arrow-drop-down-line" size={28} color="#6B7280" />
        </Pressable>

        {/* Account Holder Name */}
        <View className="mt-5 flex-row gap-1 items-baseline">
          <Text style={{ fontFamily: "Inter_600SemiBold" }} className="text-xl">
            Account holder name
          </Text>
          <Text
            style={{ fontFamily: "Inter_600SemiBold" }}
            className="text-xs text-gray-500"
          >
            (person or company) <Text className="text-red-500">*</Text>
          </Text>
        </View>
        <View className="h-14 rounded-3xl mt-2 border border-light-gray5 bg-light-gray1 justify-center px-4">
          <TextInput
            style={{ fontFamily: "Inter_600SemiBold" }}
            placeholder="Antwi Boasiako / NorthRide delivery ltd"
            className="flex-1"
          />
        </View>

        {/* Address */}
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-xl mt-5"
        >
          Address <Text className="text-red-500">*</Text>
        </Text>
        <View className="h-14 rounded-3xl mt-2 border border-light-gray5 bg-light-gray1 justify-center px-4">
          <TextInput
            style={{ fontFamily: "Inter_600SemiBold" }}
            placeholder="Please input your home address"
            className="flex-1"
          />
        </View>

        {/* Bank Account Number */}
        <Text
          style={{ fontFamily: "Inter_600SemiBold" }}
          className="text-xl mt-5"
        >
          Bank Account Number <Text className="text-red-500">*</Text>
        </Text>
        <View className="h-14 rounded-3xl mt-2 border border-light-gray5 bg-light-gray1 justify-center px-4">
          <TextInput
            style={{ fontFamily: "Inter_600SemiBold" }}
            placeholder="EE38 2200 2210 2014 5685"
            keyboardType="number-pad"
            className="flex-1"
          />
        </View>
      </ScrollView>

      {/* Billing Type Dropdown Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-end"
          onPress={() => setIsModalVisible(false)}
        >
          <View className="bg-white rounded-t-3xl p-5 pb-8">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-xl mb-4 text-center"
            >
              Select Billing Type
            </Text>

            {billingOptions.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleSelectBillingType(item)}
                className="py-4 border-b border-gray-100 flex-row justify-between items-center"
              >
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className={`text-base ${
                    billingType === item ? "text-black" : "text-gray-600"
                  }`}
                >
                  {item}
                </Text>
                {billingType === item && (
                  <Iconify
                    icon="material-symbols:check"
                    size={20}
                    color="black"
                  />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Fixed Bottom Action Button */}
      <View className="px-5 absolute left-0 right-0 bottom-6 bg-white py-2">
        <Button
          radius={20}
          buttonStyle={{
            height: 50,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
          onPress={handleSaveAndContinue}
        >
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-light-pink text-xl"
          >
            Save and Continue
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetails;
