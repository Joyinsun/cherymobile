import * as types from "./actionTypes";
import IPager from "../../../app/interfaces/pager";
import IConsultant from "../../../app/interfaces/consutant";

import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import * as GlobalVar from "../../../lib/global";

function fetchingRoleBConsultantList(data) {
    return {
        type: types.ROLEB_FETCHING_CONSULTANT_LIST,
        data
    };
}

function fetchRoleBConsultantListSuccess(data) {
	return {
		type: types.ROLEB_FETCH_CONSULTANT_LIST_SUCCESS,
		data
	};
}

function fetchedRoleBConsultantListError(err) {
	return {
		type:  types.ROLEB_FETCH_CONSULTANT_LIST_ERROR,
		err
	};
}

export function fetchRoleBConsultantList(page: number, navigator: any, refresh: boolean = false) {
	return (dispatch) => {
		dispatch(fetchingRoleBConsultantList({ refresh }));
		const managerId = GlobalVar.userdetail.managerId ? GlobalVar.userdetail.managerId : "41";
		let url = Constants.SCP_HOST_URL + "/api/v1/" + managerId + "/salesConsultants";
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
				var data: IPager< IConsultant > = {
					list: res,
					currentPage: page,
					pageSize: 20,
					pageTotal: 10
				};
				dispatch(fetchRoleBConsultantListSuccess({ data, refresh: false }));
			});
		} catch (error) {
			dispatch(fetchedRoleBConsultantListError(error));
		}
	};
}
