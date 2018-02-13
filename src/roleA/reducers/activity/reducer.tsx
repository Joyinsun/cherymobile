"use strict";

import * as types from "./actionTypes";
import IPager from "../../../app/interfaces/pager";
import IActivity from "../../interfaces/activityItem";

const initialState = {
    activityList: [],
    currentPage: 1,
    pageTotal: 0,
    refresh: false,
    noMore: false,
    error: null
};

export default function rolea_activity(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_ACTIVITY_LIST: {
            const { refresh, currentPage, list, pageTotal } = action.data.data;
            const newList = (currentPage > 1) ? state.activityList.concat(list) : list;
            return Object.assign({}, state, {
                activityList: newList,
                refresh: false,
                noMore: currentPage > pageTotal ? true : false
            });
        }
        case types.ROLEA_FETCHING_ACTIVITY_LIST: {
            return Object.assign({}, state, {
                refresh: true
            });
        }
        case types.ROLEA_FETCHING_ACTIVITY_LIST_ERROR: {
            const { error } = action.data;
            return Object.assign({}, state, {
                error,
                refresh: false
            });
        }
        default:
            return state;
    }
}
