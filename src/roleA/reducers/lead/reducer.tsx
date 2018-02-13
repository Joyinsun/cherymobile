"use strict";

import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialStateRoleA = Immutable({
    leadList: [],
    noMore: false,
    currentPage: 0,
    refresh: false,
    filterData: [],
    selectIndex: [],
    leadCreationCheck: {
        customerExisting: false,
        customerInfo: null,
        leadOwner: null,
        leadInfo: null,
        refresh: false
    },
    leadCreationStatus: {
        responseStatus: null,
        refresh: false
    },
    enumFieldsContents: {
        genders: null,
        leadLevels: null,
        leadSourceOne: null,
        campaignList: null
    },
    secondLeadSource: []
});

export default function rolea_lead(state: any = initialStateRoleA, action: any) {
    switch (action.type) {
        case types.ROLEA_FETCH_LEAD_LIST:
            let newLeadList = (action.data.data.currentPage > 1) ? state.leadList.concat(action.data.data.list) : action.data.data.list;
            return Object.assign({}, state, {
                leadList: newLeadList,
                refresh: action.data.refresh,
                noMore: action.data.data.list.length > 0 ? false : true,
                currentPage: action.data.data.currentPage
            });
        case types.ROLEA_FETCHING_LEAD_LIST:
            return Object.assign({}, state, {
                refresh: action.refresh
            });
        case types.ROLEA_FETCHING_LEAD_LIST_ERROR:
            return Object.assign({}, state, {
                leadList: state.leadList,
                refresh: action.refresh
            });
        case types.ROLEA_FETCH_FILTER_DATA:
            const { filterData, selectIndex } = action.data;
            return Object.assign({}, state, {
                filterData,
                selectIndex
            });
        case types.ROLEA_RESET_FILTER:
            return Object.assign({}, state, {
                selectIndex: action.data
            });
        case types.ROLEA_FETCHING_LEAD_SOURCE:
            return Object.assign({}, state, {
                leadSourceDetail: {
                    refresh: action.leadSourceDetail.refresh
                }
            });
        case types.ROLEA_FETCH_LEAD_SOURCE:
            return Object.assign({}, state, {
                leadSourceDetail: {
                    list: action.leadSourceDetail.list,
                    refresh: false
                }
            });
        case types.ROLEA_CHECKING_LEAD_CREATION:
            return Object.assign({}, state, {
                leadCreationCheck: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEA_CHECK_LEAD_CREATION:
            const { customerExisting, leadOwner, leadInfo, customerInfo } = action.data.checkResults;
            return Object.assign({}, state, {
                leadCreationCheck: {
                    customerExisting,
                    leadOwner,
                    leadInfo,
                    customerInfo,
                    refresh: action.data.refresh
                }
            });
        case types.ROLEA_POSTING_NEW_LEAD:
            return Object.assign({}, state, {
                leadCreationStatus: {
                    refresh: action.data.refresh
                }
            });
        case types.ROLEA_POST_NEW_LEAD:
            const { responseStatus, refresh } = action.data;
            return Object.assign({}, state, {
                leadCreationStatus: {
                    refresh,
                    responseStatus
                }
            });
        case types.ROLEA_RESET_CREATION_RESPONSE_STATUS:
            return Object.assign({}, state, {
                responseStatus: 0
            });
        case types.ROLEA_FETCH_ENUM_LISTS:
            const { genders, leadLevels, leadSourceOne, campaignList } = action.data;
            return Object.assign({}, state, {
                enumFieldsContents: {
                    genders,
                    leadLevels,
                    leadSourceOne,
                    campaignList
                }
            });
        case types.ROLEA_FETCH_SECOND_LEAD_SOURCE_ENUM_LISTS:
            const { secondLeadSource } = action.data;
            return Object.assign({}, state, {
                secondLeadSource
            });
        default:
            return state;
    }
}
