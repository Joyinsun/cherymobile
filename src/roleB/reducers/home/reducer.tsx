"use strict";

import * as types from "./actionTypes";

const initialState = {
    data: null,
    refresh: false,
};

export default function roleb_home(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCH_HOME_LIST:
            const { refresh, data, assginCount, approvalCount, pushCount} = action.data;
            return Object.assign({}, state, {
                data: data,
                refresh: refresh,
            });
        case types.ROLEB_FETCH_HOME_LIST:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEB_FETCH_HOME_LIST_ERROR:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        default:
            return state;
    }
}
