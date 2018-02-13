"use strict";

import * as types from "./actionTypes";
import Immutable from "seamless-immutable";
import * as Constants from "../../../lib/Constants";

const initialState = Immutable({
    home: {
        data: null,
        refresh: false
    },
    detail: {
        list: null,
        noMore: false,
        currentPage: 0,
        refresh: false
    }
});

export default function rolea_home(state: any = initialState, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_HOME_LIST:
            const { refresh, data } = action.data;
            return Object.assign({}, state, {
              home: {
                data: data,
                refresh
              }
            });
        case types.ROLEA_FETCHING_HOME_LIST:
            return Object.assign({}, state, {
                home: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEA_FETCHING_HOME_LIST_ERROR:
            return Object.assign({}, state, {
                home: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEA_FETCH_NEWASSIGN_LIST:
            let newAssignList = (action.data.data.currentPage > 1) ? state.detail.list.concat(action.data.data.list) : action.data.data.list;
            return Object.assign({}, state, {
                detail: {
                    list: newAssignList,
                    refresh: action.data.refresh,
                    noMore: action.data.data.list.length < Constants.PAGE_LENGTH ? true : false,
                    currentPage: action.data.data.currentPage
                }
            });
        case types.ROLEA_FETCHING_NEWASSIGN_LIST:
            return Object.assign({}, state, {
                detail: {
                    list: state.detail.list,
                    refresh: action.data.refresh,
                    noMore: state.detail.noMore,
                    currentPage: state.detail.currentPage
                }
            });
        case types.ROLEA_FETCHING_NEWASSIGN_LIST_ERROR:
            return Object.assign({}, state, {
                detail: {
                    list: state.detail.list,
                    refresh: action.data.refresh,
                    noMore: state.detail.noMore,
                    currentPage: state.detail.currentPage
                }
            });
        default:
            return state;
    }
}
