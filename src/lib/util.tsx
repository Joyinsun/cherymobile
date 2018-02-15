import _ from "lodash";
const moment = require("moment");
import { PixelRatio } from "react-native";
import * as GlobalVariable from "./global";
import doXMLHttpRequest from "./doXMLHttpRequest";
import * as Constants from "./Constants";
import ILead from "../app/interfaces/lead";

export default {
  dateCover(num) {
    return num < 10 ? `0${num}` : num;
  },
  dateFormat(date, type) {
    switch (type) {
      case "yy-mm":
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}}`;
      case "chinese":
        return `${date.getFullYear()}年${date.getMonth() + 1}月`;
      default:
        return `${date.getFullYear()}-${this.dateCover(date.getMonth() + 1)}`;
    }
  },
  getDateNumber(date) {
    const year = date.getFullYear();
    return [31,
      (year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][date.getMonth()];
  },
  getWeekArr(date, index) {
    const dateNumber = date.getDay(date);
    let dateArr = [];
    const weekLen = 7;
    let cha = date.getDate() - index;
    for (let i = 0; i < weekLen; i++) {
      dateArr.push(new Date(date.getFullYear(), date.getMonth(), cha + i));
    }
    return dateArr;
  },
  getPreWeekDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
  },
  getNextWeekDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
  },
  getWeekdayName(date) {
    let name = "",
      index = date.getDay();
    switch (index) {
      case 0: name = "周日"; break;
      case 1: name = "周一"; break;
      case 2: name = "周二"; break;
      case 3: name = "周三"; break;
      case 4: name = "周四"; break;
      case 5: name = "周五"; break;
      case 6: name = "周六"; break;
    }
    if (this.isSameDate(date)) {
      name = "今天";
    }
    return name;
  },
  isSameDate(date) {
    if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
      return true;
    } else {
      return false;
    }
  },
  getToday(): any {
    const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
    const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
    return { start, end };
  },
  formatUrl(url: string, value: string): string {
    var str = "return " + url;
    var formatMethod = new Function("userID", str);
    var formatURL = formatMethod(value);
    return formatURL;
  },
  dp2px(pt: number): number {
    return PixelRatio.getPixelSizeForLayoutSize(pt);
  },
  px2dp(px: number): number {
    return PixelRatio.roundToNearestPixel(px);
  },
  addInList(list: any, value: string) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] === value)
        return list;
    }
    if (value !== "")
      list.push(value);
    return list;
  },
  addDiffDateInList(list: any, value: string) {
    if (value) {
      var dd = moment(value).format("YYYY-MM-DD");
      var today = moment().format("YYYY-MM-DD");
      var dInWeek = moment().subtract(7, "days").format("YYYY-MM-DD");
      var dInMonth = moment().subtract(1, "months").format("YYYY-MM-DD");
      var dBefore3Month = moment().subtract(3, "months").format("YYYY-MM-DD");
      var option = "";
      if (dd === today)
        option = "当天";
      else if (moment(dd).isBetween(dInWeek, today))
        option = "1周内";
      else if (moment(dd).isBetween(dInMonth, today))
        option = "1个月内";
      else if (moment(dd).isBetween(dBefore3Month, dInMonth)) {
        option = "1-3个月";
      } else if (moment(dd).isBefore(dBefore3Month))
        option = "3个月外";
      else
        option = "3个月外";

      for (var i = 0; i < list.length; i++) {
        if (list[i] === option)
          return list;
      }

      list.push(option);
      return list;
    } else
      return list;
  },
  addStatusInList(list: any, value: string) {
    if (value) {
      let option = "";
      switch (value) {
        case "01": option = "新建"; break;
        case "02": option = "已派发"; break;
        case "03": option = "已转换"; break;
        case "04": option = "已接受"; break;
        case "05": option = "已拒绝"; break;

        case "Z0": option = "已分配"; break;
        case "Z1": option = "已到店"; break;
        case "Z2": option = "已试乘试驾"; break;
        case "Z7": option = "已跟进"; break;
        case "Z8": option = "已下订"; break;
        case "Z9": option = "已成交"; break;
        case "ZA": option = "战败/流失"; break;
        case "ZB": option = "失效"; break;
        default: break;
      }
      for (var i = 0; i < list.length; i++) {
        if (list[i] === option)
          return list;
      }
      if (value !== "")
        list.push(option);
      return list;
    } else
      return list;
  },
  getLeadLevel(leadLevelText: string): string {
    let leadLevel = "";
    switch (leadLevelText) {
      case "H": leadLevel = "1"; break;
      case "A": leadLevel = "2"; break;
      case "B": leadLevel = "3"; break;
      case "C": leadLevel = "4"; break;
      default: leadLevel = "1"; break;
    }
    return leadLevel;
  },
  getUserStatusCode(codeText: string): string {
    let code = "";
    switch (codeText) {
      case "新建": code = "01"; break;
      case "已派发": code = "02"; break;
      case "已转换": code = "03"; break;
      case "已接受": code = "04"; break;
      case "已拒绝": code = "05"; break;

      case "已分配": code = "Z0"; break;
      case "已到店": code = "Z1"; break;
      case "已试乘试驾": code = "Z2"; break;
      case "已跟进": code = "Z7"; break;
      case "已下订": code = "Z8"; break;
      case "已成交": code = "Z9"; break;
      case "战败/流失": code = "ZA"; break;
      case "失效": code = "ZB"; break;

      default: code = "01"; break;
    }
    return code;
  },
  getDriverStatus(statusCode: string): any {
    let status = {
      style: "",
      title: ""
    };
    switch (statusCode) {
      case "01":
        status.style = "deeppink";
        status.title = "已预约";
        break;
      case "02":
        status.style = "deeppink";
        status.title = "已试驾";
        break;
      default:
        break;
    }
    return status;
  },
  getFormatedEnumData(aData: any): Array<any> {
    let enumData = new Array();
    if (aData.length === 0) {
      enumData = [];
    } else {
      _.forEach(aData, function(data, index) {
      if (_.has(data, "Code")) {
          enumData.push({
            "id": index,
            "key": data.Code,
            "value": data.Description
          });
      } else if (_.has(data, "SecondLeadSourceID")) {
          enumData.push({
            "id": index,
            "key": data.SecondLeadSourceID,
            "value": data.SecondLeadSourceDesc
          });
      } else if (_.has(data, "FirstLeadSourceID")) {
          enumData.push({
            "id": index,
            "key": data.FirstLeadSourceID,
            "value": data.FirstLeadSourceDesc,
            "ObjectID": data.ObjectID
          });
      } else if (_.has(data, "CampaignURL")) {
          enumData.push({
            "id": index,
            "key": data.ID,
            "value": data.Description
          });
        }
      });
    }
    return enumData;
  },
  getCarManagementStatus(code: number): any {
    let status = {
      title: ""
    };
    switch (code) {
      case 0:
        status.title = "正常";
        break;
      case 1:
        status.title = "已退役";
        break;
      case 2:
        status.title = "已转售";
        break;
      default:
        break;
    }
    return status;
  },
  getVinCodeLast(code: string): string {
    return code && code.slice(-4) || "";
  },
  formatC4CDateToDate(c4cdate: string, format?: string): string {
    if (c4cdate) {
      if (format) {
        return moment(c4cdate).format(format);
      }

      return moment(c4cdate).format("YYYY-MM-DD HH:MM");
    }
    return "";
  },
  formatDateToC4CDate(date: any): string {
    let timeStamp: number = 0;
    if (_.isNumber(date)) {
      timeStamp *= 1000;
    } else if (_.isString(date)) {
      timeStamp = moment(date).unix();
      timeStamp *= 1000;
    }
    return "/Date" + timeStamp + "/";
  },
  formatC4CUUID(uuid: string): string {
    return _.trim(uuid, "-");
  },
  formatC4CDateToDateStr(str: string): string {
    let timeStamp = parseInt(str.replace(/[^0-9]+/g, ""), 10);
    let localDateString = new Date(timeStamp);
    let year = localDateString.getFullYear();
    let month = localDateString.getMonth() + 1;
    let day = localDateString.getDate();

    return year + "/" + (month < 10 ? ("0" + month) : month) + "/" + (day < 10 ? ("0" + day) : day);
  },
  /**
   * @function
   * @name getIntentPurchaseDate
   * @description lead creation page intent level and intent purchase data convertion logic
   * @param {string} intentLevel - Name of the route
   * @return {string} return purchase date
   */
  getIntentPurchaseDate(intentLevel: string): string {
    let purchaseDate = "";
    switch (intentLevel) {
      case "H":
        purchaseDate = moment().add(7, "days").format("YYYYMMDD");
        break;
      case "A":
        purchaseDate = moment().add(15, "days").format("YYYYMMDD");
        break;
      case "B":
        purchaseDate = moment().add(30, "days").format("YYYYMMDD");
        break;
      default:
        purchaseDate = "无明确时间";
        break;
    }
    return purchaseDate;
  },
  getMetaDataURL(targetName: string): string {
    let url = "";
    switch (targetName) {
      case "activityIntentionLevelList":
        url = Constants.METADTA_LEADACTIVITY_INTENTIONLEVEL_URL;
        break;
      case "activityReason1List":
        url = Constants.METADTA_LEADACTIVITY_REASON1_URL;
        break;
      case "activityReason2List":
        url = Constants.METADTA_LEADACTIVITY_REASON2_URL;
        break;
      case "activityCampaignList":
        url = Constants.ALL_CAMPAIN_LIST_API;
        break;
      case "leadLevelList":
        url = Constants.METADTA_LEAD_LEVELS_ENUM_URL;
        break;
      case "purposeList":
        url = Constants.METADTA_LEAD_PURPOSE_ENUM_URL;
        break;
      case "purchaseTypeList":
        url = Constants.METADTA_LEAD_PURCHASE_TYPE_ENUM_URL;
        break;
      case "purchaseFocusList":
        url = Constants.METADTA_LEAD_PURCHASE_FOCUS_ENUM_URL;
        break;
      default:
        url = Constants.METADTA_LEAD_LEVELS_ENUM_URL;
        break;
    }
    return url;
  },
  getMetaDataList(targetName: string): any {
    if (!GlobalVariable.metadata[targetName].loaded) {
      //TODO 如果加载失败
      //TODO 设置metadataURL
      GlobalVariable.metadata[targetName].loaded = true;
      GlobalVariable.metadata[targetName].data = doXMLHttpRequest(this.getMetaDataURL(targetName));
    }
    return GlobalVariable.metadata[targetName].data;
  },
  formatMobile(mobile: string): string {
    return !mobile ? "" : (mobile.startsWith("0000") ? mobile.substring(49, 61) : mobile);
  },
  formatCreateDateInFilterData(date: string): string {
      var dd = moment(date).format("YYYY-MM-DD");
      var today = moment().format("YYYY-MM-DD");
      var dInWeek = moment().subtract(7, "days").format("YYYY-MM-DD");
      var dInMonth = moment().subtract(1, "months").format("YYYY-MM-DD");
      var dBefore3Month = moment().subtract(3, "months").format("YYYY-MM-DD");
      var option = "";
      if (dd === today)
        option = "当天";
      else if (moment(dd).isBetween(dInWeek, today))
        option = "1周内";
      else if (moment(dd).isBetween(dInMonth, today))
        option = "1个月内";
      else if (moment(dd).isBetween(dBefore3Month, dInMonth)) {
        option = "1-3个月";
      } else if (moment(dd).isBefore(dBefore3Month))
        option = "3个月外";
      else
        option = "3个月外";

      console.log(option);
      return option;
  },
  formatStringWithEllipsis(str: string, len: number): string {
    const resStr: string = str.length > len ? str.substr(0, len) + "..." : str;
    return resStr;
  },
  splitTaskPerDay(list: any, responseData: any, beginDate: any): any {
    var dayFirst = moment(beginDate).format("YYYY-MM-DD");
    var daySecond = moment(beginDate).day(1).format("YYYY-MM-DD");
    var dayThird = moment(beginDate).day(2).format("YYYY-MM-DD");
    var dayFourth = moment(beginDate).day(3).format("YYYY-MM-DD");
    var dayFifth = moment(beginDate).day(4).format("YYYY-MM-DD");
    var daySixth = moment(beginDate).day(5).format("YYYY-MM-DD");
    var daySeventh = moment(beginDate).day(6).format("YYYY-MM-DD");
    _.forEach(responseData, (leadData, index) => {
      let d = moment(leadData.APPActivityDateTime).format("YYYY-MM-DD");
      let lead: ILead = leadData;
      switch (d) {
        case dayFirst: list[0].timeStatus.push(lead); list[0].isReserve = true; break;
        case daySecond: list[1].timeStatus.push(lead); list[1].isReserve = true; break;
        case dayThird: list[2].timeStatus.push(lead); list[2].isReserve = true; break;
        case dayFourth: list[3].timeStatus.push(lead); list[3].isReserve = true; break;
        case dayFifth: list[4].timeStatus.push(lead); list[4].isReserve = true; break;
        case daySixth: list[5].timeStatus.push(lead); list[5].isReserve = true; break;
        case daySeventh: list[6].timeStatus.push(lead); list[6].isReserve = true; break;
        default: break;
      }
    });
    return list;
  }
};
