"use strict";

import * as types from "./actionTypes";

export default function rolea_search(state: any = {}, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_SEARCH_LIST:
            const { list, searchKey } = action.data;
            return Object.assign({}, state, {
                searchKey: searchKey,
                list: [...list],
                refresh: false
            });
        case types.ROLEA_FETCHING_SEARCH_LIST:
            const { refresh } = action.data;
            return Object.assign({}, state, {
                refresh: refresh
            });
        default:
            return state;
    }
}
