"use strict";

import * as React from "react";
import { Component } from "react";
import { View, TextInput, Modal, Image, ActivityIndicator, Text, TouchableOpacity, Platform, Keyboard } from "react-native";
import { connect, Dispatch } from "react-redux";
import { leadCheck } from "../reducers/lead/actions";
import Button from "apsl-react-native-button";
import styles from "../styles/CreateLeadScreenStyle";
import LeadItem from "../../app/components/leadItem";
import ILead from "../../app/interfaces/lead";
import ICustomerInfo from "../../app/interfaces/leadDetail/customerInfo";
import Icon from "react-native-vector-icons/Feather";
import * as GlobalVariable from "../../lib//global";
import Resolution from "../../lib/Resolution";
import Common from "../../lib/Common";
import * as Constants from "../../lib/Constants";

interface Props {
  navigator: any;
  leadCreationCheck: {
    customerExisting: boolean,
    leadOwner: string,
    leadInfo: ILead,
    customerInfo: any,
    refresh: boolean
  };
  dispatch: Dispatch<any>;
  leadCheck(mobile: string, dealerID: string, navigator: any, refresh: boolean): void;
}

interface State {
  mobile: string;
  bValidPhone: boolean;
  transparent: boolean;
  autoFocus: boolean;
  displayClearIcon: string;
  leadExisting: boolean;
  isNextStepDisabled: boolean;
  navigated: boolean;
}

class CreateLeadScreen extends Component<Props, State> {
  public state: State = {
    mobile: "",
    bValidPhone: false,
    transparent: false,
    autoFocus: true,
    displayClearIcon: "none",
    leadExisting: false,
    isNextStepDisabled: false,
    navigated: false,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public componentWillReceiveProps(newProps: Props): void {
    if (newProps.leadCreationCheck.refresh) {
      return;
    }
    const { customerExisting, leadOwner, leadInfo, customerInfo } = newProps.leadCreationCheck;
    const sConsultantId = GlobalVariable.userdetail.sciUserId; // curret log on user sci id
    if (leadInfo && leadOwner !== sConsultantId) {
      // lead existing but the owner is not the creator, show toast.
      //Common.showNotification("该手机号码客户已由本店其他销售顾问跟进");
      // this.showNotification("该手机号码客户已由本店其他销售顾问跟进");
      Common.showNotification("该手机号码客户已由本店其他销售顾问跟进", this.props.navigator);
      this.setState({
        leadExisting: false
      });
    } else if (leadInfo && leadOwner === sConsultantId) {
      // lead exist and the follow-up owner is myself, display the lead item.
      this.setState({
        leadExisting: (leadInfo) ? true : false,
        autoFocus: false
      });
    } else if (customerExisting && !leadInfo) {
      // customer(保客) exist and no lead.
      this.navigateToLeadCreationScreen(customerInfo);
    } else {
      // create a new lead.
      this.setState({
        leadExisting: false,
        autoFocus: false
      });
      this.navigateToLeadCreationScreen(customerInfo);
    }
  }
  public render(): JSX.Element {
    if (Platform.OS === "android") {
      let displayStyle = new Object();
      displayStyle["display"] = this.state.displayClearIcon;
      return (
        <Resolution.fixWidthView style={{ flex: 1 }}>
          <View style={styles.alignCenter}>
            {this._renderLogo()}
            <View style={styles.inputContainer}>
              <TextInput
                ref="mobile"
                placeholder="请输入有效的手机号码"
                placeholderTextColor={Constants.COLOR.GREY_ccc}
                style={styles.mobileInput}
                underlineColorAndroid="transparent"
                maxLength={11}
                keyboardType="numeric"
                autoFocus={this.state.autoFocus}
                onChangeText={this.onChange.bind(this)}
              />
              <TouchableOpacity style={[styles.clearIcon, displayStyle]} onPress={() => this.clearText("mobile")}>
                <Icon name="x-circle"
                  size={24}
                />
              </TouchableOpacity>
            </View>
            {this.renderLeadItemCheck()}
            {this._renderActivityIndicator()}
          </View>
        </Resolution.fixWidthView>);
    } else if (Platform.OS === "ios") {
      return (
        <Resolution.fixWidthView style={{ flex: 1 }}>
          <View style={styles.alignCenter}>
            {this._renderLogo()}
            <TextInput
              ref="mobile"
              placeholder="请输入有效的手机号码"
              placeholderTextColor={Constants.COLOR.GREY_ccc}
              style={styles.mobileInputIOS}
              maxLength={11}
              keyboardType="numeric"
              clearButtonMode="while-editing"
              autoFocus={this.state.autoFocus}
              onChangeText={this.onChange.bind(this)}
            />
            {this.renderLeadItemCheck()}
            {this._renderActivityIndicator()}
          </View>
        </Resolution.fixWidthView>);
    }
  }
  private _renderLogo(): JSX.Element {
    return (
      <View>
        <Image source={require("../../../img/logo@3x.png")}
          style={styles.logoImg} />
      </View>);
  }
  private _renderActivityIndicator(): JSX.Element {
    return (
      <Modal
        visible={this.props.leadCreationCheck.refresh}
        transparent={true}
        animationType="none"
        onRequestClose={() => {
          // this._setModalVisible(false);
        }}>
        <ActivityIndicator
          animating={this.props.leadCreationCheck.refresh}
          style={styles.refreshIndicator}
          size="large"
        />
      </Modal>);
  }
  private renderLeadItemCheck(): JSX.Element {
    if (this.state.leadExisting) {
      let lead: ILead = this.props.leadCreationCheck.leadInfo;
      console.log(lead);
      return (<View style={{ flex: 1, marginTop: 30 }}>
        <LeadItem lead={lead} navigator={this.props.navigator} roleName="consultant" />
      </View>);
    } else {
      return (<Button
        style={styles.buttonContainer}
        textStyle={styles.textStyle6}
        disabledStyle={styles.buttonDisabled}
        isDisabled={Boolean(!this.state.bValidPhone || this.state.isNextStepDisabled)}
        onPress={this.nextStepForClue.bind(this)}>
        下一步
         </Button>);
    }
  }
  private onNavigatorEvent(event) {
    switch (event.id) {
      case "avatar":
        this.props.navigator.pop();
        break;
      case "didAppear":
        this.setState({
          isNextStepDisabled: false,
          navigated: false
        });
        break;
      default:
    }
  }

  private onChange(str: string): void {
    this.setState({
      leadExisting: false
    });
    const regMobileNumber = new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/);
    if (str.length == 11) {
      let bValidPhone = (regMobileNumber.test(str));
      if (bValidPhone) {
        this.setState({ bValidPhone: bValidPhone, mobile: str, autoFocus: false, isNextStepDisabled: false });
      } else {
        this.setState({ bValidPhone: false });
        Common.showNotification("请输入有效的手机号", this.props.navigator);
      }
    } else {
      this.setState({ bValidPhone: false });
    }
    if (Platform.OS === "android" && str.length > 0) {
      this.setState({
        displayClearIcon: "flex"
      });
    }
  }

