import { useMemo } from "react";
import { useRef } from "react";
import { similarity } from "../Tools";

export function SuggestedPop({
  activities,
  name,
  setName,
}: {
  activities: Activity[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const usedIds = useRef<string[]>([]);

  const suggestedActivities = useMemo(() => {
    usedIds.current = [];
    return activities.map((activity) => {
      if (
        name.length !== 0 &&
        activity.name !== name &&
        !usedIds.current.includes(activity.id) &&
        (activity.name.includes(name) || similarity(activity.name, name)) >=
          0.85
      ) {
        usedIds.current = [...usedIds.current, activity.id];
        return (
          <div key={activity.id} onClick={() => setName(activity.name)}>
            {activity.name} <button>^</button>
          </div>
        );
      }
    });
  }, [name]);

  return <div>{suggestedActivities}</div>;
}
