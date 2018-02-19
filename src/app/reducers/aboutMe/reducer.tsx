"use strict";

import * as types from "./actionTypes";

const initialState = {
    data: null
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
                data: null
            });
        default:
            return state;
    }
}
