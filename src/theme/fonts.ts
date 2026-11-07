// Passed to `useFonts` in the root layout.
// Keys must match the --font-poppins* families in theme.css.
// `require` is used because TypeScript has no type declaration for .ttf imports.
export const fonts = {
  "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
};
