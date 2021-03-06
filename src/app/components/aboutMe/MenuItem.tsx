"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { View, Text, TouchableHighlight, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import styles from "../../styles/MenuItemStyle";

interface Props {
	title: string;
  //desc: number;
  onPress: any;
}

interface State {
}

class MenuItem extends Component<Props, State> {
  public render(): JSX.Element {
    return (<TouchableHighlight underlayColor="#dad9d7" onPress={this._performClick.bind(this)} style={styles.touchContainer}>
      <View style={styles.menuContainer}>
        <Text style={styles.menuTitle}>{this.props.title}</Text>
        <View style={styles.menuTextContainer}>
          <Image style={[styles.iconSize]}
          source={require("../../../../img/me_arrow.png")} />
        </View>
      </View>
    </TouchableHighlight>);
  }
  private _performClick(): void {

    this.props.onPress();
  }
}

export default MenuItem;
