const COLOR = {
  BACKGROUND: {
    PRIMARY: "#F7F4F3",
    SECONDARY: "#5B2333",
  },
  TEXT: {
    PRIMARY: "#333333",
    SECONDARY: "#666666",
    ACCENT: "#FFFFFF",
    LINK: "#5B2333",
  },
  CARD: {
    PRIMARY: "#F7F4F3",
    SECONDARY: "#5B2333",
  },
  BUTTON: {
    PRIMARY: "#5B2333",
    SUCCESS: "#4CAF50",
    SECONDARY: "#2196F3",
    DANGER: "#D32F2F",
    DISABLED: "#BDBDBD",
  },
  BORDER: {
    PRIMARY: "#E5E5E5",
    SECONDARY: "#D3D3D3",
  },
  TABBAR: {
    PRIMARY: "#4CAF50",
    SECONDARY: "#2196F3",
    INACTIVE: "#BDBDBD",
    ACTIVE: "#5B2333",
  },
} as const;

const colors = {
  primary: "#20C997",
  secondary: "#FF7F50",
  black: "#000000",
  white: "#FFFFFF",
  border: "#CBD5E1",
  apply: "#FCB889",
  inactive: "#FDEEE3",
  neutral: {
    300: "#525252",
    400: "#7B7B7B",
  },
  dark: "#0F172A",
  red: "#DC2626",
  green: "#6DC347",
  error: "#E80D0D",
  success: "#6DC347",
  info: "yellow",
  toastText: {
    success: "#00A11F",
    error: "#A11300",
    info: "yellow",
  },
  toastBg: {
    success: "#DAF1DF",
    error: "#F1DADA",
    info: "yellow",
  },
  borderLight: "#F7F7F7",
  border_alt: "#B2B0B0",
} as const;

const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
} as const;

const TYPOGRAPHY = {
  FONT_FAMILY: {
    REGULAR: "System",
    BOLD: "System-Bold",
    ITALIC: "System-Italic",
    LIGHT: "System-Light",
    SEMIBOLD: "System-Semibold",
  },
  FONT_SIZE: {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    XLARGE: 24,

    h2: 20,
    h3: 18,

    h5: 14,

    body1: 16,
    body2: 14,
    body3: 12,
    body4: 10,
    body5: 8,
    body6: 6,
  },
} as const;

const SHADOW = {
  LIGHT: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  MEDIUM: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  HEAVY: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
} as const;

export const THEME = {
  ...COLOR,
  ...SPACING,
  ...TYPOGRAPHY,
  ...SHADOW,
  colors,
} as const;
