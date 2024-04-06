import { format } from "date-fns";

export const getCurrentDate = () => {
  return format(new Date(), "dd.MM.yyyy");
};

export const getCurrentYear = () => {
  const _currentDate = new Date();
  return _currentDate.getFullYear();
};

export const getCurrentDateTimeText = () => {
  const _currentDate = new Date();
  return format(_currentDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

export const validateMonthBeforeCurrent = (date) => {
  const _currentDate = new Date(new Date().toDateString());
  _currentDate.setMonth(_currentDate.getMonth() - 1);
  const _inputDate = new Date(date.split(".").reverse().join("-"));
  return _currentDate <= _inputDate;
};
