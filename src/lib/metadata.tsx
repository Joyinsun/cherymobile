import * as GlobalVariable from "./global";
import httpFetch from "./httpFetch";
import * as Constant from "./Constants";

export function initMetadata() {
	initCommonData(Constant.METADTA_GENDER_URL, "gender");
	initCommonData(Constant.METADTA_LEADACTIVITY_INTENTIONLEVEL_URL, "activityIntentionLevelList");
	initCommonData(Constant.METADTA_LEADACTIVITY_REASON1_URL, "activityReason1List");
	initCommonData(Constant.METADTA_LEADACTIVITY_REASON2_URL, "activityReason2List");
	initCarTypeList();
	initCampaignList();
	initActivityTestCarList();
	initCommonData(Constant.METADTA_LEAD_LEVELS_ENUM_URL, "leadLevelList");
	initCommonData(Constant.METADTA_LEAD_PURPOSE_ENUM_URL, "purposeList");
	initCommonData(Constant.METADTA_LEAD_PURCHASE_TYPE_ENUM_URL, "purchaseTypeList");
	initCommonData(Constant.METADTA_LEAD_PURCHASE_FOCUS_ENUM_URL, "purchaseFocusList");
}

export function initCommonData(url: string, nodeName: string) {
	httpFetch(url, null, {
		method: "get",
		headers: {
			"Accept": "application/json",
			"Accept-Language": "zh-CN"
		}
	}).then(function(response: any) {
		if (response.ok && response.status === 200) {
			GlobalVariable.metadata[nodeName].loaded = true;
			return response.json();
		}
	}).then(function(res) {
		let aData = [];
		if (res && res.d && res.d.results) {
			res.d.results.forEach(function(value, index) {
				aData.push({
					id: index,
					key: value.Code,
					value: value.Description
				});
			});
		}
		GlobalVariable.metadata[nodeName].data = aData;
	});
}
export function initCampaignList() {
	httpFetch(Constant.ALL_CAMPAIN_LIST_API, null, {
		method: "get",
		headers: {
			"Accept": "application/json",
			"Accept-Language": "zh-CN"
		}
	}).then(function(response: any) {
		if (response.ok && response.status === 200) {
			GlobalVariable.metadata.activityCampaignList.loaded = true;
			return response.json();
		}
	}).then(function(res) {
		let aData = [];
		if (res && res.d && res.d.results) {
			res.d.results.forEach(function(value, index) {
				aData.push({
					id: index,
					key: value.ID,
					value: value.Description
				});
			});
		}
		GlobalVariable.metadata.activityCampaignList.data = aData;
	});
}
export function initActivityTestCarList() {
	httpFetch(Constant.ACTIVITYTESTCAR_URL + "?dealerId=" + GlobalVariable.userdetail.dealerId, null, {
		method: "get",
		headers: {
			"Accept": "application/json",
			"Accept-Language": "zh-CN"
		}
	}).then(function(response: any) {
		if (response.ok && response.status === 200) {
			GlobalVariable.metadata.activityTestCarList.loaded = true;
			return response.json();
		}
	}).then(function(res) {
		let aData = [];
		if (res) {
			res.forEach(function(value, index) {
				aData.push({
					id: value.testDriverId,
					key: value.id,
					value: value.carModel + " " + value.carType
				});
			});
		}
		GlobalVariable.metadata.activityTestCarList.data = aData;
	});
}
export function initCarTypeList() {
	httpFetch(Constant.CARTYPE_URL, null, {
		method: "get",
		headers: {
			"Accept": "application/json",
			"Accept-Language": "zh-CN"
		}
	}).then(function(response: any) {
		if (response.ok && response.status === 200) {
			GlobalVariable.metadata.carTypeList.loaded = true;
			return response.json();
		}
	}).then(function(res) {
		let aData = [];
		if (res && res.d && res.d.results) {
			let aResults = res.d.results;
			aResults.forEach(function(value, index) {
				if (aData.length === 0) {
					aData.push({
						id: index,
						key: value.WS_CarModelID2,
						value: value.WS_CarModel2,
						secondLevelDataList: [{
							id: index,
							key: value.WS_CarModelID2,
							value: "全部"
						}]
					});
				} else {
					let bAdd = true;
					aData.forEach(function(oData) {
						if (oData.key === value.WS_CarModelID2) {
							bAdd = false;
						}
					});
					if (bAdd) {
						aData.push({
							id: index,
							key: value.WS_CarModelID2,
							value: value.WS_CarModel2,
							secondLevelDataList: [{
								id: index,
								key: value.WS_CarModelID2,
								value: "全部"
							}]
						});
					}
				}
			});

			aResults.forEach(function(value, index) {
				aData.forEach(function(oData) {
					if (oData.key === value.WS_CarModelID2) {
						oData.secondLevelDataList.push({
							id: index,
							key: value.ProductCategoryInternalID,
							value: value.WS_CarModel2 + value.WS_CarType3 + value.WS_CarInfo4 + value.WS_CarCat5
						});
					}
				});
			});
		}
		GlobalVariable.metadata.carTypeList.data = aData;
	});
}
