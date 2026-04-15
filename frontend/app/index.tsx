import { Redirect } from 'expo-router';

export default function Index() {
  // Denna fil fungerar som en trafikljus-kontroll. 
  // Just nu skickar vi bara användaren vidare till login.
  return <Redirect href="/(auth)/login" />;
}