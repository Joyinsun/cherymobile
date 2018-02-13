"use strict";

import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";
import { View, ScrollView, FlatList } from "react-native";
import { connect, Dispatch } from "react-redux";
import MenuItem from "../../app/components/aboutMe/MenuItem";
import PersonCard from "../../app/components/aboutMe/PersonCard";
import ConsultantItem from "../../app/components/aboutMe/ConsultantItem";
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

export default class AboutConsultant extends Component<Props, State> {
  public currentRole: string = Constants.CODE_CONSULTANT;
  public switchRole: any ;
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
    console.log(GlobalVariable.userdetail);
    let name = GlobalVariable.userdetail.name;
          return (<ScrollView style={styles.listStyle}>
      <PersonCard
        userName={name}
        jobTitle={"销售顾问"}
        navigator={this.props.navigator}
        type={"typeB"}
      />
      {this._isConsultant("typeB")}
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

  private _isConsultant(type: string) {
    let consultant = [],
      title = ["我的业绩", "上级审批", "库存查询", "车型对比", "车型知识", "报价计算"];
    for (let i = 0; i < 6; i++) {
      consultant.push(<ConsultantItem key={i} title={title[i]} navigator={this.props.navigator} index = {i}/>);
    }
    if (type === "typeB") {
      return (
        <View style={styles.consuItem}>
          {
            consultant
          }
        </View>
      );
    } else {
      return false;
    }
  }
  private _rendowItem(rowData) : JSX.Element {
    let onPress = clickItem["_press" + rowData.item.type];
    return (
    <MenuItem title={rowData.item.menuData} onPress={onPress.bind(this)} />
    );

  }
}
