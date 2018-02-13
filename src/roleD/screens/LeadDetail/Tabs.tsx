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
import ILead from "../../../app/interfaces/lead";
import ILeadDetail from "../../../app/interfaces/leadDetail";
import { fetchLeadDetail } from "../../reducers/leadDetail/actions";
import ContactType from "../../../app/interfaces/contactType";
import FollowInfo from "./FollowInfo";
import LeadInfo from "./LeadInfo";
import CustomerInfo from "./CustomerInfo";

interface Props {
    navigator: any;
    leadDetail: ILeadDetail;
    refresh: boolean;
    error: any;
    leadObjectId: string;
    fetchLeadDetail(id: string, navigator: any): void;
}

interface State {
    editable: boolean;
    isUpdate: boolean;
}

const styles = StyleSheet.create({
    bottomButton: {
        width: Dimensions.get("window").width,
        height: 50,
        backgroundColor: "#333",
        position: "absolute",
        bottom: 0
    },
    bottonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        lineHeight: 30
    }
});

class Tab extends Component<Props, State> {
    public showDialog: any;

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
                    <FollowInfo tabLabel="跟进情况" lead={leadDetail} />
                    <LeadInfo tabLabel="线索信息" navigator={this.props.navigator} lead={leadDetail} />
                    <CustomerInfo tabLabel="客户信息" navigator={this.props.navigator} lead={leadDetail} />
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
			screen: "manager2.AssignmentScreen",
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
		leadDetail: state.roled_leadDetail.leadDetail,
		refresh: state.roled_leadDetail.refresh,
		error: state.roled_leadDetail.error
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
