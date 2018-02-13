"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { View, Text, TouchableHighlight, Image, TouchableOpacity, StyleSheet } from "react-native";
import Common from "../../../lib/Common";

const styles = StyleSheet.create({
  viewItemContainer: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    //height: 100
  },
  textStyle: {
    marginTop: 10,
    color: Constants.COLOR.DARKGREY
  },
  imageStyle: {
    width: 22,
    height: 22,
    marginTop: 25
  },
  addSectionStyle: {
    marginTop: 30
  },
  addTextStyle: {
    marginBottom: 25
  }
});

interface Props {
  title: string;
  index: number;
  navigator: any;
}

interface State {
}

class ConsultantItem extends Component<Props, State> {
  public image0 = require("../../../../img/performance.png");
  public image1 = require("../../../../img/review.png");
  public image2 = require("../../../../img/inventory.png");
  public image3 = require("../../../../img/motorcycletype.png");
  public image4 = require("../../../../img/motorcycleknowledge.png");
  public image5 = require("../../../../img/calculate.png");

  public render(): JSX.Element {
    return (<TouchableHighlight underlayColor="#dad9d7" onPress={this._performClick.bind(this)} style={{ width: Math.floor((Constants.SCREEN_WIDTH - 30) / 3) }}>
      <View style={styles.viewItemContainer}>
        <Image
          style={[styles.imageStyle, this.props.index > 2 ? styles.addSectionStyle : null]}
          source={this["image" + this.props.index]}
        />
           <Text style={[styles.textStyle, , this.props.index > 2 ? styles.addTextStyle : null]}>{this.props.title}</Text>
      </View>
    </TouchableHighlight>);
  }

  private _performClick(): void {
    if (this.props.title === "上级审批") {
      Common.callOnceEvent(() =>
      this.props.navigator.push({
        title: this.props.title,
        screen: "consultant.HigherAppro",
        animated: true,
        animationType: "slide-horizontal",
        navigatorStyle: {
          tabBarHidden: true,
          passProps: {
            navigator: this.props.navigator
          }
        }
      })
      );
    } else {
      Common.callOnceEvent(() =>
        this.props.navigator.push({
          title: this.props.title,
          screen: "app.DefaultPage",
          animated: true,
          animationType: "slide-horizontal",
          navigatorStyle: {
            tabBarHidden: true
          }
        })
      );
    }
  }
}

export default ConsultantItem;
