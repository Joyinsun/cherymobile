"use strict";

import * as types from "./actionTypes";

const initialState = {
    data: [],
    refresh : false
};

export default function rolea_fetchWeekLead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_A_WEEK_LEAD: {
            const {data} = action.data;
            return Object.assign({}, state, {
                data: data,
                refresh: false
            });
        }
        case types.ROLEA_FETCHING_A_WEEK_LEAD: {
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        }
        default:
            return state;
    }
}
