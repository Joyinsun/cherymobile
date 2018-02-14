"use strict";

import * as types from "./actionTypes";
import { Dispatch } from "redux";
import ILeadActivity from "../../../app/interfaces/LeadActivity";
import * as Constant from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";

function fetchingLeadActivityList(data) {
    return {
        type: types.FETCHING_LEAD_ACTIVITY_LIST,
        data
    };
}
function createLeadActivitySuccess(data) {
    return {
        type: types.CREATE_LEAD_ACTIVITY_SUCCESS,
        data
    };
}
function creatingLeadActivity(data) {
    return {
        type: types.CREATING_LEAD_ACTIVITY,
        data
    };
}
function fetchedLeadActivityList(data) {
    return {
        type: types.FETCH_LEAD_ACTIVITY_LIST,
        data
    };
}
export function createLeadActivity(oData: any, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(creatingLeadActivity({ refresh }));
        try {
            let sUrl = Constant.LEADACTIVITY_URL;
            httpFetch(sUrl, navigator, {
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(oData)
            }).then(function(response: any) {
                if (response.ok && response.status === 201) {
                    dispatch(createLeadActivitySuccess({ refresh: false }));
                    return;
                }
            }).catch((error) => {
                dispatch(createLeadActivitySuccess({ refresh: false }));
            });
        } catch (error) {
            dispatch(createLeadActivitySuccess({ refresh: false }));
            console.log(error);
        }
    };
}
export function fetchLeadActivityListsByLeadID(iID: number, navigator: any, refresh: boolean = false) {
    // let data = [
    //     {
    //         ActivityObject: "ORDERDRIVE,INVITE,ORDERPLACED,KNOCKDOWN",
    //         TypeCode: "call",
    //         AppointmentDate: "2017-09-09 12:09", //预约试驾时间
    //         NextActivityTime: "2017-09-09 12:09", //下次到店时间//下次跟进时间 //TODO
    //         VehicleModel: "试驾车型", //试驾车型
    //         IsCustomerOwn: "是", //是否客户本人试驾
    //         IsDLScanned: "已扫描", //驾照扫描
    //         IsIDCScanned: "已扫描", //身份证扫描
    //         OtherVehicleModelID: "车型", //试驾超过一辆车型
    //         IsRecepitScanned: "已扫描", //发票扫描
    //         SubjectName: "活动", //活动
    //         ActivityTime: "2017-09-09 12:09", //本次跟进时间
    //         IntentModeID: "意向车型ID", //意向车型
    //         IntentModel: "意向车型Code", //意向车型
    //         CustomerResponse: "客户反馈", //客户反馈
    //         intention: "", //意向等级
    //         defeatReason1: "", //战败/流失原因一类
    //         defeatReason2: "", //战败/流失原因二类
    //         PhoneDuration: "通话时长"
    //     },
    //     {
    //         ActivityObject: "ORDERDRIVE,ORDERPLACED,KNOCKDOWN",
    //         TypeCode: "call",
    //         AppointmentDate: "2017-09-09 12:09", //预约试驾时间
    //         NextActivityTime: "2017-09-09 12:09", //下次到店时间//下次跟进时间 //TODO
    //         VehicleModel: "试驾车型", //试驾车型
    //         IsCustomerOwn: "是", //是否客户本人试驾
    //         IsDLScanned: "已扫描", //驾照扫描
    //         IsIDCScanned: "已扫描", //身份证扫描
    //         OtherVehicleModelID: "车型", //试驾超过一辆车型
    //         IsRecepitScanned: "已扫描", //发票扫描
    //         SubjectName: "活动", //活动
    //         ActivityTime: "2017-09-09 12:09", //本次跟进时间
    //         IntentModeID: "意向车型ID", //意向车型
    //         IntentModel: "意向车型Code", //意向车型
    //         CustomerResponse: "客户反馈", //客户反馈
    //         intention: "", //意向等级
    //         defeatReason1: "", //战败/流失原因一类
    //         defeatReason2: "", //战败/流失原因二类
    //         PhoneDuration: "通话时长"
    //     },
    //     {
    //         ActivityObject: "TESTDRIVE,KNOCKDOWN",
    //         TypeCode: "wechat",
    //         AppointmentDate: "2017-09-09 12:09", //预约试驾时间
    //         NextActivityTime: "2017-09-09 12:09", //下次到店时间//下次跟进时间 //TODO
    //         VehicleModel: "试驾车型", //试驾车型
    //         IsCustomerOwn: "是", //是否客户本人试驾
    //         IsDLScanned: "已扫描", //驾照扫描
    //         IsIDCScanned: "已扫描", //身份证扫描
    //         OtherVehicleModelID: "车型", //试驾超过一辆车型
    //         IsRecepitScanned: "已扫描", //发票扫描
    //         SubjectName: "活动", //活动
    //         ActivityTime: "2017-09-09 12:09", //本次跟进时间
    //         IntentModeID: "意向车型ID", //意向车型
    //         IntentModel: "意向车型Code", //意向车型
    //         CustomerResponse: "客户反馈", //客户反馈
    //         intention: "", //意向等级
    //         defeatReason1: "", //战败/流失原因一类
    //         defeatReason2: "", //战败/流失原因二类
    //         PhoneDuration: "通话时长"

    //     },
    //     {
    //         ActivityObject: "TESTDRIVE,KNOCKDOWN",
    //         TypeCode: "local",
    //         AppointmentDate: "2017-09-09 12:09", //预约试驾时间
    //         NextActivityTime: "2017-09-09 12:09", //下次到店时间//下次跟进时间 //TODO
    //         VehicleModel: "试驾车型", //试驾车型
    //         IsCustomerOwn: "是", //是否客户本人试驾
    //         IsDLScanned: "已扫描", //驾照扫描
    //         IsIDCScanned: "已扫描", //身份证扫描
    //         OtherVehicleModelID: "车型", //试驾超过一辆车型
    //         IsRecepitScanned: "已扫描", //发票扫描
    //         SubjectName: "活动", //活动
    //         ActivityTime: "2017-09-09 12:09", //本次跟进时间
    //         IntentModeID: "意向车型ID", //意向车型
    //         IntentModel: "意向车型Code", //意向车型
    //         CustomerResponse: "客户反馈", //客户反馈
    //         intention: "", //意向等级
    //         defeatReason1: "", //战败/流失原因一类
    //         defeatReason2: "", //战败/流失原因二类
    //         PhoneDuration: "通话时长"
    //     }
    // ];
    return (dispatch) => {
        dispatch(fetchingLeadActivityList({ refresh }));
        let sUrl = Constant.LEADACTIVITY_URL + "?$format=json&$orderby=CreationDate desc&$filter=LeadIDcontent eq '" + iID + "'";
        httpFetch(sUrl, navigator, {
            method: "GET",
        }).then(function(response: any) {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then(function(res) {
            var data: Array<ILeadActivity> = res.d.results;
            refresh = false;
            dispatch(fetchedLeadActivityList({ data, refresh }));
        });
        //Mock Data
        // return setTimeout(() => dispatch(fetchedLeadActivityList({ data, refresh })), 3000);
    };
}
