import { useMemo } from "react";
import styled from "styled-components";
import { collectionMemberCount, formatAMPM, prettyDate, Time } from "../Tools";
import { Activity } from "../Types";
import { v4 as uuid } from "uuid";

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
`;

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

const Vr = styled.div`
  display: inline-block;
  height: 100%;
  margin: 0 5px;
  border-right: 1px solid #acacac;
`;

export default function ActivityList({
  activities,
  setActivities,
  selectedActivity,
  setSelectedActivity,
  setSelectedElem,
}: {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  selectedActivity: Activity | null;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  setSelectedElem: React.Dispatch<React.SetStateAction<HTMLLIElement | null>>;
}) {
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

  const activityList = useMemo(() => {
    return activities.map((activity, index) => {
      const date = prettyDate(activity.time);
      const prevDate: null | string =
        index !== 0 ? prettyDate(activities[index - 1]?.time) : null;

      const time = formatAMPM(activity.time);
      const prevTime: null | Time =
        index !== 0 ? formatAMPM(activities[index - 1]?.time) : null;
      return (
        <>
          {date !== prevDate && (
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
            onClick={(e: React.MouseEvent<HTMLLIElement>) => {
              setSelectedElem(e.target as HTMLLIElement);
              setSelectedActivity(activity);
            }}
          >
            <div style={{ marginRight: "10px", wordBreak: "break-word" }}>
              {activity.name}
            </div>
            <div
              style={{
                minWidth: "fit-content",
                display: "grid",
                alignItems: "center",
              }}
            >
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
              <ATools>
                <button onClick={() => deleteActivity(activity.id)}>
                  delete
                </button>
                {collectionMemberCount(activity.collectionId, activities) >
                  1 && (
                  <>
                    <Vr />
                    <button
                      style={{ marginRight: "5px" }}
                      onClick={() =>
                        deleteAllInCollection(activity.collectionId)
                      }
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
            )}
          </AItem>
        </>
      );
    });
  }, [activities, selectedActivity]);

  return <StyledActivityList>{activityList}</StyledActivityList>;
}
