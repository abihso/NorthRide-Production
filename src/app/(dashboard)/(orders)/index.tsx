import Canceled from "@/screens/canceled";
import Past from "@/screens/past";
import Upcoming from "@/screens/upcoming";
import { greenMapStyle } from "@/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Iconify } from "react-native-iconify/native";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

// Reusable Suggestions List Component
const LocationSuggestionsList = ({
  isLoading,
  suggestions,
  onSelect,
}: {
  isLoading: boolean;
  suggestions: LocationData[];
  onSelect: (item: LocationData) => void;
}) => {
  if (isLoading) {
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="small" color="#A98516" />
      </View>
    );
  }

  if (suggestions.length === 0) return null;

  return (
    <View className="bg-[#F7F7F7] rounded-2xl mt-2 px-3 py-2 border border-gray-100 z-50">
      {suggestions.map((item, idx) => (
        <Pressable
          key={`suggestion-${idx}`}
          onPress={() => onSelect(item)}
          className={`flex-row items-center gap-3 py-3 ${
            idx !== suggestions.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <Iconify icon="weui:location-outlined" size={22} color="black" />
          <Text
            style={{ fontFamily: "Inter_400Regular" }}
            className="text-xs text-gray-800 flex-1"
            numberOfLines={2}
          >
            {item.address}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const Drop_n_Pickoff = () => {
  const mapRef = useRef<MapView | null>(null);
  const { screenName } = useLocalSearchParams<{ screenName: string }>();
  // Screen Tabs
  const [screen, setScreen] = useState("book");
  const [userId, setUserId] = useState<string | null>(null);
  // Selected Locations
  const [pickupLocation, setPickupLocation] = useState<LocationData | null>(
    null,
  );
  const [dropoffLocation, setDropoffLocation] = useState<LocationData | null>(
    null,
  );

  // Search Inputs State
  const [pickupInput, setPickupInput] = useState<string>("");
  const [dropoffInput, setDropoffInput] = useState<string>("");

  // Refs to prevent recursive re-searches on option selection
  const isPickupSelectedRef = useRef(false);
  const isDropoffSelectedRef = useRef(false);

  // Suggestions & Loading States
  const [pickupSuggestions, setPickupSuggestions] = useState<LocationData[]>(
    [],
  );
  const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationData[]>(
    [],
  );
  const [isSearchingPickup, setIsSearchingPickup] = useState<boolean>(false);
  const [isSearchingDropoff, setIsSearchingDropoff] = useState<boolean>(false);

  // Map Modal State
  const [selectingTarget, setSelectingTarget] = useState<
    "pickup" | "dropoff" | null
  >(null);
  const [tempCoords, setTempCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 5.6037, // Default coordinates
    longitude: -0.187,
  });
  const [tempAddress, setTempAddress] = useState<string>("Loading location...");
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);

  // Reverse Geocoding Helper
  const fetchAddress = async (coords: {
    latitude: number;
    longitude: number;
  }) => {
    try {
      const addressList = await Location.reverseGeocodeAsync(coords);
      if (addressList && addressList.length > 0) {
        const item = addressList[0];
        const placeName = item.name || item.street || item.district || "";
        const city = item.city || item.subregion || item.region || "";
        return placeName
          ? `${placeName}, ${city}`
          : city || "Selected Location";
      }
    } catch (e) {
      console.log("Geocoding failed", e);
    }
    return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
  };

  const fetchGooglePlacesAutocomplete = async (
    input: string,
    target: "pickup" | "dropoff",
    isStillActive: () => boolean,
  ) => {
    if (target === "pickup") setIsSearchingPickup(true);
    else setIsSearchingDropoff(true);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        input,
      )}&key=${GOOGLE_PLACES_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!isStillActive()) return;

      if (data.status === "OK" && data.predictions) {
        const predictions = data.predictions.slice(0, 5);
        const suggestionsWithCoords = await Promise.all(
          predictions.map(async (place: any) => {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=geometry&key=${GOOGLE_PLACES_API_KEY}`;
            const detailsRes = await fetch(detailsUrl);
            const detailsData = await detailsRes.json();
            const location = detailsData.result?.geometry?.location;
            return {
              address: place.description,
              latitude: location ? location.lat : tempCoords.latitude,
              longitude: location ? location.lng : tempCoords.longitude,
            };
          }),
        );

        if (!isStillActive()) return;

        if (target === "pickup") setPickupSuggestions(suggestionsWithCoords);
        else setDropoffSuggestions(suggestionsWithCoords);
      } else {
        if (target === "pickup") setPickupSuggestions([]);
        else setDropoffSuggestions([]);
      }
    } catch (error) {
      console.log("Google Places fetch error:", error);
    } finally {
      if (isStillActive()) {
        if (target === "pickup") setIsSearchingPickup(false);
        else setIsSearchingDropoff(false);
      }
    }
  };
  useEffect(() => {
    (async () => {
      setUserId(await AsyncStorage.getItem("userId"));
    })();
  }, []);

  // Fetch initial location on load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          let currentLocation = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          };
          const address = await fetchAddress(coords);
          const initialLoc = { ...coords, address };
          isPickupSelectedRef.current = true;
          setPickupLocation(initialLoc);
          setPickupInput(address);
          setTempCoords(coords);
          setTempAddress(address);
        } catch (error) {
          console.log("Error getting initial location", error);
        }
      }
    })();
  }, []);

  // Debounced Pickup Search
  useEffect(() => {
    let active = true;
    if (!pickupInput.trim()) {
      setPickupSuggestions([]);
      setIsSearchingPickup(false);
      return;
    }
    if (isPickupSelectedRef.current) {
      isPickupSelectedRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (active)
        fetchGooglePlacesAutocomplete(pickupInput, "pickup", () => active);
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [pickupInput]);

  // Debounced Dropoff Search
  useEffect(() => {
    let active = true;
    if (!dropoffInput.trim()) {
      setDropoffSuggestions([]);
      setIsSearchingDropoff(false);
      return;
    }
    if (isDropoffSelectedRef.current) {
      isDropoffSelectedRef.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (active)
        fetchGooglePlacesAutocomplete(dropoffInput, "dropoff", () => active);
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [dropoffInput]);

  // Selection Handlers
  const selectSuggestion = (
    item: LocationData,
    target: "pickup" | "dropoff",
  ) => {
    if (target === "pickup") {
      isPickupSelectedRef.current = true;
      setPickupLocation(item);
      setPickupInput(item.address);
      setPickupSuggestions([]);
    } else {
      isDropoffSelectedRef.current = true;
      setDropoffLocation(item);
      setDropoffInput(item.address);
      setDropoffSuggestions([]);
    }
  };

  const handleSelectCurrentLocation = async (target: "pickup" | "dropoff") => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      const address = await fetchAddress(coords);
      const loc = { ...coords, address };

      if (target === "pickup") {
        isPickupSelectedRef.current = true;
        setPickupLocation(loc);
        setPickupInput(address);
        setPickupSuggestions([]);
      } else {
        isDropoffSelectedRef.current = true;
        setDropoffLocation(loc);
        setDropoffInput(address);
        setDropoffSuggestions([]);
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch current location.");
    }
  };

  const handleSwapLocations = () => {
    const tempLoc = pickupLocation;
    const tempText = pickupInput;

    isPickupSelectedRef.current = true;
    isDropoffSelectedRef.current = true;

    setPickupLocation(dropoffLocation);
    setPickupInput(dropoffInput);

    setDropoffLocation(tempLoc);
    setDropoffInput(tempText);
  };

  // Map Modal Handlers
  const openMapPicker = (target: "pickup" | "dropoff") => {
    let targetCoords = tempCoords;
    if (target === "pickup" && pickupLocation) {
      targetCoords = {
        latitude: pickupLocation.latitude,
        longitude: pickupLocation.longitude,
      };
      setTempAddress(pickupLocation.address);
    } else if (target === "dropoff" && dropoffLocation) {
      targetCoords = {
        latitude: dropoffLocation.latitude,
        longitude: dropoffLocation.longitude,
      };
      setTempAddress(dropoffLocation.address);
    }
    setTempCoords(targetCoords);
    setSelectingTarget(target);

    setTimeout(() => {
      mapRef.current?.animateToRegion({
        ...targetCoords,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    }, 300);
  };

  const handleRegionChangeComplete = async (region: Region) => {
    const latDiff = Math.abs(region.latitude - tempCoords.latitude);
    const lngDiff = Math.abs(region.longitude - tempCoords.longitude);
    if (latDiff < 0.0001 && lngDiff < 0.0001) return;

    const coords = { latitude: region.latitude, longitude: region.longitude };
    setTempCoords(coords);
    setIsGeocoding(true);
    const address = await fetchAddress(coords);
    setTempAddress(address);
    setIsGeocoding(false);
  };

  const confirmLocationSelection = () => {
    const selectedData: LocationData = {
      latitude: tempCoords.latitude,
      longitude: tempCoords.longitude,
      address: tempAddress,
    };
    if (selectingTarget === "pickup") {
      isPickupSelectedRef.current = true;
      setPickupLocation(selectedData);
      setPickupInput(tempAddress);
      setPickupSuggestions([]);
    } else if (selectingTarget === "dropoff") {
      isDropoffSelectedRef.current = true;
      setDropoffLocation(selectedData);
      setDropoffInput(tempAddress);
      setDropoffSuggestions([]);
    }
    setSelectingTarget(null);
  };

  const handleSubmit = async () => {
    if (!pickupLocation) {
      return Alert.alert("Required", "Please select a pickup location");
    }
    if (!dropoffLocation) {
      return Alert.alert("Required", "Please select a dropoff location");
    }
    try {
      await AsyncStorage.setItem(
        "pickupLocation",
        JSON.stringify(pickupLocation),
      );
      await AsyncStorage.setItem(
        "dropoffLocation",
        JSON.stringify(dropoffLocation),
      );

      router.push({
        pathname: "/(dashboard)/(orders)/calculateprice",
        params: {
          screenName,
        },
      });
    } catch (error) {
      console.error("Failed to save locations to storage:", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="h-24 bg-[#F7F7F7] px-5 pt-3">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.push("/(dashboard)/(home)/(menu)")}
            className="p-1"
          >
            <FontAwesome name="close" size={20} />
          </Pressable>
          <Text
            className="text-xl"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            {screenName == "ride"
              ? "Rides"
              : screenName == "send"
                ? "Send"
                : screenName == "receive"
                  ? "Receive"
                  : null}
          </Text>
        </View>

        {/* Dynamic Navigation Tabs */}
        <View className="h-10 absolute -bottom-1 left-0 right-0 px-5 flex-row gap-2 z-20">
          {["book", "past", "upcoming", "canceled"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setScreen(tab)}
              className={`${
                screen === tab ? "border-b-2 border-[#A98516]" : ""
              } h-full w-fit px-3 capitalize`}
            >
              <Text
                className="text-center capitalize"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {screen === "book" ? (
        <ScrollView className="px-7 py-3" keyboardShouldPersistTaps="handled">
          {/* PICKUP LOCATION SECTION */}
          <Text
            className="text-xl mt-5"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Pickup location
          </Text>

          <View className="flex-row justify-between items-center">
            <SearchBar
              placeholder="Pickup address"
              onChangeText={(text) => {
                isPickupSelectedRef.current = false;
                setPickupInput(text);
              }}
              value={pickupInput}
              style={{ fontFamily: "Inter_600SemiBold" }}
              containerStyle={{
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                marginTop: 10,
                width: "90%",
              }}
              inputStyle={{ backgroundColor: "#F2F2F2" }}
              inputContainerStyle={{
                backgroundColor: "#F2F2F2",
                borderRadius: 30,
              }}
            />
            <Pressable onPress={() => openMapPicker("pickup")}>
              <FontAwesome name="plus" size={20} />
            </Pressable>
          </View>

          {/* Dynamic Pickup Autocomplete Suggestions */}
          <LocationSuggestionsList
            isLoading={isSearchingPickup}
            suggestions={pickupSuggestions}
            onSelect={(item) => selectSuggestion(item, "pickup")}
          />

          <View className="flex-row justify-between items-center mt-5">
            <Pressable
              onPress={() => handleSelectCurrentLocation("pickup")}
              className="flex-row items-center w-[47%] h-16 py-3 justify-center gap-3 rounded-3xl bg-[#F7F7F7]"
            >
              <Iconify
                icon="fa-solid:location-arrow"
                size={18}
                color={"black"}
              />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Current Location
              </Text>
            </Pressable>
            <Pressable
              onPress={() => openMapPicker("pickup")}
              className="flex-row items-center w-[47%] h-16 py-3 justify-center gap-3 rounded-3xl bg-[#F7F7F7]"
            >
              <Iconify icon="mingcute:map-pin-fill" size={18} color={"black"} />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Select with map
              </Text>
            </Pressable>
          </View>

          {/* SWAP BUTTON */}
          <View className="flex-row justify-end items-center mt-5">
            <Pressable onPress={handleSwapLocations}>
              <Iconify
                icon="boxicons:swap-vertical"
                size={34}
                color={"black"}
              />
            </Pressable>
          </View>

          {/* DROPOFF LOCATION SECTION */}
          <Text
            className="text-xl"
            style={{ fontFamily: "Inter_600SemiBold" }}
            numberOfLines={1}
          >
            Drop off location
          </Text>

          <View className="flex-row justify-between items-center">
            <SearchBar
              placeholder="Drop off address"
              onChangeText={(text) => {
                isDropoffSelectedRef.current = false;
                setDropoffInput(text);
              }}
              value={dropoffInput}
              style={{ fontFamily: "Inter_600SemiBold" }}
              containerStyle={{
                backgroundColor: "transparent",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                marginTop: 10,
                width: "90%",
              }}
              inputStyle={{ backgroundColor: "#F2F2F2" }}
              inputContainerStyle={{
                backgroundColor: "#F2F2F2",
                borderRadius: 30,
              }}
            />
            <Pressable onPress={() => openMapPicker("dropoff")}>
              <FontAwesome name="plus" size={20} />
            </Pressable>
          </View>

          {/* Dynamic Dropoff Autocomplete Suggestions */}
          <LocationSuggestionsList
            isLoading={isSearchingDropoff}
            suggestions={dropoffSuggestions}
            onSelect={(item) => selectSuggestion(item, "dropoff")}
          />

          <View className="flex-row justify-between items-center my-5">
            <Pressable
              onPress={() => handleSelectCurrentLocation("dropoff")}
              className="flex-row items-center w-[47%] h-16 py-3 justify-center gap-3 rounded-3xl bg-[#F7F7F7]"
            >
              <Iconify
                icon="fa-solid:location-arrow"
                size={18}
                color={"black"}
              />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Current Location
              </Text>
            </Pressable>
            <Pressable
              onPress={() => openMapPicker("dropoff")}
              className="flex-row items-center w-[47%] h-16 py-3 justify-center gap-3 rounded-3xl bg-[#F7F7F7]"
            >
              <Iconify icon="mingcute:map-pin-fill" size={18} color={"black"} />
              <Text
                className="text-sm"
                style={{ fontFamily: "Inter_600SemiBold" }}
                numberOfLines={1}
              >
                Select with map
              </Text>
            </Pressable>
          </View>

          {/* SUBMIT BUTTON */}
          <Pressable
            onPress={handleSubmit}
            className="py-4 my-5 bg-black rounded-3xl"
          >
            <Text
              className="text-[#FDBF07] text-center"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Continue
            </Text>
          </Pressable>
        </ScrollView>
      ) : screen === "past" ? (
        <Past userId={userId} status={"delivered"} category={screenName} />
      ) : screen === "canceled" ? (
        <Canceled userId={userId} status={"cancelled"} category={screenName} />
      ) : screen === "upcoming" ? (
        <Upcoming />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text style={{ fontFamily: "Inter_600SemiBold" }}>
            {screen.toUpperCase()} content coming soon
          </Text>
        </View>
      )}

      {/* MAP SELECTION MODAL */}
      <Modal
        visible={selectingTarget !== null}
        animationType="slide"
        statusBarTranslucent={false}
        onRequestClose={() => setSelectingTarget(null)}
      >
        <SafeAreaView
          className="flex-1 bg-white"
          edges={["top", "right", "bottom", "left"]}
        >
          <View className="p-4 flex-row justify-between items-center bg-white border-b border-gray-100 z-10">
            <Text
              className="text-base capitalize"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              Select {selectingTarget} Location
            </Text>
            <Pressable onPress={() => setSelectingTarget(null)}>
              <FontAwesome name="close" size={22} color="black" />
            </Pressable>
          </View>

          <View className="flex-1 relative">
            <MapView
              provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
              ref={mapRef}
              style={{ flex: 1 }}
              initialRegion={{
                latitude: tempCoords.latitude,
                longitude: tempCoords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}
              customMapStyle={
                Platform.OS === "android" ? greenMapStyle : undefined
              }
              onRegionChangeComplete={handleRegionChangeComplete}
            />
            <View className="absolute top-1/2 left-1/2 -ml-4 -mt-8 pointer-events-none items-center justify-center z-10">
              <FontAwesome name="map-marker" size={36} color="#FDBF07" />
            </View>
          </View>

          <View className="p-4 bg-white border-t border-gray-100">
            <View className="mb-3">
              <Text className="text-xs text-gray-400">Location Name:</Text>
              <Text className="text-sm font-semibold text-gray-800">
                {isGeocoding ? "Locating place..." : tempAddress}
              </Text>
            </View>
            <Pressable
              onPress={confirmLocationSelection}
              disabled={isGeocoding}
              className={`py-3 rounded-3xl ${
                isGeocoding ? "bg-gray-400" : "bg-black"
              }`}
            >
              <Text
                className="text-[#FDBF07] text-center"
                style={{ fontFamily: "Inter_600SemiBold" }}
              >
                Confirm {selectingTarget}
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Drop_n_Pickoff;
