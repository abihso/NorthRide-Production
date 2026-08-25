import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@rneui/base";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const ConfirmRoute = () => {
  const mapRef = useRef<MapView | null>(null);

  const [pickup, setPickup] = useState<LocationData | null>(null);
  const [dropoff, setDropoff] = useState<LocationData | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);

  const [durationMin, setDurationMin] = useState<number>(0);
  const [calculatedPrice, setCalculatedPrice] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Polyline decoding helper
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

  useEffect(() => {
    const loadRouteData = async () => {
      try {
        const storedPickup = await AsyncStorage.getItem("pickupLocation");
        const storedDropoff = await AsyncStorage.getItem("dropoffLocation");

        if (!storedPickup || !storedDropoff) {
          Alert.alert("Error", "Pickup or dropoff location missing from storage.");
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
              }
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
      {/* MAP VIEW REPLACING BLACK CONTAINER */}
      <View className="h-5/6 bg-black">
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
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#FDBF07" />
          </View>
        )}
      </View>

      {/* OVERLAY SHEET */}
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
                {dropoff?.address ? dropoff.address.split(",")[0] : "Destination"}
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
          buttonStyle={{
            backgroundColor: "black",
            marginTop: 25,
            height: 50,
          }}
        >
          <Text
            className="text-xl text-light-pink"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Confirm pickup
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmRoute;