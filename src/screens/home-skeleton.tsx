import { Skeleton } from "@rneui/base";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeSkeleton = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="h-14 bg-light-gray flex-row justify-between items-center px-5">
        <Skeleton width={24} height={24} circle />
        <View className="flex-row gap-3">
          <Skeleton width={24} height={24} circle />
          <Skeleton width={24} height={24} circle />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5">
          {/* Location & Avatar */}
          <View className="flex-row justify-between items-center mt-5">
            <View className="flex-row gap-2 items-center">
              <Skeleton width={24} height={24} circle />
              <View className="gap-1">
                <Skeleton width={160} height={16} style={{ borderRadius: 4 }} />
                <Skeleton width={110} height={12} style={{ borderRadius: 4 }} />
              </View>
            </View>
            <Skeleton width={44} height={44} circle />
          </View>

          {/* Welcome Text */}
          <Skeleton
            width={220}
            height={32}
            style={{ marginTop: 20, borderRadius: 6 }}
          />

          {/* Search Bar */}
          <Skeleton
            width="100%"
            height={50}
            style={{ marginTop: 10, borderRadius: 30 }}
          />

          {/* Shops Section Title */}
          <Skeleton
            width={100}
            height={28}
            style={{ marginTop: 15, borderRadius: 4 }}
          />

          {/* Shops Horizontal Scroll */}
          <View className="flex-row gap-4 pt-3">
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                width={140}
                height={144}
                style={{ borderRadius: 12 }}
              />
            ))}
          </View>

          {/* Promotion Section Header */}
          <View className="flex-row justify-between items-center mt-4">
            <Skeleton width={140} height={28} style={{ borderRadius: 4 }} />
            <Skeleton width={100} height={35} style={{ borderRadius: 20 }} />
          </View>

          {/* Promotion Horizontal Scroll */}
          <View className="flex-row gap-4 pt-3">
            {[1, 2].map((item) => (
              <Skeleton
                key={item}
                width={250}
                height={192}
                style={{ borderRadius: 16 }}
              />
            ))}
          </View>

          {/* Suggestions Section Header */}
          <View className="flex-row justify-between items-center mt-4">
            <Skeleton width={140} height={28} style={{ borderRadius: 4 }} />
            <Skeleton width={100} height={35} style={{ borderRadius: 20 }} />
          </View>

          {/* Suggestions Horizontal Scroll */}
          <View className="flex-row gap-4 pt-3">
            {[1, 2].map((item) => (
              <Skeleton
                key={item}
                width={250}
                height={192}
                style={{ borderRadius: 16 }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeSkeleton