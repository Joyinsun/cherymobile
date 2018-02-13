"use strict";

interface Drive {
    VehicleModel: string;
    VehicleModeID: string;
    ActivityID: string;
    DriverID: string;
    AppointmentDate?: string;
    NextActivityTime: string;
    TestDrivenStatus: string;
    SalesRepID: string;
    LeadIDcontent: string;
    CreationDate: string;
	CustomerName: string;
	SalesRepName: string;
    IntentModel?: string;
    ObjectID?: string;
}

export default Drive;
