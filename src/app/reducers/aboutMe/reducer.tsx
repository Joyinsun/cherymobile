"use strict";

import * as types from "./actionTypes";

const initialState = {
    data: {}
};

export default function aboutMe(state: any = initialState, action: any) {
    switch (action.type) {
        case types.FETCHING_SELF_MSG:
            //const {data} = action.data;
            return Object.assign({}, state, {
                data: action.data
            });
        case types.CLEAR_SELF_MSG:
            //const {data} = action.data;
            return Object.assign({}, state, {
                data: {}
            });
        default:
            return state;
    }
}
