"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "../../styles/PersonCardStyle";

interface Props {
	navigator: any;
  userName: string;
  jobTitle: string;
  //level: number;
  type: string;
}

interface State {
}

class PersonCard extends Component<Props, State> {
  public render(): JSX.Element {
    return (
      <View style={[styles.header, styles.center]}>
        <Image
          style={styles.imageStyle}
          source={require("../../../../img/bg.png")}
        />
      <Image
      style={[styles.logoSize]}
        source={require("../../../../img/Portrait.png")} />
      {this._selcetType(this.props.type)}
      </View>
      );
  }
    private _selcetType(type: string): JSX.Element {
      //typeA -- 试驾专员
      if (type === "typeA") {
        return(
          <View>
              <Text style={styles.userName}>{this.props.userName}</Text>
              <Text style = {styles.jobTitle}>{this.props.jobTitle}</Text>
              </View>
              );
      }
      //typeB -- 顾问
      if (type === "typeB") {
        return(
          <View>
              <Text style={styles.userName}>{this.props.userName}</Text>
              <View style = {styles.center}>
              <Text style = {styles.jobTitle}>{this.props.jobTitle}</Text>
              </View>
           </View>
        );
      }
      //typeC -- 展厅经理
      //typeD -- 网销经理
      if (type === "typeC" || type === "typeD") {
        return(
          <View>
              <Text style={styles.userName}>{this.props.userName}</Text>
              <View style = {styles.center}>
              <Text style = {styles.jobTitle}>{this.props.jobTitle}</Text>
              </View>
              <View style={styles.center}>
              <Text style = {styles.jobTitle}>下级顾问销售目标(去设置 </Text>
                <Image
                style = {styles.setting}
                source={require("../../../../img/setting_manager.png")} />
                <Text style={styles.jobTitle}>)</Text>
              </View>
           </View>
        );
      }
    }
}

export default PersonCard;
