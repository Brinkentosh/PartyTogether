import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Logga in', headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Registrera', headerShown: false }} />
    </Stack>
  );
}