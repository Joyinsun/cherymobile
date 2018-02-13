"use strict";

import * as types from "./actionTypes";

export default function rolea_search(state: any = {}, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_LEAD_DETAIL_LIST:
            const { data, refresh } = action.data;
            return Object.assign({}, state, {
                data: data,
                refresh: refresh
            });
        case types.ROLEA_FETCHING_LEAD_DETAIL_LIST:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEA_FETCH_LEAD_DETAIL_LIST_ERROR:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEA_SAVE_LEAD_DETAIL:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEA_SAVE_LEAD_DETAIL_ERROR:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        default:
            return state;
    }
}
