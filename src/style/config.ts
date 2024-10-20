export interface StyleConfig {
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
  textColor: string;
  backgroundColor: string;
  contentColor: string;
  contentBackgroundColor: string;
  borderColor: string;
  borderRadius: string;
  boxShadow: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
}

export interface ThemeConfig {
  light: Partial<StyleConfig>;
  dark: Partial<StyleConfig>;
}

export const themes: ThemeConfig = {
  light: {
    primaryColor: "#3f51b5",
    secondaryColor: "#f44336",
    successColor: "#4caf50",
    warningColor: "#ff9800",
    errorColor: "#f44336",
    infoColor: "#2196f3",
    textColor: "#212121",
    backgroundColor: "#fff",
    contentBackgroundColor: "#F0F2F5",
    contentColor: "#F0F2F5",
    borderColor: "#e0e0e0",
    borderRadius: "2px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.01em"
  },
  dark: {
    primaryColor: "#3f51b5",
    secondaryColor: "#f44336",
    successColor: "#20af50",
    warningColor: "#ff9800",
    errorColor: "#f44336",
    infoColor: "#2196f3",
    textColor: "#fff",
    backgroundColor: "#303030",
    contentBackgroundColor: "#F0F2F5",
    contentColor: "#fff",
    borderColor: "#424242",
    borderRadius: "2px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.01em"
  }
};
