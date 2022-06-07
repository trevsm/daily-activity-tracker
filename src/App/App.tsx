import { useState } from "react";
import styled from "styled-components";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";

import "./styles.css";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const ClearSelectedElement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  return (
    <AppContainer>
      <ClearSelectedElement onClick={() => setSelectedActivity(null)} />
      <ActivityList
        {...{ activities, selectedActivity, setSelectedActivity }}
      />
      <UserInput
        {...{
          activities,
          setActivities,
          selectedActivity,
          setSelectedActivity,
        }}
      />
    </AppContainer>
  );
}
