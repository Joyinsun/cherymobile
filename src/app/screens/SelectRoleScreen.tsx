import * as React from "react";
import { Component } from "react";
import { View, AsyncStorage, StyleSheet, Image, Text } from "react-native";
import { connect, Dispatch } from "react-redux";
import * as appActions from "../reducers/app/actions";
import ImageButton from "../components/ImageButton/imageButton";
import styles from "../styles/SelectRoleScreenStyle";
import * as Constants from "../../lib/Constants";
import * as GlobalVariable from "../../lib//global";
import localStorage from "../../lib/localStorage";
import Resolution from "../../lib/Resolution";

interface Props {
    userDetail: any;
    dispatch: Dispatch<any>;
}
class SelectRoleScreen extends React.Component<Props, any> {
    constructor(props) {
        super(props);
    }
    public selectRole(oElement): any {
        const that = this;

        let oUserDetail = {};
        for (var attr in that.props.userDetail) {
            if (that.props.userDetail.hasOwnProperty(attr)) {
                oUserDetail[attr] = that.props.userDetail[attr];
            }
        }
        let actionName = "consultant";
        switch (oElement.props.role) {
            case Constants.CODE_CONSULTANT:
                oUserDetail["selectedRole"] = Constants.CODE_CONSULTANT;
                actionName = "consultant";
                break;
            case Constants.CODE_SHOWROOM_MANAGER:
                oUserDetail["selectedRole"] = Constants.CODE_SHOWROOM_MANAGER;
                actionName = "manager";
                break;
            case Constants.CODE_TEST_DRIVER:
                oUserDetail["selectedRole"] = Constants.CODE_TEST_DRIVER;
                actionName = "driver";
                break;
            case Constants.CODE_DIGITAL_MARKETING_MANAGER:
                oUserDetail["selectedRole"] = Constants.CODE_DIGITAL_MARKETING_MANAGER;
                actionName = "manager2";
                break;
            default:
                break;
        }
        localStorage.data.save({
            key: "loginRole",
            data: {
                selectedRole: oUserDetail["selectedRole"]
            },
            // if not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
        }).then(() => {
            GlobalVariable.userdetail.selectedRole = oUserDetail["selectedRole"];
            that.props.dispatch(appActions.changeLoginStatus(actionName, "success"));
        });
    }

    public render() {
        //let aRoles = this.props.userDetail.roles;
        //let aRoles:any = ["ROLE_SALE_CONSULTANT","ROLE_SALE_MANAGER","ROLE_SALE_DRIVER"];

        let aRoles: any = GlobalVariable.userdetail.roles;
        //let aRoles: any = ["ROLE_SALE_CONSULTANT", "ROLE_SALE_MANAGER", "ROLE_SALE_DRIVER", "ROLE_SALE_MANAGER2"];
        return (
            <Resolution.fixWidthView>
                <View style={styles.container}>
                    <Image source={require("../../../img/bg_select_business.png")} resizeMode="cover" style={styles.bg} />
                    <View style={styles.headerBar}>
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>选择业务角色</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <ImageButton onPress={this.selectRole.bind(this)} role={Constants.CODE_CONSULTANT} visible={aRoles.includes(Constants.CODE_CONSULTANT)} imageURL={require("../../../img/sale_customer.png")} text={Constants.CN_CONSULTANT} />
                        <ImageButton onPress={this.selectRole.bind(this)} role={Constants.CODE_SHOWROOM_MANAGER} visible={aRoles.includes(Constants.CODE_SHOWROOM_MANAGER)} imageURL={require("../../../img/storemanager.png")} text={Constants.CN_SHOWROOM_MANAGER} />
                        <ImageButton onPress={this.selectRole.bind(this)} role={Constants.CODE_TEST_DRIVER} visible={aRoles.includes(Constants.CODE_TEST_DRIVER)} imageURL={require("../../../img/testdrive.png")} text={Constants.CN_TEST_DRIVER} />
                        <ImageButton onPress={this.selectRole.bind(this)} role={Constants.CODE_DIGITAL_MARKETING_MANAGER} visible={aRoles.includes(Constants.CODE_DIGITAL_MARKETING_MANAGER)} imageURL={require("../../../img/num_manager.png")} text={Constants.CN_DIGITAL_MARKETING_MANAGER} />
                    </View>
                </View>
            </Resolution.fixWidthView>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        userDetail: state.app.userDetail
    };
}

export default connect(mapStateToProps)(SelectRoleScreen);
