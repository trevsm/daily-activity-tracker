import create from "zustand";
import { v4 as uuid } from "uuid";
import { Activity } from "../Types";
import { persist } from "zustand/middleware";

interface ActivitiesState {
  activities: Activity[];
  setActivities: (input: (prev: Activity[]) => Activity[]) => void;
  selectedActivity: Activity | null;
  setSelectedActivity: (activity: Activity | null) => void;
  deleteActivity: (id: string) => void;
  deleteAllInCollection: (collectionId: string) => void;
  exitCollection: (id: string) => void;
}

export const useActivities = create(
  persist<ActivitiesState>(
    (set, get) => ({
      activities: [],
      setActivities: (input) => {
        set({ activities: input(get().activities) });
      },
      selectedActivity: null,
      setSelectedActivity: (activity) => set({ selectedActivity: activity }),
      deleteActivity: (id) => {
        const activities = get().activities.filter(
          (activity) => activity.id !== id
        );
        set({ activities });
        get().setSelectedActivity(null);
      },
      deleteAllInCollection: (collectionId) => {
        const activities = get().activities.filter(
          (activity) => activity.collectionId !== collectionId
        );
        set({ activities });
        get().setSelectedActivity(null);
      },
      exitCollection: (id) => {
        const activities = get().activities.map((activity) => {
          if (activity.id === id) {
            const collectionId = uuid();
            return { ...activity, collectionId };
          }
          return activity;
        });
        set({ activities });
      },
    }),
    {
      name: "activity-store-2",
    }
  )
);
