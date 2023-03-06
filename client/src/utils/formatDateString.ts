export default function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const dayOfMonth = getDayOfMonth(date);
  const monthNumber = getMonthNumber(date);
  const year = getLastTwoDigitsOfYear(date);
  const time = getTime(date);
  return `${dayOfMonth}/${monthNumber}/${year} at ${time}`;
}

function getDayOfMonth(date: Date) {
  return date.getDate();
}

function getMonthNumber(date: Date) {
  const monthOffset = 1;
  return date.getMonth() + monthOffset;
}

function getLastTwoDigitsOfYear(date: Date) {
  const fullYear = date.getFullYear();
  const fullYearSplit = fullYear.toString().split("");
  const lastTwoDigitsString = `${fullYearSplit[2]}${fullYearSplit[3]}`;
  return Number(lastTwoDigitsString);
}

function getTime(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}