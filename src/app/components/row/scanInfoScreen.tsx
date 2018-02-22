"use strict";
import * as React from "react";
import { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text, TextInput, ScrollView, Dimensions, Platform } from "react-native";
import RowAndroid from "../row/index.android";
import RowIos from "../row/index.ios";
import * as Constants from "./../../../lib/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#fff"
    },
    NavRow: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        marginRight: -10
    },
    input: {
        width: Constants.SCREEN_WIDTH / 2,
        padding: 0,
        textAlign: "right"
    },
    text: {
        fontSize: 16
    },
    selectItem: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        width: Constants.SCREEN_WIDTH
    }
});

interface Props {
    navigator: any;
    selectKey: string;
    onSelectItem: any;
    type: "scanIDCard" | "scanDriveCard" | "scanInvoice";
}

interface State {
    selectKey: string;
    aSelectIndex: any;
    aSelectData: any;
    data: any;
}

class ScanInfoScreen extends Component<Props, State> {
    public static navigatorButtons = {
        rightButtons: [
            {
                id: "submitButton",
                title: "确定",
                buttonColor: "black"
            }
        ]
    };

    public state: State = {
        selectKey: this.props.selectKey,
        aSelectIndex: [],
        aSelectData: [],
        data: {
            OCRID: "", //身份证号码// 身份证号码（组织机构代码）
            OCRCustomerName: "", // 姓名    // 购方名称
            OCRGender: "", // 性别
            OCRGenderText: "",
            IDAddress: "", // 住址
            OCRBirthDate: "", // 出生日期
            OCRApplicationDate: "", // 领证日期
            OCRCountryText: "",
            OCRCountry: "", // 国籍
            OCRDriveCarCategory: "", // 准驾车型
            OCRStartDate: "", // 起始日期
            OCRDuration: "", // 有效期限

            OCRInvoiceCodeID: "", // 发票代码
            OCRInvoiceID: "", // 发票号码
            OCRInvoiceDate: "", // 开票日期
            OCRInvoiceAmountcontent: "", // 不含税价
            OCRInvoiceCar: "", // 厂牌型号
            OCRInvoiceAmountWithTaxcontent: "", // 价税合计小写
            OCRProofCertificateID: "", // 合格证号
            OCREngineCode: "", // 发动机号码
            OCRVINCode: "", // 车架号
            ProducerAddress: "", // 产地
        }
    };
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    public render(): JSX.Element {
        return (
            <ScrollView style={[styles.container]}>
                {this.renderContent()}
            </ScrollView>
        );
    }
    private renderContent(): JSX.Element {
        let aGender = [
            {
                id: 0,
                key: "1",
                value: "男"
            },
            {
                id: 1,
                key: "2",
                value: "女"
            },
        ];

        if (Platform.OS === "android")
            return (
                <View style={styles.tableContaint}>
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="姓名" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="身份证号码" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRBirthDate" label="出生日期" contextType="datepicker" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRBirthDate} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRGenderText" label="性别" dataSource={aGender} rootScreenTitle={"性别"} contextType="picker" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRGenderText} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IDAddress" label="地址" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.IDAddress} navigator={this.props.navigator} />

                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="驾照编号" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="姓名" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRGenderText" label="性别" dataSource={aGender} rootScreenTitle={"性别"} contextType="picker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRGenderText} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCountryText" label="国籍" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRCountryText} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IDAddress" label="住址" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.IDAddress} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRBirthDate" label="出生日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRBirthDate} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRApplicationDate" label="领证日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRApplicationDate} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRDriveCarCategory" label="准驾车型" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRDriveCarCategory} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRStartDate" label="起始日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRStartDate} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRDuration" label="有效期限" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRDuration} navigator={this.props.navigator} />

                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceCodeID" label="发票代码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceCodeID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceID" label="发票号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceDate" label="开票日期" contextType="datepicker" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceDate} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceCar" label="厂牌型号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceCar} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="购方名称" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="身份证号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceAmountWithTaxcontent" label="价税合计小写" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceAmountWithTaxcontent} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRProofCertificateID" label="合格证号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRProofCertificateID} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCREngineCode" label="发动机号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCREngineCode} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRVINCode" label="车架号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRVINCode} navigator={this.props.navigator} />
                    <RowAndroid editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ProducerAddress" label="产地" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.ProducerAddress} navigator={this.props.navigator} />
                </View>
            );
        else
            return (
                <View style={styles.tableContaint}>
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="姓名" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="身份证号码" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRBirthDate" label="出生日期" contextType="datepicker" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRBirthDate} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRGenderText" label="性别" dataSource={aGender} rootScreenTitle={"性别"} contextType="picker" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.OCRGenderText} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IDAddress" label="地址" contextType="input" visible={this.props.type === "scanIDCard" ? true : false} displayValue={this.state.data.IDAddress} navigator={this.props.navigator} />

                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="驾照编号" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="姓名" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRGenderText" label="性别" dataSource={aGender} rootScreenTitle={"性别"} contextType="picker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRGenderText} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCountryText" label="国籍" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRCountryText} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="IDAddress" label="住址" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.IDAddress} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRBirthDate" label="出生日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRBirthDate} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRApplicationDate" label="领证日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRApplicationDate} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRDriveCarCategory" label="准驾车型" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRDriveCarCategory} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRStartDate" label="起始日期" contextType="datepicker" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRStartDate} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRDuration" label="有效期限" contextType="input" visible={this.props.type === "scanDriveCard" ? true : false} displayValue={this.state.data.OCRDuration} navigator={this.props.navigator} />

                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceCodeID" label="发票代码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceCodeID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceID" label="发票号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceDate" label="开票日期" contextType="datepicker" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceDate} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceCar" label="厂牌型号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceCar} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRCustomerName" label="购方名称" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRCustomerName} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRID" label="身份证号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRInvoiceAmountWithTaxcontent" label="价税合计小写" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRInvoiceAmountWithTaxcontent} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRProofCertificateID" label="合格证号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRProofCertificateID} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCREngineCode" label="发动机号码" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCREngineCode} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="OCRVINCode" label="车架号" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.OCRVINCode} navigator={this.props.navigator} />
                    <RowIos editable={true} onChangeEvent={this.onValueChange.bind(this)} name="ProducerAddress" label="产地" contextType="input" visible={this.props.type === "scanInvoice" ? true : false} displayValue={this.state.data.ProducerAddress} navigator={this.props.navigator} />
                </View>
            );
    }
    private onValueChange(displayInfo: any): void {
        let oData = this.state.data;
        let that = this;
        for (var key in displayInfo) {
            if (displayInfo.hasOwnProperty(key)) {
                switch (key) {
                    case "OCRGenderText":
                        oData[key] = displayInfo[key].value;
                        oData["OCRGender"] = displayInfo[key].key;
                        break;
                    default:
                        oData[key] = displayInfo[key];
                        break;
                }
            }
        }
        this.setState({
            data: oData
        });
    }

    private onNavigatorEvent(event) {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "submitButton") {
                this.props.onSelectItem(this.state.data);
                this.props.navigator.dismissModal();
            }
        }
    }
}
export default ScanInfoScreen;
