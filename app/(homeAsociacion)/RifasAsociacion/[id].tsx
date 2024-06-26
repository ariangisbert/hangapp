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


const DetallesRifa = () => {

    const {id} = useLocalSearchParams()
    const [diasRestantes, setDiasRestantes] = useState<any>("")
    const [horasRestantes, setHorasRestantes] = useState<any>("")
    const [minutosRestantes, setMinutosRestantes] = useState<any>("")
    const [segundosRestantes, setSegundosRestantes] = useState<any>("")
    let colorFondo = Colors.MoradoElemento.colorFondo
    let colorTexto = Colors.MoradoElemento.colorTitulo

    
    //Carreguem la rifa

    const {data:rifa, isLoading:cargandoRifa, error} = recibirRifa(id)

    //CONTADOR
    useEffect(()=>{

        const intervaloRestante = (setInterval(()=>{

            let tiempoAhora = new Date().getTime()
            let tiempoDestino = new Date(rifa?.fecha+" 12:00:00").getTime()
            let distancia = tiempoDestino - tiempoAhora
    
            setDiasRestantes(Math.floor(distancia / (1000 * 60 * 60 * 24)))
            setHorasRestantes(Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutosRestantes(Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)))
            setSegundosRestantes(Math.floor((distancia % (1000 * 60)) / 1000)) 

        }, 1000))

        return () => clearInterval(intervaloRestante);
        

    }, [cargandoRifa])


    if(cargandoRifa){

      return <ActivityIndicator >
        {/* Pa que mentres se carreguen tinga igual el color de fondo */}
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/> 

      </ActivityIndicator>

    }


    return (
      <SafeAreaView style={{backgroundColor:colorFondo+"",paddingBottom:8, flex:1, paddingHorizontal:42}}>
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0, justifyContent:"center" }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{rifa?.titulo}</Text>
        </View>

        {/* Contenedor Imagen */}
        <View style={{flexGrow:2.5, justifyContent:"center", alignItems:"center",shadowOpacity:0.09, shadowColor:colorTexto, shadowRadius:9,shadowOffset:{width:0, height:4.5}}}>
         
           {/* ContenedorInteriorImagen */}
          <View style={{flex:1}}>
             <ImagenRemotaRifa style={styles.imagenRifa} ruta={rifa?.imagen} fallback='../../../assets/images/fallbackLogoAsociacion.png'></ImagenRemotaRifa>
              
          </View>
        </View>
        

        {/* Contenedor contador atras */}
        <View style={{flexGrow:0.4,flexBasis:44,flexShrink:0, columnGap:14, flexDirection:"row",alignItems:"center", paddingVertical:21, }}>
          
          
            {/* Dies */}
            <ContenedorUnidad unidad={diasRestantes}/>
            {/* Hores */}
            <ContenedorUnidad unidad={horasRestantes}/>
            {/* Minuts */}
            <ContenedorUnidad unidad={minutosRestantes}/>
            {/* Segons */}
            <ContenedorUnidad unidad={segundosRestantes}/>
            
        </View>

      {/* Contenedor precio */}
      <View style={{flexGrow:0.1,  paddingVertical:3, justifyContent:"flex-start", alignItems:"center"}}>
          
          <MiniCuadradoVerde grande texto={"Precio: "+rifa?.precio+"€"}/>
        

      </View>

        {/* Contenedor descripcion */}
        <View style={{flexGrow:0.4, flexShrink:1, justifyContent:"center" }}>
          <Text style={{color:colorTexto+"", fontWeight:"500",lineHeight:24, textAlign:"center", fontSize:15}}>{rifa?.descripcion}</Text>
        </View>

        

        {/* Contenedor nombre asociacion */}
        <View style={{flexGrow:0.3, justifyContent:"center", alignItems:"center", paddingVertical:3}}>
          
            <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:16}}>{rifa?.asociaciones.nombre_asociacion}</Text>
          

        </View>
        

      </SafeAreaView>
  );
};

export default DetallesRifa;

const styles = StyleSheet.create({

  imagenRifa:{

    flex:1,
    aspectRatio:1,
    borderRadius:18,
    resizeMode:"cover"
    
  },

})