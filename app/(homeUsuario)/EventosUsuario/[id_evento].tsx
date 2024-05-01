import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const DetallesEvento = () => {

    const {id_evento, colorFondo, colorTexto} = useLocalSearchParams()
    

    return (
      <SafeAreaView style={{backgroundColor:colorFondo} as any}>
        <Stack.Screen options={{headerTintColor:colorTexto as any ,headerShadowVisible:false, title:"",headerStyle:{backgroundColor:colorFondo} as any,contentStyle:{backgroundColor:colorFondo}as any}}/>

        <Text>{id_evento}</Text>
      </SafeAreaView>
  );
};

export default DetallesEvento;