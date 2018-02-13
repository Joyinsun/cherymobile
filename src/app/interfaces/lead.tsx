"use strict";

interface ILead {
    //ID
    ID: string;

    ObjectID: string;

    //客户姓名
    IndividualCustomerFamilyName: string;

    //客户ID
    CustomerID?: string;

    //线索来源
    FirstTouch: string;

    //电话号码
    Mobile: string;

    //目标车型
    IntentionCarName: string;

    IntentionCarNameLevel2: string;

    //目标车型颜色
    IntentionColor: string;

    //预购时间
    IntentionOrderTime: string;

    //购车预算
    Budget: number;

    //购买方式
    BuyMethod2: string;

    //电商订单ID
    ECommerceOrderID?: number;

    //线索状态
    UserStatusCode: string;

    UserStatusCodeText: string;

    //callCenter: boolean;

    //线索等级
    LeadLevel: string;

    LeadLevelText: string;

    //创建时间
    CreationDateTime: string;

    //分配时间
    ArrageDateTime?: string;

    //呼叫中心核验
    HasChecked: boolean;

    //销售代表
    SalesID?: string;

    Sales?: string;

    //微信ID
    WechatOpenID?: string;

    //跟进次
    ActionTimes?: number;

    //到店次
    ArrivalTimes?: number;

    LeadSource1Name?: string;

    LeadSource2Name?: string;

    //审批信息
    Applicant?: string;
    ApprovalStatus?: string;
    AppliedTime?: string;
    //app跟进类型
    APPTaskType?: string;
    APPTaskTypeText?: string;

    //取线索来源列表所需id
    YmktContactUUIDcontent?: string;
}

export default ILead;
