import * as React from "react";
import { Component } from "react";
import { View, Text, ScrollView, Platform, Modal, ActivityIndicator } from "react-native";
import { connect, Dispatch } from "react-redux";
import { postNewLead, fetchEnumLists, fetchSecondSource } from "../reducers/lead/actions";
import * as leadActions from "../reducers/lead/actions";
import RowAndroid from "./../../app/components/row/index.android";
import RowIos from "./../../app/components/row/index.ios";
import ILeadDetail from "../../app/interfaces/leadDetail";
import ILeadCreation from "../interfaces/leadCreation";
import styles from "../styles/CreateLeadScreenStyle";
import * as GlobalVariable from "../../lib//global";
import _ from "lodash";
import * as Constants from "../../lib/Constants";
import util from "../../lib/util";
import Common from "../../lib/Common";

const moment = require("moment");

interface Props {
  navigator: any;
  customerInfo: any;
  mobile: string;
  leadCreationStatus: {
    responseStatus: number,
    refresh: boolean
  };
  enumFieldsContents: {
    genders: Array<object>;
    leadLevels: Array<object>;
    leadSourceOne: Array<object>;
    campaignList: Array<object>;
  };
  secondLeadSource: any;
  dispatch: Dispatch<any>;
  postNewLead(newLeadData: any, navigator: any, refresh: boolean): void;
  fetchEnumLists(navigator: any): void;
  fetchSecondSource(rootSourceID: string, navigator: any): void;
}

interface State {
  mobile: string;
  IndividualCustomerFamilyName: string;
  customerGender: string;
  targetCarModel: string;
  level: string;
  purchaseDate: string;
  activity: string;
  sourceLevel1: string;
  sourceLevel2: string;
  ServeResult: string;
  nameEditable: boolean;
  genderEditable: boolean;
  leadCreationData: ILeadCreation;
  sourceLevel2Editable: boolean;
}