  private navigateToLeadCreationScreen(customerInfo: any): void {
    this.props.navigator.push({
      title: "创建线索",
      screen: "consultant.LeadDetailsInfoScreen",
      animationType: "slide-horizontal",
      passProps: {
        customerInfo: customerInfo,
        mobile: this.state.mobile
      },
      navigatorStyle: {
        tabBarHidden: true
      },
      navigatorButtons: {
        rightButtons: [{
          title: "确定",
          id: "confirm",
          disabled: false
        }]
      }
    });
    this.setState({
      navigated: true
    });
  }

  private nextStepForClue(): void {
    this.setState({
      isNextStepDisabled: true,
      navigated: false
    });
    const mobile = this.state.mobile;
    const dealerID = GlobalVariable.userdetail.dealerId;
    this.props.leadCheck(mobile, dealerID, this.props.navigator, true);
    Keyboard.dismiss();
  }

  private clearText(fieldName: string): void {
    let textInput: any = this.refs[fieldName];
    textInput.clear(0);
    this.setState({
      displayClearIcon: "none",
      leadExisting: false,
      autoFocus: true,
      bValidPhone: false,
      isNextStepDisabled: false
    });
  }
}

function mapStateToProps(state: any) {
  return {
    leadCreationCheck: state.rolea_lead.leadCreationCheck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    leadCheck: (mobile: string, dealerID: string, navigator: any, refresh: boolean) => {
      dispatch(leadCheck(mobile, dealerID, navigator, refresh));
    }, dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeadScreen);
