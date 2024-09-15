import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const createPoll = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Poll' }} />

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder='Type your question here'
        value={question}
        onChangeText={setQuestion}
      />

      <Text style={styles.label}>Title</Text>
      {options.map((option, index) => (
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            key={index}
            value={option}
            onChangeText={(text) => {
              const updated = [...options];
              updated[index] = text;
              setOptions(updated);
            }}
            style={styles.input}
            placeholder={`Option ${index + 1}`}
          />
          <Feather
            name='x'
            size={18}
            color='gray'
            style={{ position: 'absolute', right: 10 }}
            onPress={() => {
              // [1,2,3,4,5]
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
          />
        </View>
      ))}

      <Button title='Add option' onPress={() => setOptions([...options, ''])} />

      <Button title='Create poll' onPress={createPoll} />
    </View>
  )
}

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  label: {
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
})