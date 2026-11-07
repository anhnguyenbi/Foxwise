import { Text, View } from "react-native";

type SpeechBubbleVariant = "hello" | "hola" | "nihao";

type SpeechBubbleProps = {
  text: string;
  variant: SpeechBubbleVariant;
  // Which bottom corner the tail points from
  tail: "left" | "right";
  // Positioning and rotation, e.g. "absolute left-10 top-6 -rotate-6"
  className?: string;
};

// Full class names are written out so Tailwind can detect them
const variants: Record<
  SpeechBubbleVariant,
  { bubble: string; tail: string; text: string }
> = {
  hello: {
    bubble: "bg-[#EAF3FF]",
    tail: "bg-[#EAF3FF]",
    text: "text-text-primary",
  },
  hola: {
    bubble: "bg-[#F1F2FF]",
    tail: "bg-[#F1F2FF]",
    text: "text-lingua-deep-purple",
  },
  nihao: {
    bubble: "bg-[#FFEFEA]",
    tail: "bg-[#FFEFEA]",
    text: "text-[#E8503A]",
  },
};

export default function SpeechBubble({
  text,
  variant,
  tail,
  className = "",
}: SpeechBubbleProps) {
  const styles = variants[variant];

  return (
    <View className={`rounded-3xl px-5 py-4 ${styles.bubble} ${className}`}>
      {/* Tail: a small rotated square tucked behind the bubble's bottom corner */}
      <View
        className={`absolute -bottom-1 size-4 rotate-45 rounded-sm ${styles.tail} ${
          tail === "left" ? "left-5" : "right-5"
        }`}
      />
      <Text className={`h4 ${styles.text}`}>{text}</Text>
    </View>
  );
}
