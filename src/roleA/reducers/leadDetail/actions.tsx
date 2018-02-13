"use strict";

import * as types from "./actionTypes";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import Common from "../../../lib/Common";

function fetchedLeadDetailList(data) {
    return {
        type: types.ROLEA_FETCH_LEAD_DETAIL_LIST,
        data
    };
}

function fetchingLeadDetailList(data) {
    return {
        type: types.ROLEA_FETCHING_LEAD_DETAIL_LIST,
        data
    };
}

function fetchingLeadDetailListError(data) {
    return {
        type: types.ROLEA_FETCH_LEAD_DETAIL_LIST_ERROR,
        data
    };
}

export function fetchLeadDetailResult(id: string, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingLeadDetailList({ refresh }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection('" + id + "')", navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            dispatch(fetchedLeadDetailList({ data: res.d.results, refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchingLeadDetailListError({ refresh: false }));
        });
    };
}

function savedLeadDetail(data) {
    return {
        type: types.ROLEA_SAVE_LEAD_DETAIL,
        data
    };
}

function savingLeadDetailError(data) {
    return {
        type: types.ROLEA_SAVE_LEAD_DETAIL_ERROR,
        data
    };
}

export function saveLeadDetail(objectId: string, data: any, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(savedLeadDetail({ refresh }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection('" + objectId + "')", navigator, {
            method: "PATCH",
            headers: {
                "Accept-Language": "zh-CN",
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            dispatch(savedLeadDetail({ refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(savingLeadDetailError({ refresh: false }));
        });
    };
}
