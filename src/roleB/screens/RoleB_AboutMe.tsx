"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import { ScrollView, FlatList } from "react-native";
import { connect, Dispatch } from "react-redux";
import MenuItem from "../../app/components/aboutMe/MenuItem";
import PersonCard from "../../app/components/aboutMe/PersonCard";
import styles from "../../app/styles/AboutMeStyle";
import clickItem from "../../lib/clickItem";
import * as GlobalVariable from "../../lib//global";
import SwitchRole from "../../app/components/SwitchRole/switchRole";

interface Props {
  navigator: any;
  dispatch: Dispatch<any>;
}

interface State {
}

class AboutSalesManager extends Component < Props, State > {
  public currentRole: string = Constants.CODE_SHOWROOM_MANAGER;
  public switchRole: any;
  public data: any = [
    {
      menuData: "积分",
      type: "Points"

    },
    {
      menuData: "基本信息",
      type: "BasicMsg"
    },
    {
      menuData: "设置",
      type: "Setting"
    },
    {
      menuData: "切换角色",
      type: "ChangingRoles"
    }
  ];

  public render(): JSX.Element {
    let name = GlobalVariable.userdetail.name;
    return (<ScrollView style={styles.listStyle}>
      <PersonCard
        userName={name}
        jobTitle={"展厅经理"}
        navigator={this.props.navigator}
        type={"typeC"}
      />
      <FlatList
        data={this.data}
        keyExtractor={(item, index) => index}
        renderItem={this._rendowItem.bind(this)}>
      </FlatList>
      <SwitchRole userDetail={GlobalVariable.userdetail} dispatch={this.props.dispatch} ref={switchRole => {
        this.switchRole = switchRole;
      }} />
    </ScrollView>);
  }
  private _rendowItem(rowData) : JSX.Element {
    let onPress = clickItem["_press" + rowData.item.type];
    return (
    <MenuItem title={rowData.item.menuData} onPress={onPress.bind(this)} />
    );

  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapDispatchToProps)(AboutSalesManager);
