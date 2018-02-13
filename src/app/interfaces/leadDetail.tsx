"use strict";
import ILead from "./lead";

import ILeadInfo from "./leadDetail/leadInfo";

import ICustomerInfo from "./leadDetail/customerInfo";

//interface for lead detail page
interface ILeadDetail extends ILeadInfo, ICustomerInfo {
	followUpInfo?: string;
	ID?: string;
}

export default ILeadDetail;
