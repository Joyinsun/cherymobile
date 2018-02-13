import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { StyleSheet, TouchableOpacity, View, Text, Image, PixelRatio , TextInput } from "react-native";

import ILead from "../../../app/interfaces/lead";
import styles from "../../styles/ApproveScreenStyles";
interface Props {
    navigator: any;
    lead: ILead;
}

interface State {

}

export default class ApproveScreen extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    public render(): JSX.Element {
        return(
                <View style={styles.container}>
                    <View style={{height: 10, backgroundColor: Constants.COLOR.BG_GREY}}/>
                    <View style= { styles.labelView}>
                        <Text style= { styles.label}>同意理由</Text>
                    </View>
                    <View style={styles.inputView }>
                        <TextInput
                            style = {styles.input}
                            underlineColorAndroid="transparent"
                            editable = {true}
                            maxLength= {20}
                            placeholderTextColor= "#999999"
                            multiline = {true}
                            numberOfLines = {4}
                            placeholder= "请填写同意理由，不超过20个字哦～"
                            onChangeText={(displayValue) => this.onChange(displayValue)}>
                        </TextInput>
                    </View>
                </View>
        );
    }

    private onChange(displayValue) {
        console.log("still empty");
    }

    private onNavigatorEvent(event) {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "postApproveReason") {
                console.log("still empty");
            }
        }
    }
}
