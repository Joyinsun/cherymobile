import * as types from "./actionTypes";
import IPager from "../../../app/interfaces/pager";
import IConsultant from "../../../app/interfaces/consutant";

import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import * as GlobalVar from "../../../lib/global";

function fetchedRoleDConsultantList(data) {
	return {
		type: types.ROLED_FETCH_CONSULTANT_LIST,
		data
	};
}

function fetchingRoleBConsultantList(data) {
	return {
		type: types.ROLED_FETCHING_CONSULTANT_LIST,
		data
	};
}

function fetchedRoleDConsultantListError(err) {
	return {
		type:  types.ROLED_FETCH_CONSULTANT_LIST_ERROR,
		err
	};
}

export function fetchRoleDConsultantList(navigator: any, page: number, refresh: boolean = false) {
	return (dispatch) => {
		dispatch(fetchingRoleBConsultantList({ refresh }));
		const managerId = GlobalVar.userdetail.managerId ? GlobalVar.userdetail.managerId : "41";
		let url = Constants.SCP_HOST_URL + "/api/v1/" + managerId + "/salesConsultants";
		//let url = Constants.SCP_HOST_URL + "/api/v1/" + managerID + "/salesConsultants";
		try {
			httpFetch (url, navigator, {
				method: "GET",
				header: {
					"Accept": "application/json"
				}
			}).then(function(response: any) {
				if (response.ok && response.status == 200) {
					return response.json();
				}
			}).then(function(res) {
				console.log("----------------" + res[0]);
				var data: IPager< IConsultant > = {
					list: res,
					// list, //mock data
					currentPage: page,
					pageSize: 20,
					pageTotal: 10
				};
				dispatch(fetchedRoleDConsultantList({ data, refresh: false }));
			});
		} catch (error) {
			dispatch(fetchedRoleDConsultantListError(error));
		}
		//let list: IConsultant[] = [
			// 	{
			// 		id: "1",
			// 		consultantName: "李四"
			// 	},
			// 	{
			// 		id: "2",
			// 		consultantName: "王五"
			// 	},
			// 	{
			// 		id: "3",
			// 		consultantName: "赵六"
			// 	}
			// ];
		// const data: IPager<IConsultant> = {
		// 	list,
		// 	currentPage: page,
		// 	pageSize: 10,
		// 	pageTotal: 10
		// };

		// return setTimeout(() => dispatch(fetchedRoleBConsultantList({ data, refresh })), 2000);
	};
}
