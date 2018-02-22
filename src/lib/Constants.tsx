import { Dimensions } from "react-native";
export const C4C_HOST = "https://my500248.c4c.saphybriscloud.cn/sap/c4c/odata";
export const SCP_HOST_URL = "https://cherydealerservicebetf1d1d8c7d.cn1.hana.ondemand.com/chery-dealer-service-0.0.1-SNAPSHOT";
export const C4C_GET_CSRF_TOKEN = C4C_HOST + "/v1/c4codata/LeanLeadGenderCollection";
export const C4C_ODATA = C4C_HOST + "/cust/v1";
export const C4C_ODATA_V1 = C4C_HOST + "/v1";
export const DOCUMENT_SERVICE_HOST_URL = "https://documentservice-f1d1d8c7d.dispatcher.cn1.hana.ondemand.com/cmis";

export const SCPLOGOUT = SCP_HOST_URL + "/authentication/logout";
export const SCIURL = "https://cscapj.accounts.ondemand.com/saml2/idp/sso/cscapj.accounts.ondemand.com";

export const SCP_USERDETAIL_URL = SCP_HOST_URL + "/sciuserdetail";
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const FLOAT_REGEX = /^\d+(\.\d+)?$/;
export const SCP_MESSAGE_TEMP = SCP_HOST_URL + "/api/v1/users/";
export const SCP_POST_MESSAGE_TEMP = SCP_HOST_URL + "/api/v1/users/smstemplates";
export const SCP_SWAGGER_URL = SCP_HOST_URL + "/swagger-ui.html";

export const PAGE_LENGTH = 20;
export const COLOR = {
	RED: "#da3456",
	DARKRED: "#DA1E46",
	DARKGREY: "#252525",
	WHITE: "#ffffff",
	YELLOW: "#ffbe4b",
	LIGHTYELLOW: "#e2c258",
	GREY: "#848693",
	LIGHTGREY: "#ecedf1",
	BLACK_000: "#000",
	GREY_666: "#666",
	GREY_999: "#999",
	GREY_888: "#888888",
	GREY_ccc: "#ccc",
	GREY_252525: "#252525",
	GREY_ddd: "#ddd",
	BG_GREY: "#F9F8F8",
	GREY_e3: "#e3e3e3",
	GREY_5a: "#5a5a5a",
	LIST_BOTTOM: "#CED1D6",
	DIVIDER: "#dddddd",
	DEEP_RED: "#DA1E46",
	BG_COLOR: "#F0F2F3",
	BORDER_COLOR: "#DDDDDD",
	TINT_RED: "#d93356"
};
export const SCREEN_WIDTH = Dimensions.get("window").width;
//export const SCREEN_WIDTH = 375;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
//-------中文描述------//
export const CN_CONSULTANT = "销售顾问";
export const CN_SHOWROOM_MANAGER = "展厅经理";
export const CN_TEST_DRIVER = "试驾专员";
export const CN_DIGITAL_MARKETING_MANAGER = "数字化营销经理";
export const CN_ORDERDRIVE = "预约试驾";
export const CN_INVITE = "邀约到店";
export const CN_ORDERPLACED = "下订";
export const CN_TESTDRIVE = "试驾";
export const CN_KNOCKDOWN = "成交";
export const CN_DEFEAT = "战败";
export const CN_RETURNVISIT = "交车回访";
export const CN_UNSUBSCRIBE = "退订";
export const CN_RETURNEDGOODS = "退货";
export const CN_DEFEATAPPOVED = "战败申请通过";
export const CN_DEFEATREJECTED = "战败申请驳回";
export const CN_UNSUBSCRIBEAPPOVED = "退订申请通过";
export const CN_UNSUBSCRIBEREJECTED = "退订申请驳回";
export const CN_RETURNEDGOODSAPPOVED = "退货申请通过";
export const CN_RETURNEDGOODSREJECTED = "退货申请驳回";
export const CN_GENDER = "性别";
export const CN_INTENTCARMODEL = "车型";
export const CN_INTENTLEVEL = "意向等级";
export const CN_CAMPAIGN = "活动";
export const CN_LEAD_SOURCE_LEAVEL_ONE = "线索来源一级";
export const CN_LEAD_SOURCE_LEAVEL_TWO = "线索来源二级";
export const CN_INPUT_MOBILE_NUMBER = "填写手机号";
export const CN_PLEASE_SELECT = "请选择";
export const CN_LOGIN = "登录";
export const CN_LOGIN_TITLE = "立即登录";
export const CN_INPUT_PLACEHOLDER = "请输入";
export const CN_LOGOUT = "退出登录";
export const CN_LEAD_CREATED_SUCC = "线索创建成功！";
export const CN_LEAD_CREATED_FAILED = "线索创建失败！";
export const CN_ORDERED_DRIVE_STATUS = "已预约";
export const CN_PENDING_DRIVE_STATUS = "待试驾";
export const CN_TEST_DRIVED_STATUS = "已试驾";
export const CN_RESET_PWD = "修改密码";
//-------中文描述------//

