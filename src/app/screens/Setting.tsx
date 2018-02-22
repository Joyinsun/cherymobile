"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Image, Text, TouchableHighlight } from "react-native";
import MenuItem from "../components/aboutMe/MenuItem";
import { connect, Dispatch } from "react-redux";
import { clearSelfMsg } from "../reducers/aboutMe/actions";
import * as Constants from "../../lib/Constants";
import Common from "../../lib/Common";
import Button from "apsl-react-native-button";
import styles from "../styles/AboutMeStyle";

interface Props {
	navigator: any;
  dispatch: any;
  clearSelfMsg(): void;
}

interface State {
  isDisabled: boolean;
}

class Setting extends Component<Props, State> {
  public state: State = {
    isDisabled: false
  };
	public render(): JSX.Element {
    return (
      <View>
        <View>
          <MenuItem title={Constants.CN_RESET_PWD} touchableStyle={{ marginTop: 1 }} textStyle={styles.textStyle6} onPress={this.resetPwd.bind(this)} />
          <View style={styles.bottomLine} />
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
          <View style={styles.bottomLine} />
          </View>
      </View>
    );
  }
  private resetPwd(): void {
    this.props.navigator.push({
      title: Constants.CN_RESET_PWD,
      screen: "app.ResetPwd",
      animationType: "slide-horizontal",
      navigatorStyle: {
        tabBarHidden: true
      }
    });
  }
  private onPressLogout(): void {
    this.setState({
      isDisabled: true
    });
    this.props.clearSelfMsg();
    Common.logoutApplication();
  }
}

function mapStateToProps(state: any) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearSelfMsg: () => {
      dispatch(clearSelfMsg());
    }, dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
