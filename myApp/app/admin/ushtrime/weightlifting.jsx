
import { Stack } from 'expo-router';
import React from 'react';
import WorkoutPlanAdmin from '../../../components/WorkoutPlanAdmin';

export default function WeightliftingAdmin() {
  return (
    <>
      <Stack.Screen options={{ title: 'Admin – Weightlifting' }} />
      <WorkoutPlanAdmin
        planKey="weightlifting"
        headerText="Ushtrimet e planit: Weightlifting"
      />
    </>
  );
}
