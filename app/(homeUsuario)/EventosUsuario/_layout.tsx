import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen  name="HomeEventosUsuario"options={{headerLargeTitle:true, title:"Eventos próximos", headerStyle:{backgroundColor:"transparent"}}}/>


    </Stack>
  );
};

export default MyComponent;