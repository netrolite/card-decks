interface ISecondsPerTimeUnit {
  [key: string]: number
}

export default function timeElapsedSinceDate(date: Date) {
  const now = new Date().getTime();
  const then = date.getTime();
  const secondsElapsed = Math.floor((now - then) / 1000);
  
  const secondsPerTimeUnit: ISecondsPerTimeUnit = {
    year: 31536000,
    month: 2628288,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }

  for (const timeUnit in secondsPerTimeUnit) {
    const timeUnitsElapsed = Math.floor(secondsElapsed / secondsPerTimeUnit[timeUnit]);
    if (timeUnitsElapsed > 0) {
      return `${timeUnitsElapsed} ${timeUnit + (timeUnitsElapsed > 1 ? "s" : "")}`;
    }
  }
}
