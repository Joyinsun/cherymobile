"use strict";

import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import httpFetch from "../../../lib/httpFetch";
import * as types from "./actionTypes";
import _ from "lodash";
import * as Constants from "../../../lib/Constants";
import * as util from "../../../lib/util";

function fetchedRoleDHomeList(data) {
    return {
        type: types.ROLED_FETCH_HOME_LIST,
        data
    };
}

function fetchingRoleDHomeList(data) {
    return {
        type: types.ROLED_FETCH_HOME_LIST,
        data
    };
}

function fetchedRoleDHomeListError(data) {
    return {
        type: types.ROLED_FETCH_HOME_LIST_ERROR,
        data
    };
}
/**
 * TODO:此处取到的不是“今日”的
 */
export function fetchRoleDHomeList(navigator: any, refresh: boolean) {
    return (dispatch) => {
        dispatch(fetchingRoleDHomeList({ refresh }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json", navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            let results = divideGroup(res.d.results);
            dispatch(fetchedRoleDHomeList({ data: results, refresh: false }));
        }).catch((error) => {
            dispatch(fetchingRoleDHomeList({ refresh: false }));
        });
    };
}

function divideGroup(leads) {
    let results = {
        "push": [],
        "assign": [],
        "approve": [],
    };
    _.forEach(leads, function(lead) {
        let nowTimestamp = new Date().getTime();
        let appActivityDateTimestamp = lead.APPActivityDateTime ? lead.APPActivityDateTime.substring(6, 19) : nowTimestamp + 1;
        if ( parseInt(appActivityDateTimestamp, 10) < nowTimestamp) {
            results["push"].push(lead);
        }
        results["assign"] = _.filter(leads, function( item ) { return item.UserStatusCode == "02"; } );
        results["approve"] = _.filter(leads, function( item ) {return item.ApprovalStatus == "1"; });
    });
    return results;

}
