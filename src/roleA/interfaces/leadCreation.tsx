"use strict";

interface ILeadCreation {
    Name: string; // 线索name, C4C必填字段, mobile不显示该字段, POST字段
    CreatSoucre: string; // 线索创建来源, 业务逻辑必填字段, APP创建值为2, YMKT为3, POST字段
    SalesID: string; // 销售顾问ID - 当前登录顾问的SCI ID, POST字段
    SalesManagerID: string; // 销售顾问Manager ID - 当前登录顾问经理的SCI ID, POST字段
    Mobile: string; // 客户手机号码, 必填字段, mobile显示该字段, POST字段
    IndividualCustomerFamilyName: string; //客户姓名, mobile必填字段, POST字段
    Gender?: string; // 客户性别ID, POST字段
    IntentionCarCategoryID: string; // 意向车型ID, POST填写该字段, POST不需要填写IntentionCarName, POST字段
    LeadLevel?: string; // 线索等级ID, POST字段
    IntentionOrderTime?: string; // 预购时间, 由意向等级计算得出, POST字段
    CampaignID?: string; // 线下活动ID, POST字段
    LeadSource1ID?: string; // 线索来源一级ID, POST字段
    LeadSource2ID?: string; // 线索来源二级ID, POST字段
    ServeResult?: string; // 接待结果, POST字段
    DealerID: string; // 经销商ID, POST字段
}

export default ILeadCreation;
