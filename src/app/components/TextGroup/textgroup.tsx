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
import _ from "lodash";
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
                        aGroup.push(
                            <View style={styles.defaultBtn} key={index}>
                                <Text style={styles.buttonText}>{item.text}</Text>
                            </View>
                        );
                    } else {
                        aGroup.push(
                            <View style={styles.defaultBtn} key={index}>
                                <Text style={styles.buttonText}>{item.text}</Text>
                            </View>
                        );
                    }
                }
            });
        });

        return (
            <View style={[styles.tableContaint]}>
                <View style={[styles.recordButtonsBox]}>{aGroup}</View>
                <View style={[styles.recordButtonsBox, bGroup && styles.groupInvisible]}>{bGroup}</View>
                {this.props.expand ? aRows : null}
            </View>
        );
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
                case Constants.CODE_ACTIVITY_PURPOSE_ORDERPLACED:
                    that.state.bOrderPlaced = true;
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
        const info: any = {
            AppointmentDate: Utils.formatC4CDateToDate(this.props.data.AppointmentDate, "YYYY/MM/DD HH:mm") || "无",
            ArrivalTime: Utils.formatC4CDateToDate(this.props.data.ArrivalTime, "YYYY/MM/DD HH:mm") || "无",
            QuoteAmount_content: _.round(this.props.data.QuoteAmount_content) + "万" || "无",
            VehicleModel: this.props.data.VehicleModel || "无",
            IsCustomerOwn: this.props.data.IsCustomerOwn ? "是" : "否",
            IsBuyForSelf2: this.props.data.IsBuyForSelf2 ? "是" : "否",
            IsBuyForCompany2: this.props.data.IsBuyForCompany2 ? "是" : "否",
            OtherVehicleModel: this.props.data.OtherVehicleModel ? "是" : "否",
            Reason1contentText: this.props.data.Reason1contentText || "无",
            Reason2contentText: this.props.data.Reason2contentText || "无",
            CampaignName: this.props.data.CampaignName || "无",
            ActivityTime: Utils.formatC4CDateToDate(this.props.data.ActivityTime, "YYYY/MM/DD HH:mm") || "无",
            IntentionLevelText: this.props.data.IntentionLevelText || "无",
            IntentModel: Utils.formatStringWithEllipsis(this.props.data.IntentModel, 8) || "无",
            NextActivityTime: Utils.formatC4CDateToDate(this.props.data.NextActivityTime, "YYYY/MM/DD HH:mm") || "无",
            CustomerResponse: this.props.data.CustomerResponse || "无",
            IsDLScanned: this.props.data.IsDLScanned ? "已扫描" : "无",
            IsIDCScanned: this.props.data.IsIDCScanned ? "已扫描" : "无",
            IsRecepitScanned: this.props.data.IsRecepitScanned ? "已扫描" : "无",
        };
        if (Platform.OS === "android") {
            return (
                <View style={styles.groupRowsBox}>
                    <RowAndroid name="AppointmentDate" label="预约试驾时间*" contextType="text" visible={this.state.bOrderDrive} displayValue={info.AppointmentDate} />
                    <RowAndroid name="ArrivalTime" label="下次到店时间*" visible={this.state.bInvite} displayValue={info.ArrivalTime} />
                    <RowAndroid name="QuoteAmount_content" label="下订金额*" visible={this.state.bOrderPlaced} displayValue={info.QuoteAmount_content} />
                    <RowAndroid name="VehicleModel" label="试驾车型*" visible={this.state.bTestDrive} displayValue={info.VehicleModel} />
                    <RowAndroid name="IsCustomerOwn" label="是否客户本人试驾" visible={this.state.bTestDrive} displayValue={info.IsCustomerOwn} />
                    <RowAndroid name="IsDLScanned" label="驾照扫描" visible={this.state.bTestDrive} displayValue={info.IsDLScanned} />
                    <RowAndroid name="IsIDCScanned" label="身份证扫描*" visible={this.state.bTestDrive} displayValue={info.IsIDCScanned} />
                    <RowAndroid name="OtherVehicleModel" label="试驾超过一辆车型*" visible={this.state.bTestDrive} displayValue={info.OtherVehicleModel} />
                    <RowAndroid name="IsRecepitScanned" label="发票扫描*" visible={this.state.bKnockdown} displayValue={info.IsRecepitScanned} />
                    <RowAndroid name="IsBuyForCompany2" label="是否公司购车" visible={this.state.bKnockdown} displayValue={info.IsBuyForCompany2} />
                    <RowAndroid name="IsBuyForSelf2" label="是否本人购车" visible={this.state.bKnockdown} displayValue={info.IsBuyForSelf2} />
                    <RowAndroid name="Reason1contentText" label="战败类别*" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={info.Reason1contentText} />
                    <RowAndroid name="Reason2contentText" label="战败原因*" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={info.Reason2contentText} />
                    <RowAndroid name="CampaignName" label="活动" visible={!this.state.bReturnVisit} displayValue={info.CampaignName} />
                    <RowAndroid name="ActivityTime" label="本次跟进时间*" displayValue={info.ActivityTime} />
                    <RowAndroid name="IntentionLevelText" label="意向等级*" visible={!this.state.bReturnVisit} displayValue={info.IntentionLevelText} />
                    <RowAndroid name="IntentModel" label="意向车型*" visible={!this.state.bReturnVisit} displayValue={info.IntentModel} />
                    <RowAndroid name="NextActivityTime" label="下次跟进时间*" visible={!this.state.bReturnVisit} displayValue={info.NextActivityTime} />
                    <RowAndroid name="CustomerResponse" label="客户反馈" displayValue={info.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} />
                </View>
            );
        } else {
            return (
                <View style={styles.groupRowsBox}>
                    <RowIos name="AppointmentDate" label="预约试驾时间*" contextType="text" visible={this.state.bOrderDrive} displayValue={info.AppointmentDate} />
                    <RowIos name="ArrivalTime" label="下次到店时间*" visible={this.state.bInvite} displayValue={info.ArrivalTime} />
                    <RowIos name="QuoteAmount_content" label="下订金额*" visible={this.state.bOrderPlaced} displayValue={info.QuoteAmount_content} />
                    <RowIos name="VehicleModel" label="试驾车型*" visible={this.state.bTestDrive} displayValue={info.VehicleModel} />
                    <RowIos name="IsCustomerOwn" label="是否客户本人试驾" visible={this.state.bTestDrive} displayValue={info.IsCustomerOwn} />
                    <RowIos name="IsDLScanned" label="驾照扫描" visible={this.state.bTestDrive} displayValue={info.IsDLScanned} />
                    <RowIos name="IsIDCScanned" label="身份证扫描*" visible={this.state.bTestDrive} displayValue={info.IsIDCScanned} />
                    <RowIos name="OtherVehicleModel" label="试驾超过一辆车型*" visible={this.state.bTestDrive} displayValue={info.OtherVehicleModel} />
                    <RowIos name="IsRecepitScanned" label="发票扫描*" visible={this.state.bKnockdown} displayValue={info.IsRecepitScanned} />
                    <RowIos name="IsBuyForCompany2" label="是否公司购车" visible={this.state.bKnockdown} displayValue={info.IsBuyForCompany2} />
                    <RowIos name="IsBuyForSelf2" label="是否本人购车" visible={this.state.bKnockdown} displayValue={info.IsBuyForSelf2} />
                    <RowIos name="Reason1contentText" label="战败类别*" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={info.Reason1contentText} />
                    <RowIos name="Reason2contentText" label="战败原因*" visible={this.state.bDefeat || this.state.bUnsubscribe || this.state.bReturnedGoods} displayValue={info.Reason2contentText} />
                    <RowIos name="CampaignName" label="活动" visible={!this.state.bReturnVisit} displayValue={info.CampaignName} />
                    <RowIos name="ActivityTime" label="本次跟进时间*" displayValue={info.ActivityTime} />
                    <RowIos name="IntentionLevelText" label="意向等级*" visible={!this.state.bReturnVisit} displayValue={info.IntentionLevelText} />
                    <RowIos name="IntentModel" label="意向车型*" visible={!this.state.bReturnVisit} displayValue={info.IntentModel} />
                    <RowIos name="NextActivityTime" label="下次跟进时间*" visible={!this.state.bReturnVisit} displayValue={info.NextActivityTime} />
                    <RowIos name="CustomerResponse" label="客户反馈" displayValue={info.CustomerResponse} displayType="column" displayCounterText={true} maxLength={200} />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    groupContainer: {
        flex: 1,
        alignItems: "baseline"
    },
    tableContaint: {
        width: width - 55,
    },
    groupRowsBox: {
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.DIVIDER,
        paddingBottom: 10
    },
    recordButtonsBox: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Constants.COLOR.DIVIDER
    },
    defaultBtn: {
		width: 80,
		height: 28,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Constants.COLOR.DARKGREY
	},
	enabledBtn: {
	},
	disabledBtn: {
		backgroundColor: "#d0d2d6"
    },
    buttonText: {
		fontSize: 15,
		color: Constants.COLOR.WHITE
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
