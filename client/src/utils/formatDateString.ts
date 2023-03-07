export default function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  const monthNumber = getMonthNumber(date);
  const year = getLastTwoDigitsOfYear(date);
  return `${dayOfMonth}/${monthNumber}/${year}`;
}

function getMonthNumber(date: Date) {
  const monthOffset = 1;
  return date.getMonth() + monthOffset;
}

function getLastTwoDigitsOfYear(date: Date) {
  const fullYearStr = date.getFullYear().toString();
  const fullYearSplit = fullYearStr.split("");
  const lastTwoDigitsString = `${fullYearSplit[2]}${fullYearSplit[3]}`;
  return lastTwoDigitsString;
}
