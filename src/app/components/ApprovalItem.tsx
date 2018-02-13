import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import { StyleSheet, TouchableOpacity, View, Text, Image, PixelRatio } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import ILead from "../interfaces/lead" ;
import styles from "../styles/ApprovalItemStyles";
import util from "../../lib/util";
interface Props {
    lead: any;
    navigator: any;
}

interface State {

}

export default class ApprovalItem extends Component<Props, State> {
    public render() {
        if ( this.props.lead) {
            return(
                <View style={{backgroundColor: "#fff"}}>
                    {this.renderItem()}
                </View>
            );
        }
    }

    private renderItem() {
        let leadInfo = {
            Applicant: this.props.lead.Applicant ? this.props.lead.Applicant : "无数据",
            IndividualCustomerFamilyName: this.props.lead.IndividualCustomerFamilyName ? this.props.lead.IndividualCustomerFamilyName : "无数据",
            IntentionCarName: this.props.lead.IntentionCarName ? this.props.lead.IntentionCarName : "无数据",
            LeadLevel: this.props.lead.LeadLevel ? this.props.lead.LeadLevel : "无数据",
            date: this.props.lead.AppliedTime ? util.formatC4CDateToDate(this.props.lead.AppliedTime) : "无数据",
        };
        //let date = util.formatC4CDateToDate(this.props.lead.AppliedTime);
        return(
            <TouchableOpacity style={styles.container } onPress={this.pushLeadDetailScreen.bind(this)} >
                <View style={styles.label}>
                    <Text style={{fontSize: 16, color: "#666666"}}>申请顾问：{leadInfo.Applicant} </Text>
                </View>

                <View style={styles.row1}>
                    <View style={styles.ApplicantTextGroup } >
                        <Text style={styles.ApplicantText1 }>{leadInfo.IndividualCustomerFamilyName} </Text>
                        <Text style={styles.ApplicantText2 }>{leadInfo.IntentionCarName}</Text>
                    </View>
                    <Text style={styles.LevelText }>{leadInfo.LeadLevel}</Text>
                </View>

                <View style={styles.row2}>
                    <View style = { styles.textGroup } >
                        <Text style= { styles.singleText} >战败类别：字段尚未确定</Text>
                        <Text style= { styles.singleText} >战败原因：字段尚未确定</Text>
                        <Text style= { styles.singleText} >申请时间：{leadInfo.date}</Text>
                    </View>
                    <View style={styles.arrow}>
                        <Image source={require("../../../img/me_arrow@3x.png")} style={styles.arrowImg} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    private pushLeadDetailScreen() {
        this.props.navigator.push({
            title: "审批详情",
            screen: "app.ApprovalLeadDetailScreen",
            animated: true,
            animationType: "slide-horizontal",
            navigatorStyle: {
                tabBarHidden: true
            },
            passProps: {
                lead: this.props.lead
            }
        });
    }
}
