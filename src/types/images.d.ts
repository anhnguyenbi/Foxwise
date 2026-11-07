// RN 0.88 ships no module types for image files, so `import img from "...png"` needs this.
declare module "*.png" {
  import type { ImageSourcePropType } from "react-native";

  const source: ImageSourcePropType;
  export default source;
}
