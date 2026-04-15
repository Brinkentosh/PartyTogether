import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ENDPOINTS } from '../../config';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Fel", "Lösenorden matchar inte!");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        Alert.alert("Grattis!", "Ditt konto har skapats. Logga in nu!", [
          { text: "OK", onPress: () => router.push('/(auth)/login') }
        ]);
      } else {
        const errorData = await response.json();
        // Identity returnerar ofta en array av fel, vi plockar ut det första
        const errorMessage = Array.isArray(errorData) ? errorData[0].description : "Kunde inte skapa konto";
        Alert.alert("Fel", errorMessage);
      }
    } catch (error) {
      Alert.alert("Error", "Kunde inte ansluta till servern.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Skapa konto</Text>
      <TextInput
        style={styles.input}
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Lösenord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Bekräfta lösenord"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrera mig</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={{ marginTop: 20 }}>
        <Text style={{ textAlign: 'center', color: '#6200ee' }}>Har du redan ett konto? Logga in</Text>
      </TouchableOpacity>
    </View>
  );
}

// Återanvänd samma styles som i Login
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  logo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#6200ee' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});