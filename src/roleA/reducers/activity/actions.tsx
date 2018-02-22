"use strict";

import * as types from "./actionTypes";
import { Dispatch } from "redux";
import IActivity from "../../interfaces/activityItem";
import IPager from "../../../app/interfaces/pager";
import * as Constant from "../../../lib/Constants";
import httpFetch from "../../../lib/httpFetch";

function fetchedActivityList(data) {
    return {
        type: types.ROLEA_FETCH_ACTIVITY_LIST,
        data
    };
}

function fetchingActivityList(data) {
    return {
        type: types.ROLEA_FETCHING_ACTIVITY_LIST,
        data
    };
}

export function fetchActivityList(page: number, navigator: any, refresh: boolean = false) {
    return (dispatch: Dispatch<any>) => {
        dispatch(fetchingActivityList({ refresh }));
            httpFetch(Constant.CAMPAIGN_LIST_API, navigator, {
                body: JSON.stringify({
                    "keywords": {
                        "isActvite": "1",
                        "status": "2"
                    },
                    "paging": {
                        "index": page,
                        "size": 20
                    }
                }),
                method: "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
                .then((res: any) => res.json())
                .then(resJson => {
                    console.log(resJson);
                    const data: IPager<IActivity> = {
                        list: resJson.content,
                        // list, //mock data
                        currentPage: page,
                        pageSize: 10,
                        pageTotal: resJson.totalPages
                    };
                    dispatch(fetchedActivityList({ data }));
            }).catch((error) => dispatch(fetchedActivityList({ error })));

        //mock data
        /* if (page < 2) {
            const data: IPager<IActivity> = {
                list,
                currentPage: page,
                pageSize: 10,
                pageTotal: 10
            };
            return setTimeout(() => dispatch(fetchedActivityList({ data, refresh })), 500);
        } else {
            const data: IPager<IActivity> = {
                list: [],
                currentPage: page,
                pageSize: 10,
                pageTotal: 10
            };
            return setTimeout(() => dispatch(fetchedActivityList({ data, refresh })), 500);
        } */
    };
}
