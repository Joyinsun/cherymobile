import * as React from "react";
import { Component } from "react";
import { Button, StyleSheet, View, Platform } from "react-native";
import styles from "./tabSelectTableStyle";
import * as Constants from "../../../lib/Constants";
interface Props {
  onPress?: any;
  enabled?: boolean;
  pressed?: boolean;
  visible?: boolean;
  label?: any;
  title?: any;
  type: any;
}

interface State {
  pressed?: boolean;
}

export default class ButtonCustom extends Component<Props, State> {
  public state: State = { pressed: false };
  public render() {
    let btnColor = "white";
    if (Platform.OS === "ios") {
      btnColor = "white";
    } else {
      if (this.props.pressed)
        btnColor = "black";
      else
        btnColor = "grey";
    }

    return (<View style={[styles.button, this.props.pressed ? styles.pressed : styles.unpressed]}>
      <Button title={this.props.title} color={btnColor} disabled={!this.props.enabled} onPress={this.pressEvent.bind(this)} />
    </View>
    );
  }
  private pressEvent(): void {
    this.props.onPress(this);
  }
}
