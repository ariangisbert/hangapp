import { recibirListaReservas, recibirLoteria } from '@/api/loteria';
import { recibirRifa } from '@/api/rifas';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import BotonMasMenos from '@/components/BotonMasMenos';
import ContenedorUnidad from '@/components/ContenedorUnidad';
import ElementoReserva from '@/components/ElementoReserva';
import Field from '@/components/Field';
import FieldDegradado from '@/components/FieldDegradado';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import ImagenRemotaRifa from '@/components/ImagenRemotaRifa';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import Colors from '@/constants/Colors';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const ReservasLoteria = () => {

    const {id, colorPasado} = useLocalSearchParams()
    let color

    switch (colorPasado) {

        case ("morado"):
            color = Colors.MoradoElemento
            break;
        case ("rojo"):
            color = Colors.RojoElemento
            break
        case ("verde"):
            color = Colors.VerdeElemento
            break
        default:
            color = Colors.MoradoElemento

    }

    let colorTexto = color.colorTitulo
    let colorFondo = color.colorFondo
    
    //Carreguem la rifa

    const {data:reservas, isLoading:cargandoReservas, error} = recibirListaReservas(id)



    if(cargandoReservas){

      
      return <ActivityIndicator >
        {/* Pa que mentres se carreguen tinga igual el color de fondo */}
        <Stack.Screen options={{headerTintColor:colorTexto+""}}/> 
        
      </ActivityIndicator>

    }


    return (
      <SafeAreaView style={{backgroundColor:"white",paddingBottom:8, flex:1}}>
        <Stack.Screen options={{headerTintColor:colorTexto+"",contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0, justifyContent:"center" }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>Reservas</Text>
        </View>

      <View style={styles.contenedorListaRifas}>
        <FlatList style={{overflow:"visible",paddingHorizontal:20, } } data={reservas}
          renderItem={({item, index, separators}) => (
            <ElementoReserva color={colorTexto} reserva={item}></ElementoReserva>
          )}
        />
            <LinearGradient
              colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
              style={styles.fadeTop}
            />

            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={styles.fadeBottom}
            />
          
      </View>

        
        
      </SafeAreaView>
  );
};

export default ReservasLoteria;

const styles = StyleSheet.create({

  
  contenedorListaRifas:{

    flex:1,
    paddingTop:20,
    overflow:"hidden",
    
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24, // Ajusta la altura según necesidad
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40, // Ajusta la altura según necesidad
  },

})
