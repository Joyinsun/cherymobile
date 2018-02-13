import * as React from "react";
import { Component } from "react";
import * as Constants from "../../lib/Constants";

import { View, FlatList, List, Text, InteractionManager } from "react-native";
import { connect, Dispatch } from "react-redux";
import { fetchRoleALeadList, fetchFilterData, resetFilter } from "../reducers/lead/actions";

import ILead from "../../app/interfaces/lead";
import IPager from "../../app/interfaces/pager";
import LeadItem from "../../app/components/leadItem";
import SearchBar from "../../app/components/searchBar";
import FilterMenu from "../../app/components/filterMenu";
import styles from "../styles/LeadPageStyle";
import _ from "lodash";
import util from "../../lib/util";
import * as GlobalVariable from "../../lib/global";
const moment = require("moment");

interface Props {
  navigator: any;
  leadList: IPager<ILead>;
  refresh: boolean;
  currentPage: number;
  noMore: boolean;
  filterData: Array<Array<string>>;
  selectIndex: Array<number>;
  dispatch: Dispatch<any>;
  fetchRoleALeadList(page: number, navigator: any, refresh: boolean, params?: any): void;
  fetchFilterData(navigator: any): void;
  resetFilter(filterData: Array<Array<string>>): void;
}

interface State {
  refresh: boolean;
  dataList: Array<ILead>;
  filterParams: any;
}

class LeadPage extends Component<Props, State> {
  public flatList: any;
  public state: State = {
    refresh: false,
    dataList: [],
    filterParams: []
  };

