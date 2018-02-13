import * as React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
  Modal
} from "react-native";
import * as Constants from "../../../lib/Constants";
import TimerMixin from "react-timer-mixin";

const width = Constants.SCREEN_WIDTH;
const height = Constants.SCREEN_HEIGHT;
const navigatorH = 64; // navigator height
const [aWidth, aHeight] = [width * 0.9, height * 0.8];
const [left, top] = [0, 0];
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: width,
    height: height,
    left: left,
    top: top,
  },
  mask: {
    justifyContent: "center",
    backgroundColor: "#383838",
    opacity: 0.8,
    position: "absolute",
    width: width,
    height: height,
    left: left,
    top: top,
  },
  tip: {

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  }
});

interface Props {
  width: any;
  height: any;
  visible: boolean;
  children: JSX.Element;
}
interface State {
  offset: any;
  opacity: any;
  title: any;
  type: any;
  hide: any;
  content?: any;
}
export default class ShowDailog extends Component<Props, State> {
  public mixins = [TimerMixin];
  public parent = {};
  public state: State = {
    offset: new Animated.Value(0),
    opacity: new Animated.Value(0),
    title: "",
    type: "",
    hide: true
  };
  public componentWillReceiveProps(nextProps: Props) {
    this.setState({
      hide: !nextProps.visible
    });
  }
  public render() {
    if (this.state.hide) {
      return (<View />);
    } else {
      return (
        <Modal
          visible={!this.state.hide}
          transparent={true}
          animationType="none"
          onRequestClose={() => {
            this._setModalVisible(false);
          }}
        >
          <View style={styles.container} >
            <Animated.View style={styles.mask} >
            </Animated.View>
            <Animated.View style={[styles.tip, {
              transform: [{
                translateY: this.state.offset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, (height - this.props.height)]
                }),
              }]
            }, {
              width: this.props.width, height: this.props.height,
              left: (width - this.props.width) / 2
            }]}>
              {this.renderChild()}
            </Animated.View>
          </View>
        </Modal>
      );
    }
  }
  private _setModalVisible(bVisible) {
    this.setState({ hide: true });
  }
  private renderChild() {
    return this.props.children;
  }
  //显示动画
  private in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0.8
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 1
        }
      )
    ]).start();
  }

  //隐藏动画
  private out() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 500,
          toValue: 0
        }
      )
    ]).start();

    setTimeout(
      () => this.setState({ hide: true }),
      500
    );
  }
  //取消
  private close(event) {
    if (!this.state.hide) {
      this.out();
    }
  }
  private show(obj: Object) {
    this.parent = obj;
    if (this.state.hide) {
      this.setState({ hide: false }, this.in);
    }
  }
}
