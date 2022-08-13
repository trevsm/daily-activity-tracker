import styled from "styled-components";
import { collectionMemberCount } from "../Tools";
import { Activity } from "../Types";
import { v4 as uuid } from "uuid";

const ATools = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  bottom: 5px;
  display: flex;
  button {
    font-size: 15px;
    background-color: white;
    border-radius: 5px;
    height: 100%;
    max-height: 33px;
    padding: 5px 8px;
    border: 1px solid #e1e1e1;
    cursor: pointer;
  }
`;

const Vr = styled.div`
  display: inline-block;
  height: 100%;
  margin: 0 5px;
  border-right: 1px solid #acacac;
`;

interface ItemToolsProps {
  activity: Activity;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
}

export default function ItemTools({
  activity,
  activities,
  setActivities,
  setSelectedActivity,
}: ItemToolsProps) {
  const deleteActivity = (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      setActivities(activities.filter((activity) => activity.id !== id));
      setTimeout(() => setSelectedActivity(null));
    }
  };

  const deleteAllInCollection = (collectionId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete all activities in this collection?"
      )
    ) {
      setActivities(
        activities.filter((activity) => activity.collectionId !== collectionId)
      );
      setTimeout(() => setSelectedActivity(null));
    }
  };

  const exitCollection = (id: string) => {
    if (window.confirm("Are you sure you want to exit this collection?")) {
      setActivities(
        activities.map((activity) => {
          if (activity.id === id) {
            const collectionId = uuid();
            return { ...activity, collectionId };
          }
          return activity;
        })
      );
    }
  };

  return (
    <ATools>
      <button onClick={() => deleteActivity(activity.id)}>delete</button>
      {collectionMemberCount(activity.collectionId, activities) > 1 && (
        <>
          <Vr />
          <button
            style={{ marginRight: "5px" }}
            onClick={() => deleteAllInCollection(activity.collectionId)}
          >
            delete all
          </button>
          <button
            onClick={() => {
              exitCollection(activity.id);
            }}
          >
            detach
          </button>
        </>
      )}
    </ATools>
  );
}
