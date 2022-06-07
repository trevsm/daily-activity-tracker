import { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { familyMemberCount } from "../Tools";
import { SuggestedPop } from "./SuggestedPop";

const InputContainer = styled.div<{ toolboxWidth: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  margin: 15px;
  input {
    padding: 10px;
    padding-left: 20px;
    padding-right: ${(props) => props.toolboxWidth + 10}px;
    font-size: 20px;
    width: 100%;
    border-radius: 50px;
    border: 1px solid #e4e4e4;
    box-shadow: 1px 3px 4px -3px #969696;
    color: #434343;
    &:focus-visible {
      outline: 2px solid #e1f2ff;
    }
  }
`;

const ToolContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const IconButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  box-shadow: 1px 1px 6px -4px black;
  border-radius: 50px;
  padding: 5px 10px;
  svg {
    width: 100%;
    height: 100%;
    fill: #656565;
  }
`;

export default function UserInput({
  selectedActivity,
  setSelectedActivity,
  activities,
  setActivities,
}: {
  selectedActivity: Activity | null;
  setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}) {
  const [name, setName] = useState<string>("");
  const [toolboxWidth, setToolboxWidth] = useState<number>(0);
  const [isChangedName, setIsChangedName] = useState<boolean>(false);

  const handleAddActivity = (useSameId: boolean) => {
    if (name.length === 0) return;
    const id = uuid();

    let familyId = uuid();
    if (selectedActivity && useSameId) {
      familyId = selectedActivity.familyId;
    }

    setActivities((prev) => [
      ...prev,
      { id, familyId, name, time: new Date() },
    ]);
    setSelectedActivity(null);
    setName("");
  };

  const handleUpdateActivity = () => {
    if (selectedActivity) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.familyId === selectedActivity.familyId
            ? { ...activity, name: name }
            : activity
        )
      );
      setSelectedActivity(null);
      setName("");
    }
  };

  const toolRef = useRef<HTMLDivElement>(null);

  const Tools = () => {
    return (
      <ToolContainer ref={toolRef}>
        <IconButton
          onClick={() => handleAddActivity(false)}
          style={{ marginRight: selectedActivity ? "5px" : 0 }}
        >
          + New
        </IconButton>
        {!isChangedName && selectedActivity && (
          <IconButton onClick={() => handleAddActivity(true)}>
            + Repeat
          </IconButton>
        )}
        {isChangedName && selectedActivity && (
          <>
            <IconButton onClick={handleUpdateActivity}>
              Update
              {familyMemberCount(selectedActivity.familyId, activities) > 1
                ? " All"
                : ""}
            </IconButton>
          </>
        )}
      </ToolContainer>
    );
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !selectedActivity) handleAddActivity(false);
  };

  useEffect(() => {
    if (selectedActivity) {
      setName(selectedActivity.name);
      setIsChangedName(false);
    }
  }, [selectedActivity]);

  useEffect(() => {
    if (toolRef.current.clientWidth !== toolboxWidth)
      setToolboxWidth(toolRef.current?.clientWidth || 0);
  });

  return (
    <>
      {!selectedActivity && <SuggestedPop {...{ activities, name, setName }} />}
      <InputContainer toolboxWidth={toolboxWidth}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(e) => {
            setIsChangedName(true);
            handleKeyPress(e);
          }}
        />
        <Tools />
      </InputContainer>
    </>
  );
}
