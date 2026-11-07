import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="h1 color-lingua-purple">Foxwise</Text>

      <Link href="/onboarding" asChild>
        <Pressable className="mt-8 rounded-2xl bg-lingua-deep-purple px-6 py-4 active:opacity-90">
          <Text className="h4 text-white">Open onboarding</Text>
        </Pressable>
      </Link>
    </View>
  );
}
