export default function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  const monthNumber = getMonthNumber(date);
  const year = getLastTwoDigitsOfYear(date);
  const time = getTime(date);
  return `${dayOfMonth}/${monthNumber}/${year} at ${time}`;
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

export function getTime(date: Date) {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();
  if (Number(hours) < 10) hours = `0${hours}`;
  if (Number(minutes) < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
}
