"use strict";

import * as types from "./actionTypes";
import ILead from "../../../app/interfaces/lead";
import IPager from "../../../app/interfaces/pager";
import ICustomerInfo from "../../../app/interfaces/leadDetail/customerInfo";
import Common from "../../../lib/Common";

function fetchedRoleBPushLeadList(data) {
    return {
        type: types.ROLEB_FETCH_PUSH_LEAD_LIST,
        data
    };
}

function fetchingRoleBPushLeadList(data) {
    return {
        type: types.ROLEB_FETCHING_PUSH_LEAD_LIST,
        data
    };
}

export function fetchRoleBPushLeadList(page: number, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingRoleBPushLeadList({ refresh }));
        let items: ILead[] = [{
            ID: "aaa",
            ObjectID: "ccc",

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
            ID: "bbb",
            ObjectID: "ccc",
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
            ID: "ccc",
            ObjectID: "ccc",
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
            ID: "eee",
            ObjectID: "ccc",
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
            ID: "ffff",
            ObjectID: "ccc",
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
        var dataList: IPager<ILead> = {
            list: items,
            currentPage: page,
            pageSize: 10,
            pageTotal: 10
        };
        Common.showNotification("API未集成，此处为演示数据", navigator);
       // return setTimeout(() => dispatch(fetchedRoleBPushLeadList({ dataList, refresh })), 500);
       return  dispatch(fetchedRoleBPushLeadList({ dataList, refresh }));
    };
}
