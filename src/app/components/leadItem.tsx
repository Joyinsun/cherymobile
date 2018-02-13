"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

import { AsyncStorage, StyleSheet, Alert, Linking, ScrollView, TouchableHighlight, TouchableOpacity, View, Text, Image, Dimensions, Animated, Easing } from "react-native";
import _ from "lodash";
import Communications from "react-native-communications";
import IProps from "../interfaces/props";
import ILead from "../interfaces/lead";
import ContactType from "../interfaces/contactType";
import styles from "../styles/LeadItemStyle";

import Icon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Common from "../../lib/Common";
import CallDetectorManager from "react-native-call-detection";
import Util from "../../lib/util";

const moment = require("moment");

interface Props {
    lead: ILead;
    navigator: any;
    roleName: string;
}

interface State {
}

class LeadItem extends Component<Props, State> {
    public render(): JSX.Element {
        const { roleName } = this.props;
        const { lead } = this.props;
        const intentionCar: string = Util.formatStringWithEllipsis(lead.IntentionCarNameLevel2, 10);
        const customerName: string = Util.formatStringWithEllipsis(lead.IndividualCustomerFamilyName, 5);

        return (
            <View style={[styles.thumbnail, (lead.UserStatusCode === "ZA" || lead.UserStatusCode === "Z5") && styles.whiteMask]}>
                <TouchableOpacity
                style={styles.touchable}
                onPress={(event) => { this.onPressEvent(); }}>
                    <View style={styles.container}>
                        {/* 第一行： 用户名、意向车型、首触 */}
                        <View style={styles.base}>
                            <Text style={[styles.title, { color: Constants.COLOR.DARKGREY }]}>
                                {customerName}
                            </Text>
                            <Text style={[styles.title, { flex: 4, color: Constants.COLOR.GREY_666, marginLeft: 10 }]}>
                                {intentionCar}
                            </Text>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={(event) => { this.openSourceLevelDetail(event, lead); }}
                            >
                                <Text style={[styles.title, { color: Constants.COLOR.DARKGREY }]}>
                                    {lead.FirstTouch}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            roleName.includes("manager") ?
                            this.leadItemManager() :
                            ((lead.UserStatusCode === "ZA" || lead.UserStatusCode === "Z5") ? this.invalidLeadItemInConsultant() : this.validLeadItemInConsultant())
                        }
                    </View>
                    {
                        lead.UserStatusCode === "ZA" || lead.UserStatusCode === "Z5" ?
                        <Image
                            style={styles.markLabel}
                            source={require("../../../img/gameover.png")}
                        /> :
                        (lead.UserStatusCode === "Z9" ?
                        <Image
                            style={styles.markLabel}
                            source={require("../../../img/deal.png")}
                        /> : <View />)
                    }
                </TouchableOpacity>
            </View>
        );
    }

    private pushLableItem(): Array<any> {
        const data = this.props.lead;
        let labelComponents = [];

        if (data.ActionTimes) {
            labelComponents.push("跟进" + _.round(data.ActionTimes) + "次");
        }

        switch (data.UserStatusCode) {
            case "Z1": {
                if (data.ArrivalTimes && _.round(data.ArrivalTimes) !== 0) {
                    labelComponents.push("到店" + _.round(data.ArrivalTimes) + "次");
                }
                break;
            }
            default: {
                labelComponents.push(data.UserStatusCodeText);
                break;
            }
        }
        return labelComponents;
    }

    private createLabelList(): JSX.Element {
        const data = this.props.lead;
        let labelComponents = [];
        if (data.UserStatusCode !== "01") { //已分配
            labelComponents =  this.pushLableItem();
        }
        return _.map(labelComponents, (item, index) => <Text key={index} style={styles.itemText}>{item}</Text>);
    }

    private onPressEvent(): void {
        const roleName: string = this.props.roleName;
        const lead: ILead = this.props.lead;
        let title: string = "线索详情";

        if (roleName.includes("manager")) {
            if (lead.UserStatusCode === "01") {
                title = title + "/未分配";
            } else {
                title = title + "/已分配";
            }
        }
        Common.callOnceEvent(() =>
            this.props.navigator.push({
                screen: roleName + ".LeadDetailScreen",
                title,
                animated: true,
                animationType: "slide-horizontal",
                passProps: {
                    leadObjectId: lead.ObjectID
                },
                navigatorStyle: {
                    tabBarHidden: roleName.includes("manager") ? true : false
                }
            })
        );
    }

    private openSourceLevelDetail(currentEvent: any, lead: ILead): void {
        const roleName: string = this.props.roleName;
        this.props.navigator.push({
            screen: roleName + ".LeadSourceDetailScreen",
            title: lead.IndividualCustomerFamilyName + "APP",
            animated: true,
            animationType: "slide-horizontal",
            passProps: {
                ymktUUID: lead.YmktContactUUIDcontent
            },
            navigatorStyle: {
                tabBarHidden: true
            }
        });
    }

    // create for manager
    private leadItemManager(): JSX.Element {
        const { lead } = this.props;

        if (lead.UserStatusCode == "01") {  //未分配
            return (<View style={{ marginTop: 25 }}>
                <View style={[styles.base]}>
                    <Text style={styles.tintText}>待分配</Text>
                    {
                        lead.HasChecked ?
                        <Image
                            style={{ width: 24, height: 24 }}
                            source={require("../../../img/earphone.png")}
                        /> :
                        <Text></Text>
                    }
                </View>
                <View style={styles.base}>
                    <Text style={styles.tintText}></Text>
                    <Text style={styles.time}>
                        {Util.formatC4CDateToDate(lead.CreationDateTime)}
                    </Text>
                </View>
            </View>);
        } else {
            return (<View>
                <View style={[styles.base]}>
                    <View style={[styles.base, styles.labelsContainer]}>
                        <Text style={[lead.LeadLevelText && styles.tintText, { fontSize: 22 }]}>
                            {lead.LeadLevelText}
                        </Text>
                        {this.createLabelList()}
                    </View>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../../../img/earphone.png")}
                    />
                </View>
                <View style={styles.base}>
                    <Text style={[styles.tintText, { color: "#FD8696" }]}>{lead.UserStatusCodeText}</Text>
                    <Text style={styles.time}>
                        {Util.formatC4CDateToDate(lead.CreationDateTime)}
                    </Text>
                </View>
            </View>);
        }
    }

    //click call/message/shop/wechat icon
    private onPressIcon(type: ContactType): void {
        switch (type) {
            case ContactType.call:
                this.callCustomer(type);
                break;
            case ContactType.message:
                this.props.navigator.showModal({
                    screen: "app.MessageTemplateScreen",
                    title: "选择短信内容",
                    animationType: "slide-horizontal",
                    passProps: {
                        phone: this.props.lead.Mobile,
                        onSendComplete: () => {
                            this.props.navigator.dismissModal();
                            this.linkToDetailPage(type);
                        }
                    }
                });
                break;
            case ContactType.shop:
                this.linkToDetailPage(type);
                break;
            case ContactType.wechat:
                let url = "weixin://";
                Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                        Linking.openURL(url);
                    } else {
                        Alert.alert(
                            "提示",
                            "请安装微信",
                            [
                                { text: "确定", onPress: () => console.log("OK Pressed!") },
                            ]
                        );
                    }
                }).then(() => {
                    this.linkToDetailPage(type);
                });
                break;
            default:
                // code...
                break;
        }
    }

    private callCustomer(type) {
        let data = {
            startDateTime: 0,
            endDateTime: 0,
            callResult: null,
            phoneDuration: 0
        };
       /* let aDataList = [];
        let dialTime = new Date().toLocaleString();
        console.log("开始打电话------------------");
        let callDetector = new CallDetectorManager((event) => {
            console.log("状态-------------" + event);
            if (event === "Disconnected") {
                if (!callDetector) {
                    callDetector.dispose();
                }
                const dialConnectedTime = (new Date().getTime() - data.startDateTime) / 1000;
                let message = "";
                if (data.startDateTime === 0)
                    message = "拨号时间:" + dialTime + ", 客户未接";
                else
                    message = "通话时间:" + dialTime + ", 共" + dialConnectedTime + "秒";

                aDataList.push({
                    history: message
                });
                this.linkToDetailPage(type, data);
            } else if (event === "Connected") {
                data.startDateTime = new Date().getTime();
            } else if (event === "Offhook") {
                data.callResult = "Offhook";
            }

            this.linkToDetailPage(type, data);
        },
        false,
        (error) => { Common.showNotification(error); },
        {
            title: "Phone State Permission",
            message: "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
        });*/
        /*Linking.openURL("tel:" + this.props.lead.Mobile).catch(err => {
            console.log("打电话报错" + err);
            Common.showNotification(err);
        });*/
        this.linkToDetailPage(type);
        Communications.phonecall(this.props.lead.Mobile, false);
    }

    private linkToDetailPage(type: ContactType, para?: any): void {
        var parameter : any = {
            leadObjectId: this.props.lead.ObjectID,
            selctedType: type
        };
        if (type === ContactType.call && para) {
            parameter.contactParameter = para;
        }
        this.props.navigator.push({
            screen: "consultant.LeadDetailScreen",
            title: "线索详情",
            animated: true,
            animationType: "slide-horizontal",
            navigatorStyle: {
                topBarElevationShadowEnabled: false
            },
            passProps: parameter
        });
    }

    // create for consultant
    private validLeadItemInConsultant(): JSX.Element {
        const { lead } = this.props;
        const icon = require("../../../img/dropdown_arrow.png");
        let bCallEnable = true;
        let bSMSEnable = true;
        let bLocalEnable = true;
        let bWechatEnable = true;
        if (lead.ApprovalStatus === "1") {
            bCallEnable = false;
            bSMSEnable = false;
            bLocalEnable = false;
            bWechatEnable = false;
        } else if (lead.APPTaskType === "Z4" || lead.APPTaskType === "Z5") {
            bCallEnable = false;
            bSMSEnable = false;
            bWechatEnable = false;
        }
        const intentionCar: string = Util.formatStringWithEllipsis(lead.IntentionCarNameLevel2, 10);
        const customerName: string = Util.formatStringWithEllipsis(lead.IndividualCustomerFamilyName, 5);

        return (
            <View>
                <View style={[styles.base]}>
                    <View style={[styles.base, styles.labelsContainer]}>
                        <Text style={[lead.LeadLevelText && styles.tintText, { fontSize: 22 }]}>
                            {lead.LeadLevelText}
                        </Text>
                        {this.createLabelList()}
                    </View>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../../../img/earphone.png")}
                    />
                </View>

                <View style={styles.base}>
                    <View style={[styles.base, { justifyContent: "space-between", flex: 1 }]}>
                        <TouchableOpacity
                            onPress={bCallEnable ? (e) => this.onPressIcon(ContactType.call) : null}
                        >
                            <Image
                                style={styles.iconStyle}
                                source={require("../../../img/phone.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={bSMSEnable ? (e) => this.onPressIcon(ContactType.message) : null}
                        >
                            <Image
                                style={styles.iconStyle}
                                source={require("../../../img/message.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={bLocalEnable ? (e) => this.onPressIcon(ContactType.shop) : null}
                        >
                            <Image
                                style={styles.iconStyle}
                                source={require("../../../img/store.png")}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={bWechatEnable ? (e) => this.onPressIcon(ContactType.wechat) : null}
                        >
                            <Image
                                style={styles.iconStyle}
                                source={require("../../../img/wechat.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.time}>
                        {Util.formatC4CDateToDate(lead.CreationDateTime)}
                    </Text>
                </View>
            </View>
        );
    }

    private invalidLeadItemInConsultant(): JSX.Element {
        const { lead } = this.props;

        return (
            <View>
                <View style={[styles.base]}>
                    <View style={[styles.base, styles.labelsContainer]}>
                        <Text style={[lead.LeadLevelText && styles.tintText, { fontSize: 22 }]}>
                            {lead.LeadLevelText}
                        </Text>
                        {this.createLabelList()}
                    </View>
                    <Image
                        style={{ width: 24, height: 24 }}
                        source={require("../../../img/earphone.png")}
                    />
                </View>

                <View style={styles.base}>
                    <View style={[styles.base, { justifyContent: "space-between", flex: 1 }]}>
                        <Image
                            style={styles.iconStyle}
                            source={require("../../../img/phone.png")}
                        />
                        <Image
                            style={styles.iconStyle}
                            source={require("../../../img/message.png")}
                        />
                        <Image
                            style={styles.iconStyle}
                            source={require("../../../img/store.png")}
                        />
                        <Image
                            style={styles.iconStyle}
                            source={require("../../../img/wechat.png")}
                        />
                    </View>
                    <Text style={styles.time}>
                        {Util.formatC4CDateToDate(lead.CreationDateTime)}
                    </Text>
                </View>
            </View>
        );
    }
}

export default LeadItem;
