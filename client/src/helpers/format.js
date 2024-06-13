import { isDate, formatISO, format, parseISO } from "date-fns";

export const formatSsn = (ssn) =>
  !!ssn
    ? ssn
        .replace(/[^0-9]/g, "")
        .split(/(\d{3})(\d{3})(\d{3})(\d+)/)
        .filter((e) => !!e)
        .reduce(
          (a, e, i) => (!!a ? (i === 3 ? `${a} ${e}` : `${a}-${e}`) : e),
          ""
        )
    : "";

export const formatName = (val) =>
  typeof val === "string"
    ? val[0].toUpperCase() + val.slice(1).toLowerCase()
    : "";

export const isDateString = (val) =>
  /[0-3]{0,1}\d[\-\.\/,][0-1]{0,1}\d[\-\.\/,][1,2][0,9]\d\d/.test(val);

export const getDateFromString = (val) => {
  if (isDateString(val)) {
    let [, day, month, year] = val.match(
      /([0-3]{0,1}\d)[\-\.\/,]([0-1]{0,1}\d)[\-\.\/,]([1,2][0,9]\d\d)/
    );
    return isDate(new Date(year, month - 1, day))
      ? formatISO(new Date(year, month - 1, day), { representation: "date" })
      : "";
  } else {
    return "";
  }
};

export const normaliseDate = (val) => {
  if (!val || !val.includes("-")) return val;
  return val.split("T")[0].split("-").reverse().join(".");
};

export const normalizeTimeStamp = (value) =>
  !!value ? format(parseISO(value), "dd.MM.yyyy HH:mm") : "";

export const formatDate = (dateString) => {
  if (!!dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  } else {
    return "";
  }
};

const getQueryFromString = (val) =>
  val
    .split(/\s+/)
    .filter((e) => /[А-Яа-я\-]{2,}/.test(e))
    .join(" ");

export const floatFormat = (val, row, digits = 2) =>
  parseFloat(val) ? parseFloat(val).toFixed(digits) : 0;

export const costRound = (val) => {
  return isNaN(val) ? "0.00" : (Math.round(+val * 100) / 100).toFixed(2);
};

/**
 * Поиск ближайшего значения в массиве
 * @param array
 * @param target
 * @returns {*}
 */
export const closest = (array, target) => {
  // console.log(array, target)
  return array.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
};
