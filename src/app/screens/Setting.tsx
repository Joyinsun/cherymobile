"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Image } from "react-native";
import * as Constants from "../../lib/Constants";
import Common from "../../lib/Common";
import Button from "apsl-react-native-button";
import styles from "../styles/AboutMeStyle";

interface Props {
	navigator: any;
}

interface State {
  isDisabled: boolean;
}

export default class Setting extends Component<Props, State> {
  public state: State = {
    isDisabled: false
  };
	public render(): JSX.Element {
    return (
      <View style={styles.settingContainer}>
        <View>
          <Image source={require("../../../img/logo@3x.png")}
            style={styles.logoImg} />
        </View>
        <View>
          <Button
            style={styles.buttonContainer}
            isDisabled={this.state.isDisabled}
            disabledStyle={styles.buttonDisabled}
            textStyle={styles.textStyle6}
            onPress={this.onPressLogout.bind(this)}>
            {Constants.CN_LOGOUT}
          </Button>
          </View>
      </View>
    );
  }
  private onPressLogout(): void {
    this.setState({
      isDisabled: true
    });
    Common.logoutApplication();
  }
}
