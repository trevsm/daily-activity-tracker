import { useState } from "react";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  return (
    <div>
      <ActivityList
        {...{ activities, selectedActivity, setSelectedActivity }}
      />
      <UserInput
        {...{
          activities,
          setActivities,
          selectedActivity,
          setSelectedActivity,
        }}
      />
    </div>
  );
}
