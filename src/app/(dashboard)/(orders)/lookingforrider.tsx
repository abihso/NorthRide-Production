import type { LocationData } from "@/types/types";
import { decodePolyline } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearProgress } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";
import Iconify from "react-native-iconify/native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

const LookingForRiderRoute = () => {
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation();

  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [dropoff, setDropoff] = useState<LocationData | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [modal, setModal] = useState(false);
  const [disableButton, setDisableButton] = useState<string | null>(null);
  const [durationMin, setDurationMin] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleCancel = () => {
    Alert.alert("message", "Canceled");
    setTimeout(() => {
      setModal(false);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
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

        // Fetch route geometry & travel estimates from Google Directions API
        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${parsedPickup.latitude},${parsedPickup.longitude}&destination=${parsedDropoff.latitude},${parsedDropoff.longitude}&key=${GOOGLE_PLACES_API_KEY}`;

        const response = await fetch(directionsUrl);
        const data = await response.json();

        if (data.status === "OK" && data.routes.length > 0) {
          const route = data.routes[0];
          const leg = route.legs[0];

          const distInKm = leg.distance.value / 1000;
          const durInMinutes = Math.ceil(leg.duration.value / 60);

          setDurationMin(durInMinutes);

          // Pricing logic: Base fare (5 GH₵) + 2.50 GH₵/km
          const totalPrice = (5 + distInKm * 2.5).toFixed(2);
          setCalculatedPrice(totalPrice);

          // Decode Polyline Points
          const decodedCoords = decodePolyline(route.overview_polyline.points);
          setRouteCoordinates(decodedCoords);

          // Fit map boundaries to include both points
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
    })();

    (async () => {
      const i = await AsyncStorage.getItem("disableCancelButton");
      if (i != null) {
        setDisableButton(i);
      }
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
      await AsyncStorage.removeItem("disableCancelButton");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* MAP VIEW REPLACING BLACK CONTAINER */}
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
            // customMapStyle={greenMapStyle}
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
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FDBF07" />
          </View>
        )}
      </View>

      {/* OVERLAY SHEET */}
      <View className="bg-light-gray1 h-full -mt-20 rounded-t-3xl p-10">
        <View className="flex-row justify-between">
          <View>
            <Text
              className="text-base"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Looking for rider
            </Text>
            <Text
              className="text-[10px]"
              style={{ fontFamily: "Inter_300Light" }}
            >
              Connecting to riders nearby
            </Text>
          </View>
          <View className=" justify-end">
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              GH₵ {calculatedPrice}
            </Text>
          </View>
        </View>
        <LinearProgress color="#0DC055" className="my-5" />
        <View className="flex-row justify-center items-center my-5 gap-20">
          {/* <Pressable>
            <Iconify icon="weui:location-outlined" size={30} color={"black"} />
          </Pressable> */}
          <Pressable className=" flex-col items-center gap-1 ">
            <View className=" p-3 rounded-full bg-light-gray2 ">
              <Iconify
                icon="weui:location-outlined"
                size={30}
                color={"black"}
              />
            </View>
            <Text className="text-sm" style={{ fontFamily: "Inter_300Light" }}>
              Edit pickup
            </Text>
          </Pressable>

          {disableButton == "!disabled" && (
            <Pressable
              onPress={() => setModal(true)}
              // disabled={disableButton != "disable"}
              className=" flex-col items-center gap-1 "
            >
              <View className=" p-3 rounded-full bg-light-gray2 ">
                <Iconify icon="mdi:car-off" size={30} color={"black"} />
              </View>
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_300Light" }}
              >
                Cancel ride
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      {modal && (
        <View className="absolute inset-0 z-50 bg-black/40 flex-col justify-end">
          <View className="bg-light-gray1 h-3/6 rounded-t-3xl p-10">
            <View className="flex-col justify-center items-center my-5 ">
              <View className="h-44 flex-row justify-center items-center w-full">
                <Image
                  source={require("@/assets/images/motor-cancel.png")}
                  className="h-32 w-32"
                />
                <View className="absolute bottom-5 right-28">
                  <Iconify icon="mdi:car-off" size={30} color={"black"} />
                </View>
              </View>
              <Text
                className="text-base"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Are you sure to cancel the ride?
              </Text>
              <Text
                className="text-[10px]"
                style={{ fontFamily: "Inter_300Light" }}
              >
                If you cancel this, you may wait a while before you get the next
                available ride.
              </Text>
              <Pressable
                onPress={() => handleCancel()}
                className="bg-red-500 w-full py-3 items-center rounded-3xl mt-10"
              >
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className="text-white text-xl"
                >
                  Cancel pick-up
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setModal(false)}
                className="bg-[#D8D8D8] w-full py-3 items-center rounded-3xl mt-3"
              >
                <Text
                  style={{ fontFamily: "Inter_600SemiBold" }}
                  className=" text-xl"
                >
                  Wait for rider/courier
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default LookingForRiderRoute;
