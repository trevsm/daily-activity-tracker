import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";
import { Activity } from "../Types";

import "./styles.css";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 15px;
`;

const ClearSelectedElement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function App() {
  const [activities, setActivities] = useLocalStorage<Activity[]>(
    "activity-store",
    []
  );
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const userInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const states = {
    activities,
    setActivities,
    selectedActivity,
    setSelectedActivity,
    userInputRef,
    listRef,
  };

  return (
    <AppContainer>
      <ClearSelectedElement onClick={() => setSelectedActivity(null)} />
      <ActivityList {...states} />
      <UserInput {...states} />
    </AppContainer>
  );
}
