import React, { useEffect, useRef } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "src/screens/AuthScreen/AuthScreen";
import ProductListScreen from "src/screens/ProductListScreen/ProductListScreen";
import CartScreen from "src/screens/CartScreen/CartScreen";
import { RootStackParamList } from "src/types/navigation";
import ProductDetailsScreen from "src/screens/ProductDetailsScreen/ProductDetailsScreen";
import ChangePasswordScreen from "src/screens/AuthScreen/ChangePasswordScreen";
import styleConfig from "src/config/style-config";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const { themeColor } = styleConfig;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  const initialRoute = token ? "Products" : "Auth";

  useEffect(() => {
    if (!token && navigationRef.current?.getCurrentRoute()?.name !== "Auth") {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
  }, [token]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerTintColor: themeColor }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: "Product Details" }}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