class LeadDetailsInfoScreen extends Component<Props, State> {
  public state: State = {
    mobile: this.props.mobile,
    IndividualCustomerFamilyName: this.props.customerInfo ? this.props.customerInfo.customerName : "",
    customerGender: (this.props.customerInfo && this.props.customerInfo.customerGender) ? this.props.customerInfo.customerGender : Constants.CN_PLEASE_SELECT,
    targetCarModel: Constants.CN_PLEASE_SELECT,
    level: Constants.CN_PLEASE_SELECT,
    purchaseDate: "",
    activity: Constants.CN_PLEASE_SELECT,
    sourceLevel1: Constants.CN_PLEASE_SELECT,
    sourceLevel2: Constants.CN_PLEASE_SELECT,
    ServeResult: "",
    nameEditable: true,
    genderEditable: true,
    sourceLevel2Editable: false,
    leadCreationData: {
      Name: "",
      CreatSoucre: "2",
      SalesID: GlobalVariable.userdetail.sciUserId,
      SalesManagerID: GlobalVariable.userdetail.managerId,
      Mobile: this.props.mobile,
      IndividualCustomerFamilyName: "",
      Gender: "",
      IntentionCarCategoryID: "",
      LeadLevel: "",
      IntentionOrderTime: "",
      CampaignID: "",
      LeadSource1ID: "",
      LeadSource2ID: "",
      ServeResult: "",
      DealerID: GlobalVariable.userdetail.dealerId
    }
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  public componentDidMount() {
    this.props.fetchEnumLists(this.props.navigator);
  }

  public componentWillReceiveProps(newProps: Props): void {
    console.log("post response status: " + newProps.leadCreationStatus.responseStatus);
    if (newProps.leadCreationStatus.refresh) {
      return;
    }
    if (newProps.leadCreationStatus.responseStatus === 201) {
      Common.showNotification(Constants.CN_LEAD_CREATED_SUCC, this.props.navigator);
      this.props.navigator.push({
        title: "",
        screen: "consultant.ConsultantTabsScreen",
        passProps: {
          selectedTab: 1
        },
        navigatorStyle: {
          navBarHidden: true
        }
      });
      this.props.dispatch(leadActions.resetResponseStatus());
    } else if (newProps.leadCreationStatus.responseStatus === 400) {
      Common.showNotification(Constants.CN_LEAD_CREATED_FAILED, this.props.navigator);
    } else {
      return;
    }
  }

  public render(): JSX.Element {
    console.log("----------------------purchaseData2: --" + this.state.purchaseDate + "-----------");
    const { genders, leadLevels, leadSourceOne, campaignList } = this.props.enumFieldsContents;
    const leadSourceTwo = this.props.secondLeadSource ? this.props.secondLeadSource : [];
    let genderSelection = _.drop(genders);
    let leadLevelSelection = _.dropRight(leadLevels);
    if (Platform.OS === "android") {
      return (<ScrollView style={styles.topContainer}>
        <View style={styles.sectionContainer}>
          <RowAndroid label="客户手机号*" contextType="input" name="mobile" editable={false} displayValue={this.props.mobile} navigator={this.props.navigator} />
          <RowAndroid label="客户姓名*" contextType="input" name="IndividualCustomerFamilyName" editable={this.state.nameEditable} placeholder="请输入" displayValue={this.state.IndividualCustomerFamilyName} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="性别" contextType="picker" name="customerGender" rootScreenTitle={Constants.CN_GENDER} editable={this.state.genderEditable} displayValue={this.state.customerGender} dataSource={genderSelection} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        </View>
        <View style={styles.sectionContainer}>
          <RowAndroid label="意向车型*" contextType="picker" name="targetCarModel" rootScreenTitle={Constants.CN_INTENTCARMODEL} hasChild={true} childScreenTitle="品种/动总/型号" editable={true} displayValue={this.state.targetCarModel} dataSource={GlobalVariable.metadata.carTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="意向级别*" contextType="picker" name="level" rootScreenTitle={Constants.CN_INTENTLEVEL} editable={true} displayValue={this.state.level} dataSource={leadLevelSelection} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="预购时间" contextType="input" name="purchaseDate" editable={false} displayValue={this.state.purchaseDate} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="活动" contextType="picker" name="activity" rootScreenTitle={Constants.CN_CAMPAIGN} editable={true} displayValue={this.state.activity} dataSource={campaignList} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="线索来源一级" contextType="picker" name="sourceLevel1" rootScreenTitle={Constants.CN_LEAD_SOURCE_LEAVEL_ONE} editable={true} displayValue={this.state.sourceLevel1} dataSource={leadSourceOne} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowAndroid label="线索来源二级" contextType="picker" visible={this.state.sourceLevel2Editable} editable={this.state.sourceLevel2Editable} name="sourceLevel2" rootScreenTitle={Constants.CN_LEAD_SOURCE_LEAVEL_TWO} displayValue={this.state.sourceLevel2} dataSource={leadSourceTwo} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        </View>
        <RowAndroid label="" contextType="textarea" editable={true} placeholder="接待结果" name="ServeResult" displayValue={this.state.ServeResult} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        {this._renderActivityIndicator()}
      </ScrollView>);
    } else if (Platform.OS === "ios") {
      return (<ScrollView style={styles.topContainer}>
        <View style={styles.sectionContainer}>
          <RowIos label="客户手机号*" contextType="input" name="mobile" editable={false} displayValue={this.props.mobile} navigator={this.props.navigator} />
          <RowIos label="客户姓名*" contextType="input" name="IndividualCustomerFamilyName" editable={this.state.nameEditable} placeholder="请输入" displayValue={this.state.IndividualCustomerFamilyName} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="性别" contextType="picker" name="customerGender" rootScreenTitle={Constants.CN_GENDER} editable={this.state.genderEditable} displayValue={this.state.customerGender} dataSource={genderSelection} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        </View>
        <View style={styles.sectionContainer}>
          <RowIos label="意向车型*" contextType="picker" name="targetCarModel" rootScreenTitle={Constants.CN_INTENTCARMODEL} hasChild={true} childScreenTitle="品种/动总/型号" editable={true} displayValue={this.state.targetCarModel} dataSource={GlobalVariable.metadata.carTypeList.data} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="意向级别*" contextType="picker" name="level" rootScreenTitle={Constants.CN_INTENTLEVEL} editable={true} displayValue={this.state.level} dataSource={leadLevelSelection} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="预购时间" contextType="input" name="purchaseDate" editable={false} displayValue={this.state.purchaseDate} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="活动" contextType="picker" name="activity" rootScreenTitle={Constants.CN_CAMPAIGN} editable={true} displayValue={this.state.activity} dataSource={campaignList} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="线索来源一级" contextType="picker" name="sourceLevel1" rootScreenTitle={Constants.CN_LEAD_SOURCE_LEAVEL_ONE} editable={true} displayValue={this.state.sourceLevel1} dataSource={leadSourceOne} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
          <RowIos label="线索来源二级" contextType="picker" visible={this.state.sourceLevel2Editable} editable={this.state.sourceLevel2Editable} name="sourceLevel2" rootScreenTitle={Constants.CN_LEAD_SOURCE_LEAVEL_TWO} displayValue={this.state.sourceLevel2} dataSource={leadSourceTwo} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        </View>
        <RowIos label="" contextType="textarea" editable={true} placeholder="接待结果" name="ServeResult" displayValue={this.state.ServeResult} displayType="column" displayCounterText={true} maxLength={200} navigator={this.props.navigator} onChangeEvent={this.onValueChange.bind(this)} />
        {this._renderActivityIndicator()}
      </ScrollView>);
    }
  }
  private _renderActivityIndicator(): JSX.Element {
    return (
      <Modal
        visible={this.props.leadCreationStatus.refresh}
        transparent={true}
        animationType="none"
        onRequestClose={() => {
          // this._setModalVisible(false);
        }}>
        <ActivityIndicator
          animating={this.props.leadCreationStatus.refresh}
          style={styles.refreshIndicator}
          size="large"
        />
      </Modal>);
  }
  private onNavigatorEvent(event): void {
    switch (event.id) {
      case "confirm":
        const validation = this.validationCheck();
        if (validation) {
          // save new created lead to BE
          let newLeadData = this.prepareLeadData();
          console.log(JSON.stringify(newLeadData));
          this.props.postNewLead(JSON.stringify(newLeadData), this.props.navigator, true);
        } else {
          return;
        }
        break;
      default:
    }
  }

  private validationCheck(): boolean {
    let validation = false;
    if (!this.state.IndividualCustomerFamilyName) {
      Common.showNotification("客户姓名是必填项！", this.props.navigator);
    } else if (!this.state.targetCarModel || this.state.targetCarModel === "请选择") {
      Common.showNotification("意向车型是必填项！", this.props.navigator);
    } else if (!this.state.level || this.state.level === "请选择") {
      Common.showNotification("意向级别是必填项！", this.props.navigator);
    } else {
      validation = true;
    }
    return validation;
  }

  private prepareLeadData(): object {
    let leadCreationContent = this.state.leadCreationData;
    leadCreationContent.Name = leadCreationContent.IndividualCustomerFamilyName + " " + this.state.targetCarModel;
    return leadCreationContent;
  }

  private onValueChange(displayInfo: any): void {
    let leadCreationData = this.state.leadCreationData;
    let key = (Object.keys(displayInfo))[0];
    switch (key) {
      case "level":
        let level = displayInfo.level.value;
        let purchaseDate = util.getIntentPurchaseDate(level);
        this.setState({
          purchaseDate,
          level
        });
        leadCreationData["LeadLevel"] = displayInfo.level.key;
        leadCreationData["IntentionOrderTime"] = (purchaseDate === "无明确时间") ? "" : "/Date(" + new Date(moment(purchaseDate)).getTime() + ")/";
        break;
      case "sourceLevel1":
        let sourceLevel1 = displayInfo.sourceLevel1.value;
        this.setState({
          sourceLevel1,
          sourceLevel2: Constants.CN_PLEASE_SELECT,
          sourceLevel2Editable: true
        });
        leadCreationData["LeadSource1ID"] = displayInfo.sourceLevel1.key;
        leadCreationData["LeadSource2ID"] = "";
        this.props.fetchSecondSource(displayInfo.sourceLevel1.key, this.props.navigator);
        break;
      case "sourceLevel2":
        let sourceLevel2 = displayInfo.sourceLevel2.value;
        this.setState({
          sourceLevel2
        });
        leadCreationData["LeadSource2ID"] = displayInfo.sourceLevel2.key;
        break;
      case "customerGender":
        let customerGender = displayInfo.customerGender.value;
        this.setState({
          customerGender
        });
        leadCreationData["Gender"] = displayInfo.customerGender.key;
        break;
      case "activity":
        let activity = displayInfo.activity.value;
        this.setState({
          activity
        });
        leadCreationData["CampaignID"] = displayInfo.activity.key;
        break;
      case "targetCarModel":
        let targetCarModel = displayInfo.targetCarModel.value;
        let targetCarModelKey = displayInfo.targetCarModel.key;
        if (targetCarModel === "全部" && displayInfo.targetCarModel.parentId) {
          targetCarModel = displayInfo.targetCarModel.parentValue;
          targetCarModelKey = displayInfo.targetCarModel.parentId;
        }
        this.setState({
          targetCarModel
        });
        leadCreationData["IntentionCarCategoryID"] = targetCarModelKey;
        break;
      default:
        this.setState(displayInfo);
        leadCreationData[key] = displayInfo[key];
        break;
    }
    this.setState({
      leadCreationData
    });
  }
}

function mapStateToProps(state: any) {
  return {
    leadCreationStatus: state.rolea_lead.leadCreationStatus,
    enumFieldsContents: state.rolea_lead.enumFieldsContents,
    secondLeadSource: state.rolea_lead.secondLeadSource
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postNewLead: (newLeadData: any, navigator: any, refresh: boolean) => {
    dispatch(postNewLead(newLeadData, navigator, refresh));
    },
    fetchSecondSource: (rootSourceObjectID: string, navigator: any) => {
    dispatch(fetchSecondSource(rootSourceObjectID, navigator));
    },
    fetchEnumLists: (navigator: any) => {
      dispatch(fetchEnumLists(navigator));
    },
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailsInfoScreen);
