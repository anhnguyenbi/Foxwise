import { type ComponentRef, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  // Called as soon as the last digit is entered
  onComplete: () => void;
};

export default function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);

  const handleChange = (text: string) => {
    // Keep digits only, max 6
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      setCode("");
      onComplete();
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onShow={() => inputRef.current?.focus()}
      onRequestClose={handleClose}
    >
      {/* Shrinks when the keyboard opens, so the card always sits above it */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.backdrop}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Close verification dialog"
        />

        <View className="mx-6 items-center rounded-3xl bg-white px-6 pb-8 pt-8">
          <View className="size-16 items-center justify-center rounded-full bg-lingua-purple/10">
            <Text className="text-3xl">✉️</Text>
          </View>

          <Text className="h2 mt-5 text-center text-text-primary">
            Check your email
          </Text>
          <Text className="body-md mt-2 text-center text-text-secondary">
            You&apos;ve received an email from us at{" "}
            <Text className="font-[Poppins-Medium] text-text-primary">
              {email || "your inbox"}
            </Text>
            . Enter the 6-digit verification code to continue.
          </Text>

          {/* Visible boxes. The invisible input on top receives the typing. */}
          <View className="mt-6 w-full">
            <View className="flex-row gap-2">
              {Array.from({ length: CODE_LENGTH }, (_, index) => (
                <View
                  key={index}
                  className={`h-14 flex-1 items-center justify-center rounded-2xl border bg-white ${
                    index === code.length
                      ? "border-lingua-deep-purple"
                      : "border-border"
                  }`}
                >
                  <Text className="h2 text-text-primary">{code[index]}</Text>
                </View>
              ))}
            </View>
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="one-time-code"
              maxLength={CODE_LENGTH}
              caretHidden
              accessibilityLabel="Verification code"
              style={styles.hiddenInput}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(13, 19, 43, 0.5)",
  },
  hiddenInput: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
});
