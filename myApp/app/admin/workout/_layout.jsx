import { Stack } from "expo-router";

const COLORS = {
  green: "#355E3B",
};

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.green },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* vetëm ekrani kryesor, të tjerat menaxhohen nga folder-at e brendshëm */}
      <Stack.Screen name="index" />
    </Stack>
  );
}
