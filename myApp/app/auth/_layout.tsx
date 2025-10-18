
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#355E3B' },
      headerTintColor: 'white',
      contentStyle: { backgroundColor: '#F9F6E8' },
    }}/>
  );
}


