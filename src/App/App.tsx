import { useState } from "react";
import styled from "styled-components";
import ActivityList from "../Components/ActivityList";
import UserInput from "../Components/UserInput";

import "./styles.css";

const AppContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
`;

export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  return (
    <AppContainer>
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
