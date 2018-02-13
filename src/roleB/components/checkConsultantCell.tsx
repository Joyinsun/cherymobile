import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    AlertIOS
} from "react-native";

import * as Constants from "../../lib/Constants";
import IConsultant from "../../app/interfaces/consutant";
import styles from "../styles/checkConsultantCellStyles";

interface Props {
	onClick: any;
	consultant: IConsultant;
    selectedID: string;
}

interface State {
	isChecked: boolean;
}

export default class CheckConsultantCell extends Component<Props, State> {
    public state: State = {
        isChecked: false
    };
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                {this.renderConsultantCell()}
                {this.renderCheckBox()}
            </View>
        );
    }
    private onClick() {
        if (this.props.selectedID === undefined) {
            console.log("1");
            this.setState({
                isChecked: true
            });
            this.props.onClick(this.props.consultant.id);
        } else if (this.props.consultant.id == this.props.selectedID) {
            console.log("2");
            this.setState({
                isChecked: false
            });
            this.props.onClick(undefined);
        } else {
            console.log("3");
            this.setState({
                isChecked: true
            });
            this.props.onClick(this.props.consultant.id);
        }
        // this.setState({
        // 	isChecked: !this.state.isChecked
        // })
        // this.props.onClick();
    }

    private renderCheckBox() {
        if (this.props.consultant.id == this.props.selectedID) {
            if (this.state.isChecked) {
                return (
                    <TouchableOpacity
                        style={styles.CheckBox}
                        onPress={this.onClick.bind(this)}
                    >
                        <Image source={require("../../../img/manager/selectConsultant/icon_radiobutton_select@3x.png")} />
                    </TouchableOpacity>
                );
            } else {
                return (
                    <TouchableOpacity
                        style={styles.CheckBox}
                        onPress={this.onClick.bind(this)}
                    >
                        <Image source={require("../../../img/manager/selectConsultant/icon_radio_button@3x.png")} />
                    </TouchableOpacity>
                );
            }
        } else {
            return (
                <TouchableOpacity
                    style={styles.CheckBox}
                    onPress={this.onClick.bind(this)}
                >
                    <Image source={require("../../../img/manager/selectConsultant/icon_radio_button@3x.png")} />
                </TouchableOpacity>
            );
        }
    }

    private renderConsultantCell() {
        return (
            <View style={styles.ConsultantCell}>
                <Text style={styles.ConsultantLabel}>顾问 {this.props.consultant.name}</Text>
            </View>
        );
    }
}
