import * as React from "react";
import { Component } from "react";

import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import * as Constants from "../../lib/Constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect, Dispatch } from "react-redux";
import { fetchSourceDetail } from "../reducers/lead/actions";
import NoMoreView from "../../app/components/noMoreView";
// import ILead from "../../app/interfaces/lead";
import ILeadSource from "../../app/interfaces/leadSource";
import Utils from "../../lib/util";

const styles = StyleSheet.create({
  container: {
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT
  },
  rowContainer: {
    padding: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: Constants.SCREEN_WIDTH
  },
  rowText: {
    // flex: 1
  }
});

interface Props {
  navigator: any;
  ymktUUID: string;
  leadSourceList: Array<ILeadSource>;
  refresh: boolean;
  dispatch: Dispatch<any>;
  fetchSourceDetail(leadId: string, navigator: any, refresh: boolean): void;
}

interface State {}

class LeadSourceDetailScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    this.props.fetchSourceDetail(this.props.ymktUUID, this.props.navigator, true);
  }

  public render(): JSX.Element {
    const { leadSourceList, refresh } = this.props;
    return (<View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => index}
        data={leadSourceList}
        ListHeaderComponent={() => { return this.renderHeader(); }}
        ListFooterComponent={() => <NoMoreView refresh={refresh} noMore={leadSourceList && leadSourceList.length > 0 ? false : true} />}
        renderItem={this.renderItem}
        refreshing={refresh}
        onRefresh={() => this.onRefresh()}>
      </FlatList>
    </View>
    );
       }
  private onRefresh(): void {
    this.props.fetchSourceDetail(this.props.ymktUUID, this.props.navigator, true);
  }

  private renderHeader(): JSX.Element {
    return (<View style={[styles.rowContainer, { backgroundColor: Constants.COLOR.LIGHTGREY }]}>
      <Text style={styles.rowText}>意向车型</Text>
      <Text style={styles.rowText}>线索来源一级</Text>
      <Text style={styles.rowText}>线索来源二级</Text>
      <Text style={styles.rowText}>创建日期</Text>
    </View>);
  }

  private renderItem( {item} ): JSX.Element {
    // const item: ILeadSource = itemO.item;
    return (<View style={styles.rowContainer}>
      <Text style={styles.rowText}>{item.ZzProductName}</Text>
      <Text style={styles.rowText}>{item.ZzLeadResource1}</Text>
      <Text style={styles.rowText}>{item.ZzLeadResource2}</Text>
      <Text style={styles.rowText}>{Utils.formatC4CDateToDate(item.Timestamp, "YYYY-MM-DD")}</Text>
    </View>);
  }
}

function mapStateToProps(state: any): any {
  console.log(state.roleb_lead);
  return {
    leadSourceList: state.roleb_lead.leadSourceDetail.list,
    refresh: state.roleb_lead.leadSourceDetail.refresh
  };
}

function mapDispatchToProps(dispatch: any): any {
  return {
    fetchSourceDetail: (lead: string, navigator: any, refresh: boolean) => {
      dispatch(fetchSourceDetail(lead, navigator, refresh));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadSourceDetailScreen);
