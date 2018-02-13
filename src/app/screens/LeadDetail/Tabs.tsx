import * as React from "react";
import { Component } from "react";
import {
    StyleSheet,
    View,
    Button,
    ScrollView,
    AlertIOS,
    Text,
    Dimensions,
    TouchableOpacity
} from "react-native";

import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import TabSelectTable from "../../../app/components/tabSelectTable/tabSelectTable";
import ILead from "../../../app/interfaces/lead";

import FollowInfo from "./FollowInfo";
import LeadInfo from "./LeadInfo";
import ContactType from "../../../app/interfaces/contactType";
import CustomerInfo from "./CustomerInfo";
import styles from "../../styles/LeadDetailTabsStyle";

interface Props {
    navigator: any;
    lead: ILead;
    selctedType: ContactType;
}

interface State {
    editable: boolean;
    isUpdate: boolean;
}

export default class Tab extends Component<Props, State> {

    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        this.props.navigator.toggleTabs({
            to: "hidden", // required, "hidden" = hide tab bar, "shown" = show tab bar
            animated: false // does the toggle have transition animation or does it happen immediately (optional)
        });
    }
    public render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarBackgroundColor="#FFFFFF"
                    tabBarActiveTextColor="#252525"
                    tabBarInactiveTextColor="#454545"
                    locked={false}
                    tabBarUnderlineStyle={{ backgroundColor: "#da3456", height: 2 }}>
                    <FollowInfo tabLabel="跟进情况" defaultShow={this.props.selctedType} lead={this.props.lead} />
                    <LeadInfo tabLabel="线索信息" navigator={this.props.navigator} lead={this.props.lead} />
                    <CustomerInfo tabLabel="客户信息" navigator={this.props.navigator} lead={this.props.lead} />
                </ScrollableTabView>
                <View  style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.bottomButton}
                            onPress={this.pushApproveDetailScreen.bind(this)}
                        >
                                <Text style={styles.bottonText}>同意</Text>
                        </TouchableOpacity>
                    <View style={{ height: 25, width: 1, backgroundColor: "#333"}} />
                        <TouchableOpacity
                            style={styles.bottomButton}
                            onPress={this.pushRejectDetailScreen.bind(this)}
                        >
                                <Text style={styles.bottonText}>驳回</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }

    private pushApproveDetailScreen() {
        this.props.navigator.push({
            title: "同意申请",
            screen: "app.ApproveScreen",
            animated: true,
            animationType: "slide-horizontal",
            navigatorStyle: {
                tabBarHidden: true
            },
            navigatorButtons: {
                rightButtons: [
                    {
                        id: "postApproveReason",
                        title: "提交",
                        buttonColor: "black"
                    }
                ]
            }
        });
    }
    private pushRejectDetailScreen() {
        this.props.navigator.push({
            title: "驳回申请",
            screen: "app.RejectScreen",
            animated: true,
            animationType: "slide-horizontal",
            navigatorStyle: {
                tabBarHidden: true
            },
            navigatorButtons: {
                rightButtons: [
                    {
                        id: "postRejectReason",
                        title: "提交",
                        buttonColor: "black"
                    }
                ]
            },
            passProps: {
                lead: this.props.lead
            }
        });
    }
}
