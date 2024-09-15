import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Stack } from 'expo-router';

const polls = [1,2,3]

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen　options={{ title: 'Polls' }} />
      <FlatList
        data={polls}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{`${item}: Example pll question`}</Text>
          </View>
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
