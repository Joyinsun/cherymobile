import * as React from "react";
import { Component } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, TouchableHighlight, Alert, AlertIOS, Platform, AsyncStorage, Dimensions } from "react-native";
import { connect, Dispatch } from "react-redux";
import styles from "../styles/LoginScreenStyle";
import * as appActions from "../reducers/app/actions";
import * as Constants from "../../lib/Constants";
import * as GlobalVariable from "../../lib/global";
import Common from "../../lib/Common";
import localStorage from "../../lib/localStorage";
import Resolution from "../../lib/Resolution";
import Button from "apsl-react-native-button";

interface Props {
  username: string;
  password: string;
  navigator: any;
  loginStatus: string;
  loading: boolean;
  errorMessage: string;
  dispatch: Dispatch<any>;
}

interface State {
  username: string;
  password: string;
  errorMessage: string;
  popupShowed: boolean;
  isMock: boolean;
  loading: boolean;
  loginMessage: string;
  isDisabled: boolean; // login button state
}
class LoginScreen extends Component<Props, State> {
  public state: State = {
    // username: "",
    // password: "",
    username: "",
    password: "",
    errorMessage: undefined,
    popupShowed: false,
    isMock: true,
    loading: false,
    loginMessage: "",
    isDisabled: true
  };
  constructor(props) {
    super(props);
  }
  public componentDidMount() {
    localStorage.data.load({
      key: "loginInfo"
    }).then(ret => {
      // found data goes to then()
      //console.log(ret.userid);
      //alert(ret.un + ret.pw);
      let isDisabled = (ret.un && ret.pw) ? false : true;
      this.setState({
        username: ret.un,
        password: ret.pw,
        isDisabled
      });
      this.login();
    }).catch(err => {
      // any exception including data not found
      // goes to catch()
      //console.warn(err.message);
      //alert(err.message);
      switch (err.name) {
        case "NotFoundError":
          // TODO;
          break;
        case "ExpiredError":
          // TODO
          break;
      }
    });
    GlobalVariable.common.navigator = this.props.navigator;
  }
  public login(): void {
    this.setState({
      loading: true,
      isDisabled: true
    });
    this.props.navigator.showModal({
      screen: "app.SCIScreen",
      title: "",
      animationType: "none",
      navigatorStyle: {
        navBarHidden: true
      },
      passProps: {
        username: this.state.username,
        password: this.state.password,
        loginURL: Constants.SCP_HOST_URL,
        action: "login",
        loading: true,
        connectTime: new Date().getTime()
      }
    });
  }

  public renderButton() {
    return (
      <Button
        style={styles.buttonContainer}
        isDisabled={this.state.isDisabled}
        disabledStyle={styles.buttonDisabled}
        textStyle={styles.textStyle6}
        onPress={this.login.bind(this)}>
        {Constants.CN_LOGIN_TITLE}
      </Button>
    );
  }

  public render(): JSX.Element {
    const { loading, loginStatus, errorMessage } = this.props;
    if (loginStatus === "error" && this.state.loading) {
      this.setState({
        loading: false
      });
      let messageTitle = "", messageContent;
      switch (errorMessage) {
        case "登录密码不正确": messageTitle = "登录密码不正确"; messageContent = "请联系相关管理员获取正确密码"; break;
        case "本账号角色不存在": messageTitle = "本账号角色不存在"; messageContent = "请再次检查信息录入是否正确"; break;
        default: messageTitle = "登录失败"; messageContent = errorMessage; break;
      }
      if (Platform.OS === "android") {
        Alert.alert(messageTitle, messageContent,
          [
            {
              text: "确定"
            }
          ]);
      } else {
        AlertIOS.alert(messageTitle, messageContent,
          [
            {
              text: "确定"
            }
          ]
        );
      }
      this.props.dispatch(appActions.appInitialized());
    }

    return (
      <Resolution.fixWidthView>
        <View style={styles.loginView}>
          <View>
            <Text style={styles.loginTitle}>
              {Constants.CN_LOGIN}
            </Text>
          </View>
          {this._renderLogo()}
          <View>
            <TextInput
              style={styles.textInput}
              placeholder={"用户名称"}
              onChangeText={(username) => this._onValueChange({ username: username })}
              underlineColorAndroid="transparent"
              value={this.state.username} />
            <TextInput
              style={styles.textInput}
              placeholder={"密码"}
              secureTextEntry={true}
              onChangeText={(password) => this._onValueChange({ password: password })}
              underlineColorAndroid="transparent"
              value={this.state.password}
              ref="password" />
          </View>
          {this.renderButton()}
        </View>
      </Resolution.fixWidthView>
    );
  }
  private _onValueChange(inputValue: object): void {
    this.setState(inputValue);
    let inputKey = Object.keys(inputValue)[0];
    switch (inputKey) {
      case "username":
        if (inputValue[inputKey] && this.state.password) {
          this.setState({
            isDisabled: false
          });
        } else {
          this.setState({
            isDisabled: true
          });
        }
        break;
      case "password":
        if (inputValue[inputKey] && this.state.username) {
          this.setState({
            isDisabled: false
          });
        } else {
          this.setState({
            isDisabled: true
          });
        }
        break;
      default:
    }
  }
  private _renderLogo(): JSX.Element {
    return (
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../../img/logo@3x.png")}
          style={styles.logoImg} />
      </View>);
  }
}

function mapStateToProps(state: any) {
  return {
    isLoggedIn: state.app.root,
    loading: state.app.loading,
    errorMessage: state.app.errorMessage,
    loginStatus: state.app.loginStatus
  };
}

export default connect(mapStateToProps)(LoginScreen);
