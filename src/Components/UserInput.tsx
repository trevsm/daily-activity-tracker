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

  background-color: pink;

  max-width: 500px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 10px;
  input {
    padding: 5px;
    padding-right: ${(props) => props.toolboxWidth}px;
    font-size: 20px;
    width: 100%;
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
        <button onClick={() => handleAddActivity(false)}>+ New</button>
        {!isChangedName && selectedActivity && (
          <button onClick={() => handleAddActivity(true)}>+ Same</button>
        )}
        {selectedActivity && (
          <>
            <button onClick={handleUpdateActivity}>
              Update
              {familyMemberCount(selectedActivity.familyId, activities) > 1
                ? " All"
                : ""}
            </button>
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
