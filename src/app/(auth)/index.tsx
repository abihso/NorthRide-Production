import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const activeShadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const url = process.env.EXPO_PUBLIC_BACKEND_URL;
const DEV = process.env.EXPO_PUBLIC_DEV === "dev";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [data, setData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleLogin = () => {
    const newErrors = { emailOrPhone: "", password: "" };
    let hasError = false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (activeTab === "email") {
      if (!data.emailOrPhone) {
        newErrors.emailOrPhone = "Email is required";
        hasError = true;
      } else if (!emailRegex.test(data.emailOrPhone)) {
        newErrors.emailOrPhone = "Please enter a valid email address";
        hasError = true;
      }
    } else {
      if (!data.emailOrPhone) {
        newErrors.emailOrPhone = "Phone number is required";
        hasError = true;
      } else if (!phoneRegex.test(data.emailOrPhone.trim())) {
        newErrors.emailOrPhone = "Please enter a valid phone number";
        hasError = true;
      }
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (data.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      axios
        .post(
          `${DEV ? "http://192.168.43.115:4000" : url}/api/login`,
          {
            email:
              activeTab === "email"
                ? data.emailOrPhone.trim().toLowerCase()
                : data.emailOrPhone.trim(),
            password: data.password,
          },
          { withCredentials: true },
        )
        .then(async (res) => {
          await AsyncStorage.setItem(
            "userId",
            JSON.stringify(res.data.user.userId),
          );
          await AsyncStorage.setItem(
            "number",
            JSON.stringify(res.data.user.phoneNumber),
          );
          await AsyncStorage.setItem(
            "fullname",
            JSON.stringify(res.data.user.fullName),
          );
          console.log(res.data.user.userType);
          if (res.data.user.userType == "rider") {
            // router.push("/(riders-dashboard)");
            router.push("/(dashboard)");
          } else if (res.data.user.userType == "customer") {
            router.push("/(dashboard)");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setData((prev) => ({ ...prev, emailOrPhone: "" }));
    setErrors((prev) => ({ ...prev, emailOrPhone: "" }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 28,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View>
            {/* Tab Switcher Header */}
            <View className="h-16 px-1.5 bg-[#F1F1F1] rounded-3xl flex justify-between items-center flex-row">
              <Pressable
                onPress={() => handleTabChange("email")}
                className={`w-2/4 py-3 rounded-3xl ${
                  activeTab === "email" ? "bg-white" : "bg-transparent"
                }`}
                style={activeTab === "email" ? activeShadowStyle : {}}
              >
                <Text
                  className={`text-center ${
                    activeTab === "email" ? "text-black" : "text-gray-500"
                  }`}
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Email
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleTabChange("phone")}
                className={`w-2/4 py-3 rounded-3xl ${
                  activeTab === "phone" ? "bg-white" : "bg-transparent"
                }`}
                style={activeTab === "phone" ? activeShadowStyle : {}}
              >
                <Text
                  className={`text-center ${
                    activeTab === "phone" ? "text-black" : "text-gray-500"
                  }`}
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  Phone
                </Text>
              </Pressable>
            </View>

            {/* Main Form Container */}
            <View className="bg-[#F1F1F1] rounded-2xl mt-10 px-5 py-8">
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-black text-5xl"
              >
                Welcome
              </Text>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-black text-5xl"
              >
                Back
              </Text>
              <Text
                className="text-[#01032D] mt-4 shadow-slate-400"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Enter your {activeTab === "email" ? "email" : "phone number"}{" "}
                and
              </Text>
              <Text
                className="text-[#01032D] shadow-slate-400 mb-4"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                password to login
              </Text>

              {/* Dynamic Input (Email / Phone) */}
              <Input
                style={{ fontFamily: "Inter_400Regular" }}
                placeholder={activeTab === "email" ? "Email" : "Phone Number"}
                keyboardType={
                  activeTab === "email" ? "email-address" : "phone-pad"
                }
                value={data.emailOrPhone}
                onChangeText={(text) => handleInputChange("emailOrPhone", text)}
                errorMessage={errors.emailOrPhone}
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: errors.emailOrPhone ? "red" : "#E0E0E0",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginLeft: -15,
                }}
              />

              {/* Password Input */}
              <Input
                style={{ fontFamily: "Inter_400Regular" }}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={data.password}
                onChangeText={(text) => handleInputChange("password", text)}
                errorMessage={errors.password}
                rightIcon={
                  <Pressable
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Ionicons
                      name={
                        isPasswordVisible ? "eye-outline" : "eye-off-outline"
                      }
                      size={22}
                      color="#888"
                    />
                  </Pressable>
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: errors.password ? "red" : "#E0E0E0",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginLeft: -15,
                }}
              />

              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-xs text-right pr-2"
              >
                Forgot password
              </Text>

              <View className="flex justify-center mt-5">
                <Button
                  radius={"xl"}
                  color={"black"}
                  buttonStyle={{
                    height: 50,
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className="text-[#FDBF07] text-xl"
                  >
                    Sign in
                  </Text>
                </Button>
              </View>

              <View className="flex flex-row justify-between items-center mt-5">
                <View className="border-b border-[#A9A9A9] w-2/6" />
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-xs"
                >
                  Or continue with
                </Text>
                <View className="border-b border-[#A9A9A9] w-2/6" />
              </View>

              <View className="flex flex-row justify-between mt-10">
                <Pressable className="flex-row items-center gap-2 py-2 px-5 border border-[#E0E0E0] w-3/6 rounded-3xl">
                  <Image
                    className="w-10 h-10"
                    source={require("../../../assets/images/facebook.png")}
                  />
                  <Text style={{ fontFamily: "Inter_600SemiBold" }}>
                    Facebook
                  </Text>
                </Pressable>

                <Pressable className="flex-row items-center py-2 px-5 gap-2 border border-[#E0E0E0] w-3/6 rounded-3xl">
                  <Image
                    className="w-10 h-10"
                    source={require("../../../assets/images/gmail.png")}
                  />
                  <Text style={{ fontFamily: "Inter_600SemiBold" }}>Gmail</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Bottom Area */}
          <View className="relative mt-12 pb-4">
            <View className="flex-row gap-3 justify-center items-center z-10 relative">
              <Text
                style={{ fontFamily: "Inter_600SemiBold", fontSize: 10 }}
                className="text-[#4A4946]"
              >
                policies
              </Text>
              <Text
                style={{ fontFamily: "Inter_600SemiBold", fontSize: 10 }}
                className="text-[#4A4946]"
              >
                Supports
              </Text>
              <Text
                style={{ fontFamily: "Inter_600SemiBold", fontSize: 10 }}
                className="text-[#4A4946]"
              >
                Help center
              </Text>
            </View>

            <View className="w-44 h-44 bg-[#EDEDEA] rounded-3xl absolute -bottom-24 -left-10 -rotate-12 z-0" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
