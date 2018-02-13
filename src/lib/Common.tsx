import * as React from "react";
import { Text, ToastAndroid, Platform } from "react-native";
import * as GlobalVariable from "./global";
import * as Constants from "./Constants";

export default {
  showNotification(msg: string, navigator: any): void {
    if (Platform.OS === "ios") {
      alert(msg);
    } else {
      const notificationContent = (
        <Text style={{ fontSize: 16, color: "#000" }}>
          {msg}
        </Text>);

      navigator.showInAppNotification({
        screen: "app.NotificationScreen",
        passProps: {
          content: notificationContent
        },
        autoDismissTimerSec: 2
      });
    }
  },
  callOnceEvent(func, interval = 600) {
    if (!GlobalVariable.common.isCalled) {
      GlobalVariable.common.isCalled = true;
      clearTimeout(GlobalVariable.common.timer);
      GlobalVariable.common.timer = setTimeout(() => {
        GlobalVariable.common.isCalled = false;
      }, interval);
      //alert(GlobalVariable.common.isCalled);
      return func();
    }
  },
  logoutApplication() {
    GlobalVariable.common.navigator.showModal({
      screen: "app.SCIScreen",
      title: "",
      animationType: "none",
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        loginURL: Constants.SCPLOGOUT,
        action: "logout",
        loading: true
      }
    });
  }
};
