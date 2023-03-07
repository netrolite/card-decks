import { getTime } from "./formatDateString";

export default function formatDateStringVerbose(dateStr: string) {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();
  const month = getMonth(date);
  const year = date.getFullYear();
  const time = getTime(date);
  return `${month}, ${dayOfMonth}, ${year} at ${time}`;
}

function getMonth(date: Date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[date.getMonth()];
}