//-------Code Key-----//
export const CODE_CONSULTANT = "ROLE_SALE_CONSULTANT";
export const CODE_SHOWROOM_MANAGER = "ROLE_SHOWROOM_MANAGER";
export const CODE_TEST_DRIVER = "ROLE_TEST_DRIVER";
export const CODE_DIGITAL_MARKETING_MANAGER = "ROLE_DIGITAL_MARKETING_MANAGER";

export const CODE_ACTIVITY_PURPOSE_ORDERDRIVE = "ORDERDRIVE";
export const CODE_ACTIVITY_PURPOSE_INVITE = "INVITE";
export const CODE_ACTIVITY_PURPOSE_ORDERPLACED = "ORDERPLACED";
export const CODE_ACTIVITY_PURPOSE_TESTDRIVE = "TESTDRIVE";
export const CODE_ACTIVITY_PURPOSE_KNOCKDOWN = "KNOCKDOWN";
export const CODE_ACTIVITY_PURPOSE_DEFEAT = "DEFEAT";
export const CODE_ACTIVITY_PURPOSE_RETURNVISIT = "RETURNVISIT";
export const CODE_ACTIVITY_PURPOSE_UNSUBSCRIBE = "UNSUBSCRIBE";
export const CODE_ACTIVITY_PURPOSE_RETURNEDGOODS = "RETURNEDGOODS";
export const CODE_ACTIVITY_PURPOSE_DEFEATAPPOVED = "DEFEATAPPOVED";
export const CODE_ACTIVITY_PURPOSE_DEFEATREJECTED = "DEFEATREJECTED";
export const CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEAPPOVED = "UNSUBSCRIBEAPPOVED";
export const CODE_ACTIVITY_PURPOSE_UNSUBSCRIBEREJECTED = "UNSUBSCRIBEREJECTED";
export const CODE_ACTIVITY_PURPOSE_RETURNEDGOODSAPPOVED = "RETURNEDGOODSAPPOVED";
export const CODE_ACTIVITY_PURPOSE_RETURNEDGOODSREJECTED = "RETURNEDGOODSREJECTED";
export const CODE_ACTIVITY_GROUPCODE_LOCAL = "Z001";
export const CODE_ACTIVITY_GROUPCODE_CALL = "Z002";
export const CODE_ACTIVITY_GROUPCODE_SMS = "Z003";
export const CODE_ACTIVITY_GROUPCODE_WECHAT = "Z004";
export const CODE_ACTIVITY_GROUPCODE_SYSTEM = "Z005";

