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
import { connect, Dispatch } from "react-redux";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import TabSelectTable from "../../../app/components/tabSelectTable/tabSelectTable";
import ShowDialog from "../../../app/components/showDialog/showDialog";
import ILeadDetail from "../../../app/interfaces/leadDetail";
import ContactType from "../../../app/interfaces/contactType";

import FollowInfo from "./FollowInfo";
import LeadInfo from "./LeadInfo";
import CustomerInfo from "./CustomerInfo";

import { fetchLeadDetail } from "../../reducers/leadDetail/actions";
import Tabs from "../../../roleA/screens/HigherAppro/Tabs";

import styles from "../../styles/leadDetailScreenStyles";
interface Props {
    navigator: any;
    leadDetail: ILeadDetail;
    refresh: boolean;
    error: any;
    leadObjectId: string; //ObjectId
    fetchLeadDetail(id: string, navigator: any): void;
}

interface State {}

class Tab extends Component<Props, State> {
    public componentDidMount() {
        const { leadObjectId } = this.props;
        this.props.navigator.toggleTabs({
            to: "hidden",
            animated: false
        });
        this.props.fetchLeadDetail(leadObjectId, this.props.navigator);
    }
    public render(): JSX.Element {
        const { leadDetail } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarBackgroundColor="#FFFFFF"
                    tabBarActiveTextColor="#252525"
                    tabBarInactiveTextColor="#454545"
                    locked={false}
                    tabBarUnderlineStyle={{ backgroundColor: "#da3456", height: 2 }}>
                    <FollowInfo tabLabel="跟进情况" navigator={this.props.navigator} lead={leadDetail} />
                    <LeadInfo tabLabel="线索信息" navigator={this.props.navigator} lead={leadDetail} />
                    <CustomerInfo tabLabel="客户信息" navigator={this.props.navigator} customer={leadDetail} />
                </ScrollableTabView>
                <TouchableOpacity
                    style={styles.bottomButton}
                    onPress={this.gotoAssign.bind(this)}
                >
                    <View>
                        <Text style={styles.bottonText}>{leadDetail.UserStatusCode == "01" ? "去分配" : "重新分配"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
 private gotoAssign() {
        this.props.navigator.push({
            title: "选择顾问",
            screen: "manager.ConsultantScreen",
            animated: true,
            animationType: "slide-horizontal",
            navigatorStyle: {
                tabBarHidden: true
            }
        });
    }
}

function mapStateToProps(state: any) {
	return {
		leadDetail: state.roleb_leadDetail.leadDetail,
		refresh: state.roleb_leadDetail.refresh,
		error: state.roleb_leadDetail.error
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchLeadDetail: (id: string, navigator: any) => {
			dispatch(fetchLeadDetail(id, navigator));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
