"use strict";

import ISaleConsultant from "./saleConsultant";

// for test drive item object
interface ITestDriveItem {
	VehicleModel: string;
    VehicleModeID: string;
    ActivityID: string;
    DriverID: string;
    AppointmentDate: string;
    TestDrivenStatus: string;
    SalesRepID: string;
    LeadIDcontent: string;
    CreationDateTime: string;
	CustomerName: string;
}

export default ITestDriveItem;
