import { useMemo } from "react";
import styled from "styled-components";

const StyledActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

interface ActivityItemProps {
  selected: {
    family: boolean;
    id: boolean;
  };
}

const AItem = styled.li<ActivityItemProps>`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  background-color: ${({ selected: { family } }) =>
    family ? "#c3c3c342" : "#fff"};
  border-left: ${({ selected: { id } }) => (id ? "5px solid #6f8ca2" : "")};
`;

const Hr = styled.hr`
  border: unset;
  border-bottom: 1px solid #dddddd;
`;

export default function ActivityList({
  activities,
  selectedActivity,
  setSelectedActivity,
}: {
  activities: Activity[];
  selectedActivity: Activity | null;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
}) {
  const activityList = useMemo(() => {
    return activities.map((activity, index) => {
      return (
        <>
          <AItem
            selected={{
              family: activity.familyId === selectedActivity?.familyId,
              id: activity.id === selectedActivity?.id,
            }}
            key={activity.id}
            onClick={() => {
              setSelectedActivity(activity);
            }}
          >
            {activity.name}
          </AItem>
          {index !== activities.length - 1 && <Hr />}
        </>
      );
    });
  }, [activities, selectedActivity]);

  return <StyledActivityList>{activityList}</StyledActivityList>;
}
