import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#355E3B' },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
          letterSpacing: 1,
        },
        tabBarStyle: {
          backgroundColor: '#EAE7D6', 
          borderTopWidth: 0,
          elevation: 5,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 0, 
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          color: '#355E3B',
        },
        tabBarActiveTintColor: '#355E3B',
        tabBarInactiveTintColor: '#355E3B',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size }) => (
            <FontAwesome name="home" size={size} color="#355E3B" />
          ),
        }}
      />
      <Tabs.Screen
        name="ushtrime"
        options={{
          title: 'Ushtrime',
          tabBarIcon: ({ size }) => (
            <FontAwesome name="heartbeat" size={size} color="#355E3B" />
          ),
        }}
      />
      <Tabs.Screen
        name="ushqime"
        options={{
          title: 'Ushqime',
          tabBarIcon: ({ size }) => (
            <FontAwesome name="cutlery" size={size} color="#355E3B" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size }) => (
            <FontAwesome name="user" size={size} color="#355E3B" />
          ),
        }}
      />
    </Tabs>
  );
}
