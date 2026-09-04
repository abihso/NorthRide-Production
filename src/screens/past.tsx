import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Iconify from "react-native-iconify/native";

const url = process.env.EXPO_PUBLIC_BACKEND_URL;
const DEV = process.env.EXPO_PUBLIC_DEV === "dev";

// 1. Define types for your API response structure
interface Delivery {
  // Add properties matching your actual delivery object here if needed
  [key: string]: any; 
}

interface DeliveryGroup {
  date: string;
  deliveries: Delivery[];
}

interface PastProps {
  userId: string | null;
  status: string;
  category: string;
}

const Past = ({ userId, status, category }: PastProps) => {
  // 2. Initialize state as an empty array with explicit typing
  const [data, setData] = useState<DeliveryGroup[]>([]);

  useEffect(() => {
    if (!userId) return; // Prevent fetching if userId is null

    axios
      .get(
        `${DEV ? "http://192.168.43.115:4000" : url}/api/users/${userId}/deliveries/${status}/${category}`
      )
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [userId, status, category]); // Added dependencies

  return (
    <ScrollView className="px-7 py-10 bg-white">
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <View key={index}>
              <Text style={{ fontFamily: "Inter_600SemiBold" }}>
                {item.date}
              </Text>
              <View className="min-h-52 bg-light-gray1 py-3 px-7 rounded-3xl mt-5">
                {item.deliveries.map((deliveryItem, deliveryIndex) => (
                  <View
                    key={deliveryIndex}
                    className="flex-row justify-between border-b py-2 border-light-gray2"
                  >
                    <View className="flex-row items-center gap-5">
                      <Iconify
                        icon="weui:location-outlined"
                        size={24}
                        color={"black"}
                      />
                      <View>
                        <Text
                          style={{ fontFamily: "Inter_600SemiBold" }}
                          className="text-light-black1 text-xs"
                        >
                          Yesterday
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ fontFamily: "Inter_600SemiBold" }}
                        >
                          Kumasi - Kumasi
                        </Text>
                        <Text
                          style={{ fontFamily: "Inter_600SemiBold" }}
                          className="text-light-black1 text-xs"
                        >
                          11km ride
                        </Text>
                      </View>
                    </View>
                    <View className="justify-end">
                      <Text
                        style={{ fontFamily: "Inter_600SemiBold" }}
                        className="text-light-black1 text-xs"
                      >
                        GH₵ 20.00
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        })
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text style={{ fontFamily: "Inter_600SemiBold" }}>
            No data to show right now
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Past;