//-------Code Key-----//
/*--------metadata URL-------*/
export const METADTA_GENDER_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadGenderCollection?$format=json";
export const METADTA_LEADACTIVITY_INTENTIONLEVEL_URL = C4C_HOST + "/cust/v1/activity/ActivityIntentionLevelCollection";
export const METADTA_LEADACTIVITY_REASON1_URL = C4C_HOST + "/cust/v1/activity/ActivityReason1contentCollection?$filter=Code eq 'Z*'";
export const METADTA_LEADACTIVITY_REASON2_URL = C4C_HOST + "/cust/v1/activity/ActivityReason2contentCollection";
export const ACTIVITYTESTCAR_URL = SCP_HOST_URL + "/api/v1/testDriveCarProfiles";
export const CARTYPE_URL = C4C_HOST + "/cust/v1/customproduct/MaterialCollection?$format=json&$select=WS_BrandID1,WS_Brand1,WS_CarModelID2,WS_CarModel2,WS_CarTypeID3,WS_CarType3,WS_CarInfoID4,WS_CarInfo4,WS_CarCatID5,WS_CarCat5,ProductCategoryInternalID,Description";
export const METADTA_LEAD_LEVELS_ENUM_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadLeadLevelCollection?$format=json";
export const METADTA_LEAD_PURPOSE_ENUM_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadGroupCodeCollection?$format=json";
export const METADTA_LEAD_PURCHASE_TYPE_ENUM_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadBuyMethod2Collection?$format=json";
export const METADTA_LEAD_PURCHASE_FOCUS_ENUM_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadMainPurchaseFocuscontentCollection?$format=json";
/*--------metadata URL-------*/
/* activity related api in role consultant */

export const CAMPAIGN_LIST_API = SCP_HOST_URL + "/api/v1/campaigns/pages";
export const LEAD_CREATION_MOBILE_CHECK_URL = C4C_ODATA + "/customerphone/PhoneCollection?$format=json&$expand=Customer&$filter=StatusCode eq '1' and PhoneNumber eq ";
export const LEAD_CREATION_LEAD_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadCollection?$format=json&$select=ID,IndividualCustomerFamilyName,FirstTouch,Mobile,IntentionCarName,IntentionCarNameLevel2,IntentionColor,IntentionOrderTime,Budget,BuyMethod2,ECommerceOrderID,UserStatusCode,UserStatusCodeText,LeadLevel,LeadLevelText,CreationDateTime,ArrageDateTime,HasChecked,SalesID,Sales,WechatOpenID,ActionTimes,ArrivalTimes,LeadSource1Name,LeadSource2Name&$filter=Mobile eq ";
export const LEAD_CREATION_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadCollection";
export const LEAD_GENDER_ENUM_URL = C4C_ODATA_V1 + "/c4codata/LeanLeadGenderCollection?$format=json";

export const LEAD_SOURCE_ONE_ENUM_URL = C4C_ODATA + "/leadsource/LeadSourceRootCollection?$format=json";
export const LEAD_SOURCE_TWO_ENUM_URL = C4C_ODATA + "/leadsource/SecondLeadSourceCollection?$format=json&$filter=ToFirstLevelID eq ";
export const ALL_CAMPAIN_LIST_API = C4C_ODATA + "/campaign2/Campaign2Collection?$format=json&$filter=LifeCycleStatusCode eq '2'";

export const LEADACTIVITY_URL = C4C_HOST + "/cust/v1/activity/ActivityCollection";

/* drive related API in role test driver */

// Will switch to SCP host once the SCP destination is ready
export const TEST_DRIVE_URL = C4C_HOST + "/cust/v1/activity/ActivityCollection?$format=json&$select=ActivityID,SalesRepID,LeadIDcontent,VehicleModeID,VehicleModel,AppointmentDate,TestDrivenStatus,DriverID,CreationDate,NextActivityTime,CustomerName,SalesRepName&$filter=Purpose eq '*TESTDRIVE*' and TestDrivenStatus eq '01' and DriverID eq ";
export const ORDER_TEST_DRIVE_URL = C4C_HOST + "/cust/v1/activity/ActivityCollection?$format=json&$select=ActivityID,SalesRepID,LeadIDcontent,VehicleModeID,VehicleModel,AppointmentDate,TestDrivenStatus,DriverID,CreationDate,NextActivityTime,CustomerName,SalesRepName&$filter=Purpose eq '*ORDERDRIVE*' and DriverID eq ";

export const LEADITEM_BASE_URL = C4C_HOST + "/v1/c4codata/LeanLeadCollection?$format=json&$select=IndividualCustomerFamilyName,IntentionCarName,IntentionColor,FirstTouch,CreationDateTime,LeadLevel,LeadLevelText,APPTaskType";
