import * as React from "react";
import { Component } from "react";
import { View } from "react-native";
import * as Constants from "../../lib/Constants";

interface Props {
}

interface State {

}

class Line extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
		return <View style={{ height: 10, width: Constants.SCREEN_WIDTH, backgroundColor: Constants.COLOR.BG_GREY }} />;
    }
}
export default Line;
