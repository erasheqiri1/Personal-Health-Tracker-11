
import { Stack } from 'expo-router';
import React from 'react';

const COLORS = {
  green: '#355E3B',
};

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.green },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Paneli i adminit',
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="ushqime"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ushtrime"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
