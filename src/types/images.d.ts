// RN 0.88 ships no module types for image files, so `import img from "...png"` needs this.
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";

  const source: ImageSourcePropType;
  export default source;
}

// SVG files are imported as assets and rendered with expo-image (see components/Icon.tsx).
declare module "*.svg" {
  const source: number;
  export default source;
}
