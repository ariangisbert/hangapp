import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen  name="HomeRifasUsuario"options={{headerLargeTitle:true, title:"Rifas", headerStyle:{backgroundColor:"transparent"}}}/>


    </Stack>
  );
};

export default MyComponent;