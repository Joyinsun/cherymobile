"use strict";

import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    leadList: [],
    noMore: false,
    currentPage: 0,
    refresh: false,
    filterData: [],
    selectIndex: [],
    leadSourceDetail: {
        list: [],
        refresh: false
    },
    responseStatus: null
});

export default function roleb_lead(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEB_FETCH_LEAD_LIST:
            let newLeadList = (action.data.data.currentPage > 1) ? state.leadList.concat(action.data.data.list) : action.data.data.list;
            return Object.assign({}, state, {
                leadList: newLeadList,
                refresh: false,
                noMore: action.data.data.list.length > 0 ? false : true,
                currentPage: action.data.data.currentPage
            });
        case types.ROLEB_FETCHING_LEAD_LIST:
            return Object.assign({}, state, {
                refresh: action.data.refresh
            });
        case types.ROLEA_FETCHING_LEAD_LIST_ERROR:
            return Object.assign({}, state, {
                leadList: state.leadList,
                refresh: action.data.refresh,
                message: action.message
            });
        case types.ROLEB_FETCH_FILTER_DATA:
            const { filterData, selectIndex } = action.data;
            return Object.assign({}, state, {
                filterData,
                selectIndex
            });
        case types.ROLEB_RESET_FILTER:
            return Object.assign({}, state, {
                selectIndex: action.data.selectIndex
            });
        case types.ROLEB_FETCHING_LEAD_SOURCE:
            return Object.assign({}, state, {
                leadSourceDetail: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEB_FETCH_LEAD_SOURCE:
            return Object.assign({}, state, {
                leadSourceDetail: {
                    list: action.data.list,
                    refresh: false
                }
            });
        default:
            return state;
    }
}
