import { useEffect, useRef } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { collectionMemberCount, scrollBottom } from "../Tools";
import { SuggestedPop } from "./SuggestedPop";
import { useActivities } from "../stores/useActivities";
import styled from "styled-components";

const pad = "15px";
const InputContainer = styled.div<{ toolboxWidth: number }>`
  position: fixed;
  bottom: ${pad};
  left: ${pad};
  right: ${pad};
  max-width: 500px;
  display: flex;
  margin: 0 auto;
  .name {
    width: 100%;
    padding: 10px;
    padding-left: 20px;
    padding-right: ${(props) => props.toolboxWidth + 10}px;
    border-radius: 50px;
  }
  .color {
    margin-right: 10px;
    border-radius: 100%;
    position: relative;
    display: block;
    padding: 3px;
    border: 1px solid #e4e4e4;
    background-color: white;
    .inner,
    input {
      pointer-events: none;
    }
    input {
      opacity: 0;
    }
    .inner {
      height: 100%;
      border-radius: 100%;
    }
  }
  input {
    font-size: 20px;
    border: 1px solid #e4e4e4;
    color: #434343;
    &:focus-visible {
      outline: none;
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
  border-radius: 50px;
  padding: 5px 10px;
  svg {
    width: 100%;
    height: 100%;
    fill: #656565;
  }
`;

export default function UserInput() {
  const [name, setName] = useState<string>("");
  const initialColor = "#9e9e9e";
  const [color, setColor] = useState<string>(initialColor);
  const [toolboxWidth, setToolboxWidth] = useState<number>(0);
  const [isChangedName, setIsChangedName] = useState<boolean>(false);
  const { setSelectedActivity, selectedActivity, setActivities, activities } =
    useActivities();

  const resetState = () => {
    setSelectedActivity(null);
    setName("");
    setColor(initialColor);
  };

  const handleAddActivity = (useSameId: boolean) => {
    if (name.length === 0) return;
    const id = uuid();

    let collectionId = uuid();
    if (selectedActivity && useSameId) {
      collectionId = selectedActivity.collectionId;
    }

    setActivities((prev) => [
      ...prev,
      { id, collectionId, name, time: new Date(), color },
    ]);

    setTimeout(() => window.scrollBy(0, document.body.scrollHeight));
    resetState();
  };

  const handleUpdateActivity = () => {
    if (selectedActivity) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.collectionId === selectedActivity.collectionId
            ? { ...activity, name: name, color }
            : activity
        )
      );
    }
  };

  const toolRef = useRef<HTMLDivElement>(null);

  const Tools = () => {
    return (
      <ToolContainer ref={toolRef}>
        <IconButton
          onClick={() => handleAddActivity(false)}
          style={{ marginRight: selectedActivity ? "5px" : 0 }}
          disabled={name.length == 0}
        >
          + New
        </IconButton>

        {!isChangedName && selectedActivity && (
          <IconButton onClick={() => handleAddActivity(true)}>
            + Again
          </IconButton>
        )}
        {isChangedName && selectedActivity && (
          <>
            <IconButton
              onClick={handleUpdateActivity}
              disabled={name.length == 0}
            >
              Update
              {collectionMemberCount(
                selectedActivity.collectionId,
                activities
              ) > 1
                ? " All"
                : ""}
            </IconButton>
          </>
        )}
      </ToolContainer>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !selectedActivity) handleAddActivity(false);
  };

  useEffect(() => {
    if (selectedActivity) {
      setName(selectedActivity.name);
      setColor(selectedActivity.color);
      setIsChangedName(false);
      return;
    }
    resetState();
  }, [selectedActivity]);

  useEffect(() => {
    if (toolRef.current.clientWidth !== toolboxWidth)
      setToolboxWidth(toolRef.current?.clientWidth || 0);
  });

  return (
    <>
      {!selectedActivity && (
        <SuggestedPop {...{ activities, name, setName, setSelectedActivity }} />
      )}
      <InputContainer
        toolboxWidth={toolboxWidth}
        onClick={() => {
          if (!selectedActivity) scrollBottom();
        }}
      >
        <label
          className="color"
          style={{
            height: toolRef.current?.offsetHeight + "px",
            width: toolRef.current?.offsetHeight + "px",
          }}
        >
          <div style={{ background: color }} className="inner">
            <input
              type="color"
              list="presets"
              onChange={(e) => {
                setColor(e.target.value);
                setIsChangedName(true);
              }}
            />
            <datalist id="presets">
              <option value="#9e9e9e">Light-Grey</option>
              <option value="#333333">Dark-Grey</option>
              <option value="#5b6bff">Blue</option>
              <option value="#c876ff">Purple</option>
              <option value="#ff76a4">Red-Purple</option>
              <option value="#ff755d">Red</option>
              <option value="#ffaf5f">Orange</option>
              <option value="#fffa5d">Yellow</option>
              <option value="#c4ff5d">Yellow-Green</option>
              <option value="#5dff83">Green</option>
              <option value="#5dffd4">Green-Blue</option>
            </datalist>
          </div>
        </label>
        <input
          className="name"
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
