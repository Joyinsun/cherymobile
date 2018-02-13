import { Navigation } from "react-native-navigation";
// import DriverTabsScreen from "./roleC/screens/DriverTabsScreen";
import LoginScreen from "./app/screens/LoginScreen";
import SCIScreen from "./app/screens/SCIScreen";
import SelectRoleScreen from "./app/screens/SelectRoleScreen";
import NotificationScreen from "./app/screens/NotificationScreen";
import MessageTemplateScreen from "./app/screens/MessageTemplateScreen";
import DefaultPage from "./app/screens/DefaultPage";
import BasicMsg from "./app/screens/BasicMsg";
import ApprovalLeadDetailScreen from "./app/screens/LeadDetail/Tabs";
import ApproveScreen from "./app/screens/LeadDetail/ApproveScreen";
import RejectScreen from "./app/screens/LeadDetail/RejectScreen";
import Setting from "./app/screens/Setting";

import ConsultantTabsScreen from "./roleA/screens/ConsultantTabsScreen";
import SearchScreen from "./roleA/screens/SearchScreen";

import LeadDetailScreen from "./roleA/screens/LeadDetail/Tabs";
import SimpleSelectScreen from "./app/components/row/simpleSelectScreen";
import MultiSelectScreen from "./app/components/row/multiSelectScreen";
import SecondSimpleSelectScreen from "./app/components/row/secondSimpleSelectScreen";

import CreateLeadScreen from "./roleA/screens/CreateLeadScreen";
import HigherAppro from "./roleA/screens/HigherAppro/Tabs";
import LeadDetailsInfoScreen from "./roleA/screens/LeadDetailsInfoScreen";
import LeadSourceDetailScreen from "./roleA/screens/LeadSourceDetailScreen";
import ActivityDetailScreen from "./roleA/screens/ActivityDetailScreen";
import TodayWorkScreenWithCalender from "./roleA/screens/TodayWorks/WithCalendar";
import TodayWorkScreenWithoutCalender from "./roleA/screens/TodayWorks/WithoutCalendar";

import HomeScreen from "./roleC/screens/homeScreen";
import TestDriveScreen from "./roleC/screens/testDriveScreen";
import CarManagementScreen from "./roleC/screens/carManagementScreen";
import MyCenterScreen from "./roleC/screens/RoleC_AboutMe";
import DriveDetailScreen from "./roleC/screens/driveDetailScreen";

import LeadDetailScreenB from "./roleB/screens/LeadDetail/Tabs";
import SheetScreen from "./roleB/screens/SheetScreen";
import LeadScreen from "./roleB/screens/LeadScreen";
import ManagerMyCenterScreen from "./roleB/screens/RoleB_AboutMe";
import ManagerHomeScreen from "./roleB/screens/ManagerHomeScreen";
import WaitApprovalScreenB from "./roleB/screens/todayWork/waitApproval";
import WaitPushScreenB from "./roleB/screens/todayWork/waitPush";
import ConsultantScreen from "./roleB/screens/ConsultantScreen";
import LeadSourceDetailScreenB from "./roleB/screens/LeadSourceDetailScreen";

//网销经理
import WaitAssignmentScreenD from "./roleD/screens/todayWork/waitAssignment";
import AssignmentScreenD from "./roleD/screens/todayWork/assignment";
import SheetScreenD from "./roleD/screens/SheetScreen";
import LeadScreenD from "./roleD/screens/LeadScreen";
import ManagerMyCenterScreenD from "./roleD/screens/RoleD_AboutMe";
import ManagerHomeScreenD from "./roleD/screens/ManagerHomeScreen";
import LeadDetailScreenD from "./roleD/screens/LeadDetail/Tabs";
import WaitApprovalScreen from "./roleD/screens/todayWork/waitApproval";
import WaitPushScreen from "./roleD/screens/todayWork/waitPush";
import LeadSourceDetailScreenD from "./roleD/screens/LeadSourceDetailScreen";

