import { AsyncStorage, Alert } from "react-native";
import fetch from "react-native-fetch-polyfill";
import * as GlobalVariable from "./global";
import * as Constants from "./Constants";
import Common from "./Common";
function errorHandler(message: string, navigator: any) {
    if (navigator)
        Common.showNotification(message, navigator);
}
export default function httpFetch(url: string, navigator: any, options, useGlobalErrorHandler: boolean = true, timeout = 30000): Promise<any> {
    let isC4CUrl = isC4CRequest(url);
    let isGetMethod: boolean = true;
    //for c4c request
    if (isC4CUrl) {
        if (!options) {
            options = {};
        }

        if (!options.headers) {
            options.headers = {
                "authorization": GlobalVariable.userdetail.c4cAuthorization,
                "Accept-Language": "zh-CN",
                "Accept": "application/json",
                "content-type": "application/json"
            };
        } else {
            options.headers.authorization = GlobalVariable.userdetail.c4cAuthorization;
        }
        if (options.method) {
            isGetMethod = options.method.toLowerCase() === "get";
        }
        if (!isGetMethod) {
            options.headers["x-csrf-token"] = GlobalVariable.userdetail.c4cCSRFToken;
        } else if (!GlobalVariable.userdetail.c4cCSRFToken) {
            options.headers["x-csrf-token"] = "fetch";
        }
        if (!options.cache) {
            options.cache = "no-cache";
        }
    } else {
        if (!options) {
            options = {};
        }

        if (!options.headers) {
            options.headers = {
                "Accept": "application/json",
                "content-type": "application/json"
            };
        }
    }
    options.timeout = timeout;
    return requestFromRemote(url, navigator, options, isC4CUrl, isGetMethod, useGlobalErrorHandler);
}

function requestFromRemote(url: string, navigator: any, options: any, isC4CUrl: boolean, isGetMethod: boolean, useGlobalErrorHandler: boolean = true): any {
    return fetch(url, options).then(function(response) {
        //request success
        if (response.headers.map["content-type"] && response.headers.map["content-type"][0] === "text/html;charset=UTF-8" && response.ok && response.status === 200) {
            return new Promise(function(resolve, reject) {
                reject("您账户登陆会话已过期");
                errorHandler("您账户登陆会话已过期", navigator);
                Common.logoutApplication();
            });
        } else if (response.ok) {
            let token = response.headers.get("x-csrf-token");
            if (token) {
                GlobalVariable.userdetail.c4cCSRFToken = token;
            }
            return new Promise(function(resolve, reject) {
                resolve(response);
            });
        } else if (response.status === 403 && isC4CUrl && !isGetMethod) {
            options.headers["x-csrf-token"] = "fetch";
            fetch(Constants.C4C_GET_CSRF_TOKEN, options).then(function(responseToken) {
                if (responseToken.ok) {
                    let token = responseToken.headers.get("x-csrf-token");
                    if (token) {
                        GlobalVariable.userdetail.c4cCSRFToken = token;
                    }
                    requestFromRemote(url, options, isC4CUrl, isGetMethod, useGlobalErrorHandler);
                } else {
                    return new Promise(function(resolve, reject) {
                        reject("获取token失败.");
                        if (useGlobalErrorHandler)
                            errorHandler("获取token失败", navigator);
                    });
                }
            });
        } else {
            return new Promise(function(resolve, reject) {
                resolve(response);
            });
        }
    }).catch((error) => {
        return new Promise(function(resolve, reject) {
            reject("网络连接超时");
            if (useGlobalErrorHandler)
                errorHandler("网络连接超时", navigator);
        });
    });
}

function isC4CRequest(url: string): boolean {
    return url.startsWith(Constants.C4C_HOST);
}
