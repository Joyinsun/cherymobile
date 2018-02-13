import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
    data: [], // "login" / "after-login"
    refresh: false
});

export default function app(state: any = initialState, action: any = {}) {
    switch (action.type) {
        case types.FETCHING_MESSAGE_TEMPLATE_LIST:
            return state.merge(action.data);
        case types.FETCH_MESSAGE_TEMPLATE_LIST:
            return state.merge({
                refresh: action.data.refresh
            });
        case types.SAVING_MESSAGE_TEMPLATE_LIST:
            return state.merge(action.data);
        case types.SAVE_MESSAGE_TEMPLATE_LIST:
            return state.merge({
                refresh: action.data.refresh
            });
        case types.FETCHING_MESSAGE_TEMPLATE_LIST_ERROR:
            return state.merge({
                refresh: action.data.refresh
            });
        default:
            return state;
    }
}
