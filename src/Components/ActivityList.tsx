import { useMemo } from "react";
import styled from "styled-components";
import { useActivities } from "../stores/useActivities";
import { formatAMPM, prettyDate, sortByTime, Time } from "../Tools";
import ItemTools from "./ItemTools";

const StyledActivityList = styled.ul`
  pointer-events: none;
  position: relative;
  list-style: none;
  padding: 0;
`;

interface ActivityItemProps {
  selected: {
    collection: boolean;
    id: boolean;
  };
  color: string;
}

const AItem = styled.li<ActivityItemProps>`
  pointer-events: auto;
  position: relative;
  padding: 10px;
  margin: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  background-color: ${({ selected: { collection }, color }) =>
    collection ? `${color}30` : "#fff"};
  border-left: ${({ color }) => "5px solid " + color};
  user-select: none;
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
  .activityName {
    margin-right: 10px;
    word-break: break-word;
  }
  .fullTime {
    min-width: fit-content;
    display: grid;
    align-items: center;
  }
`;

const DailyHeader = styled.div`
  margin-bottom: 25px;
  h1 {
    font-size: 25px;
    font-weight: 300;
  }
`;

const Hr = styled.hr`
  border: unset;
  border-bottom: 1px solid #f3f3f3;
`;

export default function ActivityList() {
  const { activities, selectedActivity, setSelectedActivity } = useActivities();

  const activityList = useMemo(() => {
    return activities.sort(sortByTime).map((activity, index) => {
      const date = prettyDate(activity.time);
      const prevDate: null | string =
        index !== 0 ? prettyDate(activities[index - 1]?.time) : null;

      const time = formatAMPM(activity.time);
      const prevTime: null | Time =
        index !== 0 ? formatAMPM(activities[index - 1]?.time) : null;

      const isCurrentDate = date === prevDate;

      return (
        <div key={index}>
          {!isCurrentDate && (
            <DailyHeader style={{ marginTop: index !== 0 ? "50px" : 0 }}>
              <h1>{date}</h1>
              <Hr />
            </DailyHeader>
          )}
          <AItem
            selected={{
              collection:
                activity.collectionId === selectedActivity?.collectionId,
              id: activity.id === selectedActivity?.id,
            }}
            color={activity.color}
            key={activity.id}
            onClick={() => {
              setSelectedActivity(activity);
            }}
          >
            <div className="activityName">{activity.name}</div>
            <div className="fullTime">
              {!prevTime || time.minutes !== prevTime.minutes ? (
                <span className="full">
                  {time.hours}:{time.minutes}{" "}
                  <span className="seconds">{time.seconds}</span>{" "}
                </span>
              ) : (
                <span className="seconds">{time.seconds}</span>
              )}
            </div>
            {selectedActivity && activity.id === selectedActivity.id && (
              <ItemTools />
            )}
          </AItem>
        </div>
      );
    });
  }, [activities, selectedActivity]);

  return <StyledActivityList>{activityList}</StyledActivityList>;
}
