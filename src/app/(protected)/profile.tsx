import { Button, StyleSheet, Text, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import React from 'react'
import { useAuth } from '../../providers/AuthProvider';
import { Redirect } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useAuth();

  return (
    <View style={{ padding: 10 }}>
      <Text>User id: {user?.id}</Text>

      <Button title='Sign out' onPress={() => supabase.auth.signOut()} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})