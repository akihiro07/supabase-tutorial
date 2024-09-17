import { View, Text, StyleSheet, Pressable, Button, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Tables } from '../../types/supabase';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';


const details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Tables<'polls'>>(null);
  const [userVote, setUserVote] = useState<Tables<'votes'>>(null);
  const [selected, setSelected] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchPoll = async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error)
        Alert.alert('Error feching data');
        return;
      }
      setPoll(data);
    }

    const fetchUserVote = async () => {
      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', id)
        .eq('user_id', user.id)
        .limit(1)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (error) {
        console.error(error)
        Alert.alert('Error feching user vote');
        return;
      }
      if (data) {
        setUserVote(data);
        setSelected(data.option);
      }
    }

    fetchPoll();
    fetchUserVote();
  }, []);

  const vote = async () => {
    const newVote = { option: selected, poll_id: poll.id, user_id: user?.id }
    if (userVote) {
      newVote.id = userVote.id
    }
    const { data, error } = await supabase
      .from('votes')
      .upsert([newVote])
      .select();

    if (error) {
      console.error(error);
      Alert.alert('Failed to to vote');
      return;
    };

    Alert.alert('Thank you for your vote');
    router.back();
  }

  if (!poll) {
    return <ActivityIndicator />
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
