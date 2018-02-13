import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    AlertIOS,
    TextInput
} from "react-native";

import * as Constants from "../../lib/Constants";
import ILead from "../../app/interfaces/lead";

import styles from "../styles/checkLeadCellStyles";

interface Props {
    onClick?: any;
    lead: ILead;
    isChecked: boolean;
    navigator: any;
    onSelectionsChange: any;
    selectionMap: any;
}

interface State {
    isChecked: boolean;
}

export default class CheckLeadCell extends Component<Props, State> {
    public state: State = {
        isChecked: this.props.selectionMap.get(this.props.lead.ID)
    };
    public componentWillReceiveProps(newProps: Props) {
        this.setState({
            //isChecked: newProps.isChecked
            isChecked: newProps.selectionMap.get(newProps.lead.ID)
        });
        // console.log(newProps.selectionMap.get(newProps.lead.id));
    }
    public render(): JSX.Element {
        return (
            <View style={styles.container}>
                {this.renderCheckBox()}
                {this.renderLeadCell()}
            </View>
        );
    }
    private onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        });

        this.props.onSelectionsChange(this.props.lead.ID);
        //this.props.onClick();    //此处为之后向上级界面传递lead ID
    }

    private renderCheckBox() {
        if (this.state.isChecked) {
            return (
                <TouchableOpacity
                    style={styles.CheckBox}
                    onPress={this.onClick.bind(this)}
                >
                    <Image source={require("../../../img/manager/waitAssignment/icon_select@2x.png")} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.CheckBox}
                    onPress={this.onClick.bind(this)}
                >
                    <Image source={require("../../../img/manager/waitAssignment/icon_no_select@2x.png")} />
                </TouchableOpacity>
            );
        }
    }

    private renderLeadCell() {
        const lead = this.props.lead;
        let carLabel = lead.IntentionCarName + lead.IntentionColor;
        carLabel = carLabel.length > 8 ? carLabel.substring(0, 8) + "…" : carLabel;
        return (
            <View style={styles.LeadCell}>
                <View style={[styles.row, { marginLeft: 12}]}>
                    <TouchableOpacity
                        style={[styles.touch, {flex: 3}]}
                        onPress={this.pushLeadDetailScreen.bind(this)}
                    >
                        <Text style={[styles.label, { paddingRight: 10, fontWeight: "bold"}]}>{lead.IndividualCustomerFamilyName}</Text>
                        <Text style={[styles.labelGrey, { paddingRight: 19}]}>{carLabel}</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 16, paddingRight: 10, flex: 1, textAlign: "right"}}>{lead.FirstTouch}</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={{fontSize: 16, color: "#da1e46"}}>{lead.UserStatusCodeText}</Text>
                    <Image source={require("../../../img/manager/waitAssignment/icon_service@3x.png")} />
                </View>
                <View style={styles.row3}>
                    <Text style={styles.labelGrey}>{lead.CreationDateTime}</Text>
                </View>
            </View>
        );
    }

    private pushLeadDetailScreen() {
        this.props.navigator.push({
            title: "线索详情/未分配",
            screen: "consultant.LeadDetailScreen",
            animated: true,
            animationType: "slide-horizontal",
            passProps: {
                lead: this.props.lead
            },
            navigatorButtons: {},
            navigatorStyle: {
                tabBarHidden: true
            }
        });
    }
}
