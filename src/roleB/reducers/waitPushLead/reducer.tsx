"use strict";

import * as types from "./actionTypes";

const initialState = {
    leadList: {
        data: null,
        refresh: false
    }
};

export default function roleb_push_lead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCH_PUSH_LEAD_LIST:
            console.log("fetched");
            console.log(action.data);
            return Object.assign({}, state, {
                leadList: {
                    data: action.data.dataList,
                    refresh: false
                }
            });
        case types.ROLEB_FETCHING_PUSH_LEAD_LIST:
            //alert(JSON.stringify(action.data));
            console.log("ing");
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
