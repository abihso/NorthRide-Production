import type { LocationData } from "@/types/types";
import { decodePolyline, greenMapStyle } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView, WebViewNavigation } from "react-native-webview";

const url = process.env.EXPO_PUBLIC_BACKEND_URL;
const DEV = process.env.EXPO_PUBLIC_DEV === "dev";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

const CALLBACK_URL = "https://myapp.internal/paystack-callback";
const CANCEL_URL = "https://myapp.internal/paystack-cancel";

const ConfirmRoute = () => {
  const mapRef = useRef<MapView | null>(null);
  const modalMapRef = useRef<MapView | null>(null);
  const { screenName, phone } = useLocalSearchParams<{
    screenName: string;
    phone: string;
  }>();
  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [dropoff, setDropoff] = useState<LocationData | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [modal, setModal] = useState(false);
  const [durationMin, setDurationMin] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paymentType, setPaymentType] = useState<string | boolean>(false);
  // Paystack WebView State
  const [paystackUrl, setPaystackUrl] = useState<string | null>(null);
  const [showPaystackModal, setShowPaystackModal] = useState<boolean>(false);
  const [isInitializingPayment, setIsInitializingPayment] =
    useState<boolean>(false);
  const [isSubmittingCashOrder, setIsSubmittingCashOrder] =
    useState<boolean>(false);
  // console.log(screenName, phone);
  if (typeof phone == "undefined") {
    console.log("number is undefined");
  }
  const handleSubmit = async () => {
    if (calculatedPrice !== "0.00") {
      // await AsyncStorage.setItem("price", calculatedPrice);
      setModal(true);
    }
  };

  const payOnDelivery = async () => {
    try {
      setIsSubmittingCashOrder(true);
      axios
        .post(`${DEV ? "http://192.168.43.115:4000" : url}/api/deliveries`, {
          senderId: await AsyncStorage.getItem("userId"),
          deliveryType: screenName,
          pickupAddress: pickup?.address,
          pickupLatitude: pickup?.latitude,
          pickupLongitude: pickup?.longitude,
          pickupContactName: await AsyncStorage.getItem("fullname"),
          pickupContactPhone: await AsyncStorage.getItem("number"),
          dropoffAddress: dropoff?.address,
          dropoffLatitude: dropoff?.latitude,
          dropoffLongitude: dropoff?.longitude,
          recipientName: "not set yet",
          recipientPhone: typeof phone == "undefined" ? "not set yet" : phone,
          packageWeightKg: 1,
          distanceKm: durationMin,
          deliveryFee: calculatedPrice,
          totalAmount: calculatedPrice,
          paymentMethod: "paystack",
          paymentStatus: "pending",
        })
        .then(async (res) => {
          Alert.alert("message", "Oreder has been made successfully");
          setModal(false);
          await AsyncStorage.setItem("disableCancelButton", "!disabled");
          router.push("/(dashboard)/(orders)/lookingforrider");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      Alert.alert("Error", "Could not connect to the server.");
    } finally {
      setIsSubmittingCashOrder(false);
    }
  };

  const payRightNow = async () => {
    try {
      setIsInitializingPayment(true);

      const amountInSubunits = Math.round(parseFloat(calculatedPrice) * 100);
      const response = await fetch(
        `${DEV ? "http://192.168.43.115:4000" : url}/api/payments/initialize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountInSubunits,
            email: "customer@example.com",
            userId: await AsyncStorage.getItem("userId"),
            deliveryAddress: dropoff?.address,
            deliveryLatitude: dropoff?.latitude,
            deliveryLongitude: dropoff?.longitude,
          }),
        },
      );

      const result = await response.json();
      // console.log(screenName);

      if (result.success && result.data?.authorization_url) {
        await AsyncStorage.setItem("disableCancelButton", "disabled");
        setPaymentType("payRightNow");
        setPaystackUrl(result.data.authorization_url);
        setModal(false); // Close modal
        setShowPaystackModal(true); // Open WebView
      } else {
        Alert.alert(
          "Payment Error",
          result.message || "Unable to create payment transaction.",
        );
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      Alert.alert("Network Error", "Could not connect to the backend server.");
    } finally {
      setIsInitializingPayment(false);
    }
  };

  const handleNavigationStateChange = async (state: WebViewNavigation) => {
    const { url } = state;
    if (!url) return;

    if (url.startsWith(CALLBACK_URL)) {
      setShowPaystackModal(false);
      setPaystackUrl(null);
      if (paymentType === "payRightNow") {
        axios
          .post(`${DEV ? "http://192.168.43.115:4000" : url}/api/deliveries`, {
            senderId: await AsyncStorage.getItem("userId"),
            deliveryType: screenName,
            pickupAddress: pickup?.address,
            pickupLatitude: pickup?.latitude,
            pickupLongitude: pickup?.longitude,
            pickupContactName: await AsyncStorage.getItem("fullname"),
            pickupContactPhone: await AsyncStorage.getItem("number"),
            dropoffAddress: dropoff?.address,
            dropoffLatitude: dropoff?.latitude,
            dropoffLongitude: dropoff?.longitude,
            recipientName: "not set yet",
            recipientPhone: typeof phone == "undefined" ? "not set yet" : phone,
            packageWeightKg: 1,
            distanceKm: durationMin,
            deliveryFee: calculatedPrice,
            totalAmount: calculatedPrice,
            paymentMethod: "paystack",
            paymentStatus: "paidandwaiting",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
      if (paymentType === "payOnDelivery") {
        axios
          .post(`${DEV ? "http://192.168.43.115:4000" : url}/api/deliveries`, {
            senderId: await AsyncStorage.getItem("userId"),
            deliveryType: screenName,
            pickupAddress: pickup?.address,
            pickupLatitude: pickup?.latitude,
            pickupLongitude: pickup?.longitude,
            pickupContactName: await AsyncStorage.getItem("fullname"),
            pickupContactPhone: await AsyncStorage.getItem("number"),
            dropoffAddress: dropoff?.address,
            dropoffLatitude: dropoff?.latitude,
            dropoffLongitude: dropoff?.longitude,
            recipientName: "not set yet",
            recipientPhone: "not set yet",
            packageWeightKg: 1,
            distanceKm: durationMin,
            deliveryFee: calculatedPrice,
            totalAmount: calculatedPrice,
            paymentMethod: "paystack",
            paymentStatus: "pending",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }

      Alert.alert("Success", "Payment processed! Finding a rider...");
      return router.push("/(dashboard)/(orders)/lookingforrider");
    }

    if (
      url.startsWith(CANCEL_URL) ||
      url === "https://standard.paystack.co/close"
    ) {
      setShowPaystackModal(false);
      setPaystackUrl(null);
      Alert.alert("Cancelled", "Payment process was cancelled.");
    }
  };

  useEffect(() => {
    const loadRouteData = async () => {
      try {
        const storedPickup = await AsyncStorage.getItem("pickupLocation");
        const storedDropoff = await AsyncStorage.getItem("dropoffLocation");

        if (!storedPickup || !storedDropoff) {
          Alert.alert(
            "Error",
            "Pickup or dropoff location missing from storage.",
          );
          setIsLoading(false);
          return;
        }

        const parsedPickup: LocationData = JSON.parse(storedPickup);
        const parsedDropoff: LocationData = JSON.parse(storedDropoff);

        setPickup(parsedPickup);
        setDropoff(parsedDropoff);

        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${parsedPickup.latitude},${parsedPickup.longitude}&destination=${parsedDropoff.latitude},${parsedDropoff.longitude}&key=${GOOGLE_PLACES_API_KEY}`;

        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (data.status === "OK" && data.routes.length > 0) {
          const route = data.routes[0];
          const leg = route.legs[0];

          const distInKm = leg.distance.value / 1000;
          const durInMinutes = Math.ceil(leg.duration.value / 60);

          setDurationMin(durInMinutes);

          const totalPrice = (5 + distInKm * 2.5).toFixed(2);
          setCalculatedPrice(totalPrice);

          const decodedCoords = decodePolyline(route.overview_polyline.points);
          setRouteCoordinates(decodedCoords);

          setTimeout(() => {
            mapRef.current?.fitToCoordinates(
              [
                {
                  latitude: parsedPickup.latitude,
                  longitude: parsedPickup.longitude,
                },
                {
                  latitude: parsedDropoff.latitude,
                  longitude: parsedDropoff.longitude,
                },
              ],
              {
                edgePadding: { top: 60, right: 60, bottom: 120, left: 60 },
                animated: true,
              },
            );
          }, 400);
        } else {
          Alert.alert("Route Error", "Could not calculate route path.");
        }
      } catch (error) {
        console.error("Failed to load route data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRouteData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-5/6 bg-black">
        {pickup && dropoff ? (
          <MapView
            ref={mapRef}
            provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: pickup.latitude,
              longitude: pickup.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={
              Platform.OS === "android" ? greenMapStyle : undefined
            }
          >
            <Marker
              coordinate={{
                latitude: pickup.latitude,
                longitude: pickup.longitude,
              }}
              title="Pickup"
              description={pickup.address}
              pinColor="green"
            />
            <Marker
              coordinate={{
                latitude: dropoff.latitude,
                longitude: dropoff.longitude,
              }}
              title="Dropoff"
              description={dropoff.address}
              pinColor="red"
            />
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={5}
                strokeColor="#208AEF"
              />
            )}
          </MapView>
        ) : (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FDBF07" />
          </View>
        )}
      </View>

      <View className="bg-light-gray1 h-full -mt-20 rounded-t-3xl p-10">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Image
              source={require("@/assets/images/scotter_no_bg.png")}
              className="h-16 w-16"
            />
            <View>
              <Text
                className="text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                {dropoff?.address
                  ? dropoff.address.split(",")[0]
                  : "Destination"}
              </Text>
              <Text
                className="text-[10px]"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                Motorcycle Ride
              </Text>
            </View>
          </View>

          <View className="items-end">
            <Text
              className="text-[10px]"
              style={{ fontFamily: "Inter_300Light" }}
              numberOfLines={1}
            >
              {durationMin ? `${durationMin} min ride` : "Calculating..."}
            </Text>
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              GH₵ {calculatedPrice}
            </Text>
          </View>
        </View>

        <Button
          radius={"xl"}
          buttonStyle={{ backgroundColor: "black", marginTop: 25, height: 50 }}
          onPress={handleSubmit}
        >
          <Text
            className="text-xl text-light-pink"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Confirm route
          </Text>
        </Button>
      </View>

      {/* Payment Selection Modal */}
      {modal && (
        <View className="absolute inset-0 z-50 bg-black/90 flex-col justify-center items-center">
          <View className="w-5/6 h-4/6 bg-light-gray1 rounded-3xl p-5">
            <View
              className="h-3/5 rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                elevation: 6,
                zIndex: 10,
              }}
            >
              {pickup && dropoff ? (
                <MapView
                  ref={modalMapRef}
                  provider={
                    Platform.OS === "android" ? PROVIDER_GOOGLE : undefined
                  }
                  style={{ flex: 1 }}
                  initialRegion={{
                    latitude: pickup.latitude,
                    longitude: pickup.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                  }}
                  customMapStyle={
                    Platform.OS === "android" ? greenMapStyle : undefined
                  }
                >
                  <Marker
                    coordinate={{
                      latitude: pickup.latitude,
                      longitude: pickup.longitude,
                    }}
                    title="Pickup"
                    pinColor="green"
                  />
                  <Marker
                    coordinate={{
                      latitude: dropoff.latitude,
                      longitude: dropoff.longitude,
                    }}
                    title="Dropoff"
                    pinColor="red"
                  />
                  {routeCoordinates.length > 0 && (
                    <Polyline
                      coordinates={routeCoordinates}
                      strokeWidth={5}
                      strokeColor="#208AEF"
                    />
                  )}
                </MapView>
              ) : (
                <View className="flex-1 justify-center items-center bg-white">
                  <ActivityIndicator size="large" color="#FDBF07" />
                </View>
              )}
            </View>

            <Button
              onPress={payOnDelivery}
              loading={isSubmittingCashOrder}
              disabled={isSubmittingCashOrder}
              radius={"xl"}
              buttonStyle={{ backgroundColor: "#f1f1f1" }}
              containerStyle={{
                borderRadius: 30,
                marginTop: 40,
                height: 50,
                justifyContent: "center",
                // Drop shadow props
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                elevation: 3,
              }}
            >
              <Text
                className="text-xl text-black"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Pay on delivery
              </Text>
            </Button>

            <Button
              radius={"xl"}
              onPress={payRightNow}
              loading={isInitializingPayment}
              disabled={isInitializingPayment}
              buttonStyle={{ backgroundColor: "black" }}
              containerStyle={{
                borderRadius: 30,
                marginTop: 20,
                height: 50,
                justifyContent: "center",
                // Drop shadow props
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 6,
              }}
            >
              <Text
                className="text-xl text-white"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Pay right away
              </Text>
            </Button>
          </View>
        </View>
      )}

      {/* Paystack Checkout WebView Modal */}
      <Modal
        visible={showPaystackModal}
        animationType="slide"
        onRequestClose={() => setShowPaystackModal(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">Complete Payment</Text>
            <TouchableOpacity onPress={() => setShowPaystackModal(false)}>
              <Text className="text-red-500 font-bold text-base">Close</Text>
            </TouchableOpacity>
          </View>
          {paystackUrl && (
            <WebView
              source={{ uri: paystackUrl }}
              onNavigationStateChange={handleNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={() => (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#FDBF07" />
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ConfirmRoute;
