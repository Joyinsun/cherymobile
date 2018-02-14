import * as types from "./actionTypes";
import { Dispatch } from "redux";
import * as Constant from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";
import ILead from "../../../app/interfaces/lead";
import Common from "../../../lib/Common";

function fetchedRoleAWeekLead(data) {
    return {
        type: types.ROLEA_FETCH_A_WEEK_LEAD,
        data
    };
}

function fetchingRoleAWeekLead(data) {
    return {
        type: types.ROLEA_FETCHING_A_WEEK_LEAD,
        data
    };
}

function fetchRoleAWeekLeadError(err) {
    return {
        type: types.ROLEA_FETCH_A_WEEK_LEAD_ERROR,
        err
    };
}

export function fetchRoleAWeekLead(beginDate: number, endDate: number, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingRoleAWeekLead({ refresh }));

        let data = [
            {
                "isReserve": true,
                "timeStatus": [
                    {
                        ID: "aaa",

                        FirstTouch: "易车网",

                        IndividualCustomerFamilyName: "王皓",

                        Mobile: "13567864567",

                        IntentionCarName: "瑞虎X3",

                        IntentionCarNameLevel2: "瑞虎X3",

                        IntentionColor: "白色",

                        IntentionOrderTime: "2017-12-31",

                        Budget: 3.5,

                        BuyMethodcontent: "现金",

                        ECommerceOrderID: 12345,

                        UserStatusCode: "新购",

                        UserStatusCodeText: "Open",

                        HasChecked: false,

                        LeadLevel: "H",

                        LeadLevelText: "H",

                        CreationDateTime: "2017-12-20",

                        ArrageDateTime: "2017-12-20"
                    },
                    {
                        ID: "asd",

                        FirstTouch: "易车网",

                        IndividualCustomerFamilyName: "王二",

                        Mobile: "13567864567",

                        IntentionCarName: "瑞虎X3",

                        IntentionCarNameLevel2: "瑞虎X3",

                        IntentionColor: "白色",

                        IntentionOrderTime: "2017-12-31",

                        Budget: 3.5,

                        BuyMethodcontent: "现金",

                        ECommerceOrderID: 12345,

                        UserStatusCode: "新购",

                        UserStatusCodeText: "Open",

                        HasChecked: false,

                        LeadLevel: "H",

                        LeadLevelText: "H",

                        CreationDateTime: "2017-12-20",

                        ArrageDateTime: "2017-12-20"
                    }
                ]
            },
            {
                "isReserve": false,
                "timeStatus": [
                ]
            },
            {
                "isReserve": true,
                "timeStatus": [
                    {
                        ID: "aaa",

                        FirstTouch: "易车网",

                        IndividualCustomerFamilyName: "王皓",

                        Mobile: "13567864567",

                        IntentionCarName: "瑞虎X3",

                        IntentionCarNameLevel2: "瑞虎X3",

                        IntentionColor: "白色",

                        IntentionOrderTime: "2017-12-31",

                        Budget: 3.5,

                        BuyMethodcontent: "现金",

                        ECommerceOrderID: 12345,

                        UserStatusCode: "新购",

                        UserStatusCodeText: "Open",

                        HasChecked: false,

                        LeadLevel: "H",

                        LeadLevelText: "H",

                        CreationDateTime: "2017-12-20",

                        ArrageDateTime: "2017-12-20"
                    }
                ]
            },
            {
                "isReserve": true,
                "timeStatus": [
                    {
                        ID: "fff",

                        FirstTouch: "易车网",

                        IndividualCustomerFamilyName: "哈哈",

                        Mobile: "13567864567",

                        IntentionCarName: "瑞虎X3",

                        IntentionCarNameLevel2: "瑞虎X3",

                        IntentionColor: "白色",

                        IntentionOrderTime: "2017-12-31",

                        Budget: 3.5,

                        BuyMethodcontent: "现金",

                        ECommerceOrderID: 12345,

                        UserStatusCode: "新购",

                        UserStatusCodeText: "Open",

                        HasChecked: false,

                        LeadLevel: "H",

                        LeadLevelText: "H",

                        CreationDateTime: "2017-12-20",

                        ArrageDateTime: "2017-12-20"
                    },
                    {
                        ID: "eee",

                        FirstTouch: "易车网",

                        IndividualCustomerFamilyName: "刘三",

                        Mobile: "13567864567",

                        IntentionCarName: "瑞虎X3",

                        IntentionCarNameLevel2: "瑞虎X3",

                        IntentionColor: "白色",

                        IntentionOrderTime: "2017-12-31",

                        Budget: 3.5,

                        BuyMethodcontent: "现金",

                        ECommerceOrderID: 12345,

                        UserStatusCode: "新购",

                        UserStatusCodeText: "Open",

                        HasChecked: false,

                        LeadLevel: "H",

                        LeadLevelText: "H",

                        CreationDateTime: "2017-12-20",

                        ArrageDateTime: "2017-12-20"
                    }
                ]
            },
            {
                "isReserve": false,
                "timeStatus": [
                ]
            },
            {
                "isReserve": false,
                "timeStatus": [
                ]
            },
            {
                "isReserve": false,
                "timeStatus": [
                ]
            }
        ];
        Common.showNotification("API未集成，此处为演示数据", navigator);
        return setTimeout(() => dispatch(fetchedRoleAWeekLead({data: data, refresh})), 500);
    };
}
