import * as types from "./actionTypes";
import * as appTypes from "../app/actionTypes";
import Util from "../../../lib/util";
import httpFetch from "../../../lib/httpFetch";
import * as Constants from "../../../lib/Constants";
import * as GlobalVariable from "../../../lib/global";
import Common from "../../../lib/Common";

function fetchedMessageTemplateList(data) {
    return {
        type: types.FETCHING_MESSAGE_TEMPLATE_LIST,
        data
    };
}

function fetchingMessageTemplateList(data) {
    return {
        type: types.FETCH_MESSAGE_TEMPLATE_LIST,
        data
    };
}

function fetchedMessageTemplateError(data) {
    return {
        type: types.FETCHING_MESSAGE_TEMPLATE_LIST_ERROR,
        data
    };
}

export function fetchMessageTemplate(navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(fetchingMessageTemplateList({ refresh }));

        var url = Constants.SCP_MESSAGE_TEMP + GlobalVariable.userdetail.id  + "/smstemplates";
        httpFetch(url, navigator, {}).then((response) => {
            if (response.ok && response.status === 200) {
                return response.json();
            }
        }).then((res) => {
            let messageData = handleMessageTemplate(res);
            dispatch(fetchedMessageTemplateList({ data: messageData, refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchedMessageTemplateError({ refresh: false }));
        });
     };
}

function savedMessageTemplateList(data) {
    return {
        type: types.SAVING_MESSAGE_TEMPLATE_LIST,
        data
    };
}

function savingMessageTemplateList(data) {
    return {
        type: types.SAVE_MESSAGE_TEMPLATE_LIST,
        data
    };
}

export function saveMessageTemplate(template: any, navigator: any, refresh: boolean = false) {
    return (dispatch) => {
        dispatch(savingMessageTemplateList({ refresh }));
        Promise.all(template.map((item, index) => {
           return saveSingleMessage(item, navigator);
        })).then((res) => {
            dispatch(savedMessageTemplateList({ refresh: false }));
        }).catch((error) => {
            //Common.showNotification(error.message);
            dispatch(fetchedMessageTemplateError({ refresh: false }));
        });
    };
}

function saveSingleMessage(data, navigator) {
    let isPersonal = false;
    let url = Constants.SCP_POST_MESSAGE_TEMP;
    if (data.coverageId) {
        isPersonal = true;
        url = url + "/" + data.id;
        data = {
            userId: GlobalVariable.userdetail.id,
            content: data.content
        };
    } else {
        data.coverageId = data.id;
        data.id = null;
        data.ownerUserId = GlobalVariable.userdetail.id;
    }
   return httpFetch(url, navigator, {
        method: isPersonal ? "put" : "post",
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function(response) {
        if (response.ok && response.status === 200) {
            return response.json();
        } else {
            return new Promise(function(resolve, reject) {
                reject(response);
            });
        }
    });
}

function handleMessageTemplate(data) {
    let personal : any[] = data.personal;
    let dealer: any[] = data.dealer;
    let messages = data.personal;
    dealer.forEach(function(item) {
        let object = null;
        personal.forEach(function(personalItem) {
            if (personalItem.coverageId === item.id) {
                object = personalItem;
            }
        });

        if (!object) {
            messages.push(item);
        }
    });

    return messages;
}
