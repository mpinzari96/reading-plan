import { Capacitor } from "@capacitor/core";

// Helper functions for Capacitor integration

/**
 * Check if the app is running on a native platform (iOS/Android)
 */
export const isNativePlatform = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Get the platform name (ios, android, web)
 */
export const getPlatform = (): string => {
  return Capacitor.getPlatform();
};

/**
 * Check if the app is running on iOS
 */
export const isIOS = (): boolean => {
  return Capacitor.getPlatform() === "ios";
};

/**
 * Check if the app is running on Android
 */
export const isAndroid = (): boolean => {
  return Capacitor.getPlatform() === "android";
};

/**
 * Check if the app is running in a web browser
 */
export const isWeb = (): boolean => {
  return Capacitor.getPlatform() === "web";
};
