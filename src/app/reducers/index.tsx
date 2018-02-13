import app from "./app/reducer";

import leadActivity from "./leadActivity/reducer";
import messageTemplate from "./message/reducer";
import aboutMe from "./aboutMe/reducer";

import rolea_lead from "../../roleA/reducers/lead/reducer";
import rolea_leadDetail from "../../roleA/reducers/leadDetail/reducer";
import rolea_activity from "../../roleA/reducers/activity/reducer";
import rolea_search from "../../roleA/reducers/search/reducer";
import rolea_check from "../../roleA/reducers/check/reducer";
import rolea_home from "../../roleA/reducers/home/reducer";
import rolea_fetchWeekLead from "../../roleA/reducers/calendar/reducer";

import roleb_lead from "../../roleB/reducers/lead/reducer";
import roleb_leadDetail from "../../roleB/reducers/leadDetail/reducer";
import roleb_consultants from "../../roleB/reducers/consultants/reducer";
import roleb_approve_lead from "../../roleB/reducers/waitApproveLead/reducer";
import roleb_push_lead from "../../roleB/reducers/waitPushLead/reducer";
import roleb_home from "../../roleB/reducers/home/reducer";

import rolec_drive from "../../roleC/reducers/drive/reducer";

import roled_waitAssignmentLead from "../../roleD/reducers/waitAssignmentLead/reducer";
import roled_consultants from "../../roleD/reducers/consultants/reducer";
import roled_lead from "../../roleD/reducers/lead/reducer";
import roled_home from "../../roleD/reducers/home/reducer";
import roled_push_lead from "../../roleD/reducers/waitPushLead/reducer";
import roled_leadDetail from "../../roleD/reducers/leadDetail/reducer";
import roled_approve_lead from "../../roleD/reducers/waitAprovalLead/reducer";

export {
    app,
    leadActivity,
    messageTemplate,
    aboutMe,

    rolea_lead,
    rolea_leadDetail,
    rolea_search,
    rolea_activity,
    rolea_check,
    rolea_home,
    rolea_fetchWeekLead,

    roleb_push_lead,
    roleb_lead,
    roleb_leadDetail,
    roleb_consultants,
    roleb_approve_lead,
    roleb_home,

    rolec_drive,

    roled_waitAssignmentLead,
    roled_consultants,
    roled_lead,
    roled_home,
    roled_push_lead,
    roled_leadDetail,
    roled_approve_lead
};
