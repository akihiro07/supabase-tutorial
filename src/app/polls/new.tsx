import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Redirect, router, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '../../lib/supabase';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');

  const createPoll = async () => {
    setError('');

    if(!question) {
      setError('Please provide the question');
      return;
    }
    const validOptions = options.filter(o => !!o);
    if (validOptions.length < 2) {
      setError('Please provide at least 2 vallid options');
      return;
    }


    const { data, error } = await supabase
      .from('polls')
      .insert([{ question, options: validOptions }])
      .select();
    if (error) {
      Alert.alert('Failed to create the poll');
      console.error(error);
      return;
    };

    router.back();
  };

  const { user } = useAuth();

  if (!user) {
    return <Redirect href='/login' />;
  }

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

      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={{ justifyContent: 'center' }}>
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
              const updated = [...options];
              updated.splice(index, 1);
              setOptions(updated);
            }}
          />
        </View>
      ))}

      <Button title='Add option' onPress={() => setOptions([...options, ''])} />

      <Button title='Create poll' onPress={createPoll} />
      {error && <Text style={{ color: 'crimson' }}>{error}</Text>}
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