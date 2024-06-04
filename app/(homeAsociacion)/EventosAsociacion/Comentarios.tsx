import { recibirAsistencias } from '@/api/asistencias';
import { recibirComentarios } from '@/api/opiniones';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import ElementoComentario from '@/components/ElementoComentario';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const Comentarios = () => {

    const {id_evento, colorFondo, colorTexto} = useLocalSearchParams()

    //CARREGUEM ELS EVENTOS
    const [evento, setEvento] = useState<Evento|null>(null)
    const [cargandoEvento, setCargandoEvento] = useState(true)
    const {data:comentarios,isLoading:cargandoComentarios,error:errorComentarios } = recibirComentarios(id_evento)


    if(cargandoComentarios){

      return <ActivityIndicator >
        <Stack.Screen options={{headerTintColor:colorTexto as any }}/>

      </ActivityIndicator>

    }

    console.log(comentarios)

    return (
      <SafeAreaView style={{backgroundColor:"white",flex:1, rowGap:20, }}>
      
        <Stack.Screen options={{headerTintColor:colorTexto as any }}/>

        {/* Contenedor título */}
        <View style={{flexBasis:60, flexGrow:0, justifyContent:"center" }}>
          <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>Comentarios</Text>
        </View>
        <View style={styles.contenedorListaEventos}>
            <FlatList style={{ overflow: "visible", paddingHorizontal: 25, }} data={comentarios}
            
            renderItem={({ item, index, separators }) => (
                <ElementoComentario comentario = {item} color={colorTexto} ></ElementoComentario>
            )}
            />
        </View>
      
      </SafeAreaView>
  );
};

export default Comentarios;

const styles = StyleSheet.create({

  imagenEvento:{

    flex:1,
    aspectRatio:1,
    resizeMode:"contain",
    borderRadius:18,
    
  },
  contenedorListaEventos: {

    flex: 1,
    paddingTop: 20,
    overflow: "hidden"

  },

})