import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Link, Stack } from 'expo-router';

const polls = [
  {id: 1},
  {id: 2},
  {id: 3},
] as const;

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen　options={{ title: 'Polls' }} />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{`${item.id}: Example pll question`}</Text>
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
