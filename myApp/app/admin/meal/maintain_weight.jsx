
import { Stack } from 'expo-router';
import React from 'react';
import PlanMealsAdmin from '../../../components/PlanMealsAdmin';

export default function MbajPeshAdmin() {
  return (
    <>
      <Stack.Screen options={{ title: 'Admin – Mbaj Peshë' }} />
      <PlanMealsAdmin
        planKey="mbaj"
        headerText="Ushqimet e planit: Mbaj Peshë"
      />
    </>
  );
}
