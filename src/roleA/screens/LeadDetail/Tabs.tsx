import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    ScrollView,
    AlertIOS
} from "react-native";
import { connect, Dispatch } from "react-redux";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import ILead from "../../../app/interfaces/lead";
import ILeadDetail from "../../../app/interfaces/leadDetail";
import ContactType from "../../../app/interfaces/contactType";
import FollowInfo from "./FollowInfo";
import LeadInfo from "./LeadInfo";
import CustomerInfo from "./CustomerInfo";
import { fetchLeadDetailResult, saveLeadDetail } from "../../reducers/leadDetail/actions";
import _ from "lodash";
import Utils from "../../../lib/util";
import * as Constants from "../../../lib/Constants";
import AppComponent from "../../../app/components/AppComponent";
import RefreshModal from "../../../app/components/RefreshModal";
import Common from "../../../lib/Common";

interface Props {
    navigator: any;
    selctedType?: ContactType;
    contactParameter?: any;
    leadObjectId: string; //ObjectId
    data: ILeadDetail;
    refresh: boolean;
    saveLeadDetail(id: string, data: any, navigator: any, refresh: boolean): void;
    fetchLeadDetailResult(id: string, navigator: any, refresh: boolean): void;
}

interface State {
    editable: boolean;
    buttonTitle: string;
}

class Tab extends AppComponent<Props, State> {
    public static navigatorButtons = {
        rightButtons: [
            {
                id: "edit-button",
                title: "编辑",
                buttonColor: "black"
            }
        ]
    };

    public leadInfoView: LeadInfo = null;
    public customerInfoView: CustomerInfo = null;

    public state: State = {
        editable: false,
        buttonTitle: "编辑",
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    public componentDidMount() {
        const { leadObjectId } = this.props;
        this.props.navigator.toggleTabs({
            to: "hidden",
            animated: false
        });
        this.props.fetchLeadDetailResult(leadObjectId, this.props.navigator, true);
    }

    public render(): JSX.Element {
        const { data } = this.props;
        if (!data) {
            return (<View style={{ flex: 1 }}></View>);
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: Constants.COLOR.BG_GREY }}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar style={{ borderTopWidth: 1, borderBottomWidth: 0 }} />}
                        // tabBarTextStyle={{lineHeight: 44}}
                        tabBarBackgroundColor={Constants.COLOR.WHITE}
                        tabBarActiveTextColor={Constants.COLOR.DARKGREY}
                        tabBarInactiveTextColor={Constants.COLOR.GREY_999}
                        locked={false}
                        tabBarUnderlineStyle={{ backgroundColor: Constants.COLOR.DEEP_RED, height: 3 }}>
                        <FollowInfo tabLabel="跟进情况" defaultShow={this.props.selctedType} navigator={this.props.navigator} lead={data} />
                        <LeadInfo ref={(leadInfoView) => { this.leadInfoView = leadInfoView; }} tabLabel="线索信息" navigator={this.props.navigator} lead={data} editable={this.state.editable} />
                        <CustomerInfo ref={(customerInfoView) => { this.customerInfoView = customerInfoView; }} tabLabel="客户信息" navigator={this.props.navigator} lead={data} editable={this.state.editable} />
                    </ScrollableTabView>
                    <RefreshModal visible={this.props.refresh} />
                </View>
            );
        }
    }
    private checkTheLeadInformation() : boolean {
        let data = this.props.data;
        if (!data.IntentionCarName || !data.LeadLevelText || !data.Mobile || !data.IndividualCustomerFamilyName) {
            Common.showNotification("请检查必填数据", this.props.navigator);
            return false;
        }
        return true;
    }
    private onNavigatorEvent(event) {
        if (event.type == "NavBarButtonPress") {
            if (event.id == "edit-button") {
                let isValid = this.checkTheLeadInformation();
                if (this.state.editable) {
                    if (isValid) {
                        let updateData = {};
                        if (this.leadInfoView) {
                            updateData = Object.assign(updateData, this.leadInfoView.getCurrentData());
                        }

                        if (this.customerInfoView) {
                            updateData = Object.assign(updateData, this.customerInfoView.getCurrentData());
                        }
                        this.props.saveLeadDetail(this.props.leadObjectId, updateData, this.props.navigator, true);
                        this.setState({
                            editable: !this.state.editable,
                            buttonTitle: this.state.buttonTitle === "编辑" ? "完成" : "编辑"
                        });
                        this.props.navigator.setButtons({
                            rightButtons: [
                                {
                                    id: "edit-button",
                                    title: this.state.buttonTitle,
                                    buttonColor: "black"
                                }
                            ]
                        });
                    }
                } else {
                    this.setState({
                        editable: !this.state.editable,
                        buttonTitle: this.state.buttonTitle === "编辑" ? "完成" : "编辑",
                    });
                    this.props.navigator.setButtons({
                        rightButtons: [
                            {
                                id: "edit-button",
                                title: this.state.buttonTitle,
                                buttonColor: "black"
                            }
                        ]
                    });
                }
            }
        }
    }
}

function mapStateToProps(state: any) {
    return {
        data: state.rolea_leadDetail.data,
        refresh: state.rolea_leadDetail.refresh
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchLeadDetailResult: (id: string, navigator: any, refresh: boolean) => {
            dispatch(fetchLeadDetailResult(id, navigator, refresh));
        },
        saveLeadDetail: (id: string, data: any, navigator: any, refresh: boolean) => {
            dispatch(saveLeadDetail(id, data, navigator, refresh));
        },
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
