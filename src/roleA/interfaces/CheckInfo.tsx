"use strict";

import ILead from "../../app/interfaces/lead";

interface CheckInfo {
	lead: ILead;

	/*0-待审批 1-已通过 2-未通过*/
	status: number;

	isRecommissioned: boolean;

	checkName: string;

	failType: string;

	failReason: string;

	applyDate: string;

	checkDate: string;

	dealer?: string;
}

export default CheckInfo;
