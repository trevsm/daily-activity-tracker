import styled from "styled-components";
import { collectionMemberCount, stringTime } from "../Tools";
import { useActivities } from "../stores/useActivities";

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
    margin-right: 5px;
  }
  .time {
    position: relative;
    pointer-events: none;
    user-select: none;
    input {
      pointer-events: all;
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 100%;
      max-width: 23px;
      transform: scaleX(2) translateX(30%);
    }
  }
`;

export default function ItemTools() {
  const {
    selectedActivity,
    activities,
    deleteActivity: da,
    deleteAllInCollection: dac,
    exitCollection: ec,
    changeTime: ct,
  } = useActivities();

  const deleteActivity = (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      da(id);
    }
  };

  const deleteAllInCollection = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all activities in this collection?"
      )
    ) {
      dac(selectedActivity.collectionId);
    }
  };

  const exitCollection = () => {
    if (window.confirm("Are you sure you want to exit this collection?")) {
      ec(selectedActivity.id);
    }
  };

  const setTime = (time: Date) => {
    if (window.confirm("Are you sure you want to change the time?")) {
      ct(selectedActivity.id, time);
    }
  };

  return (
    <ATools>
      <button onClick={() => deleteActivity(selectedActivity.id)}>
        delete
      </button>
      {collectionMemberCount(selectedActivity.collectionId, activities) > 1 && (
        <>
          <button onClick={deleteAllInCollection}>delete all</button>
          <button onClick={exitCollection}>detach</button>
        </>
      )}
      <label htmlFor="time" className="time">
        <button>time</button>
        <input
          type="datetime-local"
          value={stringTime(selectedActivity.time)}
          onChange={(e) => setTime(new Date(e.currentTarget.value))}
        />
      </label>
    </ATools>
  );
}
