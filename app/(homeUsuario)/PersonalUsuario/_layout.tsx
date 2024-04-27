import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen  name="index"options={{headerLargeTitle:true, title:"Zona personal", headerStyle:{backgroundColor:"transparent"}}}/>


    </Stack>
  );
};

export default MyComponent;