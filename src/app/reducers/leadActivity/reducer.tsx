"use strict";

import * as types from "./actionTypes";

const initialState = {
    leadActivityList: {
        data: null,
        refresh: false
    },
    createLeadActivity: {
        refresh: false
    }
};

export default function leadActivity(state: any = initialState, action: any) {
    switch (action.type) {
        case types.FETCH_LEAD_ACTIVITY_LIST: {
            const { list, data } = action.data;
            return Object.assign({}, state, {
                leadActivityList: {
                    data: data,
                    refresh: false
                }
            });
        }
        case types.FETCHING_LEAD_ACTIVITY_LIST: {
            const { refresh } = action.data;
            return Object.assign({}, state, {
                leadActivityList: {
                    refresh: refresh
                }
            });
        }
        case types.CREATING_LEAD_ACTIVITY: {
            const { refresh } = action.data;
            return Object.assign({}, state, {
                createLeadActivity: {
                    refresh: refresh
                }
            });
        }
        case types.CREATE_LEAD_ACTIVITY_SUCCESS: {
            const { refresh } = action.data;
            return Object.assign({}, state, {
                createLeadActivity: {
                    refresh: refresh
                }
            });
        }
        default:
            return state;
    }
}
