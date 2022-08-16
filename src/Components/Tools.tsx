import { ArrowClockwise, CheckCircle, PlusCircle } from "react-bootstrap-icons";
import styled from "styled-components";
import { Activity } from "../Types";

const StyledToolbox = styled.div`
  width: 0;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  button {
    display: flex;
    padding: 5px;
    font-size: 35px;
    opacity: 1;
    &:disabled {
      opacity: 0.3;
    }
  }
`;

export function Tools({
  selectedActivity,
  name,
  handleAddActivity,
  handleUpdateActivity,
}: {
  selectedActivity: Activity;
  name: string;
  handleAddActivity: (useSameId: boolean) => void;
  handleUpdateActivity: () => void;
}) {
  const again = selectedActivity && selectedActivity.name == name;
  const update = selectedActivity && selectedActivity.name !== name;

  return (
    <StyledToolbox>
      {again && (
        <button onClick={() => handleAddActivity(true)}>
          <ArrowClockwise />
        </button>
      )}
      <button onClick={() => handleAddActivity(false)} disabled={name === ""}>
        <PlusCircle />
      </button>
      {update && (
        <button onClick={handleUpdateActivity}>
          <CheckCircle />
        </button>
      )}
    </StyledToolbox>
  );
}
