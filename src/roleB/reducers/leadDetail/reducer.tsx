"use strict";

import * as types from "./actionTypes";
import Immutable from "seamless-immutable";
import ILeadDetail from "../../../app/interfaces/leadDetail";

const initState = Immutable({
    leadDetail: {},
    refresh: false,
    responseStatus: null,
    error: null
});

export default function roleb_leadDetail(state: any = initState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCHING_LEAD_DETAIL:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEB_FETCH_LEAD_DETAIL_SUCCESS:
            return Object.assign({}, state, {
                leadDetail: action.data.leadDetail,
                refresh: action.data.refresh
            });
        case types.ROLEB_FETCH_LEAD_DETAIL_ERROR:
            return Object.assign({}, state, {
                error: action.data,
                refresh: false
            });
        default:
            return state;
    }
}
