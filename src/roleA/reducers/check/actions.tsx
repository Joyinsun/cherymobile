"use strict";

import * as types from "./actionTypes";
import CheckInfo from "../../interfaces/CheckInfo";
import * as Constants from "../../../lib/Constants";
import * as GlobalVariable from "../../../lib/global";
import httpFetch from "../../../lib/httpFetch";

function fetchedCheckList(data) {
    return {
        type: types.ROLEA_FETCH_CHECK_LIST,
        data
    };
}
function fetchingCheckList(data) {
    return {
        type: types.ROLEA_FETCHING_CHECK_LIST,
        data
    };
}

export function fetchCheckitemList(navigator: any, refresh: boolean = false) {
    console.log(GlobalVariable.userdetail.dealerId, GlobalVariable.userdetail.sciUserId);
          return (dispatch) => {
        dispatch(fetchingCheckList({ refresh }));
        try {
            httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json&$filter=DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq '" + GlobalVariable.userdetail.sciUserId + "'", navigator, {
                method: "GET"
            }).then(function(response: any) {
                if (response.ok && response.status === 200) {
                    return response.json();
                }
            }).then(function(res) {
                let list = (res && res.d && res.d.results) ? res.d.results : [];
                dispatch(fetchedCheckList({ data: list, refresh: false }));
            }).catch((error) => {
                dispatch(fetchedCheckList({ data: null, refresh: false }));
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}
