import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack screenOptions={{contentStyle:{backgroundColor:"white"}}}>

        <Stack.Screen  name="HomePersonalUsuario"options={{headerShown:false, title:"Zona personal", headerStyle:{backgroundColor:"transparent"}}}/>


    </Stack>
  );
};

export default MyComponent;