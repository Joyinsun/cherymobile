"use strict";

import * as React from "react";
import { Component } from "react";
import { View } from "react-native";
import * as Constants from "../../lib/Constants";

interface Props {
  content: any;
}

interface State {
}

class NotificationScreen extends Component<Props, State> {
  public state: State = {
  };

  constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <View style={{elevation: 2, display: "flex", width: Constants.SCREEN_WIDTH, height: 64, paddingLeft: 15, justifyContent: "center", alignItems: "center", flexDirection: "column", backgroundColor: Constants.COLOR.WHITE, borderBottomWidth: 1, borderBottomColor: Constants.COLOR.DIVIDER}}>
        {this.props.content}
      </View>);
  }
}

export default NotificationScreen;
