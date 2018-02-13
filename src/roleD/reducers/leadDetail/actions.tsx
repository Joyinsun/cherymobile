"use strict";

import * as types from "./actionTypes";
import i from "../../../app/interfaces/leadDetail";
import ILeadInfo from "../../../app/interfaces/leadDetail/leadInfo";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import _ from "lodash";
import * as Constants from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";

function fetchingLeadDetail(data) {
    return {
        type: types.ROLED_FETCHING_LEAD_DETAIL,
        data
    };
}

function fetchLeadDetailSuccess(data) {
    return {
        type: types.ROLED_FETCH_LEAD_DETAIL_SUCCESS,
        data
    };
}

function fetchLeadDetailError(data) {
    return {
        type: types.ROLED_FETCH_LEAD_DETAIL_ERROR,
        data
    };
}

export function fetchLeadDetail(id: string, navigator: any) {
    return (dispatch) => {
        dispatch(fetchingLeadDetail({ refresh: true }));

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection('" + id + "')?$format=json", navigator, {
            method: "GET"
        }).then((res: any) => {
            if (res.ok && res.status === 200) {
                return res.json();
            }
        }).then((res: any) => {
            const leadDetailObj = res.d.results;
            // const leadInfo: ILeadInfo = _.pick(leadDetailObj, leadInfoItems);

            dispatch(fetchLeadDetailSuccess({ leadDetail: leadDetailObj, refresh: false }));
        }).catch((error: any) => {
            console.log(error);
            dispatch(fetchLeadDetailError(error));
        });
    };
}
