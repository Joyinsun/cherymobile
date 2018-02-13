import * as React from "react";
import { Component } from "react";

import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import * as Constants from "../../lib/Constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect, Dispatch } from "react-redux";
import { fetchSourceDetail } from "../reducers/lead/actions";
import ILead from "../../app/interfaces/lead";
import NoMoreView from "../../app/components/noMoreView";

const styles = StyleSheet.create({
  container: {
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT
  },
  rowContainer: {
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: Constants.SCREEN_WIDTH
  },
  rowText: {
    flex: 1
  }
});

interface Props {
  source: {
    list: any,
    refresh: boolean
  };
  ymktUUID: string;
  navigator: any;
  dispatch: Dispatch<any>;
  fetchSourceDetail(leadId: string, refresh: boolean): void;
}

interface State {}

class LeadSourceDetailScreen extends Component<Props, State> {

  public componentDidMount(): void {
    this.props.fetchSourceDetail(this.props.ymktUUID, true);
  }

  public render(): JSX.Element {
    const { list, refresh } = this.props.source;
    return (<View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index}
        data={list}
        ListHeaderComponent={() => { return this.renderHeader(); }}
        ListFooterComponent={() => <NoMoreView refresh={refresh} noMore={list.length > 0 ? false : true} />}
        renderItem={this.renderItem}
        refreshing={refresh}
        onRefresh={() => this.onRefresh()}>
      </FlatList>
    </View>
    );
  }
  private onRefresh(): void {
    this.props.fetchSourceDetail(this.props.ymktUUID, true);
  }

  private renderHeader(): JSX.Element {
    return (<View style={[styles.rowContainer, { backgroundColor: Constants.COLOR.LIGHTGREY }]}>
      <Text style={styles.rowText}>意向车型</Text>
      <Text style={styles.rowText}>线索来源一级</Text>
      <Text style={styles.rowText}>线索来源二级</Text>
      <Text style={styles.rowText}>创建日期</Text>
    </View>);
  }

  private renderItem({ item }): JSX.Element {
    return (<View style={styles.rowContainer}>
      <Text style={styles.rowText}>{item.targetCarModel}</Text>
      <Text style={styles.rowText}>{item.sourceLevel1}</Text>
      <Text style={styles.rowText}>{item.sourceLevel2}</Text>
      <Text style={styles.rowText}>{item.createdDate}</Text>
    </View>);
  }
}

function mapStateToProps(state: any): any {
  return {
    source: state.rolea_lead.leadSourceDetail
  };
}

function mapDispatchToProps(dispatch: any): any {
  return {
    fetchSourceDetail: (lead: string, refresh: boolean) => {
      dispatch(fetchSourceDetail(lead, refresh));
    },
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadSourceDetailScreen);
