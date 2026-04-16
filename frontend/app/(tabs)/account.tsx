import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert(
      "Logga ut",
      "Är du säker på att du vill logga ut?",
      [
        { text: "Avbryt", style: "cancel" },
        { 
          text: "Logga ut", 
          style: "destructive",
          onPress: async () => {
            // 1. Ta bort token från telefonens minne
            await SecureStore.deleteItemAsync('userToken');
            
            // 2. Skicka användaren till login-sidan
            // Eftersom vi har logiken i _layout.tsx kommer den känna av 
            // att token är borta, men vi hjälper den på traven här.
            router.replace('/(auth)/login');
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inställningar & Profil</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Du är inloggad i PartyTogether!</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logga ut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
