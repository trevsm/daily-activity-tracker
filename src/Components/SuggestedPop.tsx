import { useMemo } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { similarity } from "../Tools";
import { Activity } from "../Types";

const SuggestedPopContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  max-width: 500px;
  padding: 0 20px;
  overflow: auto;
  margin: 0 auto;
  bottom: 80px;
  display: flex;
`;

const SuggestedItem = styled.div<{ color: string }>`
  overflow: hidden;
  position: relative;
  background-color: white;
  padding: 10px 15px;
  padding-left: 30px;
  border: 1px solid #e4e4e4;
  margin: 5px 5px 0 0;
  border-radius: 100px;
  min-width: fit-content;
  &::after {
    content: "";
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    border-radius: 100%;
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    background-color: ${(props) => props.color};
  }
`;

export function SuggestedPop({
  activities,
  name,
  setSelectedActivity,
}: {
  activities: Activity[];
  name: string;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity>>;
}) {
  const usedActivities = useRef<Activity[]>([]);

  const suggestedActivities = useMemo(() => {
    usedActivities.current = [];
    return activities.map((activity) => {
      if (
        name.length !== 0 &&
        activity.name !== name &&
        !usedActivities.current.some(
          ({ collectionId }) => collectionId == activity.collectionId
        ) &&
        (activity.name.includes(name) || similarity(activity.name, name)) >=
          0.85
      ) {
        usedActivities.current = [...usedActivities.current, activity];
        return (
          <SuggestedItem
            key={activity.id}
            onClick={() => setSelectedActivity(activity)}
            color={activity.color}
          >
            {activity.name}
          </SuggestedItem>
        );
      }
    });
  }, [name]);

  return <SuggestedPopContainer>{suggestedActivities}</SuggestedPopContainer>;
}
