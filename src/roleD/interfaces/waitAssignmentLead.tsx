"use strict";

//interface for wait assigment lead item

interface ILead {
    id: string;

    customerName: string;

    sourceLevel1: string;

    sourceLevel2: string;

    phone: string;

    carModel: string;

    carColor: string;

    purchaseDate: string;

    purchaseBudget: number;

    purchaseWay: string;

    orderId: number;

    status: string;

    callCenter: boolean;

    level: string;

    createDate: string;

    assignDate: string;

}

export default ILead;
