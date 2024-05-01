import CabeceraDegradado from '@/components/CabeceraDegradado';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack >

        <Stack.Screen name="HomeEventosUsuario" options={{title:"Eventos", contentStyle:{backgroundColor:"white"}, headerShown:false}}/>
        <Stack.Screen name="[id_evento]" options={{ headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:""}}/>


    </Stack>
  );
};

export default MyComponent;