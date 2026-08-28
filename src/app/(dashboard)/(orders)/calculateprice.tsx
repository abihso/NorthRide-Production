import { decodePolyline } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { greenMapStyle } from "@/utils";
import type { LocationData } from "@/types/types";
import type { PaymentOption } from "@/types/types";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

const PAYMENT_OPTIONS: PaymentOption[] = [
  { label: "Cash Payment", value: "cash" },
  { label: "Mobile Money (MTN / Telecel)", value: "momo" },
  { label: "Credit / Debit Card", value: "card" },
];

const CalculatePrice = () => {
  const mapRef = useRef<MapView | null>(null);

  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [dropoff, setDropoff] = useState<LocationData | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [durationMin, setDurationMin] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
      return router.push("/(dashboard)/(orders)/comfirmroute");
  };

  // Fetch saved locations & calculate route
  useEffect(() => {
    const loadRouteData = async () => {
      try {
        const storedPickup = await AsyncStorage.getItem("pickupLocation");
        const storedDropoff = await AsyncStorage.getItem("dropoffLocation");

        if (!storedPickup || !storedDropoff) {
          Alert.alert("Error", "Pickup or dropoff location not found.");
          setIsLoading(false);
          return;
        }

        const parsedPickup: LocationData = JSON.parse(storedPickup);
        const parsedDropoff: LocationData = JSON.parse(storedDropoff);

        setPickup(parsedPickup);
        setDropoff(parsedDropoff);

        // Fetch Directions Route from Google Maps API
        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${parsedPickup.latitude},${parsedPickup.longitude}&destination=${parsedDropoff.latitude},${parsedDropoff.longitude}&key=${GOOGLE_PLACES_API_KEY}`;

        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (data.status === "OK" && data.routes.length > 0) {
          const route = data.routes[0];
          const leg = route.legs[0];

          // Extract Distance & Duration
          const distInMeters = leg.distance.value;
          const distInKm = distInMeters / 1000;
          const durInMinutes = Math.ceil(leg.duration.value / 60);

          setDistanceKm(distInKm);
          setDurationMin(durInMinutes);

          // Dynamic Price Formula: Base Fare (5 GH₵) + Distance Fare (2.50 GH₵/km)
          const baseFare = 5;
          const ratePerKm = 2.5;
          const totalPrice = (baseFare + distInKm * ratePerKm).toFixed(2);
          setCalculatedPrice(totalPrice);

          // Decode Polyline
          const decodedCoords = decodePolyline(route.overview_polyline.points);
          setRouteCoordinates(decodedCoords);

          // Fit Map View to markers
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
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              },
            );
          }, 500);
        } else {
          Alert.alert(
            "Route Error",
            "Could not calculate route between locations.",
          );
        }
      } catch (error) {
        console.error("Error loading route:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRouteData();
  }, []);

  const selectedPaymentLabel =
    PAYMENT_OPTIONS.find((item) => item.value === paymentMethod)?.label ||
    "Select payment method";

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* MAP VIEW WITH POLYLINE */}
      <View className="h-[400px]">
        {pickup && dropoff ? (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: pickup.latitude,
              longitude: pickup.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={greenMapStyle}
          >
            {/* Pickup Marker */}
            <Marker
              coordinate={{
                latitude: pickup.latitude,
                longitude: pickup.longitude,
              }}
              title="Pickup"
              description={pickup.address}
              pinColor="green"
            />

            {/* Dropoff Marker */}
            <Marker
              coordinate={{
                latitude: dropoff.latitude,
                longitude: dropoff.longitude,
              }}
              title="Dropoff"
              description={dropoff.address}
              pinColor="red"
            />

            {/* Route Polyline */}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={5}
                strokeColor="#208AEF"
              />
            )}
          </MapView>
        ) : (
          <View className="flex-1 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#A98516" />
          </View>
        )}
      </View>

      <ScrollView className="px-5 py-2">
        {/* PICKUP DISPLAY */}
        <View className="h-20 bg-light-gray1 rounded-full flex-row justify-between items-center px-4">
          <View className="flex-row items-center gap-2 flex-1">
            <Iconify icon="weui:location-outlined" size={24} color="green" />
            <View className="flex-1 pr-2">
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                {pickup?.address || "Loading pickup..."}
              </Text>
              <Text
                className="text-[9px] text-light-black2"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                Pickup Location
              </Text>
            </View>
          </View>

          <Text
            className="text-xs text-light-black2"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Pickup
          </Text>
        </View>

        {/* DROPOFF DISPLAY */}
        <View className="h-20 bg-light-gray1 rounded-full flex-row justify-between items-center px-4 mt-5">
          <View className="flex-row items-center gap-2 flex-1">
            <Iconify icon="weui:location-outlined" size={24} color="red" />
            <View className="flex-1 pr-2">
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                {dropoff?.address || "Loading dropoff..."}
              </Text>
              <Text
                className="text-[9px] text-light-black2"
                style={{ fontFamily: "Inter_300Light" }}
                numberOfLines={1}
              >
                {distanceKm
                  ? `${distanceKm.toFixed(1)} km away`
                  : "Dropoff Location"}
              </Text>
            </View>
          </View>

          <Text
            className="text-xs text-light-black2"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Dropoff
          </Text>
        </View>

        {/* PRICE & PAYMENT SELECTION */}
        <View className="min-h-40 bg-light-gray1 mt-5 mb-10 rounded-3xl px-4 py-3">
          <View className="h-20 border rounded-3xl border-[#A1AC03] flex-row justify-between items-center px-3">
            <View className="flex-row gap-2 items-center">
              <Image
                source={require("@/assets/images/scotter_no_bg.png")}
                className="h-16 w-16"
              />
              <View>
                <Text
                  className="text-xl"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  Motorcycle Ride
                </Text>
                <Text
                  className="text-xs text-light-black2"
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  numberOfLines={1}
                >
                  {durationMin ? `${durationMin} min ride` : "Calculating..."}
                </Text>
              </View>
            </View>
            <Text
              className="text-xs"
              style={{ fontFamily: "Inter_600SemiBold" }}
              numberOfLines={1}
            >
              GH₵ {calculatedPrice}
            </Text>
          </View>

          {/* PAYMENT METHOD SELECTOR */}
          <Pressable
            onPress={() => setIsPickerVisible(true)}
            className="bg-white rounded-2xl border border-gray-200 mt-4 px-4 py-3 flex-row justify-between items-center"
          >
            <Text
              className="text-sm text-black"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              {selectedPaymentLabel}
            </Text>
            <Text className="text-xs text-black">▼</Text>
          </Pressable>

          {/* PAYMENT METHOD DROPDOWN MODAL */}
          <Modal visible={isPickerVisible} transparent animationType="fade">
            <Pressable
              className="flex-1 bg-black/40 justify-center px-6"
              onPress={() => setIsPickerVisible(false)}
            >
              <View className="bg-white rounded-2xl p-2 shadow-lg">
                {PAYMENT_OPTIONS.map((item) => (
                  <Pressable
                    key={item.value}
                    onPress={() => {
                      setPaymentMethod(item.value);
                      setIsPickerVisible(false);
                    }}
                    className="p-4 border-b border-gray-100 last:border-b-0 flex-row justify-between items-center"
                  >
                    <Text
                      className="text-sm text-black"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      {item.label}
                    </Text>
                    {paymentMethod === item.value && (
                      <Text
                        className="text-sm text-black"
                        style={{ fontFamily: "Inter_600SemiBold" }}
                      >
                        ✓
                      </Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>

          <Button
            onPress={handleSubmit}
            radius={"xl"}
            buttonStyle={{
              backgroundColor: "black",
              marginTop: 15,
              height: 50,
            }}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalculatePrice;
