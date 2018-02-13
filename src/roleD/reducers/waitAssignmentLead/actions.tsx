"use strict";

import * as types from "./actionTypes";
import IPager from "../../../app/interfaces/pager";
import ILead from "../../../app/interfaces/lead";
import Common from "../../../lib/Common";
import httpFetch from "../../../lib/httpFetch";
import _ from "lodash";
import * as Constants from "../../../lib/Constants";

function fetchedAssignLeadList(data) {
    return {
        type: types.ROLED_FETCH_WAIT_ASSIGN_LEAD_LIST,
        data
    };
}

function fetchingAssignLeadList(data) {
    return {
        type: types.ROLED_FETCHING_WAIT_ASSIGN_LEAD_LIST,
        data
    };
}

function fetchAssignLeadListError(data) {
    return {
        type: types.ROLED_FETCH_WAIT_ASSIGN_LEAD_LIST_ERROR,
        data
    };
}

export function fetchAssignLeadList(navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingAssignLeadList({ refresh }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json&$filter=UserStatusCode eq '02'", navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            //let list = (res && res.d && res.d.results) ? res.d.results : [];
            // var data: IPager<any> = {
            //     list: results,
            //     currentPage: page,
            //     pageSize: 10,
            //     pageTotal: 10
            // };
            console.log("res.d.results");
            console.log(res.d.results[0].ID);
            dispatch(fetchedAssignLeadList({ data: res.d.results, refresh: false }));
        }).catch((error) => {
            dispatch(fetchAssignLeadListError({ refresh: false }));
            console.log(error);
        });
    };
}
