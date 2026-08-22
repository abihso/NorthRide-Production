import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input } from "@rneui/themed";
import axios from "axios";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activeShadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const Register = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Verification & loading state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifyError, setVerifyError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Array of refs for each OTP input field
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const [data, setData] = useState({
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    const newErrors = { emailOrPhone: "", password: "", confirmPassword: "" };
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

    if (data.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      hasError = true;
    }

    if (data.confirmPassword !== data.password) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      axios
        .post(
          "http://192.168.43.115:4000/api/users",
          {
            email:
              activeTab === "email"
                ? data.emailOrPhone.trim().toLowerCase()
                : data.emailOrPhone.trim(),
            passwordHash: data.password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setIsModalVisible(true);
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

  const handleOtpChange = (text: string, index: number) => {
    if (verifyError) setVerifyError("");

    // Handle multi-character paste (e.g. user pastes 6 digits)
    if (text.length > 1) {
      const pastedDigits = text.replace(/[^0-9]/g, "").slice(0, 6).split("");
      const newOtp = [...otp];

      pastedDigits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });

      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-advance to the next input field if a character was entered
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // If current box is empty and user hits backspace, delete previous digit and move focus back
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const code = otp.join("");
    if (code.length < 6) {
      setVerifyError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setVerifyError("");

    axios
      .post(
        "http://192.168.43.115:4000/api/verify-email",
        {
          email:
            activeTab === "email"
              ? data.emailOrPhone.trim().toLowerCase()
              : data.emailOrPhone.trim(),
          code: code,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Verification successful:", res);
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log("Verification failed:", err);
        setVerifyError(
          err.response?.data?.message || "Invalid code. Please try again."
        );
      })
      .finally(() => {
        setIsVerifying(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 28,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
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
                Hi
              </Text>
              <Text
                style={{ fontFamily: "Inter_600SemiBold" }}
                className="text-black text-5xl"
              >
                there!
              </Text>
              <Text
                className="text-[#01032D] mt-4 shadow-slate-400 mb-4"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Join us for the best delivery system
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

              {/* Confirm Password Input */}
              <Input
                style={{ fontFamily: "Inter_400Regular" }}
                placeholder="Confirm Password"
                secureTextEntry={!isConfirmPasswordVisible}
                value={data.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
                errorMessage={errors.confirmPassword}
                rightIcon={
                  <Pressable
                    onPress={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    <Ionicons
                      name={
                        isConfirmPasswordVisible
                          ? "eye-outline"
                          : "eye-off-outline"
                      }
                      size={22}
                      color="#888"
                    />
                  </Pressable>
                }
                inputContainerStyle={{
                  borderWidth: 1,
                  borderColor: errors.confirmPassword ? "red" : "#E0E0E0",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  marginLeft: -15,
                }}
              />

              <View className="flex justify-center mt-3">
                <Button
                  radius={"xl"}
                  color={"black"}
                  buttonStyle={{
                    height: 50,
                  }}
                  onPress={handleRegister}
                >
                  <Text
                    style={{ fontFamily: "Inter_600SemiBold" }}
                    className="text-[#FDBF07] text-xl"
                  >
                    Sign up
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

              <View className="flex flex-row justify-between mt-8">
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

            <View className="w-44 h-44 bg-[#EDEDEA] rounded-3xl absolute -bottom-30 left-20 -rotate-45 z-0" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Verification Overlay Modal */}
      {isModalVisible && (
        <View className="absolute inset-0 z-50 bg-black/40 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-6 w-full items-center relative">
            {/* Close Icon (X) matching design */}
            <Pressable
              onPress={() => {
                setIsModalVisible(false);
                setVerifyError("");
              }}
              className="absolute top-4 right-4 p-2"
            >
              <Ionicons name="close" size={22} color="black" />
            </Pressable>

            {/* Dynamic Icon Badge */}
            <View className="w-14 h-14 bg-[#E0C038] rounded-2xl justify-center items-center mb-6 mt-2">
              <Ionicons
                name={activeTab === "email" ? "mail" : "chatbox-ellipses"}
                size={28}
                color="white"
              />
            </View>

            {/* Dynamic Title */}
            <Text
              className="text-2xl font-bold text-black text-center mb-2"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              {activeTab === "email" ? "Check your email" : "Check your sms"}
            </Text>

            {/* Dynamic Description */}
            <Text
              className="text-gray-600 text-center text-sm px-2 mb-4"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              We sent a verification code to{"\n"}
              <Text className="font-bold text-black">
                {data.emailOrPhone ||
                  (activeTab === "email"
                    ? "your email address"
                    : "+233 55****369555")}
              </Text>
            </Text>

            {/* Verification Error Message Alert */}
            {verifyError ? (
              <View className="flex-row items-center bg-red-50 border border-red-200 px-3 py-2 rounded-xl mb-4 w-full justify-center gap-1.5">
                <Ionicons name="alert-circle" size={18} color="#EF4444" />
                <Text
                  className="text-red-500 text-xs font-semibold text-center"
                  style={{ fontFamily: "Inter_400Regular" }}
                >
                  {verifyError}
                </Text>
              </View>
            ) : null}

            {/* 6 Digit Input Boxes */}
            <View className="flex-row justify-between w-full mb-6 px-1">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6}
                  className={`w-11 h-12 bg-black rounded-xl text-white text-center text-xl font-bold ${
                    verifyError ? "border-2 border-red-500" : ""
                  }`}
                />
              ))}
            </View>

            {/* Verify Button with loading indicator */}
            <Pressable
              onPress={handleVerifyCode}
              disabled={isVerifying}
              className="bg-black w-full py-4 rounded-full items-center mb-6 flex-row justify-center"
            >
              {isVerifying ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text
                  className="text-white text-base font-semibold"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                >
                  Verify
                </Text>
              )}
            </Pressable>

            {/* Back to log in Link */}
            <Pressable
              onPress={() => {
                setIsModalVisible(false);
                setVerifyError("");
              }}
              className="flex-row items-center gap-1"
            >
              <Ionicons name="arrow-back" size={16} color="black" />
              <Text
                className="text-black text-xs font-medium"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Back to log in
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Register;