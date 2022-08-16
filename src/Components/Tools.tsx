import { useEffect, useState } from "react";
import { ArrowClockwise, CheckCircle, PlusCircle } from "react-bootstrap-icons";
import { animated as a, useSpring } from "react-spring";
import styled from "styled-components";
import { Activity } from "../Types";

const StyledToolbox = styled.div`
  pointer-events: auto;
  width: 0;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  button {
    color: #656565;
    background-color: white;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    font-size: 35px;
    opacity: 1;
    width: 35px;
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
  const [again, setAgain] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setAgain(selectedActivity && selectedActivity.name == name && name != null);
    setUpdate(selectedActivity && selectedActivity.name !== name);
  }, [name]);

  const height = 35;

  const againStyles = useSpring({
    opacity: again ? 1 : 0,
    height: again ? height : 0,
    marginTop: again ? 5 : 0,
    marginBottom: again ? 5 : 0,
  });

  const addStyles = useSpring({
    color: name?.length !== 0 ? "#656565" : "#e0e0e0",
  });

  const updateStyles = useSpring({
    opacity: update ? 1 : 0,
    height: update ? height : 0,
    marginTop: update ? 5 : 0,
    marginBottom: update ? 5 : 0,
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
