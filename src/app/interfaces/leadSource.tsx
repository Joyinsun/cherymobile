"use strict";

interface ILeadSource {
    //意向车型
    ZzProductName: string;

    //线索一级来源
    ZzLeadResource1: string;

    //线索二级来源
    ZzLeadResource2: string;

    //交互时间
    Timestamp: string;
}

export default ILeadSource;
