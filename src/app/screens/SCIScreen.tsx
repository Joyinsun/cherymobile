import * as React from "react";
import { Component } from "react";
import { StyleSheet, View, Text, Dimensions, Button, WebView, Platform, AsyncStorage, ActivityIndicator } from "react-native";
import { connect, Dispatch } from "react-redux";
import * as appActions from "../reducers/app/actions";
import CookieManager from "react-native-cookies";
import * as Constants from "../../lib/Constants";
import httpFetch from "../../lib/httpFetch";
import * as GlobalVariable from "../../lib/global";
import localStorage from "../../lib/localStorage";
import styles from "../styles/SCIStyle";
import { initMetadata } from "../../lib/metadata";
import Common from "../../lib/Common";

import _ from "lodash";

interface Props {
  username: string;
  password: string;
  navigator: any;
  loginStatus: string;
  loading: boolean;
  isLoggedIn: string;
  loginURL: string;
  errorMessage: string;
  action: string;
  dispatch: Dispatch<any>;
  connectTime: number;
}

interface State {
  errorMessage: string;
  popupShowed: boolean;
  js: string;
  loginURL: string;
  loading: boolean;
  action: string;
  loginMessage: string;
}
class SCIScreen extends React.Component<Props, State> {
  public isSubmit: boolean;
  public errorCount: number;
  public isDispatch: boolean;
  public webview: any;
  public userInfo: any;
  public state: State = {
    errorMessage: undefined,
    popupShowed: false,
    js: "",
    loginURL: this.props.loginURL,
    loading: false,
    action: this.props.action,
    loginMessage: ""
  };
  constructor(props) {
    super(props);
    this.isSubmit = true;
    this.errorCount = 0;
    this.isDispatch = false;
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.onLoadEnd = this.onLoadEnd.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  public noPermissionAccess(aRoles: any) {
    var find = false;
    if (aRoles.includes(Constants.CODE_CONSULTANT) || aRoles.includes(Constants.CODE_SHOWROOM_MANAGER) || aRoles.includes(Constants.CODE_TEST_DRIVER) || aRoles.includes(Constants.CODE_DIGITAL_MARKETING_MANAGER))
      find = true;
    return find;
  }
  public async checkFirstTimeLogin() {
    const that = this;
    try {
      fetch(Constants.SCP_USERDETAIL_URL)
        .then((response) => response.json())
        .then((responseJson) => {
          let actionName = "selectRole";
          responseJson.selectedRole = null;
          if (responseJson.roles.length === 0 || !that.noPermissionAccess(responseJson.roles)) {
            if (Platform.OS === "android") {
              that.isDispatch = false;
              that.setState({
                loginURL: Constants.SCPLOGOUT,
                action: "logout"
              });
              that.props.dispatch(appActions.changeLoginStatus("login", "error", "本账号角色不存在"));
            } else {
              that.isDispatch = false;
              that.setState({
                loginURL: Constants.SCPLOGOUT,
                action: "logout"
              });
              that.props.navigator.dismissAllModals();
              that.props.dispatch(appActions.changeLoginStatus("login", "error", "本账号角色不存在"));
            }
            //that.isDispatch = true;
          } else {
            //replace the global variable when the local storage mechanism is ready
            GlobalVariable.userdetail.c4cAuthorization = responseJson.c4cAuthorization;
            GlobalVariable.userdetail.marktingAuthorization = responseJson.marktingAuthorization;
            GlobalVariable.userdetail.roles = responseJson.roles;
            GlobalVariable.userdetail.managerId = responseJson.managerId;
            GlobalVariable.userdetail.dealerId = responseJson.dealerId;
            GlobalVariable.userdetail.name = responseJson.name;
            GlobalVariable.userdetail.id = responseJson.id;
            GlobalVariable.userdetail.sciUserId = responseJson.sciUserId;

            localStorage.data.save({
              key: "loginInfo",
              data: {
                un: this.props.username,
                pw: this.props.password
              },
              // if not specified, the defaultExpires will be applied instead.
              // if set to null, then it will never expire.
              expires: null
            });
            localStorage.data.load({
              key: "loginRole"
            }).then(ret => {
              if (ret.selectedRole) {
                switch (ret.selectedRole) {
                  case Constants.CODE_CONSULTANT:
                    responseJson.selectedRole = Constants.CODE_CONSULTANT;
                    actionName = "consultant";
                    break;
                  case Constants.CODE_SHOWROOM_MANAGER:
                    responseJson.selectedRole = Constants.CODE_SHOWROOM_MANAGER;
                    actionName = "manager";
                    break;
                  case Constants.CODE_TEST_DRIVER:
                    responseJson.selectedRole = Constants.CODE_TEST_DRIVER;
                    actionName = "driver";
                    break;
                  case Constants.CODE_DIGITAL_MARKETING_MANAGER:
                    responseJson.selectedRole = Constants.CODE_DIGITAL_MARKETING_MANAGER;
                    actionName = "manager2";
                    break;
                  default:
                    break;
                }
                responseJson.selectedRole = ret.selectedRole;
                GlobalVariable.userdetail.selectedRole = ret.selectedRole;
              }
              that.props.dispatch(appActions.changeLoginStatus(actionName, "success"));
            }).catch(err => {
              that.props.dispatch(appActions.changeLoginStatus(actionName, "success"));
              that.isDispatch = true;
            });
            initMetadata();
          }
        }).catch(function(err) {
          localStorage.data.remove({
            key: "loginRole"
          });
          that.props.dispatch(appActions.changeLoginStatus("login", "error", "无法得到用户信息"));
          that.props.navigator.dismissAllModals();
        });
    } catch (error) {
      // Error saving data
      that.props.dispatch(appActions.changeLoginStatus("login", "error", "无法得到用户信息"));
      that.props.navigator.dismissAllModals();
    }
  }
  public async onNavigationStateChange(navState: any): Promise<any> {
    const that = this;
    if (this.state.action === "login" && !this.isDispatch) {
      if (new Date().getTime() - this.props.connectTime > 60000) {
        //alert("连接超时");
        //that.props.navigator.dismissAllModals();
        that.props.navigator.dismissAllModals();
        that.props.dispatch(appActions.changeLoginStatus("login", "error", "连接服务器出现问题，请稍后再试"));
      } else if (navState.url === Constants.SCP_SWAGGER_URL) {
        that.isDispatch = true;
        that.checkFirstTimeLogin();
      }
    } else if (this.state.action === "logout" && !this.isDispatch) {
      if (navState.url === Constants.SCIURL) {
        localStorage.data.remove({
          key: "loginInfo"
        });
        localStorage.data.remove({
          key: "loginRole"
        });
        that.setState({
          loginMessage: "Logout Success"
        });
        if (Platform.OS === "android")
          that.props.navigator.dismissAllModals();
        that.props.dispatch(appActions.logout());
        that.isDispatch = true;
      }
    }
  }
  public onError(e): any {
    this.props.dispatch(appActions.changeLoginStatus("login", "error", "连接服务器出现问题，请稍后再试"));
    this.props.navigator.dismissAllModals();
  }
  public onLoadEnd(e): any {
    const targetUrl = e.nativeEvent.url;
    if (targetUrl === Constants.SCIURL && this.errorCount === 0 && this.isSubmit) {
      if (this.state.action === "login") {
        const injectScript = `
                        function executeAction(){
                            document.getElementById("j_username").value ="${this.props.username}";
                            document.getElementById("j_password").value ="${this.props.password}";
                            document.getElementById("logOnFormSubmit").click();
                        }
                        executeAction();
                    `;
        if (this.webview) {
          this.webview.injectJavaScript(injectScript);
          this.isSubmit = false;
        }
      }
    } else if (targetUrl === Constants.SCIURL && this.errorCount === 0 && !this.isSubmit) {
      const checkErrorMessage = "window.postMessage(document.getElementsByClassName('ids-message--error').length)";
      if (this.webview) {
        this.webview.injectJavaScript(checkErrorMessage);
      }
    }
  }
  public handleMessage(e): any {
    this.errorCount = parseInt(e.nativeEvent.data, 0);
    if (this.errorCount > 0) {
      this.props.dispatch(appActions.changeLoginStatus("login", "error", "登录密码不正确"));
      this.props.navigator.dismissAllModals();
    }
  }
  public renderWebView(): JSX.Element {
    return (<View style={styles.sciview}><WebView
      ref={webview => {
        this.webview = webview;
      }}
      automaticallyAdjustContentInsets={true}
      source={this.state.loginURL ? { uri: this.state.loginURL } : require("../nologin.html")}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      onError={this.onError}
      onLoadEnd={this.onLoadEnd}
      onNavigationStateChange={this.onNavigationStateChange}
      startInLoadingState={true}
      onMessage={this.handleMessage} /></View>);
  }
  public render(): JSX.Element {
    return (
      <View style={styles.container}>
        {this.renderWebView()}
        <View style={styles.horizontal}>
          <ActivityIndicator
            animating={true}
            style={{
              height: 80
            }}
            size="large"
          />
        </View>
      </View>
    );
  }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state: any) {
  return {
    isLoggedIn: state.app.root,
    loading: state.app.loading,
    errorMessage: state.app.errorMessage,
    loginStatus: state.app.loginStatus
  };
}

export default connect(mapStateToProps)(SCIScreen);
