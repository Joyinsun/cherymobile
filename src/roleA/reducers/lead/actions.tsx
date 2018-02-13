"use strict";

import * as types from "./actionTypes";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import util from "../../../lib/util";
import _ from "lodash";
import * as GlobalVariable from "../../../lib/global";
import Common from "../../../lib/Common";
import Utils from "../../../lib/util";

export function fetchedRoleALeadList(data) {
    return {
        type: types.ROLEA_FETCH_LEAD_LIST,
        data
    };
}

export function fetchingRoleALeadList(refresh) {
    return {
        type: types.ROLEA_FETCHING_LEAD_LIST,
        refresh: refresh
    };
}

function formatterFilter(params: any): string {
    let dealerIdParams = "DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq '" + GlobalVariable.userdetail.sciUserId + "'";
    let filterParamters = "";
    if (!params || _.isEmpty(params)) {
        return "&$filter=" + dealerIdParams;
    }
    //_.forIn(params, function(value: Array<string>, key: string) {
    let valueToString = params.join(" and ");
    filterParamters += valueToString;
    //});
    return "&$filter=" + filterParamters + " and " + dealerIdParams;
}

export function fetchRoleALeadList(page: number, navigator: any, refresh: boolean = false, params: any = []) {
    return (dispatch) => {
        dispatch(fetchingRoleALeadList(refresh));

        let p = (page - 1) * 20;
        let filterParamters = formatterFilter(params);
        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?&$top=20&$skip=" + p + "&$format=json&$orderby=CreationDateTime desc" + filterParamters, navigator, {
            method: "GET"
        }).then(function(response: any) {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then(function(res) {
            var data: IPager<ILead> = {
                list: res.d.results,
                currentPage: page,
                pageSize: 20,
                pageTotal: 10
            };
            dispatch(fetchedRoleALeadList({ data, refresh: false }));
        }).catch((error) => {
            //alert("error");
            dispatch(fetchingRoleALeadListError({ refresh: false }));
            console.log(error);
        });
    };
}

export function fetchingRoleALeadListError(data) {
    return {
        type: types.ROLEA_FETCHING_LEAD_LIST_ERROR,
        data
    };
}
export function fetchingFilterData(data) {
    return {
        type: types.ROLEA_FETCH_FILTER_DATA,
        data
    };
}

