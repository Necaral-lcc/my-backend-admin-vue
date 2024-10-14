import moment from "moment";

export const getUtc = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() / 60;
  return Math.floor(offset);
};

export const getUtcTime = (date: string) =>
  moment(date).utc().format("YYYY-MM-DD HH:mm:ss");
