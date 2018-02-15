import * as React from "react";
import { Component } from "react";
import{
	View,
	FlatList,
	TouchableOpacity,
	Text,
	ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ILead from "../../../app/interfaces/lead";
import LeadItem from "../../../app/components/leadItem";
import { connect, Dispatch } from "react-redux";
import { fetchRoleAWeekLead } from "../../reducers/calendar/actions";
import Calendar from "../../../app/components/calendar/Calendar";
import util from "../../../lib/util";

interface Props {
	data:  any;
	refresh: boolean;
    navigator:  any;
    dispatch: Dispatch<any>;
	type: string;
    fetchRoleAWeekLead(beginDate: number, endDate: number, navigator: any, type: string, refresh: boolean): void;
}

interface State {
	currentDate: Date;
	index: number;
}

class WithCalendar extends Component<Props, State> {
	// constructor(props) {
	// 	super(props);
    // }
    public state: State = {
		currentDate: new Date(),
		index: 0,
    };

    public componentDidMount(): void {
        this.props.fetchRoleAWeekLead(util.getWeekArr(new Date(), this.state.index)[0], util.getWeekArr(new Date(), this.state.index)[6], this.props.navigator, this.props.type, false);
    }

    public render(): JSX.Element {
		let dataList = this.props.data ? this.props.data : [];
		let singleData = this.props.data ? this.props.data[this.state.index] : [];
		let refresh = this.props.refresh ? this.props.refresh : false;
		return(
			<View>
				<View>
					<TouchableOpacity
								onPress={() => this.pushOverdueLeadScreen()}
								style={{height: 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center" , backgroundColor: "#da3456", paddingLeft: 10}}>
						<Text style={{fontSize: 16, color: "#fff"}}>超期线索</Text>
						<View style={{flexDirection: "row", alignItems: "center"}} >
							<Text style={{fontSize: 16, color: "#fff"}}>5</Text>
							<Icon name="navigate-next" size={28} color="#fff" />
						</View>
					</TouchableOpacity>
				</View>
				<ScrollView>
					<Calendar
						dataList={dataList}
						scroll={this.scroll.bind(this)}
						callback={this._callback.bind(this)}
						textArr={["表示今日有待办", "表示今日无待办"]}
						filedName={"isReserve"}
					/>
					{singleData ? (
						<FlatList
							keyExtractor={(item, index) => index}
							data={singleData.timeStatus}
							renderItem={(rowData) => this.renderRow(rowData.item)}
						>
						</FlatList>) : null}
				</ScrollView>
			</View>
		);
	}

	private renderRow(item) {
		return(
			<LeadItem lead={item} navigator={this.props.navigator} roleName = "consultant"/>
		);
	}
	private scroll(): void {
		this.props.fetchRoleAWeekLead(util.getWeekArr(this.state.currentDate, this.state.index)[0], util.getWeekArr(this.state.currentDate, this.state.index)[6], this.props.navigator, this.props.type, false);
	}

	private _callback(data, curDate, idx) {

		this.setState({
			currentDate: curDate,
			index: idx
		});

	}

    private pushOverdueLeadScreen() {
        this.props.navigator.push({
                title: "超期",
                screen: "consultant.TodayWorkScreenWithoutCalender",
                animated:  true,
                animationType:  "slide-horizontal",
                navigatorStyle:  {
                    tabBarHidden:  true
                }
        });
    }

}

function mapStateToProps(state: any) {
	return {
		data: state.rolea_fetchWeekLead.data,
		refresh: state.rolea_fetchWeekLead.refresh
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchRoleAWeekLead: (beginDate: number, endDate: number, navigator: any, type: string, refresh: boolean) => {
			dispatch(fetchRoleAWeekLead(beginDate, endDate, navigator, type, refresh));
		}, dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithCalendar);
