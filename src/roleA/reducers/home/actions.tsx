"use strict";

import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import httpFetch from "../../../lib/httpFetch";
import * as types from "./actionTypes";
import _ from "lodash";
import * as Constants from "../../../lib/Constants";
import HomeLeadType from "../../interfaces/HomeLeadType";
import * as GlobalVariable from "../../../lib/global";
import Common from "../../../lib/Common";
import Utils from "../../../lib/util";

function fetchedHomeList(data) {
    return {
        type: types.ROLEA_FETCH_HOME_LIST,
        data
    };
}

function fetchingHomeList(data) {
    return {
        type: types.ROLEA_FETCHING_HOME_LIST,
        data
    };
}

function fetchingHomeListError(data) {
    return {
        type: types.ROLEA_FETCHING_HOME_LIST_ERROR,
        data
    };
}

export function fetchHomeList(refresh: boolean, navigator: any) {
    return (dispatch) => {
        dispatch(fetchingHomeList({ refresh }));
        var today = Utils.getToday();
        var timeFilter = "and (APPActivityDateTime le datetimeoffset'" + today.start.toISOString() + "' and APPActivityDateTime ge datetimeoffset'" + today.end.toISOString() + "') ";
        var filter = "&$filter=DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq'" + GlobalVariable.userdetail.sciUserId + "'" + timeFilter;
        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json" + filter, navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            let results = countLeadToday(res.d.results);
            dispatch(fetchedHomeList({ data: results, refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchingHomeListError({ refresh: false }));
        });
    };
}

function handleTheSingleItem(results: any, item): any {
    for (let code in HomeLeadType) {
        if (HomeLeadType.hasOwnProperty(code)) {
            if (!results[code]) {
                results[code] = [];
            }
            if (code === item.APPTaskType && code !== "Z1") {
                results[code].push(item);
            } else if (code === "Z1" && item.UserStatusCode === "Z7") {
                results[code].push(item);
            } else if (code === "H2" && item.UserStatusCode === "02") {
                results[code].push(item);
            }
        }
    }
    return results;
}

function countLeadToday(data: any): any {
    let results = null;
    if (data && data.length > 0) {
        _.forEach(data, (item, index) => {
            results = handleTheSingleItem(results, item);
        });
    }
    return results;
}

function fetchedNewAssignList(data) {
    return {
        type: types.ROLEA_FETCH_NEWASSIGN_LIST,
        data
    };
}

function fetchingNewAssignList(data) {
    return {
        type: types.ROLEA_FETCHING_NEWASSIGN_LIST,
        data
    };
}

function fetchingNewAssignListError(data) {
    return {
        type: types.ROLEA_FETCHING_NEWASSIGN_LIST_ERROR,
        data
    };
}

//新分配数据
export function fetchNewAssignList(type: HomeLeadType, navigator: any, page: number, refresh: boolean) {
    return (dispatch) => {
        dispatch(fetchingNewAssignList({ refresh }));

        var filter = "&$filter=DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq'" + GlobalVariable.userdetail.sciUserId + "' and UserStatusCode eq '02'";
        let p = (page - 1) * Constants.PAGE_LENGTH;
        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?&format=json" + filter + "&$skip=" + p, navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            var data: IPager<ILead> = {
                list: res.d.results,
                currentPage: page,
                pageSize: Constants.PAGE_LENGTH
            };
            dispatch(fetchedNewAssignList({ data: data, refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchingNewAssignListError({ refresh: false }));
        });
    };
}
