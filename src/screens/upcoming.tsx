import { decodePolyline } from "@/utils";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

// Default fallback locations
const DEFAULT_PICKUP = {
  latitude: 37.78825,
  longitude: -122.4324,
  address: "Default Pickup Location",
};

const DEFAULT_DROPOFF = {
  latitude: 37.7749,
  longitude: -122.4194,
  address: "Default Dropoff Location",
};

const Upcoming = () => {
  const mapRef = useRef<MapView | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const pickup = DEFAULT_PICKUP;
  const dropoff = DEFAULT_DROPOFF;

  useEffect(() => {
    const fetchDirections = async () => {
      if (!GOOGLE_PLACES_API_KEY) {
        console.warn("EXPO_PUBLIC_GOOGLE_PLACES_API_KEY is not defined.");
        setLoading(false);
        return;
      }

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dropoff.latitude},${dropoff.longitude}&key=${GOOGLE_PLACES_API_KEY}`;

      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.routes?.length > 0) {
          const overviewPolyline = data.routes[0].overview_polyline.points;
          const points = decodePolyline(overviewPolyline);
          setRouteCoordinates(points);

          // Frame map around the calculated route
          setTimeout(() => {
            mapRef.current?.fitToCoordinates(points, {
              edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
              animated: true,
            });
          }, 300);
        } else {
          console.error(
            "Directions API Error:",
            data.status,
            data.error_message,
          );
        }
      } catch (error) {
        console.error("Failed to fetch directions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirections();
  }, [pickup.latitude, pickup.longitude, dropoff.latitude, dropoff.longitude]);

  return (
    <ScrollView className="px-7 py-10 bg-white">
      <Text style={{ fontFamily: "Inter_600SemiBold" }}>Upcoming</Text>
      <View className="min-h-96 rounded-3xl bg-light-gray1 mt-4 p-5">
        <View className="h-48 overflow-hidden rounded-2xl relative">
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

            {/* Road Route Polyline */}
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={5}
                strokeColor="#208AEF"
              />
            )}
          </MapView>

          {loading && (
            <View className="absolute inset-0 bg-white/50 items-center justify-center">
              <ActivityIndicator size="small" color="#208AEF" />
            </View>
          )}
        </View>
        <View className="flex-row justify-between h-20 border border-light-gray4 mt-3 rounded-2xl ">
          <View className="pl-5 py-2">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-light-black2 text-xs"
            >
              21st July, 2026
            </Text>
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Kumasi - Kumasi
            </Text>
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-light-black1 text-xs  "
            >
              GH₵ 20.00
            </Text>
          </View>
          <View className="border-r border-light-gray4" />
          <View className="pr-5 py-2">
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-light-black2 text-xs"
            >
              Rider’s Name
            </Text>
            <Text
              className="text-sm"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Kobby
            </Text>
            <Text
              style={{ fontFamily: "Inter_600SemiBold" }}
              className="text-light-black1 text-xs  "
            >
              AS 214-26
            </Text>
          </View>
        </View>
        <Pressable
          className="flex-row justify-center mt-5 py-5"
          style={{
            backgroundColor: "#F2F2F2",
            borderRadius: 25,
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 3,
          }}
        >
          <Text className="text-sm" style={{ fontFamily: "Inter_600SemiBold" }}>
            Edit Ride
          </Text>
        </Pressable>
        <Pressable
          className="flex-row justify-center mt-5 py-5"
          style={{
            backgroundColor: "#F2F2F2",
            borderRadius: 25,
            padding: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 3,
          }}
        >
          <Text className="text-sm" style={{ fontFamily: "Inter_600SemiBold" }}>
            View Ride details
          </Text>
        </Pressable>
      </View>
      <Text className="mt-4 ml-4" style={{ fontFamily: "Inter_600SemiBold" }}>
        Cancel Upcoming ride policy
      </Text>
      <View className="h-44 rounded-3xl bg-light-gray1 mt-4 p-5">
        <Text className=" text-xs" style={{ fontFamily: "Inter_300Light" }}>
         NorthRides balance is not available with this payment method
        </Text>
      </View>
    </ScrollView>
  );
};

export default Upcoming;
