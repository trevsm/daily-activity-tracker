import { useEffect } from "react";
import styled from "styled-components";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";
import { useActivities } from "../stores/useActivities";
import { scrollBottom } from "../Tools";

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
  const { setSelectedActivity } = useActivities();

  useEffect(() => {
    setSelectedActivity(null);
    scrollBottom();
  }, []);

  return (
    <AppContainer>
      <ClearSelectedElement onClick={() => setSelectedActivity(null)} />
      <ActivityList />
      <UserInput />
    </AppContainer>
  );
}
