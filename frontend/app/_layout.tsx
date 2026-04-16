import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial check vid start
  useEffect(() => {
    const prepare = async () => {
      // Vi behöver bara veta att vi har kollat minnet en gång
      setIsLoaded(true);
    };
    prepare();
  }, []);

  // 2. Dörrvakten: Körs varje gång 'segments' ändras (dvs när vi navigerar)
  useEffect(() => {
    if (!isLoaded) return;

    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync('userToken');
      const inAuthGroup = segments[0] === '(auth)';

      if (!token && !inAuthGroup) {
        // Ingen token och inte i login-vyn -> tvinga till login
        router.replace('/(auth)/login');
      } else if (token && inAuthGroup) {
        // Har token men är i login-vyn -> skicka till appen
        router.replace('/(tabs)');
      }
    };

    checkAuth();
  }, [segments, isLoaded]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
    </Stack>
  );
}