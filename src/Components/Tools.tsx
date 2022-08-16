import { ArrowClockwise, CheckCircle, PlusCircle } from "react-bootstrap-icons";
import { animated as a, useSpring } from "react-spring";
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
  const height = 45;

  const againStyles = useSpring({
    opacity: again ? 1 : 0,
    height: again ? height : 0,
    paddingTop: again ? 5 : 0,
    paddingBottom: again ? 5 : 0,
  });

  const addStyles = useSpring({
    opacity: name.length !== 0 ? 1 : 0.3,
  });

  const updateStyles = useSpring({
    opacity: update ? 1 : 0,
    height: update ? height : 0,
    paddingTop: update ? 5 : 0,
    paddingBottom: update ? 5 : 0,
  });

  return (
    <StyledToolbox>
      <a.button onClick={() => handleAddActivity(true)} style={againStyles}>
        <ArrowClockwise />
      </a.button>
      <a.button onClick={() => handleAddActivity(false)} style={addStyles}>
        <PlusCircle />
      </a.button>
      <a.button onClick={handleUpdateActivity} style={updateStyles}>
        <CheckCircle />
      </a.button>
    </StyledToolbox>
  );
}
