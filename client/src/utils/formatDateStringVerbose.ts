export default function formatDateStringVerbose(dateStr: string) {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();
  const month = getMonth(date);
  const year = date.getFullYear();
  return `${month} ${dayOfMonth}, ${year}`;
}

function getMonth(date: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[date.getMonth()];
}
