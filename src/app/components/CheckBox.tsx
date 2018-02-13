import * as React from "react";
import { Component } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import * as Constants from "../../lib/Constants";

interface Props {
    checked: boolean;
    onClick: any;
}

interface State {

}

class CheckBox extends Component<Props, State> {
    constructor(props) {
        super(props);
    }

    public render(): JSX.Element {
        return (<TouchableOpacity
            style={this.props.checked ? styles.selected : styles.unSelected}
            onPress={() => this.onClick()}>
            <Icon name="check" size={16} visible={this.props.checked} color="white" />
        </TouchableOpacity>);
    }

    private onClick(): void {
        this.props.onClick(!this.props.checked);
    }
}

const styles = StyleSheet.create({
    selected: {
        width: 22,
        height: 22,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Constants.COLOR.DARKGREY,
        borderRadius: 15,
        borderWidth: 0,
        borderColor: Constants.COLOR.DARKGREY,
        padding: 3
    },
    unSelected: {
        width: 22,
        height: 22,
        alignItems: "center",
        backgroundColor: Constants.COLOR.WHITE,
        borderRadius: 15,
        borderWidth:  1,
        borderColor: Constants.COLOR.LIGHTGREY
    }
});

export default CheckBox;
