import { useMemo } from "react";
import styled from "styled-components";
import { formatAMPM } from "../Tools";

const StyledActivityList = styled.ul`
  position: relative;
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
  display: flex;
  justify-content: space-between;
  background-color: ${({ selected: { family } }) =>
    family ? "#f0f8ff" : "#fff"};
  border-left: ${({ selected: { id } }) => (id ? "5px solid #abdbff" : "")};
  .seconds,
  .full {
    color: #838383;
    font-weight: 300;
  }
  .seconds {
    font-size: 13px;
    display: inline-block;
    line-height: 15px;
  }
`;

const Hr = styled.hr`
  border: unset;
  border-bottom: 1px solid #f3f3f3;
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
      const time = formatAMPM(activity.time);
      const prevTime =
        index !== 0
          ? formatAMPM(activities[index - 1]?.time)
          : { minutes: 0, ampm: "" };
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
            <div>{activity.name}</div>
            <div>
              {time.minutes !== prevTime.minutes || index == 0 ? (
                <span className="full">
                  {time.hours}:{time.minutes}{" "}
                  <span className="seconds">{time.seconds}</span>{" "}
                  {time.ampm !== prevTime.ampm && time.ampm.toUpperCase()}
                </span>
              ) : (
                <span className="seconds">{time.seconds}</span>
              )}
            </div>
          </AItem>
          {index !== activities.length - 1 && <Hr />}
        </>
      );
    });
  }, [activities, selectedActivity]);

  return <StyledActivityList>{activityList}</StyledActivityList>;
}
