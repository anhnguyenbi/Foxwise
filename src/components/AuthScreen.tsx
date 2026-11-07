import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "@/components/Icon";
import VerificationModal from "@/components/VerificationModal";
import { icons, images } from "@/constants/images";
import { colors } from "@/theme/colors";

type AuthMode = "sign-up" | "sign-in";

// The two screens share one layout. Only the copy (and the password field) differ.
const copy: Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    button: string;
    footerText: string;
    footerLink: string;
    footerHref: Href;
  }
> = {
  "sign-up": {
    title: "Create your account",
    subtitle: "Start your language journey today ✨",
    button: "Sign Up",
    footerText: "Already have an account?",
    footerLink: "Log in",
    footerHref: "/sign-in",
  },
  "sign-in": {
    title: "Welcome back",
    subtitle: "Continue your language journey ✨",
    button: "Sign In",
    footerText: "Don't have an account?",
    footerLink: "Sign up",
    footerHref: "/sign-up",
  },
};

const socialProviders = [
  { label: "Continue with Google", icon: icons.google },
  { label: "Continue with Facebook", icon: icons.facebook },
  { label: "Continue with Apple", icon: icons.apple },
];

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const content = copy[mode];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/onboarding");
    }
  };

  const handleVerified = () => {
    setVerifying(false);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 pt-2">
          {/* Back */}
          <Pressable
            onPress={handleBack}
            hitSlop={8}
            className="-ml-2 size-11 items-start justify-center pl-2"
          >
            <Icon source={icons.chevronLeft} size={24} />
          </Pressable>

          {/* Heading */}
          <Text className="auth-title mt-5 text-text-primary">
            {content.title}
          </Text>
          <Text className="auth-subtitle mt-3 text-text-secondary">
            {content.subtitle}
          </Text>

          {/* Mascot sits behind the first field, which covers only its chest and paws */}
          <View className="z-0 mt-6 h-[136px] items-center">
            <Image
              source={images.mascotAuth}
              className="-mt-[42px] size-[232px] -scale-x-100"
              resizeMode="contain"
            />
            <View className="absolute left-[72px] top-[24px]">
              <Icon source={icons.sparkle} size={16} tintColor="#F5A623" />
            </View>
            <View className="absolute right-[60px] top-[30px]">
              <Icon
                source={icons.sparkle}
                size={13}
                tintColor={colors.linguaBlue}
              />
            </View>
            <View className="absolute right-[68px] top-[62px]">
              <Icon source={icons.sparkle} size={16} tintColor="#FFD84D" />
            </View>
          </View>

          {/* Fields */}
          <View className="auth-field">
            <Text className="auth-field__label">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              className="auth-field__input"
            />
          </View>

          {mode === "sign-up" && (
            <View className="auth-field mt-3">
              <Text className="auth-field__label">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                className="auth-field__input"
              />
              <Pressable
                onPress={() => setShowPassword((value) => !value)}
                hitSlop={12}
                accessibilityLabel={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute inset-y-0 right-5 justify-center"
              >
                <Icon
                  source={showPassword ? icons.eyeOff : icons.eye}
                  size={24}
                />
              </Pressable>
            </View>
          )}

          {/* Main button */}
          <Pressable
            onPress={() => setVerifying(true)}
            className="mt-5 h-[58px] items-center justify-center rounded-[20px] bg-lingua-deep-purple active:opacity-90"
          >
            <Text className="h3 text-white">{content.button}</Text>
          </Pressable>

          {/* Divider */}
          <View className="mt-6 flex-row items-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="body-md px-4 text-text-secondary">
              or continue with
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          {/* Social buttons (UI only for now) */}
          <View className="mt-4 gap-2">
            {socialProviders.map((provider) => (
              <Pressable
                key={provider.label}
                className="auth-social active:opacity-80"
              >
                <Icon source={provider.icon} size={24} />
                <Text className="auth-social__label">{provider.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Footer link, pinned to the bottom */}
        <View className="mt-auto flex-row items-center justify-center px-8 pb-4 pt-8">
          <Text className="body-md text-text-secondary">
            {content.footerText}{" "}
          </Text>
          <Pressable onPress={() => router.replace(content.footerHref)}>
            <Text className="body-md font-[Poppins-Medium] text-lingua-deep-purple">
              {content.footerLink}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verifying}
        email={email}
        onClose={() => setVerifying(false)}
        onComplete={handleVerified}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1 },
});
