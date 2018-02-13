"use strict";

import * as types from "./actionTypes";
import IDrive from "../../interfaces/drive";
import IPager from "../../../app/interfaces/pager";
import IDriveInfo from "../../interfaces/driveInfo";
import * as Constants from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";
import _ from "lodash";

export function fetchedDriveList(data) {
    return {
        type: types.ROLEC_FETCH_DRIVE_LIST,
        data
    };
}

function fetchingDriveList(data) {
    return {
        type: types.ROLEC_FETCHING_DRIVE_LIST,
        data
    };
}

function connectParamters(param: Array<string>): string {
    if (!param || !param.length) {
        return "";
    }
    return param.join(",");
}

function formatterFilter(params: object): string {
    let filterParamters = "", i = 0;
    if (!params || _.isEmpty(params)) {
        return filterParamters;
    }
    _.forIn(params, function(value: Array<string>, key: string) {
        let valueToString = value.join(" ");
        if (i > 0) {
            filterParamters = filterParamters + " and " + valueToString;
        } else {
            filterParamters += valueToString;
        }
        i++;
    });
    return filterParamters;
}

function odataPage(page: any): string {
    return "&$top=10&$skip=" + ((page || 1 ) - 1) * 10 ;
}

export function fetchDriveList(params: any, navigator: any, refresh: boolean) {
    return (dispatch): any => {
        dispatch(fetchingDriveList({ refresh }));
        let select = ["VehicleModel", "VehicleModeID", "VehicleModeID",
         "ActivityID", "DriverID", "AppointmentDate", "TestDrivenStatus",
         "SalesRepID", "LeadIDcontent", "CreationDate", "CustomerName", "ObjectID"],
         selectParamters = "&$select=" + connectParamters(select),
         filterParamters = "&$filter=" + formatterFilter(params.filter);

        let odataPager = odataPage(params.page || 1);

        let url = Constants.C4C_ODATA + "/activity/ActivityCollection?$format=json" + selectParamters + filterParamters + odataPager;
        console.log("fetchDriveList: " + url);
        httpFetch(url, navigator, {
            method: "GET",
        }).then((result: any) => {
            if (result && result.ok && result.status === 200) {
                return result.json();
            }
        })
        .then((result: any) => {
            if (!result || !result.d) {
                return;
            }

            let data: IPager<IDrive> = {
                list:  result.d.results || [],
                currentPage: params.page || 1,
                pageSize: 10,
                pageTotal: 10
            };

            dispatch(fetchedDriveList({ data: data, refresh: refresh }));
        })
        .catch((err: any) => {
            console.error(err);
        });
    };
}

function fetchedPendingDriveList(data) {
    return {
        type: types.ROLEC_FETCH_PENDING_DRIVE_LIST,
        data
    };
}

function fetchingPendingDriveList(data) {
    return {
        type: types.ROLEC_FETCHING_PENDING_DRIVE_LIST,
        data
    };
}

export function fetchPendingDriveList(userDetail: any, navigator: any, refresh: boolean) {
    return (dispatch) => {
        dispatch(fetchingPendingDriveList({ refresh }));
        try {
            const moment: any = require("moment");
            const sciUserId = userDetail.sciUserId;
            const appointmentTestDriveURL = Constants.ORDER_TEST_DRIVE_URL + "\'" + sciUserId + "\'" + " and AppointmentDate eq datetime" + "\'" + moment().format("YYYY-MM-DDT00:00:00") + "\'";
            const testDriveURL = Constants.TEST_DRIVE_URL + "\'" + sciUserId + "\'" + " and CreationDate eq datetime" + "\'" + moment().format("YYYY-MM-DDT00:00:00") + "\'"; // .subtract(1, "days")
            console.log("appointmentTestDriveURL: " + appointmentTestDriveURL);
            console.log("testDriveURL: " + testDriveURL);
            Promise.all([
                httpFetch(appointmentTestDriveURL, navigator, { method: "GET" }, false),
                httpFetch(testDriveURL, navigator, { method: "GET" }, false)
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
                let appointmentDrives = _.differenceBy(resultContent[0], resultContent[1], "LeadIDcontent");
                _.forEach(appointmentDrives, function(oDrive) {
                    oDrive.TestDrivenStatus = Constants.CN_ORDERED_DRIVE_STATUS; // 已预约
                });
                let testDrives = resultContent[1];
                _.forEach(testDrives, function(oDrive) {
                    oDrive.TestDrivenStatus = Constants.CN_PENDING_DRIVE_STATUS; // 待试驾
                });
                let pendingDriveList = _.concat(appointmentDrives, testDrives);
                return dispatch(fetchedPendingDriveList({ data: pendingDriveList, refresh: refresh }));
            }).catch((error) => {
                console.log("fetch drive list fetch error: " + error);
                return dispatch(fetchedPendingDriveList({ data: [], refresh: false }));
                });
        } catch (error) {
            console.log("fetch drive list error: " + error);
            return dispatch(fetchedPendingDriveList({ data: [], refresh: false }));
        }
    };
}

function fetchingFilterData(data) {
    return {
        type: types.ROLEC_FETCH_FILTER_DATA,
        data
    };
}

