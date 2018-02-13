import * as React from "react";
import { Component } from "react";
import {
    View,
    StyleSheet,
    Platform,
    Text
} from "react-native";
import RowAndroid from "../row/index.android";
import RowIos from "../row/index.ios";
import * as Constants from "../../../lib/Constants";
import Utils from "../../../lib/util";
const width = Constants.SCREEN_WIDTH;
interface Props {
   data: any;
   navigator?: any;
   expand: boolean;
   }
const aTextGroup = [
    { key: Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE, text: Constants.CN_ORDERDRIVE },
    { key: Constants.CODE_ACTIVITY_PURPOSE_INVITE, text: Constants.CN_INVITE },
    { key: Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED, text: Constants.CN_ORDERPLACED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE, text: Constants.CN_TESTDRIVE },
    { key: Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN, text: Constants.CN_KNOCKDOWN },
    { key: Constants.CODE_ACTIVITY_PURPOSE_DEFEAT, text: Constants.CN_DEFEAT },
    { key: Constants.CODE_ACTIVITY_PURPOSE_RETURNVISIT, text: Constants.CN_RETURNVISIT },
    { key: Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE, text: Constants.CN_UNSUBSCRIBE },
    { key: Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS, text: Constants.CN_RETURNEDGOODS },
    { key: Constants.CODE_ACTIVITY_PURPOSE_DEFEATAPPOVED, text: Constants.CN_DEFEATAPPOVED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_DEFEATREJECTED, text: Constants.CN_DEFEATREJECTED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEAPPOVED, text: Constants.CN_UNSUBSCRIBEAPPOVED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEREJECTED, text: Constants.CN_UNSUBSCRIBEREJECTED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODSAPPOVED, text: Constants.CN_RETURNEDGOODSAPPOVED },
    { key: Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODSREJECTED, text: Constants.CN_RETURNEDGOODSREJECTED }
];
interface State {
    bOrderDrive: boolean;
    bInvite: boolean;
    bOrderPlaced: boolean;
    bTestDrive: boolean;
    bKnockdown: boolean;
    bDefeat: boolean;
    bReturnVisit: boolean;
    bDefeatAppoved: boolean;
    bDefeatRejected: boolean;
    bUnsubscribe: boolean;
    bUnsubscribeAppoved: boolean;
    bUnsubscribeRejected: boolean;
    bReturnedGoods: boolean;
    bReturnedGoodsAppoved: boolean;
    bReturnedGoodsRejected: boolean;
}

