"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import { ScrollView, FlatList, Button } from "react-native";
import { connect, Dispatch } from "react-redux";
import MenuItem from "../../app/components/aboutMe/MenuItem";
import PersonCard from "../../app/components/aboutMe/PersonCard";
import styles from "../../app/styles/AboutMeStyle";
import clickItem from "../../lib/clickItem";
import * as GlobalVariable from "../../lib/global";
import SwitchRole from "../../app/components/SwitchRole/switchRole";

interface Props {
  navigator: any;
  dispatch: Dispatch<any>;
}

interface State {
}

class AboutDriver extends Component<Props, State> {
  public currentRole: string = Constants.CODE_TEST_DRIVER;
  public switchRole: any;
  public data: any = [
    {
      menuData: "试驾话术",
      type: "DriverTech",
      key: "1"

    },
    {
      menuData: "车型知识",
      type: "CarType",
      key: "2"
    },
    {
      menuData: "车型对比",
      type: "CarComparing",
      key: "3"
    },
    {
      menuData: "基本信息",
      type: "BasicMsg",
      key: "4"
    },
    {
      menuData: "设置",
      type: "Setting",
      key: "5"
    },
    {
      menuData: "切换角色",
      type: "ChangingRoles",
      key: "6"
    }
  ];

  public render(): JSX.Element {
    let name = GlobalVariable.userdetail.name;
    return (<ScrollView style={styles.listStyle}>
      <PersonCard
        userName={name}
        jobTitle={"试驾专员"}
        navigator={this.props.navigator}
        type={"typeA"}
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
  private _rendowItem(rowData): JSX.Element {
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

export default connect(mapDispatchToProps)(AboutDriver);