export function registerScreens(store: any, provider: any) {
	Navigation.registerComponent("app.LoginScreen", () => LoginScreen, store, provider);
	Navigation.registerComponent("app.SCIScreen", () => SCIScreen, store, provider);
	Navigation.registerComponent("app.SelectRoleScreen", () => SelectRoleScreen, store, provider);
	Navigation.registerComponent("app.NotificationScreen", () => NotificationScreen, store, provider);
	Navigation.registerComponent("app.MessageTemplateScreen", () => MessageTemplateScreen, store, provider);
	Navigation.registerComponent("app.DefaultPage", () => DefaultPage, store, provider);
	Navigation.registerComponent("app.BasicMsg", () => BasicMsg, store, provider);
	Navigation.registerComponent("app.ApprovalLeadDetailScreen", () => ApprovalLeadDetailScreen, store, provider);
	Navigation.registerComponent("app.ApproveScreen", () => ApproveScreen, store, provider);
	Navigation.registerComponent("app.RejectScreen", () => RejectScreen, store, provider);
	Navigation.registerComponent("app.Setting", () => Setting, store, provider);

	Navigation.registerComponent("driver.HomeScreen", () => HomeScreen, store, provider);
	Navigation.registerComponent("driver.TestDriveScreen", () => TestDriveScreen, store, provider);
	Navigation.registerComponent("driver.CarManagementScreen", () => CarManagementScreen, store, provider);
	Navigation.registerComponent("driver.MyCenterScreen", () => MyCenterScreen, store, provider);
	Navigation.registerComponent("driver.DriveDetailScreen", () => DriveDetailScreen, store, provider);

	Navigation.registerComponent("consultant.ConsultantTabsScreen", () => ConsultantTabsScreen, store, provider);
	Navigation.registerComponent("consultant.SearchScreen", () => SearchScreen, store, provider);
	Navigation.registerComponent("consultant.LeadDetailScreen", () => LeadDetailScreen, store, provider);
	Navigation.registerComponent("consultant.LeadSourceDetailScreen", () => LeadSourceDetailScreen, store, provider);
	Navigation.registerComponent("consultant.CreateLeadScreen", () => CreateLeadScreen, store, provider);
	Navigation.registerComponent("consultant.LeadDetailsInfoScreen", () => LeadDetailsInfoScreen, store, provider);
	Navigation.registerComponent("consultant.ActivityDetailScreen", () => ActivityDetailScreen, store, provider);
	Navigation.registerComponent("consultant.TodayWorkScreenWithCalender", () => TodayWorkScreenWithCalender, store, provider);
	Navigation.registerComponent("consultant.TodayWorkScreenWithoutCalender", () => TodayWorkScreenWithoutCalender, store, provider);
	Navigation.registerComponent("consultant.HigherAppro", () => HigherAppro, store, provider);

	Navigation.registerComponent("row.SimpleSelectScreen", () => SimpleSelectScreen, store, provider);
	Navigation.registerComponent("row.MultiSelectScreen", () => MultiSelectScreen, store, provider);
	Navigation.registerComponent("row.SecondSimpleSelectScreen", () => SecondSimpleSelectScreen, store, provider);

	Navigation.registerComponent("manager.ManagerHomeScreen", () => ManagerHomeScreen, store, provider);
	Navigation.registerComponent("manager.ManagerMyCenterScreen", () => ManagerMyCenterScreen, store, provider);
	Navigation.registerComponent("manager.LeadScreen", () => LeadScreen, store, provider);
	Navigation.registerComponent("manager.SheetScreen", () => SheetScreen, store, provider);
	Navigation.registerComponent("manager.LeadDetailScreen", () => LeadDetailScreenB, store, provider);
	Navigation.registerComponent("manager.WaitApprovalScreen", () => WaitApprovalScreenB, store, provider);
	Navigation.registerComponent("manager.WaitPushScreen", () => WaitPushScreenB, store, provider);
	Navigation.registerComponent("manager.ConsultantScreen", () => ConsultantScreen, store, provider);
	Navigation.registerComponent("manager.LeadSourceDetailScreen", () => LeadSourceDetailScreenB, store, provider);

	//网销经理
	Navigation.registerComponent("manager2.ManagerHomeScreen", () => ManagerHomeScreenD, store, provider);
	Navigation.registerComponent("manager2.ManagerMyCenterScreen", () => ManagerMyCenterScreenD, store, provider);
	Navigation.registerComponent("manager2.LeadScreen", () => LeadScreenD, store, provider);
	Navigation.registerComponent("manager2.SheetScreen", () => DefaultPage, store, provider);
	Navigation.registerComponent("manager2.WaitAssignmentScreen", () => WaitAssignmentScreenD, store, provider);
	Navigation.registerComponent("manager2.AssignmentScreen", () => AssignmentScreenD, store, provider);
	Navigation.registerComponent("manager2.LeadDetailScreen", () => LeadDetailScreenD, store, provider);
	Navigation.registerComponent("manager2.WaitApprovalScreen", () => WaitApprovalScreen, store, provider);
	Navigation.registerComponent("manager2.WaitPushScreen", () => WaitPushScreen, store, provider);
	Navigation.registerComponent("manager2.LeadSourceDetailScreen", () => LeadSourceDetailScreenD, store, provider);
}
