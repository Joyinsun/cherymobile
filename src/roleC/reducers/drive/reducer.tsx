"use strict";

import * as types from "./actionTypes";

const initialState = {
    driveList: {
        data: null,
        refresh: false
    },
    pendingDriveList: {
        data: null,
        refresh: false,
        totalNumber: null
    },
    cars: {
        data: null,
        refreshing: false
    },
    driveInfo: null,
    filterData: [],
    selectIndex: []
};

export default function rolec_drive(state: any = {}, action: any) {
    switch (action.type) {
        case types.ROLEC_FETCH_DRIVE_LIST:
            const { data } = action.data;
            return Object.assign({}, state, {
                driveList: {
                    data: data,
                    refresh: false
                }
            });
        case types.ROLEC_FETCHING_DRIVE_LIST:
            // const { refresh } = action.data;
            return Object.assign({}, state, {
                driveList: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEC_FETCH_PENDING_DRIVE_LIST:
            const pendingDriveList = action.data.data;
            const totalNumber = pendingDriveList.length;
            return Object.assign({}, state, {
                pendingDriveList: {
                    data: pendingDriveList,
                    refresh: false,
                    totalNumber: totalNumber
                }
            });
        case types.ROLEC_FETCHING_PENDING_DRIVE_LIST:
            return Object.assign({}, state, {
                pendingDriveList: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEC_FETCH_DRIVE_INFO:
            return Object.assign({}, state, {
                driveInfo: action.data
            });
        case types.ROLEC_FETCH_FILTER_DATA:
            const { filterData, selectIndex } = action.data;
            return Object.assign({}, state, {
                filterData,
                selectIndex
            });
        case types.ROLEC_RESET_FILTER:
            return Object.assign({}, state, {
                selectIndex: action.data
            });
        case types.ROLEC_FETCH_CAR_MANAGEMENT:
            return Object.assign({}, state, {
                cars: {
                    data: action.data.data || {},
                    refreshing: action.data.refreshing || false
                }
            });
        default:
            return state;
    }
}
