import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { StyleSheet, TouchableOpacity, View, Text, Image, PixelRatio , TextInput } from "react-native";

import ILead from "../../../app/interfaces/lead";
import styles from "../../styles/RejectScreenStyles";

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
                    <View style = {styles.reassignView }>
                        <View style= { styles.labelView}>
                            <Text style= { styles.label}>继续指派给</Text>
                        </View>
                        <TouchableOpacity
                            style= { styles.reassignRight }
                            onPress = {this.pushReassginScreen.bind(this)}
                            >
                            <Text style= { styles.label}>顾问{this.props.lead.Applicant}</Text>
                            <Image source={require("../../../../img/me_arrow@3x.png")} style={styles.arrowImg} />
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 10, backgroundColor: Constants.COLOR.BG_GREY}}/>
                    <View style= { styles.labelView}>
                        <Text style= { styles.label}>驳回理由</Text>
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
                            placeholder= "请填写驳回理由，不超过20个字哦～"
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
            if (event.id == "postRejectReason") {
                console.log("still empty");
            }
        }
    }

    private pushReassginScreen() {
        this.props.navigator.push({
            title: "选择顾问",
            screen: "manager2.AssignmentScreen",
            animated: true,
			animationType: "slide-horizontal",
			navigatorStyle: {
				tabBarHidden: true
			}
        });
    }
}
