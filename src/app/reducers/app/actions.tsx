import * as types from "./actionTypes";
import base64 from "base-64";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";

export function appInitialized() {
    return async function(dispatch: any, getState: any) {
        dispatch(changeLoginStatus("login"));
    };
}

export function changeLoginStatus(root: string, loginStatus: string = "initial", errorMessage: string = "") {
    return {
        type: types.ROOT_CHANGED,
        root: root,
        loginStatus: loginStatus,
        errorMessage: errorMessage
    };
}
export function dismissErrorDialog() {
    return async function(dispatch: any, getState: any) {
        dispatch(changeLoginStatus("login"));
    };
}

export function login(username: string, password: string) {
    return async function(dispatch: any, getState: any) {
        let loginValue = (username && password) ? true : false;

        if (loginValue) {
            dispatch(loadingChanged(true));
            dispatch(changeLoginStatus("after-login"));
        } else {
            dispatch(changeLoginStatus("demo-login"));
        }
    };
}

export function loadingChanged(bStatus: boolean) {
    return {
        type: types.LOADING_CHANGED,
        loading: bStatus
    };
}

export function logout() {
    return async function(dispatch: any, getState: any) {
        dispatch(changeLoginStatus("login"));
    };
}

export function updateSelectedTab(iSelectedTab) {
    return {
        type: types.UPDATE_SELECTED_TAB,
        selectedTab: iSelectedTab
    };
}
