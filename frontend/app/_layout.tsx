import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. Kolla om vi har en token när appen startar
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Kunde inte läsa token", error);
      } finally {
        setIsLoaded(true);
      }
    };

    checkToken();
  }, []);

  // 2. Hantera navigeringen baserat på inloggningsstatus
  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isLoggedIn && !inAuthGroup) {
      // Om man inte är inloggad och inte är i auth-mappen -> skicka till login
      router.replace('/(auth)/login');
    } else if (isLoggedIn && inAuthGroup) {
      // Om man är inloggad men råkar vara i auth-mappen -> skicka till appen
      router.replace('/(tabs)');
    }
  }, [isLoggedIn, segments, isLoaded]);

  // Medan vi kollar SecureStore visar vi en laddningssnurra
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Vi definierar våra två huvudgrupper här */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Modal kan ligga kvar om du vill ha kvar templaten för den */}
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
    </Stack>
  );
}