//replace this global variable when the local storage is ready
export var userdetail = {
	c4cAuthorization: "",
	marktingAuthorization: "",
	roles: [],
	managerId: null,
	name: "",
	dealerId: "",
	id: null,
	sciUserId: "",
	c4cCSRFToken: "",
	selectedRole: ""
};

export var resolution = {
	scale: 1
};
export var metadata = {
	activityIntentionLevelList: {
		data: null,
		loaded: false
	},
	activityReason1List: {
		data: null,
		loaded: false
	},
	activityReason2List: {
		data: null,
		loaded: false
	},
	activityCampaignList: {
		data: null,
		loaded: false
	},
	activityTestCarList: {
		data: null,
		loaded: false
	},
	carTypeList: {
		data: null,
		loaded: false
	},
	gender: {
		data: null,
		loaded: false
	},
	leadLevelList: {
		data: null,
		loaded: false
	},
	purposeList: { //购车用途
		data: null,
		loaded: false
	},
	purchaseTypeList: { //购买类型
		data: null,
		loaded: false
	},
	purchaseFocusList: { //购车关注点
		data: null,
		loaded: false
	}
};

export var common = {
	navigator: null,
	isCalled: false,
	timer: null
};
