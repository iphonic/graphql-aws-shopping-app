import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import styles from "./AuthScreen.style";
import { AuthScreenProps } from "src/types/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "src/store/authSlice";
import { signIn } from "src/services/auth";
import Toast from "react-native-toast-message";

export default function AuthScreen({ navigation }: AuthScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Email and password are required.",
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    Keyboard.dismiss();

    try {
      const result = await signIn(email, password);
      if (result.challenge === "NEW_PASSWORD_REQUIRED") {
        navigation.navigate("ChangePassword", {
          email,
          tempPassword: password,
        });
        return;
      }

      dispatch(setUser({ user: email, token: result.token }));
      navigation.replace("Products");
    } catch (err: any) {
      console.log("Error => ", err);

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid credentials",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <View>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          inputMode="email"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