export function fetchFilterData(navigator: any, params: any) {
    return (dispatch) => {
        let select = ["VehicleModel", "SalesManName"];
        let selectParamters = "&$select=" + connectParamters(select);
        let filterParamters = "&$filter=" + formatterFilter(params.filter);
        let url = Constants.C4C_ODATA + "/activity/ActivityCollection?$format=json" + selectParamters + filterParamters;
        console.log("filter url: " + url);
        httpFetch(url, navigator, {
            method: "GET"
        }).then((result: any) => {
            if (result && result.ok && result.status === 200) {
                return result.json();
            }
        }).then((result: any) => {
            if (!result || !result.d) {
                return;
            }
            let source = result.d.results;
            let consultantsList = [],
                intentionCarList = [];
                consultantsList = _(["顾问"]).concat(_.uniq(_.map(source, "SalesManName"))).value();
                intentionCarList = _(["车型"]).concat(_.uniq(_.map(source, "VehicleModel"))).value();
                let filterData = [consultantsList, intentionCarList, ["时间", "今天", "明天"]];

                let selectIndex = new Array(filterData.length);
                _.fill(selectIndex, 0);

                dispatch(fetchingFilterData({ filterData, selectIndex }));

            for (let i = 0; i < selectIndex.length; i++) {
                selectIndex[i] = 0;
            }

        }).catch((err) => {
            console.error(err);
        });
    };
}

function resetingFilter(data) {
    return {
        type: types.ROLEC_RESET_FILTER,
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

function fetchedDriveInfo(data) {
    return {
        type: types.ROLEC_FETCH_DRIVE_INFO,
        data
    };
}

export function fetchDriveInfo(activityID: string, leadID: string, navigator: any) {
    return (dispatch) => {
        if (!activityID || !leadID) {
            return ;
        }
        let activitySelect = ["DriverID", "SalesRepID", "AppointmentDate", "NextActivityTime", "TestDrivenStatus", "VehicleModel", "IsCustomerOwn", "DrivenExperience", "IDAddress", "Mileage_a_content", "Mileage_a_unitCode", "Mileage_b_content", "Mileage_b_unitCode"],
        activitySelectParamters = "&$select=" + connectParamters(activitySelect),
        activityFilterParamters = "&$filter=ActivityID eq " + "\'" + activityID + "\'",
        activityUrl = Constants.C4C_ODATA + "/activity/ActivityCollection?$format=json" + activitySelectParamters + activityFilterParamters;

        let leadSelect = ["IntentModel", "CustomerName", "Arrivals", "PurchaseFocus", "PurchaseUsage", "CompetitorVehicle", "CompetitorVehicle", "IntentionTime", "CustomerPhone"],
        leadSelectParamters = "", //"&$select=" + connectParamters(leadSelect),
        leadFilterParamters = "&$filter=ID eq " + "\'" + leadID + "\'",
        leadUrl = Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json" + leadSelectParamters + leadFilterParamters;
        console.log("leadUrl: " + leadUrl);
        console.log("activityUrl: " + activityUrl);

        let commonHeader = {
            "method": "GET",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        Promise.all([
            httpFetch(activityUrl, navigator, commonHeader),
            httpFetch(leadUrl, navigator, commonHeader)
        ])
        .then((result: any) => {
            Promise.all(_.map(result, (item: any) => {
                return item && item.json && item.json();
            })).then((info: any) => {
                let data: IDriveInfo = _.merge(info[0] && info[0].d.results.length && info[0].d.results[0], info[1] && info[1].d.results.length && info[1].d.results[0]);
                return dispatch(fetchedDriveInfo(data));
            }).catch((err) => {
                console.error(err);
            });
        })
        .catch((err: any) => {
            console.error(err);
        });
    };
}

function fetchedCarManagementList(data) {
    return {
        type: types.ROLEC_FETCH_CAR_MANAGEMENT,
        data
    };
}

export function fetchCarManagementList(navigator: any, params: any) {
    return (dispatch) => {
        if (!params || !params.uid) {
            return ;
        }
        const url = Constants.SCP_HOST_URL + "/api/v1/testDriveCars/pages";
        httpFetch(url, navigator, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                keywords: {
                    testDriverId: params.uid
                },
                paging: {
                    index: params.page,
                    size: 10
                },
            })
        }).then((result) => {
            if (result && result.ok && result.status === 200) {
                return result.json();
            }
        }).then((result) => {
            if (!result || !result.content) {
                return ;
            }
            let data: IPager<IDrive> = {
                list:  result.content || [],
                currentPage: params.page || 1,
                pageSize: 10,
                pageTotal: 10
            };
            return dispatch(fetchedCarManagementList({ data: data, refreshing: false}));
        }).catch((err) => {
            console.error(err);
        });
    };
}

export function updateMileage(navigator: any, params) {
    return (dispatch) => {
        if (!params || !params.objectId) {
            return false;
        }

        let objectKey = "(\'" + params.objectId + "\')";
        let url = Constants.C4C_ODATA + "/activity/ActivityCollection" + objectKey;
        httpFetch(url, navigator, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify(params.body)
        }).then((result: any) => {
            if (result && result.ok && result.status === 200) {
                return result.json();
            }
        }).catch((err) => {
            console.error(err);
        });
    };
}
