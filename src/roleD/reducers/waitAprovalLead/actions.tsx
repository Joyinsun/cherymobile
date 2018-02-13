"use strict";

import * as types from "./actionTypes";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import Common from "../../../lib/Common";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";

function fetchedRoleDApproveLeadList(data) {
    return {
        type: types.ROLED_FETCH_APPROVE_LEAD_LIST,
        data
    };
}

function fetchingRoleDApproveLeadList(data) {
    return {
        type: types.ROLED_FETCHING_APPROVE_LEAD_LIST,
        data
    };
}

function fetchRoleDApproveLeadListError(data) {
    return {
        type: types.ROLED_FETCH_APPROVE_LEAD_LIST_ERROR,
        data
    };
}

export function fetchRoleDApproveLeadList(navigator: any, page: number, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingRoleDApproveLeadList({ refresh }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json&$filter=ApprovalStatus ne 'null'", navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            //let list = (res && res.d && res.d.results) ? res.d.results : [];
            console.log("res.d.results");
            console.log(res.d.results);
            var data: IPager<any> = {
                list: res.d.results,
                currentPage: page,
                pageSize: 10,
                pageTotal: 10
            };
            dispatch(fetchedRoleDApproveLeadList({ data: data, refresh: false }));
        }).catch((error) => {
            dispatch(fetchRoleDApproveLeadListError({ refresh: false }));
            console.log(error);
        });
    };
}
