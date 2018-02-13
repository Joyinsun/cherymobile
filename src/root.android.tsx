import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import thunk from "redux-thunk";
import Storage from "react-native-storage";
import * as reducers from "./app/reducers";
import * as appActions from "./app/reducers/app/actions";
import { registerScreens } from "./registerScreens";
import { Alert, NativeAppEventEmitter, AsyncStorage } from "react-native";
import localStorage from "./lib/localStorage";
import Resolution from "./lib/Resolution";

// redux related book keeping
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
//const store = createStoreWithMiddleware(reducer);
// create store with remote-redux-devtools
// const store = createStore(reducer, composeWithDevTools(
//     applyMiddleware(thunk)
// ));
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// screen related book keeping
registerScreens(store, Provider);

var storage = new Storage({
    // maximum capacity, default 1000
    size: 1000,
    // Use AsyncStorage for RN, or window.localStorage for web.
    // If not set, data would be lost after reload.
    storageBackend: AsyncStorage,
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    //defaultExpires: 1000 * 3600 * 24,
    defaultExpires: null,
    // cache data in the memory. default is true.
    enableCache: true,
    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return
    // the latest data.
    sync: {
        // we'll talk about the details later.
    }
});
localStorage.data = storage;
//global.storage = storage;

export default class App {
    private currentRoot: string;
    private root: string;

    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(appActions.appInitialized());
    }

    private onStoreUpdate(): void {
        Resolution.setDesignSize();
        const { root } = store.getState().app;

        //const root = "manager2";
        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.startApp(root);
        }
    }

    private startApp(root: string): any {
        switch (root) {
            case "login":
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: "app.LoginScreen",
                        title: "登录",
                        navigatorStyle: {
                            navBarHidden: true
                        }
                    }
                });
                return;
            case "selectRole":
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: "app.SelectRoleScreen",
                        title: "选择业务角色",
                        navigatorStyle: {
                            navBarHidden: true
                        }
                    }
                });
                return;
            case "consultant":
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: "consultant.ConsultantTabsScreen",
                        title: "",
                        navigatorStyle: {
                            navBarHidden: true
                        }
                    }
                });
                return;
            case "manager":
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: "首页",
                            screen: "manager.ManagerHomeScreen",
                            icon: require("../img/manager/icon_home_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_home_highlight@3x.png"),
                            title: "销售首页",
                            overrideBackPress: true,
                            navigatorButtons: {
                                rightButtons: [
                                    {
                                        icon: require("../img/icon_noti.png"),
                                        id: "notification"
                                    }
                                ]
                            }
                        },
                        {
                            label: "报表",
                            screen: "manager.SheetScreen",
                            icon: require("../img/manager/icon_list_normal@3x@3x.png"),
                            selectedIcon: require("../img/manager/icon_list_highlight@3x@3x.png"),
                            title: "报表",
                            overrideBackPress: true
                        },
                        {
                            label: "线索",
                            screen: "manager.LeadScreen",
                            icon: require("../img/manager/icon_clue_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_clue_highlight@3x.png"),
                            title: "线索",
                            overrideBackPress: true
                        },
                        {
                            label: "我的",
                            screen: "manager.ManagerMyCenterScreen",
                            icon: require("../img/manager/icon_mine_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_mine_highlight@3x.png"),
                            title: "我的",
                            overrideBackPress: true
                        }
                    ],
                    appStyle: {
                        forceTitlesDisplay: true
                    },
                    animationType: "slide-down"
                });
                return;
            case "manager2":
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: "首页",
                            screen: "manager2.ManagerHomeScreen",
                            icon: require("../img/manager/icon_home_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_home_highlight@3x.png"),
                            title: "首页",
                            overrideBackPress: true,
                            navigatorButtons: {
                                rightButtons: [
                                    {
                                        icon: require("../img/icon_noti.png"),
                                        id: "notification"
                                    }
                                ]
                            }
                        },
                        {
                            label: "报表",
                            screen: "manager2.SheetScreen",
                            icon: require("../img/manager/icon_list_normal@3x@3x.png"),
                            selectedIcon: require("../img/manager/icon_list_highlight@3x@3x.png"),
                            title: "报表",
                            overrideBackPress: true
                        },
                        {
                            label: "线索",
                            screen: "manager2.LeadScreen",
                            icon: require("../img/manager/icon_clue_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_clue_highlight@3x.png"),
                            title: "线索",
                            overrideBackPress: true
                        },
                        {
                            label: "我的",
                            screen: "manager2.ManagerMyCenterScreen",
                            icon: require("../img/manager/icon_mine_normal@3x.png"),
                            selectedIcon: require("../img/manager/icon_mine_highlight@3x.png"),
                            title: "我的",
                            overrideBackPress: true,
                            navigatorStyle: {
                                navigator: Navigation
                            }
                        }
                    ],
                    appStyle: {
                        forceTitlesDisplay: true
                    },
                    animationType: "slide-down"
                });
                return;
            case "driver":
                Navigation.startTabBasedApp({
                    tabs: [
                        {
                            label: "首页",
                            screen: "driver.HomeScreen",
                            icon: require("../img/driver/home_unselected@2x.png"),
                            selectedIcon: require("../img/driver/home_selected@2x.png"),
                            title: "首页",
                            overrideBackPress: true,
                            navigatorStyle: {
                                navBarHidden: true
                            },
                            navigatorButtons: {
                                rightButtons: [
                                    {
                                        icon: require("../img/icon_noti.png"),
                                        id: "notification"
                                    }
                                ]
                            }
                        },
                        {
                            label: "试驾",
                            screen: "driver.TestDriveScreen",
                            icon: require("../img/driver/drive_unselected@2x.png"),
                            selectedIcon: require("../img/driver/drive_selected@2x.png"),
                            title: "试驾",
                            overrideBackPress: true,
                            navigatorStyle: {
                                navigator: Navigation
                            }
                        },
                        {
                            label: "车辆管理",
                            screen: "driver.CarManagementScreen",
                            icon: require("../img/driver/carmanagement_unselected@2x.png"),
                            selectedIcon: require("../img/driver/carmanagement_selected@2x.png"),
                            title: "车辆管理",
                            overrideBackPress: true
                        },
                        {
                            label: "我的",
                            screen: "driver.MyCenterScreen",
                            icon: require("../img/driver/me_unselected@2x.png"),
                            selectedIcon: require("../img/driver/me_selected@2x.png"),
                            title: "我的",
                            overrideBackPress: true,
                            navigatorStyle: {
                                navigator: Navigation
                            }
                        }
                    ],
                    appStyle: {
                        forceTitlesDisplay: true
                    },
                    animationType: "slide-down"
                });
                return;
            default:
                Alert.alert("Unknown app root");
        }
    }
}
