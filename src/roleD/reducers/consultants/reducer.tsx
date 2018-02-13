"use strict";

import * as types from "./actionTypes";

const initState = {
    consultants: {
        data: {},
        refresh: false
    },
    message: null
};

export default function roled_consultants(state: any = initState, action: any) {
    switch (action.type) {
        case types.ROLED_FETCH_CONSULTANT_LIST:
            const { data } = action.data;
            return Object.assign({}, state, {
                consultants: {
                    data,
                    refresh: false
                }
            });
        case types.ROLED_FETCHING_CONSULTANT_LIST:
            const { refresh } = action.data;
            return Object.assign({}, state, {
                consultants: {
                    refresh: refresh
                }
            });
        case types.ROLED_FETCH_CONSULTANT_LIST_ERROR:
            const { message } = action.error;
            return Object.assign({}, state, {
                message
            });
        default:
            return state;
    }
}
