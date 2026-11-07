import { Image } from "expo-image";

type IconProps = {
  // One of the SVGs from `icons` in constants/images.ts
  source: number;
  size?: number;
  // Recolors the whole icon, e.g. for the black sparkle SVG
  tintColor?: string;
};

// expo-image renders SVG files, which React Native's own Image can't do.
export default function Icon({ source, size = 24, tintColor }: IconProps) {
  return (
    <Image
      source={source}
      style={{ width: size, height: size }}
      contentFit="contain"
      tintColor={tintColor}
    />
  );
}
