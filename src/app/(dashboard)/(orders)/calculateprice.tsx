import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@rneui/base";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

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

  // Polyline decoder helper
  const decodePolyline = (encoded: string) => {
    let points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }
    return points;
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

          {/* PAYMENT METHOD DROPDOWN */}
          <View className="bg-white rounded-2xl border border-gray-200 mt-4 overflow-hidden">
            <Picker
              selectedValue={paymentMethod}
              onValueChange={(itemValue) => setPaymentMethod(itemValue)}
              dropdownIconColor="black"
            >
              <Picker.Item label="Cash Payment" value="cash" />
              <Picker.Item label="Mobile Money (MTN / Telecel)" value="momo" />
              <Picker.Item label="Credit / Debit Card" value="card" />
            </Picker>
          </View>

          <Button
            onPress={() => router.push("/(dashboard)/(orders)/comfirmroute")}
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
