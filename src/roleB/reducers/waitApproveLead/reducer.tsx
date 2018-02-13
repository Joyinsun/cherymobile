"use strict";

import * as types from "./actionTypes";

const initialState = {
    leadList: {
        data: null,
        refresh: false
    }
};

export default function roleb_approve_lead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCH_APPROVE_LEAD_LIST:
            const { data } = action.data;
            return Object.assign({}, state, {
                leadList: {
                    data: data,
                    refresh: false
                }
            });
        case types.ROLEB_FETCHING_APPROVE_LEAD_LIST:
            //alert(JSON.stringify(action.data));
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
