import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CrearEvento = () => {
  return (
    <SafeAreaView style={{flex:1, paddingHorizontal:20,}}>
        <Stack.Screen options={{headerTintColor:"#BC77EE", contentStyle:{backgroundColor:"white"} }}/>
        
        {/* Cabecera */}
        <View  style={{alignItems:"center", flexBasis:50, justifyContent:"center"}}>
            <Text style={{fontSize:30, fontWeight:"700",color:"#BC77EE" }}>Nuevo evento</Text>
        </View>

        {/* Contenedor crear */}
        <ScrollView style={{}}>
            {/* Fila 1 */}
            <View style={{height:120, flexDirection:"row",borderWidth:1}}>

                <View style={{borderWidth:1}}></View>
                <View></View>

            </View>

            
        </ScrollView>
      

    </SafeAreaView>
  );
};

export default CrearEvento;