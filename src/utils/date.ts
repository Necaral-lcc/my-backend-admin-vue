import moment from "moment";

/**
 * 获取当前时区的UTC偏移量
 * @returns
 */
export const getUtc = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;
  return 0 - Math.floor(offset);
};

/**
 * 获取当前时间的UTC时间
 * @param date 时间字符串
 * @returns
 */
export const getUtcTime = (date: string) =>
  moment(date).utc().format("YYYY-MM-DD HH:mm:ss");

/**
 * UTC时间转本地时间
 * @param date 时间字符串
 * @returns
 */
export const utcToLocalTime = (date: string) => {
  const utc = moment.utc(date);
  const local = utc.clone().utcOffset(getUtc());
  return local.format("YYYY-MM-DD HH:mm:ss");
};

/**
 * 本地时间转UTC时间
 * @param date 时间字符串
 * @returns
 */
export const localToUtcTime = (date: string) => {
  const local = moment(date);
  const utc = local.clone().utcOffset(0);
  return utc.format("YYYY-MM-DD HH:mm:ss");
};
