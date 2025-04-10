import React from "react";
import RootStackNavigator from "src/navigation/RootStack";
import { Provider } from "react-redux";
import { persistor, store } from "src/store";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "src/config/aws-config";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import styleConfig from "src/config/style-config";
import { PersistGate } from "redux-persist/integration/react";
import ApolloWrapper from "src/services/ApolloWrapper";

const { fontFamily, themeColor } = styleConfig;

Amplify.configure(amplifyConfig);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: themeColor }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        fontFamily,
      }}
      text2Style={{
        fontSize: 11,
        fontFamily,
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        fontFamily,
      }}
      text2Style={{
        fontSize: 11,
        fontFamily,
      }}
    />
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloWrapper>
          <RootStackNavigator />
          <Toast config={toastConfig} position="bottom" />
        </ApolloWrapper>
      </PersistGate>
    </Provider>
  );
}
