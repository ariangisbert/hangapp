import { recibirLoteria } from '@/api/loteria';
import { recibirRifa } from '@/api/rifas';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import BotonMasMenos from '@/components/BotonMasMenos';
import ContenedorUnidad from '@/components/ContenedorUnidad';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import ImagenRemotaRifa from '@/components/ImagenRemotaRifa';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import Colors from '@/constants/Colors';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const DetallesLoteria = () => {

    const {id, colorTexto, colorFondo} = useLocalSearchParams()
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1)
    
    
    //Carreguem la rifa

    const {data:loteria, isLoading:cargandoLoteria, error} = recibirLoteria(id)



    if(cargandoLoteria){

      return <ActivityIndicator >
        {/* Pa que mentres se carreguen tinga igual el color de fondo */}
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/> 

      </ActivityIndicator>

    }

    //Funcions de clicks
    
    function clickMas(){

      setCantidadSeleccionada(cantidadSeleccionada+1)

    }

    function clickMenos(){

      if(cantidadSeleccionada==1){
        return
      }

        
      setCantidadSeleccionada(cantidadSeleccionada-1)

    }
    

    return (
      <SafeAreaView style={{backgroundColor:"white",paddingBottom:8, flex:1, paddingHorizontal:42}}>
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0, justifyContent:"center" }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{loteria?.titulo}</Text>
        </View>

        {/* Contenedor Imagen */}
        <View style={{flexGrow:2.8, justifyContent:"center", alignItems:"center",shadowOpacity:0.09, shadowColor:colorTexto+"", shadowRadius:9,shadowOffset:{width:0, height:4.5}}}>
         
           {/* ContenedorInteriorImagen */}
          <View style={{flex:1, borderWidth:1}}>
             
          </View>
        </View>
        


      {/* Contenedor precio */}
      <View style={{flexGrow:0.1,  paddingVertical:3, justifyContent:"flex-start", alignItems:"center"}}>
          
          <MiniCuadradoVerde grande texto={"Precio: "+loteria?.precio+"€"}/>
        

      </View>

        {/* Contenedor descripcion */}
        

        

        {/* Contenedor nombre asociacion */}
        <View style={{flexGrow:0.3, justifyContent:"center", alignItems:"center", paddingVertical:3}}>
          
            

        </View>

        {/* Contenedor boton */}
        <View style={{flexGrow:0.01, flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:0, columnGap:20}}>
          <Boton flex texto="Reservar" color={colorTexto+""}></Boton>
          <BotonMasMenos onPressMas={clickMas} onPressMenos={clickMenos} valor = {cantidadSeleccionada} color={Colors.MoradoElemento}/>


        </View>
        

      </SafeAreaView>
  );
};

export default DetallesLoteria;

const styles = StyleSheet.create({

  imagenRifa:{

    flex:1,
    aspectRatio:1,
    borderRadius:18,
    resizeMode:"cover"
    
  },

})