export default class TextGroup extends Component<Props, State> {
    public state: State = {
        bOrderDrive: false,
        bInvite: false,
        bOrderPlaced: false,
        bTestDrive: false,
        bKnockdown: false,
        bDefeat: false,
        bReturnVisit: false,
        bDefeatAppoved: false,
        bDefeatRejected: false,
        bUnsubscribe: false,
        bUnsubscribeAppoved: false,
        bUnsubscribeRejected: false,
        bReturnedGoods: false,
        bReturnedGoodsAppoved: false,
        bReturnedGoodsRejected: false,
    };
    public render() {
        let aGroup = [], bGroup = [];
        let aRows = this.buildTextRows();
        let that = this;
        aTextGroup.map((item, index) => {
            that.props.data.Purpose.split(",").map((item2) => {
                if (item.key === item2) {
                    if (aGroup.length < 3) {
                        aGroup.push(<Text key={index} style={[styles.textStyle]} > {item.text} </Text>);
                    } else {
                        bGroup.push(<Text key={index} style={[styles.textStyle]} > {item.text} </Text>);
                    }
                }
            });
        });
        return (<View style={[styles.groupContainer]}>
            <View style={[styles.groupDetail]}>{aGroup}</View>
            <View style={[styles.groupDetail, bGroup.length <= 0 ? styles.groupInvisible : {}]}>{bGroup}</View>
            <View>
                {aRows}
            </View>
        </View>);
    }
    public buildTextRows() {
        let that = this;
        this.props.data.Purpose.split(",").map((item) => {
            switch (item) {
                case Constants.CODE_ACTIVITY_PURPOSE_INVITE:
                    that.state.bInvite = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_ORDERDRIVE:
                    that.state.bOrderDrive = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_TESTDRIVE:
                    that.state.bTestDrive = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_KNOCKDOWN:
                    that.state.bKnockdown = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_DEFEAT:
                    that.state.bDefeat = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_RETURNVISIT:
                    that.state.bReturnVisit = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE:
                    that.state.bDefeat = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODS:
                    that.state.bDefeat = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_DEFEATAPPOVED:
                    that.state.bDefeatAppoved = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_DEFEATREJECTED:
                    that.state.bDefeatRejected = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEAPPOVED:
                    that.state.bUnsubscribeAppoved = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEREJECTED:
                    that.state.bUnsubscribeRejected = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODSAPPOVED:
                    that.state.bReturnedGoodsAppoved = true;
                    break;
                case Constants.CODE_ACTIVITY_PURPOSE_RETURNEDGOODSREJECTED:
                    that.state.bReturnedGoodsRejected = true;
                    break;
                default:
                    break;
            }
        });
        if (this.props.expand) {
            if (Platform.OS === "android")
                return (
                    <View style={styles.tableContaint}>
                        <RowAndroid editable={false} name="AppointmentDate" label="预约试驾时间*" contextType="text" visible={this.state.bOrderDrive} displayValue={Utils.formatC4CDateToDate(this.props.data.AppointmentDate, "YYYY/MM/DD") || ""} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="ArrivalTime" label="下次到店时间*" contextType="text" visible={this.state.bInvite} displayValue={Utils.formatC4CDateToDate(this.props.data.ArrivalTime, "YYYY/MM/DD HH:mm:ss") || ""} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="QuoteAmount_content" label="下订金额*" contextType="text" visible={this.state.bOrderPlaced} displayValue={this.props.data.QuoteAmount_content} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="VehicleModel" label="试驾车型*" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.VehicleModel} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IsCustomerOwn" label="是否客户本人试驾" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IsDLScanned" label="驾照扫描" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IsIDCScanned" label="身份证扫描*" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="OtherVehicleModel" label="试驾超过一辆车型*" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.OtherVehicleModel} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IsRecepitScanned" label="发票扫描*" contextType="text" visible={this.state.bKnockdown} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="Reason1contentText" label="战败类别*" contextType="text" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.props.data.Reason1contentText} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="Reason2contentText" label="战败原因*" contextType="text" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.props.data.Reason2Text} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="CampaignName" label="活动" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.CampaignName} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="ActivityTime" label="本次跟进时间*" contextType="text" displayValue={Utils.formatC4CDateToDate(this.props.data.ActivityTime, "YYYY/MM/DD HH:mm:ss")} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IntentionLevelText" label="意向等级*" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.IntentionLevelText} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="IntentModel" label="意向车型*" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.IntentModel} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="NextActivityTime" label="下次跟进时间*" contextType="text" visible={!this.state.bReturnVisit} displayValue={Utils.formatC4CDateToDate(this.props.data.NextActivityTime, "YYYY/MM/DD HH:mm:ss") || ""} navigator={this.props.navigator} />
                        <RowAndroid editable={false} name="CustomerResponse" label="客户反馈" contextType="textarea" displayValue={this.props.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
                    </View>
                );
            else
                return (
                    <View style={styles.tableContaint}>
                        <RowIos editable={false} name="AppointmentDate" label="预约试驾时间*" contextType="text" visible={this.state.bOrderDrive} displayValue={Utils.formatC4CDateToDate(this.props.data.AppointmentDate, "YYYY/MM/DD") || ""} navigator={this.props.navigator} />
                        <RowIos editable={false} name="ArrivalTime" label="下次到店时间*" contextType="text" visible={this.state.bInvite} displayValue={Utils.formatC4CDateToDate(this.props.data.ArrivalTime, "YYYY/MM/DD HH:mm:ss") || ""} navigator={this.props.navigator} />
                        <RowIos editable={false} name="QuoteAmount_content" label="下订金额*" contextType="text" visible={this.state.bOrderPlaced} displayValue={this.props.data.QuoteAmount_content} navigator={this.props.navigator} />
                        <RowIos editable={false} name="VehicleModel" label="试驾车型*" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.VehicleModel} navigator={this.props.navigator} />
                        <RowIos editable={false} name="IsCustomerOwn" label="是否客户本人试驾" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.IsCustomerOwn ? "是" : "否"} navigator={this.props.navigator} />
                        <RowIos editable={false} name="IsDLScanned" label="驾照扫描" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowIos editable={false} name="IsIDCScanned" label="身份证扫描*" contextType="text" visible={this.state.bTestDrive} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowIos editable={false} name="OtherVehicleModel" label="试驾超过一辆车型*" contextType="text" visible={this.state.bTestDrive} displayValue={this.props.data.OtherVehicleModel} navigator={this.props.navigator} />
                        <RowIos editable={false} name="IsRecepitScanned" label="发票扫描*" contextType="text" visible={this.state.bKnockdown} displayValue="功能开发中..." navigator={this.props.navigator} />
                        <RowIos editable={false} name="Reason1contentText" label="战败类别*" contextType="text" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.props.data.Reason1contentText} navigator={this.props.navigator} />
                        <RowIos editable={false} name="Reason2contentText" label="战败原因*" contextType="text" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={this.props.data.Reason2Text} navigator={this.props.navigator} />
                        <RowIos editable={false} name="CampaignName" label="活动" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.CampaignName} navigator={this.props.navigator} />
                        <RowIos editable={false} name="ActivityTime" label="本次跟进时间*" contextType="text" displayValue={Utils.formatC4CDateToDate(this.props.data.ActivityTime, "YYYY/MM/DD HH:mm:ss")} navigator={this.props.navigator} />
                        <RowIos editable={false} name="IntentionLevelText" label="意向等级*" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.IntentionLevelText} navigator={this.props.navigator} />
                        <RowIos editable={false} name="IntentModel" label="意向车型*" contextType="text" visible={!this.state.bReturnVisit} displayValue={this.props.data.IntentModel} navigator={this.props.navigator} />
                        <RowIos editable={false} name="NextActivityTime" label="下次跟进时间*" contextType="text" visible={!this.state.bReturnVisit} displayValue={Utils.formatC4CDateToDate(this.props.data.NextActivityTime, "YYYY/MM/DD HH:mm:ss") || ""} navigator={this.props.navigator} />
                        <RowIos editable={false} name="CustomerResponse" label="客户反馈" contextType="textarea" displayValue={this.props.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
                    </View>
                );
        } else {
            if (Platform.OS === "android")
                return (
                    <View style={styles.tableContaint}>
                        <RowAndroid label="客户反馈" editable={false} contextType="textarea" displayValue={"" + this.props.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
                    </View>
                );
            else
                return (
                    <View style={styles.tableContaint}>
                        <RowIos label="客户反馈" editable={false} contextType="textarea" displayValue={"" + this.props.data.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} />
                    </View>
                );
        }
    }
}
const styles = StyleSheet.create({
    groupContainer: {
        flex: 1,
        alignItems: "baseline",
        borderRadius: 10,
    },
    tableContaint: {
        width: width * 0.8
    },
    groupDetail: {
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "row",
        backgroundColor: "grey",
        flex: 1
    },
    groupInvisible: {
        display: "none"
    },
    textStyle: {
        margin: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "black",
        borderRadius: 10,
        fontSize: 20,
        color: "white"
    }
});