export function fetchFilterData(navigator: any) {
    return (dispatch) => {
        let queryUrl = Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$select=UserStatusCode,LeadLevelText,UserStatusCodeText,IntentionCarNameLevel2,CreationDateTime&$filter=DealerID eq '" + GlobalVariable.userdetail.dealerId + "' and SalesID eq '" + GlobalVariable.userdetail.sciUserId + "'& $format=json";
        httpFetch(queryUrl, navigator, {
            method: "GET"
        }).then(function(response: any) {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then(function(res) {
            const resList = res.d.results;
            let statusList = [],
                createDateList = [],
                leadLevelList = [],
                intentionCarList = [];
                /* for (let i = 0; i < list.length; i++) {
                    statusList = util.addStatusInList(statusList, list[i].UserStatusCode);
                    createDateList = util.addDiffDateInList(createDateList, list[i].CreationDateTime);
                    leadLevelList = util.addInList(leadLevelList, list[i].LeadLevelText);
                    intentionCarList = util.addInList(intentionCarList, list[i].IntentionCarNameLevel2);
                } */
            const tempstatusList = _.filter(resList, (item) => (item.UserStatusCode !== "ZB")); //在filterData中排除“失效”状态
            const sortedStatusList = _.sortBy(tempstatusList, "UserStatusCode");
            statusList = _(["状态"]).concat(_.without(_.uniq(_.map(sortedStatusList, "UserStatusCodeText")), "")).value();
            const tempDateList = _.without(_.uniq(_.map(resList, (item) => Utils.formatCreateDateInFilterData(item.CreationDateTime))), "");
            // const filteredDateList = _.map(tempDateList, (item, index) => Utils.formatCreateDateInFilterData(item));
            createDateList = _(["创建时间"]).concat(tempDateList).value();
            leadLevelList = _(["级别"]).concat(_.without(_.uniq(_.map(resList, "LeadLevelText")), "")).value();
            intentionCarList = _(["车型"]).concat(_.without(_.uniq(_.map(resList, "IntentionCarNameLevel2")), "")).value();

            let filterData = [statusList, createDateList, leadLevelList, intentionCarList];
            let list = _.reject(resList, { UserStatusCode: "ZB" }); //在leadList中排除“失效”状态

            let selectIndex = new Array(filterData.length);
            _.fill(selectIndex, 0);

            dispatch(fetchingFilterData({ filterData, selectIndex }));
        }).catch((error) => {
            //dispatch(fetchingRoleALeadListError({ refresh: false }));
            //alert(JSON.stringify(error));
            console.log(error);
        });
    };
}

function resetingFilter(data) {
    return {
        type: types.ROLEA_RESET_FILTER,
        data
    };
}

export function resetFilter(filterData: Array<Array<string>>) {
    let selectIndex = new Array(filterData.length);
    for (let i = 0; i < selectIndex.length; i++) {
        selectIndex[i] = 0;
    }
    return (dispatch) => {
        dispatch(resetingFilter(selectIndex));
    };
}

function fetchingSourceDetail(data: any): any {
    return {
        type: types.ROLEA_FETCHING_LEAD_SOURCE,
        leadSourceDetail: data
    };
}

function fetchedSourceDetail(data: any): any {
    return {
        type: types.ROLEA_FETCH_LEAD_SOURCE,
        leadSourceDetail: data
    };
}

export function fetchSourceDetail(ymktUUID: string, refresh: boolean = false): any {
    return (dispatch) => {
        dispatch(fetchingSourceDetail({ refresh }));
        //TODO fetch real data
        let leadSourceDetail = new Array();
        const url = "https://proxy.mychery.com:44300/crd/sap/opu/odata/sap/ZCUAN_COMMON_SRV/InteractionSet?$filter=ContactKey eq '" + Utils.formatC4CUUID(ymktUUID) + "'&$format=json";
        httpFetch(url, navigator, {
            header: {
                marktingAuthorization: GlobalVariable.userdetail.marktingAuthorization
            },
            method: "GET"
        }).then((res: any) => {
            if (res.ok && res.status === 200) {
                return res.json();
            }
        }).then((res: any) => {
            const resList = res.d.results;
            const listAll = _.map(resList, (item) => _.pick(item, "ZzProductName", "ZzLeadResource1", "ZzLeadResource2", "Timestamp"));
            const list = _.take(listAll, 5);

            dispatch(fetchingSourceDetail({list, refresh: false}));
        }).catch(error => {
            console.log(error);
        });
    };
}

function leadChecked(data: any): any {
    return {
        type: types.ROLEA_CHECK_LEAD_CREATION,
        data
    };
}

function leadChecking(data: any): any {
    return {
        type: types.ROLEA_CHECKING_LEAD_CREATION,
        data
    };
}

export function leadCheck(mobile: string, dealerID: string, navigator: any, refresh: boolean): any {
    return (dispatch) => {
        dispatch(leadChecking({ refresh }));
        try {
            const customerCheckRequestURL = Constants.LEAD_CREATION_MOBILE_CHECK_URL + "\'" + mobile + "\'";
            const leadCheckRequestURL = Constants.LEAD_CREATION_LEAD_URL + "\'" + mobile + "\' and DealerID eq \'" + dealerID + "\'";
            console.log("customerCheckRequestURL: " + customerCheckRequestURL);
            console.log("leadCheckRequestURL: " + leadCheckRequestURL);

            Promise.all([
                httpFetch(customerCheckRequestURL, navigator, { method: "GET" }, false),
                httpFetch(leadCheckRequestURL, navigator, { method: "GET" }, false)
            ]).then((results: any) => {
                return Promise.all(_.map(results, function(result) {
                    if (result.ok && result.status === 200) {
                        return result.json();
                    } else {
                        return [];
                    }
                }));
            }).then((results: any) => {
                let resultContent = new Array();
                _.forEach(results, function(result) {
                    let content = (result && result.d && result.d.results) ? result.d.results : [];
                    resultContent.push(content);
                });
                let customerInfo = {
                    customerName: resultContent[0].length > 0 ? resultContent[0][0].Customer.FamilyName : null,
                    customerGender: resultContent[0].length > 0 ? resultContent[0][0].Customer.GenderCodeText : null,
                    customerGenderCode: resultContent[0].length > 0 ? resultContent[0][0].Customer.GenderCode : null
                };
                let checkResults = {
                    customerExisting: customerInfo.customerName ? true : false,
                    customerInfo: customerInfo,
                    leadOwner: resultContent[1].length > 0 ? resultContent[1][0].SalesID : null,
                    leadInfo: resultContent[1].length > 0 ? resultContent[1][0] : null
                };
                return dispatch(leadChecked({ checkResults: checkResults, refresh: false }));
            }).catch((error) => {
                dispatch(leadChecking({ refresh: false }));
                //alert("fetch lead creation enum fields error: " + e);
                console.log("fetch lead creation enum fields error: " + error);
            });
        } catch (error) {
            dispatch(leadChecking({ refresh: false }));
            console.log("fetch enum fields content error: " + error.message);
        }
    };
}

function postedNewLead(data: any): any {
    return {
        type: types.ROLEA_POST_NEW_LEAD,
        data
    };
}

function postingNewLead(data: any): any {
    return {
        type: types.ROLEA_POSTING_NEW_LEAD,
        data
    };
}

export function postNewLead(newLeadData: any, navigator: any, refresh: boolean): any {
    return (dispatch) => {
        dispatch(postingNewLead({ refresh }));
        try {
            console.log("Post lead request url: " + Constants.LEAD_CREATION_URL);
            httpFetch(Constants.LEAD_CREATION_URL, navigator, { method: "POST", body: newLeadData }).then((response) => {
                console.log("actions - postNewLead response status: " + response.status);
                dispatch(postedNewLead({ responseStatus: response.status, refresh: false }));
            }).catch((error) => {
                dispatch(postingNewLead({ refresh: false }));
                console.log("create lead failed!!!");
            });
        } catch (error) {
            dispatch(postingNewLead({ refresh: false }));
            console.log("create lead issue!!!");
        }
    };
}

function fetchingEnumLists(data: any): any {
    return {
        type: types.ROLEA_FETCH_ENUM_LISTS,
        data
    };
}

export function fetchEnumLists(navigator: any): any {
    return (dispatch) => {
        try {
            Promise.all([
                httpFetch(Constants.LEAD_GENDER_ENUM_URL, navigator, { method: "GET" }, false),
                httpFetch(Constants.METADTA_LEAD_LEVELS_ENUM_URL, navigator, { method: "GET" }, false),
                httpFetch(Constants.LEAD_SOURCE_ONE_ENUM_URL, navigator, { method: "GET" }, false),
                httpFetch(Constants.ALL_CAMPAIN_LIST_API, navigator, { method: "GET" }, false)
            ]).then((results: any) => {
                return Promise.all(_.map(results, function(result) {
                    if (result.ok && result.status === 200) {
                        return result.json();
                    } else {
                        return [];
                    }
                }));
            }).then((results: any) => {
                let resultContent = new Array();
                _.forEach(results, function(result, index) {
                    let content = (result && result.d && result.d.results) ? result.d.results : [];
                    resultContent.push(_.flatten(util.getFormatedEnumData(content)));
                });
                return dispatch(fetchingEnumLists({ genders: resultContent[0], leadLevels: resultContent[1], leadSourceOne: resultContent[2], campaignList: resultContent[3] }));
            }).catch((e) => {
                console.log("fetch lead creation enum fields error: " + e);
            });
        } catch (error) {
            console.log("fetch enum fields content error: " + error.message);
        }
    };
}

function fetchedSecondSource(data: any): any {
    return {
        type: types.ROLEA_FETCH_SECOND_LEAD_SOURCE_ENUM_LISTS,
        data
    };
}

export function fetchSecondSource(rootSourceObjectID: string, navigator: any): any {
    return (dispatch) => {
        try {
            let requestUrl = Constants.LEAD_SOURCE_TWO_ENUM_URL + "\'" + rootSourceObjectID + "\'";
            httpFetch(requestUrl, navigator, { method: "GET" }).then((result: any) => {
                if (result.ok && result.status === 200) {
                    return result.json();
                } else {
                    return [];
                }
            }).then((result: any) => {
                let content = (result && result.d && result.d.results) ? result.d.results : [];
                let secondLeadSource = _.flatten(util.getFormatedEnumData(content));
                return dispatch(fetchedSecondSource({ secondLeadSource }));
            }).catch((e) => {
                console.log("fetch second lead source enum fields error: " + e);
            });
        } catch (error) {
            console.log("fetch second lead source enum fields content error: " + error.message);
        }
    };
}
export function resetResponseStatus(): any {
    return {
        type: types.ROLEA_RESET_CREATION_RESPONSE_STATUS
    };
}
