"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../../lib/Constants";
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Text, Image, Animated } from "react-native";
import styles from "../../styles/CheckItemStyle";

import Icon from "react-native-vector-icons/FontAwesome";
import util from "../../../lib/util";
import Common from "../../../lib/Common";

interface Props {
  navigator: any;
  check: any;
}

interface State {
}

class CheckItem extends Component<Props, State> {

  public render(): JSX.Element {
    return (<View style={styles.thumbnail}>
      <TouchableHighlight
        style={[styles.touchable, (this.props.check.ApprovalStatus === "4" && this.props.check.UserStatusCode === "Z5") === true ? styles.touchForbid : null]}
        onPress={(event) => { this.onPressEvent(); }}
        disabled={(this.props.check.ApprovalStatus === "4" && this.props.check.UserStatusCode === "Z5") ? true : false}>

        <View style={styles.container}>

          <View style={styles.base}>
            <Text style={[styles.title, styles.commonPadding]}>
              {this.props.check.ApprovalStatus === "1" ? ("待审批人： " + this.props.check.Approver) : ("审批人：  ") + this.props.check.Approver}
            </Text>
          {this.props.check.ApprovalStatus !== "1" ?
            (<Text style={[styles.title]}>
              审批时间：{this.props.check.ApprovalDateTime ? util.formatC4CDateToDateStr(this.props.check.ApprovalDateTime) : "2018/02/08"}
            </Text>
            ) : null}
          </View>

          <View style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}>
              <View style={styles.sourceLevel}>
                <View style={styles.commonDirection}>
                  <Text style={[styles.customerFontSize, styles.customerFontColor]}>
                    {this.props.check.AccountPartyName}
                  </Text>
                  <Text style={[styles.customerFontSize, styles.commonMargin]}>
                    {this.props.check.IntentionCarName}
                  </Text>
                </View>
                <Text style={[styles.level, (this.props.check.ApprovalStatus === "4" && this.props.check.UserStatusCode === "Z5") === true ? styles.levelFalse : null]}>
                  {this.props.check.LeadLevelText}
                </Text>
              </View>

            </TouchableOpacity>

          </View>
          <View style={styles.content}>

            <View>
              <Text style={[styles.text]}>
                战败类型： {this.props.check.ResultReasonCodeText ? this.props.check.ResultReasonCodeText : "同品牌战败"}
              </Text>
              <Text style={[styles.text]}>
                战败原因： {this.props.check.LoseReason2contentText}
              </Text>
              <Text style={[styles.text]}>
                申请时间： 2018/01/08
              </Text>
              {
                (this.props.check.ApprovalStatus === "4" && this.props.check.UserStatusCode === "Z5") === true ?
                  (<Text style={[styles.text]}>
                    已经重新指派销售顾问
                </Text>
                  ) : null
              }
            </View>

            <View>
              <Icon.Button
                name="chevron-right"
                backgroundColor="transparent"
                color={Constants.COLOR.GREY}
                iconStyle={styles.iconStyle} />
            </View>

          </View>
          {this.props.check.ApprovalStatus !== "1" ? (
            <Image
              style={styles.markLabel}
              source={this.props.check.ApprovalStatus === "3" ? (require("../../../../img/gameover.png")) : (this.props.check.ApprovalStatus === "4" ? require("../../../../img/rejected.png") : null)}
            />
          ) : null}
        </View>

      </TouchableHighlight>
    </View>);
  }
  private onPressEvent(): void {
    console.log(this.props.check.ObjectID, this.props.navigator);
    Common.callOnceEvent(() =>
      this.props.navigator.push({
        screen: "consultant.LeadDetailScreen",
        title: "线索详情",
        animated: true,
        animationType: "slide-horizontal",
        passProps: {
          leadObjectId: this.props.check.ObjectID,
          //navigator: this.props.navigator
        },
        navigatorStyle: {
          tabBarHidden: true
        },
        navigatorButtons: {
          rightButtons: []
        }
      })
    );
  }
}

export default CheckItem;
