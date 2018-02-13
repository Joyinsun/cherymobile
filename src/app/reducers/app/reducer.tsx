import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    root: undefined, // "login" / "after-login"
    loading: false, //flag for display busy indicator
    loginStatus: "initial", //"initial"/"success" / "error"
    errorMessage: "",
    selectedTab: 0, // only used for customized tabs screen,
    userDetail: null,
    requestError: ""
});

export default function app(state: any = initialState, action: any = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root,
                loginStatus: action.loginStatus,
                errorMessage: action.errorMessage
            });
        case types.LOADING_CHANGED:
            return state.merge({
                loading: action.loading
            });
        case types.UPDATE_SELECTED_TAB:
            return state.merge({
                selectedTab: action.selectedTab
            });
        case types.REQUEST_API_ERROR:
            return state.merge({
                requestError: action.error
            });
        default:
            return state;
    }
}
