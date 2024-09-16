import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { Stack } from 'expo-router';
import AuthProvider from '../providers/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='(auth)' options={{ title: 'Login' }} />
      </Stack>
    </AuthProvider>
  )
}
