"use strict";

import * as React from "react";
import { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Constants from "../../lib/Constants";
import styles from "../styles/DefaultPageStyle";

interface Props {

}

class DefaultPage extends Component<Props, any> {

  public render(): JSX.Element {
      return (<View style={ styles.container }>
                  <Image
                  style={styles.image}
                  source={require("../../../img/VectorSmartObject.png")} />
                  <Text style={ styles.headerText }>
                    程序猿正在火速开发中~
                  </Text>
                  </View>
          );
  }
}

export default DefaultPage;
