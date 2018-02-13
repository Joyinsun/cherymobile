"use strict";

import * as types from "./actionTypes";

const initialState = {
    leadList: {
        data: null,
        refresh: false
    }
};

export default function roled_push_lead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLED_FETCH_PUSH_LEAD_LIST:
            return Object.assign({}, state, {
                leadList: {
                    data: action.data.dataList,
                    refresh: false
                }
            });
        case types.ROLED_FETCHING_PUSH_LEAD_LIST:
            const { refresh } = action.data;
            return Object.assign({}, state, {
                leadList: {
                    refresh: refresh
                }
            });
        default:
            return state;
    }
}
