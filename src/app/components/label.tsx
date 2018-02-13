import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
    style: any;
    color: any;
    text: string;
    onClick: Event;
}

interface State {

}

class Label extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (<Text style={[this.props.style, styles.container, { backgroundColor: this.props.color }]}>
            {this.props.text}
        </Text>);
    }
}

const styles = StyleSheet.create({
    container: {
        fontSize: 10,
        color: "white",
        textAlign: "center",
        borderRadius: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 3,
        paddingBottom: 3
    }
});

export default Label;
