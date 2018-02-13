"use strict";

//interface for activity list item
interface IActivity {
    campaignNumber: string;

    description: string;

    startDate: string;

    endDate: string;

    status: number;

    subject: string;

    type: string;

    url: string;

    imgUrl: string;

    orderTarget: number;

    joinProspect: number;

    newProspect: number;

    dealerId: string;
}

export default IActivity;
