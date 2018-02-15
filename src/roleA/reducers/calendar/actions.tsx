import * as types from "./actionTypes";
import { Dispatch } from "redux";
import * as Constants from "../../../lib/Constants";
import * as GlobalVariable from "../../../lib/global";
import Utils from "../../../lib/util";
import httpFetch from "../../../lib/httpFetch";
import ILead from "../../../app/interfaces/lead";
import Common from "../../../lib/Common";
import _ from "lodash";
const moment = require("moment");

function fetchedRoleAWeekLead(data) {
    return {
        type: types.ROLEA_FETCH_A_WEEK_LEAD,
        data
    };
}

function fetchingRoleAWeekLead(data) {
    return {
        type: types.ROLEA_FETCHING_A_WEEK_LEAD,
        data
    };
}

function fetchRoleAWeekLeadError(err) {
    return {
        type: types.ROLEA_FETCH_A_WEEK_LEAD_ERROR,
        err
    };
}

export function fetchRoleAWeekLead(beginDate: number, endDate: number, navigator: any, type: string, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingRoleAWeekLead({ refresh }));
        var that = this;
        //alert(beginDate);
        let beginD = moment(beginDate).format("YYYY-MM-DD");
        let endD = moment(endDate).format("YYYY-MM-DD");
        //var today = Utils.getToday();
        var timeFilter = "and (APPActivityDateTime ge datetimeoffset'" + beginD + "T00:00:01Z' and APPActivityDateTime le datetimeoffset'" + endD + "T23:59:59Z') ";
        var filter = "&$filter=DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq'" + GlobalVariable.userdetail.sciUserId + "'" + timeFilter;
        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json" + filter, navigator, {
            method: "GET"
        }).then((response: any) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            let data = [{
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }, {
                "isReserve": false,
                "timeStatus": []
            }
            ];
            let newData = Utils.splitTaskPerDay(data, res.d.results, beginDate);
            dispatch(fetchedRoleAWeekLead({ data: newData, refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchRoleAWeekLeadError({ refresh: false }));
        });
    };
}
