import { useMemo } from "react";
import styled from "styled-components";

const StyledActivityList = styled.ul`
  list-style: none;
  width: fit-content;
  padding: 0;
`;

interface ActivityItemProps {
  selected: {
    family: boolean;
    id: boolean;
  };
}
const AItem = styled.li<ActivityItemProps>`
  padding: 5px;
  cursor: pointer;
  margin-bottom: 5px;
  width: fit-content;
  background-color: ${({ selected: { family } }) =>
    family ? "#51e28242" : "#fff"};
  border-left: ${({ selected: { id } }) => (id ? "5px solid #51e282" : "")};
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
    return activities.map((activity) => {
      console.log(activity, selectedActivity);

      return (
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
      );
    });
  }, [activities, selectedActivity]);

  return <StyledActivityList>{activityList}</StyledActivityList>;
}
