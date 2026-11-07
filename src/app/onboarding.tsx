import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SpeechBubble from "@/components/SpeechBubble";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="px-6 pt-4">
        {/* Logo + app name */}
        <View className="-my-4 flex-row items-center justify-center">
          <Image
            source={images.mascotLogo}
            className="size-20"
            resizeMode="contain"
          />
          <Text className="h2 -ml-2 text-text-primary">foxwise</Text>
        </View>

        {/* Headline */}
        <Text className="h1 mt-12 text-text-primary">
          Your AI language{"\n"}
          <Text className="text-lingua-deep-purple">teacher</Text>.
        </Text>
        <Text className="body-lg mt-3 text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Mascot illustration with speech bubbles */}
      <View className="mt-4 flex-1">
        <View className="absolute inset-x-0 bottom-[10%] items-center">
          <View className="h-6 w-[240px] rounded-full bg-text-primary/5" />
        </View>
        <Image
          source={images.mascotWelcome}
          className="size-full scale-110"
          resizeMode="contain"
        />

        <SpeechBubble
          text="Hello!"
          variant="hello"
          tail="right"
          className="absolute left-10 top-7 -rotate-6"
        />
        <SpeechBubble
          text="¡Hola!"
          variant="hola"
          tail="left"
          className="absolute right-12 top-1 rotate-6"
        />
        <SpeechBubble
          text="你好!"
          variant="nihao"
          tail="left"
          className="absolute right-6 top-24 rotate-6"
        />
      </View>

      {/* Get Started button */}
      <View className="px-6 pb-4 pt-6">
        <Pressable
          onPress={() => router.push("/sign-up")}
          className="h-16 flex-row items-center justify-center rounded-3xl bg-lingua-deep-purple active:opacity-90"
        >
          <Text className="h3 text-white">Get Started</Text>
          {/* Chevron drawn with borders so it works on every platform */}
          <View className="absolute right-6 size-3 rotate-45 border-r-2 border-t-2 border-white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
