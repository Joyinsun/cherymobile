"use strict";

import * as types from "./actionTypes";

import IPager from "../../../app/interfaces/pager";
import IConsultant from "../../../app/interfaces/consutant";

const initState = {
    data: [],
    error: null
};

export default function roleb_consultants(state: any = initState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCHING_CONSULTANT_LIST:
            return Object.assign({}, state, {
                refresh: true
            });
        case types.ROLEB_FETCH_CONSULTANT_LIST_SUCCESS:
            const { refresh, data } = action.data;
            return Object.assign({}, state, {
                data,
                refresh
            });
        case types.ROLEB_FETCH_CONSULTANT_LIST_ERROR:
            const { error } = action;
            return Object.assign({}, state, {
                error
            });
        default:
            return state;
    }
}
