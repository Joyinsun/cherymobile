"use strict";

import * as types from "./actionTypes";

const initialState = {
	data: null,
	refresh: false
};

export default function rolea_check(state: any = initialState, action: any) {
	console.log(action.data);
	switch (action.type) {
		case types.ROLEA_FETCH_CHECK_LIST:
			return Object.assign({}, state, {
				data: action.data.data,
				refresh: false
			});
		case types.ROLEA_FETCHING_CHECK_LIST:
			return Object.assign({}, state, {
				refresh: action.data.refresh
			});
		default:
			return state;
	}
}
