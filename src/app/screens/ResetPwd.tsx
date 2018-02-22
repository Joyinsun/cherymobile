"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import { connect, Dispatch } from "react-redux";
import { clearSelfMsg } from "../reducers/aboutMe/actions";
import * as Constants from "../../lib/Constants";
import Common from "../../lib/Common";
import Button from "apsl-react-native-button";
import styles from "../styles/AboutMeStyle";
import Icon from "react-native-vector-icons/Feather";

interface Props {
	navigator: any;
  dispatch: any;
}

interface State {
  autoFocusPrePwd: boolean;
  autoFocusNewPwd: boolean;
  autoFocusNewRePwd: boolean;
  displayPreClearIcon: string;
  displayNewClearIcon: string;
  displayNewReClearIcon: string;
}

class ResetPwd extends Component<Props, State> {
  public state: State = {
    autoFocusPrePwd: true,
    autoFocusNewPwd: false,
    autoFocusNewRePwd: false,
    displayPreClearIcon: "none",
    displayNewClearIcon: "none",
    displayNewReClearIcon: "none"
  };
	public render(): JSX.Element {
    let displayPreClearIcon = new Object();
    displayPreClearIcon["display"] = this.state.displayPreClearIcon;
    let displayNewClearIcon = new Object();
    displayNewClearIcon["display"] = this.state.displayNewClearIcon;
    let displayNewReClearIcon = new Object();
    displayNewReClearIcon["display"] = this.state.displayNewReClearIcon;
    return (
      <View>
      <View style={styles.inputContainer}>
        <TextInput
          ref="prePwd"
          placeholder="请输入当前密码"
          placeholderTextColor={Constants.COLOR.GREY_ccc}
          style={styles.mobileInput}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          maxLength={8}
          autoFocus={this.state.autoFocusPrePwd}
          onEndEditing={this.onChange.bind(this)}
        />
        <TouchableOpacity style={[styles.clearIcon, displayPreClearIcon]} onPress={() => this.clearText("prePwd")}>
          <Icon name="x-circle"
            size={24}
          />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
  private clearText(fieldName: string): void {
    let textInput: any = this.refs[fieldName];
    textInput.clear(0);
    switch (fieldName) {
      case "prePwd":
        this.setState({
          displayPreClearIcon: "none",
          autoFocusPrePwd: true,
          autoFocusNewPwd: false,
          autoFocusNewRePwd: false
        });
      break;
      case "newPwd":
        this.setState({
          displayNewClearIcon: "none",
          autoFocusPrePwd: false,
          autoFocusNewPwd: true,
          autoFocusNewRePwd: false
        });
        break;
    case "newRePwd":
      this.setState({
        displayNewReClearIcon: "none",
        autoFocusPrePwd: false,
        autoFocusNewPwd: false,
        autoFocusNewRePwd: true
      });
      break;
      default:
    }
  }
  private onChange(input: object): void {
    const regPwd = new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}$/);
    let inputStr = input["nativeEvent"].text;
    if (inputStr.length === 8) {
    let bValidPwd = (regPwd.test(inputStr));
      if (bValidPwd) {
        alert("判断当前输入值是哪个字段");
      } else {
        alert("密码必须包含至少一位数子，大写字母和小写字母");
      }
    } else {
      alert("密码长度必须为8位");
    }
    this.setState({
      displayPreClearIcon: "flex"
    });
  }
}

function mapStateToProps(state: any) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPwd);
