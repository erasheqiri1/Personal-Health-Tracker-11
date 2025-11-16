
import { Stack } from 'expo-router';
import React from 'react';
import WorkoutPlanAdmin from '../../../components/WorkoutPlanAdmin';

export default function HomeWorkoutAdmin() {
  return (
    <>
      <Stack.Screen options={{ title: 'Admin – Home Workout' }} />
      <WorkoutPlanAdmin
        planKey="homeworkout"
        headerText="Ushtrimet e planit: Home Workout"
      />
    </>
  );
}
