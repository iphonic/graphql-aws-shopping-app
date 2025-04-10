import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import styles from "./ChangePasswordScreen.style";
import { Auth } from "aws-amplify";

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { email, tempPassword } = route.params;

  const handlePasswordChange = async () => {
    try {
      const user = await Auth.signIn(email, tempPassword);

      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        await Auth.completeNewPassword(user, newPassword);

        Toast.show({
          type: "success",
          text1: "Password Changed",
          text2: "You can now use your new password",
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: "info",
          text1: "Not Required",
          text2: "Password change is not required.",
        });
        navigation.goBack();
      }
    } catch (err: any) {
      console.log("Password change error:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message || "Password change failed",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <View>
        <Text style={styles.title}>Set New Password</Text>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#999"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handlePasswordChange} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
