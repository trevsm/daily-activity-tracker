import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { familyMemberCount } from "../Tools";
import { SuggestedPop } from "./SuggestedPop";

export default function UserInput({
  selectedActivity,
  setSelectedActivity,
  activities,
  setActivities,
}: {
  selectedActivity: Activity | null;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}) {
  const [name, setName] = useState<string>("");
  const [isChangedName, setIsChangedName] = useState<boolean>(false);

  const handleAddActivity = (useSameId: boolean) => {
    if (name.length === 0) return;
    const id = uuid();

    let familyId = uuid();
    if (selectedActivity && useSameId) {
      familyId = selectedActivity.familyId;
    }

    setActivities((prev) => [
      ...prev,
      { id, familyId, name, time: new Date() },
    ]);
    setSelectedActivity(null);
    setName("");
  };

  const handleUpdateActivity = () => {
    if (selectedActivity) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.familyId === selectedActivity.familyId
            ? { ...activity, name: name }
            : activity
        )
      );
      setSelectedActivity(null);
      setName("");
    }
  };

  const Tools = () => {
    return (
      <div>
        <button onClick={() => handleAddActivity(false)}>+ New</button>
        {!isChangedName && selectedActivity && (
          <button onClick={() => handleAddActivity(true)}>+ Same</button>
        )}
        {selectedActivity && (
          <>
            <button onClick={handleUpdateActivity}>
              Update
              {familyMemberCount(selectedActivity.familyId, activities) > 1
                ? " All"
                : ""}
            </button>
          </>
        )}
      </div>
    );
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !selectedActivity) handleAddActivity(false);
  };

  useEffect(() => {
    if (selectedActivity) {
      setName(selectedActivity.name);
      setIsChangedName(false);
    }
  }, [selectedActivity]);

  return (
    <div>
      {!selectedActivity && <SuggestedPop {...{ activities, name, setName }} />}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyDown={(e) => {
          setIsChangedName(true);
          handleKeyPress(e);
        }}
      />
      <Tools />
    </div>
  );
}
