"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import * as Constants from "../../lib/Constants";

interface Props {
  headerTitle?: string;
  leftIconName?: string;
  rightIconName?: string;
  onPressLeftEvent?: Function;
  onPressRightEvent?: Function;
  headerTitleImage? : string;
}

class HeaderBar extends Component<Props, any> {
  public render(): JSX.Element {
    if (this.props.headerTitleImage) {
      return(
        <View style={styles.container}>
          <View style={styles.headerBarContainer}>
            <Icon
              name={this.props.leftIconName}
              size={17}
              style={styles.icon}
              onPress={this.props.onPressLeftEvent} />
            <Image source= {require("../../../img/manager/VectorSmartObject@3x.png")}/>
            <Icon
              name={this.props.rightIconName}
              size={17}
              style={styles.icon}
              onPress={this.props.onPressRightEvent} />
          </View>
        </View>
      );
    } else return (
      <View style={styles.container}>
        <View style={styles.headerBarContainer}>
          <Icon
            name={this.props.leftIconName}
            size={17}
            style={styles.icon}
            onPress={this.props.onPressLeftEvent} />
          <Text style={styles.headerText}>
            {this.props.headerTitle}
          </Text>
          <Icon
            name={this.props.rightIconName}
            size={17}
            style={styles.icon}
            onPress={this.props.onPressRightEvent} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: "#E1E1E1",
    marginTop: (Platform.OS === "ios") ? 20 : 0
  },
  headerBarContainer: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: Constants.COLOR.GREY_ddd
  },
  headerText: {
    padding: 7,
    color: "black",
    fontSize: 16
  },
  icon: {
    backgroundColor: "white",
    padding: 13,
    color: "black",
    borderRadius: 44
  }
});

export default HeaderBar;
