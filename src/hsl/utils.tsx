
export function getCurrentSecondsFromMidnight(midnight: Date, now: Date) {
  return (now.getTime() - midnight.getTime()) / 1000;
}

export const arrivalTimeTextFactory = (midnight: Date, now: Date) => {
  const diffSeconds = getCurrentSecondsFromMidnight(midnight, now);
  return (scheduledArrival: number) => {
    return [
      new Intl.RelativeTimeFormat("en", { style: "long" }).format(
        Math.max(Math.ceil((scheduledArrival - diffSeconds) / 60), 0),
        "minute"
      ),
      new Date(midnight.getTime() + scheduledArrival * 1000).toLocaleTimeString(
        "en",
        {
          timeStyle: "short",
          hour12: false,
        }
      )
    ] as [seconds: string, time: string];
  };
};

export function getMidnight() {
  const midnight = new Date();
  midnight.setHours(0);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);

  return midnight;
}