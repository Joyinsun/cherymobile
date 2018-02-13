import * as React from "react";
import { Component } from "react";
import {
	StyleSheet,
 	Text,
 	View,
 	TouchableOpacity,
 	Image
} from "react-native";
import * as Constants from "../../../lib/Constants";
import * as appActions from "../../../app/reducers/app/actions";
import { ActionSheetCustom } from "react-native-actionsheet";
import localStorage from "../../../lib/localStorage";
import * as GlobalVariable from "../../../lib//global";

interface Props {
	userDetail: any;
    dispatch: any;
}
export default class SwitchRole extends Component<Props, any> {
	public actionSheet: any;
    public aOption: any;
    public aButtons: any;
    public render(): JSX.Element {
      let aButtons = this._buildGroup();
        return( <ActionSheetCustom
          ref = { actionSheet => {
                   this.actionSheet = actionSheet;
                   } }
          options = {aButtons}
          cancelButtonIndex = {aButtons.length - 1 }
          onPress = {this.handlePress.bind(this)}
        />);
    }
  	private _switchRole() {
        this.actionSheet.show();
    }

   private _buildGroup() {
    let aButtons = [];
    this.aOption = [];
    let oUserInfo = this.props.userDetail;
    let aRoles = oUserInfo.roles;
    if (aRoles.includes(Constants.CODE_CONSULTANT) && oUserInfo.selectedRole !== Constants.CODE_CONSULTANT) {
        aButtons.push(Constants.CN_CONSULTANT);
        this.aOption.push(Constants.CODE_CONSULTANT);
    }
    if (aRoles.includes(Constants.CODE_SHOWROOM_MANAGER) && oUserInfo.selectedRole !== Constants.CODE_SHOWROOM_MANAGER) {
        aButtons.push(Constants.CN_SHOWROOM_MANAGER);
        this.aOption.push(Constants.CODE_SHOWROOM_MANAGER);
    }
    if (aRoles.includes(Constants.CODE_TEST_DRIVER) && oUserInfo.selectedRole !== Constants.CODE_TEST_DRIVER) {
        aButtons.push(Constants.CN_TEST_DRIVER);
        this.aOption.push(Constants.CODE_TEST_DRIVER);
    }
    if (aRoles.includes(Constants.CODE_DIGITAL_MARKETING_MANAGER) && oUserInfo.selectedRole !== Constants.CODE_DIGITAL_MARKETING_MANAGER) {
        aButtons.push(Constants.CN_DIGITAL_MARKETING_MANAGER);
        this.aOption.push(Constants.CODE_DIGITAL_MARKETING_MANAGER);
    }

    aButtons.push("取消");
    this.aOption.push("cancel");
    return aButtons;
   }
   private handlePress(i) {
    const that = this;
    try {
        let oUserDetail = {};
        for (var attr in that.props.userDetail) {
            if (that.props.userDetail.hasOwnProperty(attr)) {
                oUserDetail[attr] = that.props.userDetail[attr];
            }
        }
        let actionName = "consultant";
        switch (this.aOption[i]) {
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
            case "cancel":
                return;
            default:
                break;
        }
        localStorage.data.save({
            key: "loginRole",
            data: {
                selectedRole: oUserDetail["selectedRole"]
            },
            expires: null
        }).then(() => {
            GlobalVariable.userdetail.selectedRole = oUserDetail["selectedRole"];
            that.props.dispatch(appActions.changeLoginStatus(actionName, "success"));
        });

        //that.props.dispatch(appActions.userDetail(oUserDetail));
        //that.props.dispatch(appActions.changeLoginStatus(actionName, "success"));
        } catch (error) {
            console.log(error);
        }
  }
}
