import { Stack } from 'expo-router';
import React from 'react';
import PlanMealsAdmin from '../../../components/PlanMealsAdmin';

export default function HumbPeshAdmin() {
  return (
    <>
      <Stack.Screen options={{ title: 'Admin – Humb Peshë' }} />
      <PlanMealsAdmin
        planKey="humb"
        headerText="Ushqimet e planit: Humb Peshë"
      />
    </>
  );
}





