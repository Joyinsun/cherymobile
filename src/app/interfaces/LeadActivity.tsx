"use strict";

//interface for activity list item
interface ILeadActivity {
	Purpose: string; //跟进小类
	GroupCode: string; //跟进大类
	QuoteAmount_content: string; //下订金额
	AppointmentDate: string; //预约试驾时间
	ArrivalTime: string; //下次到店时间
	NextActivityTime: string; //下次跟进时间
	VehicleModel: string; //试驾车型
	VehicleModeID: string; //试驾车型id
	DriverID: string; //试驾员ID
	IsCustomerOwn: boolean; //是否客户本人试驾
	IsDLScanned: string; //驾照扫描
	IsIDCScanned: string; //身份证扫描
	OtherVehicleModelID: string; //试驾超过一辆车型
	OtherVehicleModel: string;
	IsRecepitScanned: string; //发票扫描
	CampaignName: string; //活动
	CampaignID: string;
	PhoneDuration: string;
	ActivityTime: string; //本次跟进时间
	IntentModeID: string; //意向车型
	IntentModel: string; //意向车型
	CustomerResponse: string; //客户反馈
	IntentionLevel: string; //意向等级
	IntentionLevelText: string;
	Reason1content: string; //战败类型
	Reason2content: string; //战败原因
	Reason1contentText: string;
	Reason2contentText: string;
}

export default ILeadActivity;
