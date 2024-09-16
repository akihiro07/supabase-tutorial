import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const {data, error } = await supabase.from('polls').select('*')
      if (error) {
        Alert.alert('Error fetching data')
      }
      console.log(data)
      setPolls(data);
    }
    fetchPolls();
  }, [])

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerRight: () => (
            <Link href='/polls/new'>
              <AntDesign name='plus' size={20} color='gray' />
            </Link>
          )
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{item.question}</Text>
          </Link>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5
  },
  pollContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  pollTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
