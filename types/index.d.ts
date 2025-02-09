declare interface BottomTabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
}

declare interface User {
  _id: string; // ObjectId stored as a string
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string; // Hashed password
  role: "user" | "admin"; // If more roles exist, add them here
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  otp?: string; // Optional, since it might not always exist
  otpExpiration?: Date;
}

declare module "*.ttf" {
  const value: string;
  export default value;
}

declare module "@env" {
  export const value: string;
}
