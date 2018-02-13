"use strict";

import * as types from "./actionTypes";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import Common from "../../../lib/Common";
import _ from "lodash";

function fetchedRoleDPushLeadList(data) {
    return {
        type: types.ROLED_FETCH_PUSH_LEAD_LIST,
        data
    };
}

function fetchingRoleDPushLeadList(data) {
    return {
        type: types.ROLED_FETCHING_PUSH_LEAD_LIST,
        data
    };
}

export function fetchRoleDPushLeadList(navigator: any, page: number, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingRoleDPushLeadList({ refresh }));
        let items: ILead[] = [{

            ObjectID: "00163E20C9511ED7ACF574A30CB6B515",

            ID: "aaa",

            FirstTouch: "易车网",

            IndividualCustomerFamilyName: "王皓",

            Mobile: "13567864567",

            IntentionCarName: "瑞虎X3",

            IntentionCarNameLevel2: "瑞虎X3",

            IntentionColor: "白色",

            IntentionOrderTime: "2017-12-31",

            Budget: 3.5,

            BuyMethod2: "现金",

            ECommerceOrderID: 12345,

            UserStatusCode: "待分配",

            UserStatusCodeText: "Open",

            HasChecked: false,

            LeadLevel: "H",

            LeadLevelText: "H",

            CreationDateTime: "2017-12-20",

            ArrageDateTime: "2017-12-20",

            Applicant: "张三",

            ApprovalStatus: "待审批",

            AppliedTime : "/Date(1516291200000)/"

        }, {
            ObjectID: "00163E20C9511ED7ACF574A30CB6B515",
            ID: "bbb",
            FirstTouch: "汽车之家",

            IndividualCustomerFamilyName: "江韵",

            Mobile: "13567864567",

            IntentionCarName: "瑞虎X5",

            IntentionCarNameLevel2: "瑞虎X5",

            IntentionColor: "黑色",

            IntentionOrderTime: "2017-12-28",

            Budget: 3,

            BuyMethod2: "现金",

            ECommerceOrderID: 23456,

            UserStatusCode: "新购",

            UserStatusCodeText: "Open",

            HasChecked: true,

            LeadLevel: "A",

            LeadLevelText: "A",

            CreationDateTime: "2017-12-10",

            ArrageDateTime: "2017-12-10",

            Applicant: "李四",

            ApprovalStatus: "已审批",

            AppliedTime : "/Date(1516291200000)/"

        }, {
            ObjectID: "00163E20C9511ED7ACF574A30CB6B515",
            ID: "ccc",
            FirstTouch: "天猫",

            IndividualCustomerFamilyName: "刘浩然",

            Mobile: "13567864567",

            IntentionCarName: "瑞虎X5手动豪华版",

            IntentionCarNameLevel2: "瑞虎X5",

            IntentionColor: "白色",

            IntentionOrderTime: "2017-12-28",

            Budget: 3,

            BuyMethod2: "现金",

            ECommerceOrderID: 23456,

            UserStatusCode: "已分配",

            UserStatusCodeText: "Open",

            HasChecked: true,

            LeadLevel: "B",

            LeadLevelText: "B",

            CreationDateTime: "2017-12-10",

            ArrageDateTime: "2017-12-10",

            Applicant: "张三",

            ApprovalStatus: "待审批",

            AppliedTime : "/Date(1516291200000)/"

        }, {
            ObjectID: "00163E20C9511ED7ACF574A30CB6B515",
            ID: "eee",
            FirstTouch: "汽车之家",

            IndividualCustomerFamilyName: "刘浩然",

            Mobile: "13567864567",

            IntentionCarName: "瑞虎X5手动豪华版",

            IntentionCarNameLevel2: "瑞虎X5",

            IntentionColor: "白色",

            IntentionOrderTime: "2017-12-28",

            Budget: 3,

            BuyMethod2: "现金",

            ECommerceOrderID: 23456,

            UserStatusCode: "新购",

            UserStatusCodeText: "Open",

            HasChecked: true,

            LeadLevel: "B",

            LeadLevelText: "B",

            CreationDateTime: "2017-12-10",

            ArrageDateTime: "2017-12-10",

            Applicant: "张三",

            ApprovalStatus: "已审批",

            AppliedTime : "/Date(1516291200000)/"

        },
        {
            ObjectID: "00163E20C9511ED7ACF574A30CB6B515",
            ID: "ffff",
            FirstTouch: "易车网",

            Mobile: "13567864567",

            IndividualCustomerFamilyName: "刘浩然",

            IntentionCarName: "瑞虎X5手动豪华版",

            IntentionCarNameLevel2: "瑞虎X5",

            IntentionColor: "白色",

            IntentionOrderTime: "2017-12-28",

            Budget: 3,

            BuyMethod2: "现金",

            ECommerceOrderID: 23456,

            UserStatusCode: "新购",

            UserStatusCodeText: "Open",

            HasChecked: true,

            LeadLevel: "B",

            LeadLevelText: "B",

            CreationDateTime: "2017-12-10",

            ArrageDateTime: "2017-12-10",

            Applicant: "李四",

            ApprovalStatus: "待审批",

            AppliedTime : "/Date(1516291200000)/"

        }];
        // let items = [];
        // console.log("jinqule");
    //     httpFetch(Constants.C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json$filter=APPActivityDateTime eq 'null'", {
    //         method: "GET"
    //     }).then((response: any) => {
    //         if (response.ok && response.status === 200) {
    //             return response.json();
    //         }
    //     }).then((res) => {
    //         let nowTimestamp = new Date().getTime();
    //         items = _.filter( res.d.results , function(lead) {
    //             let itemTimestamp = lead.APPActivityDateTime ? lead.APPActivityDateTime.substring(6, 19) : nowTimestamp + 10 ;
    //             return parseInt(itemTimestamp, 10) < nowTimestamp;
    //         });
    //         console.log(items);
    //         var dataList: IPager<ILead> = {
    //                 list: items,
    //                 currentPage: page,
    //                 pageSize: 10,
    //                 pageTotal: 10
    //             };
    //         dispatch(fetchedRoleDPushLeadList({ data: dataList, refresh: false }));
    //     }).catch((error) => {
    //         //dispatch(fetchedHomeList(JSON.stringify(error)));
    //         console.log(error);
    //     });
    // };
        var dataList: IPager<ILead> = {
            list: items,
            currentPage: page,
            pageSize: 10,
            pageTotal: 10
        };
        Common.showNotification("API未集成，此处为演示数据", navigator);
       // return setTimeout(() => dispatch(fetchedRoleDPushLeadList({ dataList, refresh })), 500);
       return  dispatch(fetchedRoleDPushLeadList({ dataList, refresh }));
    };
}
