"use strict";

interface DriveInfo {
	VehicleModel: string;
    VehicleModeID: string;
    ActivityID: string;
    DriverID: string;
    AppointmentDate: string;
    TestDrivenStatus: string;
    SalesRepID: string;
    LeadIDcontent: string;
    CreationDate: string;
	IsCustomerOwn: boolean;

	CustomerName: string;
	intentionCarType: string;
	DrivenExperience: string;
	ArrivalTimes: string;
	MainPurchaseFocuscontent: string;
	GroupCode: string;
	CompetitorNotes: string;
	IntentionOrderTime: string;
	Address: string;
	mobile: string;
	Mileage_a_content: string;
	Mileage_a_unitCode: string;
	Mileage_b_content: string;
	Mileage_b_unitCode: string;
}

export default DriveInfo;
