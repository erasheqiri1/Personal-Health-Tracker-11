
import { Stack } from 'expo-router';
import React from 'react';
import PlanMealsAdmin from '../../../components/PlanMealsAdmin';

export default function ShtoPeshAdmin() {
  return (
    <>
      <Stack.Screen options={{ title: 'Admin – Shto Peshë' }} />
      <PlanMealsAdmin
        planKey="shto"
        headerText="Ushqimet e planit: Shto Peshë"
      />
    </>
  );
}
