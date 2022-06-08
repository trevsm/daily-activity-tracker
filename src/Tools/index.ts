import { Activity } from "../Types";

export function collectionMemberCount(
  collectionId: string,
  activities: Activity[]
): number {
  return activities.filter((a) => a.collectionId === collectionId).length;
}

export function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = new Array<number>();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export function similarity(s1: string, s2: string) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

export interface Time {
  hours: number;
  minutes: string | number;
  ampm: string;
  seconds: string;
}

export function formatAMPM(dateString: string): Time {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const nextMinutes = minutes < 10 ? "0" + minutes : minutes;
  return {
    hours,
    minutes: nextMinutes,
    ampm,
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function prettyDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
