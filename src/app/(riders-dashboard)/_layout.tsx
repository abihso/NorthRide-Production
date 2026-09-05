import { Stack } from "expo-router";

export default function RideersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="payment-details" />
      <Stack.Screen name="driver-license" />
      <Stack.Screen name="drive-by" />
      <Stack.Screen name="ghana-card" />
      <Stack.Screen name="id-card" />
      <Stack.Screen name="insurance" />
      <Stack.Screen name="join-as" />
      <Stack.Screen name="profile-photo" />
      <Stack.Screen name="roadworthiness" />
    </Stack>
  );
}
