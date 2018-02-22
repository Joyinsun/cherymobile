"use strict";

import * as types from "./actionTypes";
import ILead from "../../../app/interfaces/lead";
import ILeadSource from "../../../app/interfaces/leadSource";
import IPager from "../../../app/interfaces/pager";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import _ from "lodash";
import * as Constants from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";
import * as GlobalVariable from "../../../lib/global";
import Common from "../../../lib/Common";
import Utils from "../../../lib/util";

function formatterFilter(params: any): string {
    let dealerIdParams = "DealerID eq '" + GlobalVariable.userdetail.dealerId + "'";
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

function fetchedRoleDLeadList(data) {
    return {
        type: types.ROLED_FETCH_LEAD_LIST,
        data
    };
}

function fetchingRoleDLeadList(data) {
    return {
        type: types.ROLED_FETCHING_LEAD_LIST,
        data
    };
}

export function fetchRoleDLeadList(navigator: any, page: number, refresh: boolean = false, params: any = []) {
    return (dispatch) => {
        dispatch(fetchingRoleDLeadList({ refresh }));
        let p = (page - 1) * 20;
        let filterParamters = formatterFilter(params);

        httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?&$top=20&$skip=" + p + "&$format=json&CreatSoucre eq '2'" + filterParamters, navigator, {
            method: "GET"
        }).then((res: any) => {
            if (res.ok && res.status === 200) {
                return res.json();
            }
        }).then(res => {
            const list = _.filter(res.d.results, {CreatSoucre: "2"});
            const data: IPager<ILead> = {
                list,
                currentPage: page,
                pageSize: 20,
                pageTotal: 10
            };
            dispatch(fetchedRoleDLeadList({ data, refresh }));
        }).catch((error) => {
            console.log(error);
        });
    };
}

function fetchedRoleDFilterData(data) {
    return {
        type: types.ROLED_FETCH_FILTER_DATA,
        data
    };
}

function fetchingFilterData(data) {
    return {
        type: types.ROLED_FETCH_FILTER_DATA,
        data
    };
}

export function fetchFilterData(navigator: any) {
    return (dispatch) => {
        let queryUrl = Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$select=UserStatusCodeText,UserStatusCode,Sales,IntentionCarNameLevel2&$filter=DealerID ne null&$format=json";

        httpFetch(queryUrl, navigator, {
            method: "GET"
        }).then(res => {
            if (res.ok && res.status === 200) {
                return res.json();
            }
        }).then(res => {
            let list = res.d.results;
            let statusList = [],
                consultantsList = [],
                intentionCarList = [];
            // const tempstatusList = _(["状态"]).concat(_.without(_.uniq(_.map(list, "UserStatusCodeText")), "")).value();
            const tempstatusList = _.filter(list, (item) => {
                // if (item.UserStatusCode === "01") {
                //     item.UserStatusCodeText = "未分配";
                // }

                // if (item.UserStatusCode === "Z2") {
                //     item.UserStatusCodeText = "";
                // }
                return (item.UserStatusCode.includes("Z") && item.UserStatusCode !== "Z6") || item.UserStatusCode === "01";
            });
            const sortedStatusList = _.sortBy(tempstatusList, "UserStatusCode");
            statusList = _(["状态"]).concat(_.without(_.uniq(_.map(sortedStatusList, "UserStatusCodeText")), "")).value();
            consultantsList = _(["顾问"]).concat(_.without(_.uniq(_.map(list, "Sales")), "")).value();
            intentionCarList = _(["车型"]).concat(_.without(_.uniq(_.map(list, "IntentionCarNameLevel2")), "")).value();
            let filterData = [statusList, consultantsList, intentionCarList];

            let selectIndex = new Array(filterData.length);
            _.fill(selectIndex, 0);

            dispatch(fetchedRoleDFilterData({ filterData, selectIndex }));
        }).catch((error) => {
            //alert(JSON.stringify(error));
            console.log(error);
        });
    };
}

function resetingFilter(data) {
    return {
        type: types.ROLED_RESET_FILTER,
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
        type: types.ROLED_FETCHING_LEAD_SOURCE,
        data
    };
}

function fetchedSourceDetail(data: any): any {
    return {
        type: types.ROLED_FETCH_LEAD_SOURCE,
        data
    };
}

export function fetchSourceDetail(uuid: string, navigator: any, refresh: boolean = false): any {
/*     return (dispatch) => {
        dispatch(fetchingSourceDetail({ refresh}));
        let leadSourceDetail: Array<ILeadSource> = [];
        for (let i = 0; i < 5; i++) {
            leadSourceDetail.push({ ZzProductName: "瑞虎" + i, ZzLeadResource1: "网校平台", ZzLeadResource2: "天猫", Timestamp: "/Date(1518093660000)/" });
        }
        Common.showNotification("API未集成，此处为演示数据", navigator);
        return setTimeout(() => dispatch(fetchedSourceDetail({ list: leadSourceDetail, refresh })), 2000);
    }; */
    return (dispatch) => {
        dispatch(fetchingSourceDetail({ refresh }));
        //TODO fetch real data
        let leadSourceDetail = new Array();
        const url = "https://proxy.mychery.com:44300/crd/sap/opu/odata/sap/ZCUAN_COMMON_SRV/InteractionSet?$filter=ContactKey eq '" + uuid + "'&$format=json";
        httpFetch(url, navigator, {
            header: {
                Authorization: "Basic U0FQX1lNS1RfSU5JOjEyMzQ1Ng=="
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
