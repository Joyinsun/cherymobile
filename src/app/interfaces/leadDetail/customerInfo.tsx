"use strict";

interface ICustomerInfo {
    //电话号码
    Mobile: string;

    //客户姓名
    IndividualCustomerFamilyName: string;

    //客户性别
    Gender: string;

    GenderText: string;

       //固定电话
    Phone: string;

    //详细地址
    Address: string;

    //出生日期
    BirthDate: string;

    //客户类型
    IsCustomer: boolean;

    //微信昵称
    WechatID: string;

    //邮箱
    Emailcontent: string;

    //客户ID
    CustomerID?: string;
}

export default ICustomerInfo;
