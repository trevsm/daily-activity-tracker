import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocalStorage } from "usehooks-ts";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";
import { useActivities } from "../stores/useActivities";
import { Activity } from "../Types";

import "./styles.css";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 15px;
  padding-bottom: ${window.innerHeight / 4}px;
`;

const ClearSelectedElement = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function App() {
  const [isFixed, setIsFixed] = useLocalStorage("isFixed", false);
  const [old, setOld] = useLocalStorage<Activity[]>("activity-store", []);

  const { setSelectedActivity, setActivities } = useActivities();

  const first = useRef(true);

  //temp fix for transition of activities
  useEffect(() => {
    if (first.current && !isFixed) {
      setActivities(() => old);
      setIsFixed(true);
    }
    first.current = false;
  }, []);

  return (
    <AppContainer>
      <ClearSelectedElement onClick={() => setSelectedActivity(null)} />
      <ActivityList />
      <UserInput />
    </AppContainer>
  );
}
