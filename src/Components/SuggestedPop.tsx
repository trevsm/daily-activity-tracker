import { useMemo } from "react";
import { useRef } from "react";
import { similarity } from "../Tools";
import { Activity } from "../Types";

export function SuggestedPop({
  activities,
  name,
  setName,
}: {
  activities: Activity[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const usedNames = useRef<string[]>([]);

  const suggestedActivities = useMemo(() => {
    usedNames.current = [];
    return activities.map((activity) => {
      if (
        name.length !== 0 &&
        activity.name !== name &&
        !usedNames.current.includes(activity.name) &&
        (activity.name.includes(name) || similarity(activity.name, name)) >=
          0.85
      ) {
        usedNames.current = [...usedNames.current, activity.name];
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
