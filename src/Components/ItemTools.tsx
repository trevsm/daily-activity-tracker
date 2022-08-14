import styled from "styled-components";
import { collectionMemberCount } from "../Tools";
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
  }
`;

const Vr = styled.div`
  display: inline-block;
  height: 100%;
  margin: 0 5px;
  border-right: 1px solid #acacac;
`;

export default function ItemTools() {
  const {
    selectedActivity,
    activities,
    deleteActivity: da,
    deleteAllInCollection: dac,
    exitCollection: ec,
  } = useActivities();

  const deleteActivity = (id: string) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      da(id);
    }
  };

  const deleteAllInCollection = (collectionId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete all activities in this collection?"
      )
    ) {
      dac(collectionId);
    }
  };

  const exitCollection = (id: string) => {
    if (window.confirm("Are you sure you want to exit this collection?")) {
      ec(id);
    }
  };

  return (
    <ATools>
      <button onClick={() => deleteActivity(selectedActivity.id)}>
        delete
      </button>
      {collectionMemberCount(selectedActivity.collectionId, activities) > 1 && (
        <>
          <Vr />
          <button
            style={{ marginRight: "5px" }}
            onClick={() => deleteAllInCollection(selectedActivity.collectionId)}
          >
            delete all
          </button>
          <button
            onClick={() => {
              exitCollection(selectedActivity.id);
            }}
          >
            detach
          </button>
        </>
      )}
    </ATools>
  );
}
