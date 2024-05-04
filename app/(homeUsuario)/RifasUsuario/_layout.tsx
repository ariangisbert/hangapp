import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen  name="HomeRifasUsuario"options={{ contentStyle:{backgroundColor:"white"}, title:"Rifas", headerShown:false}}/>


    </Stack>
  );
};

export default MyComponent;