  public componentDidMount() {
    var that = this;
    InteractionManager.runAfterInteractions(() => {
      this.props.fetchRoleALeadList(1, that.props.navigator, true);
      this.props.fetchFilterData(that.props.navigator);
    });
  }
  public render(): JSX.Element {
    let { leadList, refresh, filterData } = this.props;
    var fd = [["状态"], ["创建时间"], ["等级"], ["车型"]];
    return (
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: Constants.COLOR.BG_GREY }} >
        <FilterMenu
          arrowImg={""}
					checkImage={""}
					bgColor={"white"}
					tintColor={Constants.COLOR.TINT_RED}
					selectItemColor={Constants.COLOR.TINT_RED}
					data={filterData.length === 0 ? fd : filterData}
					maxHeight={410}
          onPressReset={this.reset}
          handler={(selectIndex) => { this.onHandleFilterAction(selectIndex); }}
          resetButtonName={"清空"}>
          <FlatList
            ref={(flatList) => { this.flatList = flatList; }}
            keyExtractor={(item, index) => index}
            data={leadList ? leadList : []}
            renderItem={this.renderItem}
            ListHeaderComponent={() => <SearchBar onClick={this.onSearch.bind(this)} /> }
            ListFooterComponent={this._renderNoMore}
            onEndReachedThreshold={0.1}
            onEndReached={this.onLoadMore.bind(this)}
            refreshing={refresh ? refresh : false}
            onRefresh={() => this.onRefresh()}>
          </FlatList>
        </FilterMenu>
      </View>);
  }
  private _renderNoMore = (): JSX.Element => {
    let tips: string = "正在加载中...";
    let { refresh, noMore } = this.props;
    if (noMore) {
      tips = "已经木有更多了~";
    }
    if (refresh || noMore) {
      return (
        <View style={styles.tips_box}>
          <View style={styles.line}></View>
          <Text style={styles.tips_text}>{tips}</Text>
          <View style={styles.line}></View>
        </View>
      );
    } else {
      return (<Text></Text>);
    }
  }
  private onHandleFilterAction(selectIndex: Array<number>): void {
    let { filterData } = this.props;
    var that = this;
    //alert(JSON.stringify(selectIndex));
    let params = [];

    _.forEach(selectIndex, function(n, key) {
      if (n > 0) {
        //alert(filterData[key][n]);
        if (key === 0)
          params.push("UserStatusCode eq '" + util.getUserStatusCode(filterData[key][n]) + "'");
        else if (key === 1)
          params.push(that.getCreateDateTime(filterData[key][n]));
        else if (key === 2)
          params.push("LeadLevel eq '" + util.getLeadLevel(filterData[key][n]) + "'");
        else if (key === 3)
          params.push("IntentionCarNameLevel2 eq '" + filterData[key][n] + "'");
      }
    });

    //params.filter.push("LeadLevel eq '1'");
    this.props.fetchRoleALeadList(1, that.props.navigator, true, params);
    this.setState({
      filterParams: params
    });
    //this.props.fetchFilterData();
  }
  private getCreateDateTime(createDateTime: string) {
    let query = "";
    var today = moment().format("YYYY-MM-DD");
    var dInWeek = moment().subtract(7, "days").format("YYYY-MM-DD");
    var dInMonth = moment().subtract(1, "months").format("YYYY-MM-DD");
    var dBefore3Month = moment().subtract(3, "months").format("YYYY-MM-DD");
    switch (createDateTime) {
      case "当天": query = "CreationDateTime gt datetimeoffset'" + today + "T00:00:00Z'"; break;
      case "1周内": query = "CreationDateTime gt datetimeoffset'" + dInWeek + "T00:00:00Z'"; break;
      case "1个月内": query = "CreationDateTime gt datetimeoffset'" + dInMonth + "T00:00:00Z'"; break;
      case "1-3个月": query = "CreationDateTime le datetimeoffset'" + dInMonth + "T00:00:00Z' and CreationDateTime ge datetimeoffset'" + dBefore3Month + "T00:00:00Z'"; break;
      case "3个月外": query = "CreationDateTime lt datetimeoffset'" + dBefore3Month + "T00:00:00Z'"; break;
      default: break;
    }
    return query;
  }

  private onRefresh(): void {
    var that = this;
    this.props.fetchRoleALeadList(1, that.props.navigator, true, this.state.filterParams ? this.state.filterParams : []);
  }

  private onLoadMore(): void {
    let { currentPage } = this.props;
    this.props.fetchRoleALeadList(currentPage + 1, this.props.navigator, true, this.state.filterParams ? this.state.filterParams : []);
  }

  private reset = () => {
    var that = this;
    const filterData = this.props.filterData;
    this.setState({
      filterParams: []
    });
    this.props.resetFilter(filterData);
    this.props.fetchRoleALeadList(1, that.props.navigator, true);
  }

  private fetchFilterResult(selectIndex: Array<number>) {
    var that = this;
    this.props.fetchRoleALeadList(1, that.props.navigator, true);
  }

  private onSearch(oEvent): void {
    oEvent.preventDefault();
    this.props.navigator.push({
      title: "",
      screen: "consultant.SearchScreen",
      navigatorStyle: { navBarHidden: true },
      animationType: "slide-horizontal",
      passProps: {
        searchFor: {
          type: "Lead",
          api: "./leadlist",
          placeholder: "搜索手机号、客户姓名"
        }
      }
    });
  }

  private renderItem = ({ item }) => {
    return (<LeadItem lead={item} navigator={this.props.navigator} roleName="consultant" />);
  }
}

function mapStateToProps(state: any) {
  return {
    leadList: state.rolea_lead.leadList,
    selectIndex: state.rolea_lead.selectIndex,
    filterData: state.rolea_lead.filterData,
    refresh: state.rolea_lead.refresh,
    currentPage: state.rolea_lead.currentPage,
    noMore: state.rolea_lead.noMore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoleALeadList: (page: number, navigator: any, refresh: boolean, params?: any) => {
      dispatch(fetchRoleALeadList(page, navigator, refresh, params));
    },
    fetchFilterData: (navigator: any) => {
      dispatch(fetchFilterData(navigator));
    },
    resetFilter: (filterData: Array<Array<string>>) => {
      dispatch(resetFilter(filterData));
    }, dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadPage);
