"use strict";
/**
 * 数字化营销经理（网销经理）
 */
import * as types from "./actionTypes";

const initialState = {
        data: null,
        refresh: false
};

export default function roled_waitAssignmentLead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLED_FETCH_WAIT_ASSIGN_LEAD_LIST:
            const { data } = action.data;
            console.log(data);
            return Object.assign({}, state, {
                data,
                refresh: false
            });
        case types.ROLED_FETCHING_WAIT_ASSIGN_LEAD_LIST:
            const { refresh } = action.data;
            return Object.assign({}, state, {
                refresh: refresh
            });
        case types.ROLED_FETCH_WAIT_ASSIGN_LEAD_LIST_ERROR:
            return Object.assign({}, state, {
                refresh: refresh
            });
        default:
            return state;
    }
}
