import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack screenOptions={{contentStyle:{backgroundColor:"white"}}}>

        <Stack.Screen  name="HomePersonalUsuario"options={{headerLargeTitle:true, title:"Zona personal", headerStyle:{backgroundColor:"transparent"}}}/>


    </Stack>
  );
};

export default MyComponent;