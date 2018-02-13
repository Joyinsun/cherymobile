"use strict";

import * as types from "./actionTypes";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";

function fetchedSelfMsg(data) {
    return {
        type: types.FETCHING_SELF_MSG,
        data
    };
}

export function fetchSelfMsg(userID: number, navigator: any) {
    return (dispatch) => {
        try {
            httpFetch(Constants.SCP_HOST_URL + "/api/v1/users/" + userID + "?format=json", navigator, {
                method: "GET"
            }).then(function(response: any) {
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    throw Error("response status: " + response.status);
                }
            }).then(function(res) {
                dispatch(fetchedSelfMsg({ data: res }));
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error.message);
        }
    };
}
