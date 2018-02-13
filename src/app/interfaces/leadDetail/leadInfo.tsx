"use strict";

interface ILeadInfo {
//意向信息

	//线索一级来源
	LeadSource1Name: string;

	//线索二级来源
	LeadSource2Name: string;

	//意向车型
	IntentionCarName: string;

	//颜色
	IntentionColor: string;

	//预购时间
	IntentionOrderTime: string;

	//购车预算
	Budget: string;

	//购车用途
	// GroupCode: string;

    GroupCodeText: string;

	//购买类型
	BuyMethod2Text: string;

	//竞品车型
	CompetitorNotes: string;

	//购车关注点
	// MainPurchaseFocuscontent: string;

	MainPurchaseFocuscontentText?: string;

	//电商订单ID
	ECommerceOrderID: number;

	//接待结果
	ServeResult?: string;

	//其它重点描述
	Note?: string;

//管理信息

	//线索状态
	UserStatusCode?: string;

    UserStatusCodeText: string;

	//呼叫中心核验
	HasChecked: boolean;

	//线索级别-人工
	LeadLevelText: string;

	//创建时间
	CreationDateTime: string;

	//分配时间
	ArrageDateTime: string;

	//电商核验时间
	ECommerceCheckTime?: string;

//指标时效信息

	//渠道来源次数
	InteractionTimes: string;

	//跟进次数
	ActionTimes: number;

	//到店次数
	ArrivalTimes: number;

	//成交车型
	InvoiceCar: string;
}

// const leadInfoItems: string[] = [
//     "LeadSource1Name", "LeadSource2Name", "IntentionCarName", "IntentionColor", "IntentionOrderTime", "Budget", "GroupCode", "GroupCodeText", "BuyMethod2Text", "CompetitorNotes", "MainPurchaseFocuscontent", "MainPurchaseFocuscontentText", "ECommerceOrderID", "ServeResult", "UserStatusCode", "UserStatusCodeText", "HasChecked", "LeadLevelText", "CreationDateTime", "ArrageDateTime", "ECommerceCheckTime", "InteractionTimes", "ActionTimes", "ArrivalTimes", "InvoiceCar"
// ];

// export { ILeadInfo, leadInfoItems };

export default ILeadInfo;
