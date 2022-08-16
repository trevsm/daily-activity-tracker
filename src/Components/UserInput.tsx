import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { scrollBottom, scrollToCollectionClass } from "../Tools";
import { SuggestedPop } from "./SuggestedPop";
import { useActivities } from "../stores/useActivities";
import styled from "styled-components";
import { classPrefix } from "../static";
import { Textarea } from "./Textarea";
import { ColorPicker } from "./ColorPicker";
import { Tools } from "./Tools";

const pad = "15px";
const InputContainer = styled.div`
  background-color: #ffffffc9;
  position: fixed;
  bottom: ${pad};
  left: ${pad};
  right: ${pad};
  max-width: 500px;
  display: flex;
  margin: 0 auto;
  align-items: flex-end;
  overflow: hidden;
`;

export default function UserInput() {
  const [name, setName] = useState<string>("");
  const initialColor = "#9e9e9e";
  const [color, setColor] = useState<string>(initialColor);
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !selectedActivity) handleAddActivity(false);
  };

  useEffect(() => {
    if (selectedActivity) {
      setName(selectedActivity.name);
      setColor(selectedActivity.color);
      return;
    }
    resetState();
  }, [selectedActivity]);

  return (
    <>
      {!selectedActivity && (
        <SuggestedPop {...{ activities, name, setName, setSelectedActivity }} />
      )}
      <InputContainer
        onClick={() => {
          if (!selectedActivity) scrollBottom();
          else
            scrollToCollectionClass(
              classPrefix + selectedActivity.collectionId
            );
        }}
      >
        <ColorPicker value={color} onChange={setColor} />
        <Textarea
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={(e) => {
            handleKeyPress(e);
          }}
        />
        <Tools
          {...{
            selectedActivity,
            name,
            handleAddActivity,
            handleUpdateActivity,
          }}
        />
      </InputContainer>
    </>
  );
}
