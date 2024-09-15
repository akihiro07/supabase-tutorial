import { View, Text, StyleSheet, Pressable, Button } from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const poll = {
  question: 'React Native vs Flutter?',
  options: ['React Native FTW', 'Flutter', 'SwiftUI']
}

const details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState('React Native FTW');

  const vote = () => {
    console.warn(selected)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Poll voting' }} />

      <Text style={styles.question}>{poll.question}</Text>

      <View style={{ gap: 5 }}>
        {poll.options.map(option => (
          <Pressable
            key={option}
            onPress={() => setSelected(option)}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selected ? 'check-circle' : 'circle'}
              size={18}
              color={option === selected ? 'green' : 'gray'}
              />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Button title='vote' onPress={vote} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    gap: 10,
    borderRadius: 5,
  },
})

export default details;
