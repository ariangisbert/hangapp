import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const MyComponent = () => {
  return (
    <Stack>

        <Stack.Screen name="HomeRifasAsociacion"options={{ contentStyle:{backgroundColor:"white"}, title:"Rifas", headerShown:false}}/>
        <Stack.Screen name="[id]" options={{ headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:""}}/>
        <Stack.Screen name="Loteria" options={{ headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:""}}/>
        <Stack.Screen name="CrearRifa" options={{animation:"slide_from_bottom",headerShown:true, headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:""}}/>
        <Stack.Screen name="ReservasLoteria" options={{animation:"slide_from_bottom",headerShown:true, headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:"",}}/>
        <Stack.Screen name="ResultadoRifa" options={{ headerBackTitleVisible:false,headerTransparent:true,headerShadowVisible:false, title:""}}/>
        <Stack.Screen name="ModelGanador" options={{ headerShown:false,title:"Tus números", presentation:"transparentModal", contentStyle:{justifyContent:"flex-end", backgroundColor:"transparent"}  }}/>
       
    </Stack>
  );
};

export default MyComponent;