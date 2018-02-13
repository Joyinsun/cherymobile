"use strict";

import * as types from "./actionTypes";
import Common from "../../../lib/Common";

function fetchedSearchList(data) {
    return {
        type: types.ROLEA_FETCH_SEARCH_LIST,
        data
    };
}

function fetchingSearchList(data) {
    return {
        type: types.ROLEA_FETCHING_SEARCH_LIST,
        data
    };
}

export function fetchSearchResult(api: string, searchKey: string, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingSearchList({ refresh }));
        //TODO
        console.log(api + "-----------------search api address:" + api);
        let items = searchKey != "1" ? [{
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

            AppliedTime: "/Date(1516291200000)/"

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

                AppliedTime: "/Date(1516291200000)/"

        }] : [];
        Common.showNotification("API未集成，此处为演示数据", navigator);
        return setTimeout(() => dispatch(fetchedSearchList({ searchKey, list: items, refresh })), 2000);
    };
}
