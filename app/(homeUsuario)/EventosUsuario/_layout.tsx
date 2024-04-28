import CabeceraDegradado from '@/components/CabeceraDegradado';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen name="HomeEventosUsuario"options={{ headerShown:false}}/>


    </Stack>
  );
};

export default MyComponent;