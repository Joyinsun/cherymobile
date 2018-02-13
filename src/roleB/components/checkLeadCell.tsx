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
import IProps from "../../app/interfaces/props";
import ILead from "../interfaces/waitAssignmentLead";

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
        isChecked: this.props.selectionMap.get(this.props.lead.id)
    };
    public componentWillReceiveProps(newProps: Props) {
        this.setState({
            //isChecked: newProps.isChecked
            isChecked: newProps.selectionMap.get(newProps.lead.id)
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
        this.props.onSelectionsChange(this.props.lead.id);
        //this.props.onClick();  //此处为之后向上级界面传递lead ID
    }
    private renderCheckBox() {
        if (this.state.isChecked) {
            return (
                <TouchableOpacity
                    style={styles.CheckBox}
                    onPress={this.onClick.bind(this)}
                >
                    <Image source={require("../../../img/manager/waitAssignment/icon_select@3x.png")} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={styles.CheckBox}
                    onPress={this.onClick.bind(this)}
                >
                    <Image source={require("../../../img/manager/waitAssignment/icon_no_select@3x.png")} />
                </TouchableOpacity>
            );
        }
    }

    private renderLeadCell() {
        const lead = this.props.lead;

        return (
            <View style={styles.LeadCell}>
                <View style={[styles.row, { paddingBottom: 10 }]}>
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={this.pushLeadDetailScreen.bind(this)}
                    >
                        <Text style={[styles.label, { paddingRight: 10 }]}>{lead.customerName}</Text>
                        <Text style={[styles.label, { paddingRight: 10 }]}>{lead.carModel}</Text>
                        <Text style={styles.label}>{lead.carColor}</Text>
                    </TouchableOpacity>
                    <Text style={styles.label}>{lead.sourceLevel2}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>{lead.status}</Text>
                    <Text style={styles.label}>{lead.createDate}</Text>
                    <Image source={require("../../../img/manager/waitAssignment/icon_service@3x.png")} />
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
