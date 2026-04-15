import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ENDPOINTS } from '../../config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch(ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Spara token säkert på telefonen
                await SecureStore.setItemAsync('userToken', data.token);

                Alert.alert("Succé", "Du är nu inloggad!");
                router.replace('/(tabs)'); // Skicka användaren till huvudappen
            } else {
                const errorText = await response.text();
                Alert.alert("Fel", errorText || "Inloggningen misslyckades");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Kunde inte ansluta till servern. Kolla din IP och att backenden körs!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>PartyTogether</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Logga in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', color: '#6200ee' }}>Inget konto? Registrera dig här</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    logo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#6200ee' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 8, marginBottom: 15 },
    button: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});