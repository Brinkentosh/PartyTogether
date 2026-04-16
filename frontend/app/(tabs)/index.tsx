import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// En temporär lista på fester (vi hämtar från backend senare)
const MOCK_PARTIES = [
  { id: '1', title: 'Midsommarfest', location: 'Skärgården', date: '2024-06-20' },
  { id: '2', title: 'Födelsedagsfest för Erik', location: 'Södermalm', date: '2024-05-15' },
  { id: '3', title: 'Inflyttningsfest', location: 'Vasastan', date: '2024-05-25' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kommande Fester</Text>
        <Text style={styles.subtitle}>Här är vad som händer i din cirkel</Text>
      </View>

      <FlatList
        data={MOCK_PARTIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.partyCard}
            onPress={() => console.log("Gå till fest:", item.title)}
          >
            <Text style={styles.partyTitle}>{item.title}</Text>
            <Text style={styles.partyInfo}>{item.location} • {item.date}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => console.log("Skapa ny fest")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContent: {
    padding: 15,
  },
  partyCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    // Lite skugga för att få korten att "poppa"
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  partyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  partyInfo: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  fab: { // Floating Action Button för att skapa fest
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  }
});