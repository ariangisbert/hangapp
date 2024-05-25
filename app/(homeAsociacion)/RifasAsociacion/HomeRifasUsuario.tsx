
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, ActivityIndicator, TouchableHighlight, Button, Pressable, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack, router } from 'expo-router';
import { useHeaderHeight } from "@react-navigation/elements"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CabeceraDegradado from '@/components/CabeceraDegradado';
import { Evento } from '@/assets/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import ElementoEvento from '@/components/ElementoEvento';
import { LinearGradient } from 'expo-linear-gradient';
import { err } from 'react-native-svg';
import { recibirListaRifas, recibirListaRifasByAsociacion } from '@/api/rifas';
import { recibirMunicipioyProvincia, recibirNombreMunicipio } from '@/api/municipios';
import ElementoRifa from '@/components/ElementoRifa';
import { recibirListaLoteria, recibirListaLoteriaByAsociacion } from '@/api/loteria';
import ElementoLoteria from '@/components/ElementoLoteria';
import IconoChevronBaix from '@/assets/iconos/IconoChevronBaix';
import Colors from '@/constants/Colors';
import { recibirAsociacion } from '@/api/asociaciones';
import ElementoRifaAsociacion from '@/components/ElementoRifaAsociacion';

const HomeRifasUsuario = () => {

  const {usuario, cargandoUsuario} = useAuth() //Carreguem el usuari
  const alturaSafe = useSafeAreaInsets().top
  const {data:asociacion, isLoading:cargandoAsociacion, error:errorAsociacion} = recibirAsociacion(usuario.id, cargandoUsuario)
  const {data:rifas, isLoading:cargandoRifas, error:errorRifas} = recibirListaRifasByAsociacion(asociacion?.id_asociacion, cargandoAsociacion)
  const {data:loterias, isLoading:cargandoLoterias, error:errorLoteria} = recibirListaLoteriaByAsociacion(asociacion?.id_asociacion, cargandoAsociacion)
  //RECARREGUEM EL USUARI
  //Esperem a que se carreguen els usuaris
  if(cargandoUsuario||cargandoRifas||cargandoLoterias||cargandoAsociacion){

    return <ActivityIndicator></ActivityIndicator>

  }
  
  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if(usuario.municipio_defecto==null){

    return <Redirect href={"/SeleccionarMunicipio"}/>
    
  }

  //Carreguem rifes i municipi

 
  //Si nia un error tirem paca arrere
  if(errorRifas||errorLoteria){

    router.back()

  }
 

  return (
    <View style={{flex:1, marginTop: Platform.OS==="ios"? alturaSafe:20, backgroundColor:"white"}}>
      
      {/* Cabacera Rifas */}
      <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"flex-end"}}>
      <CabeceraDegradado color={Colors.DegradatRosa} alto title="Mis rifas"></CabeceraDegradado>

        {/* Boton para añadir rifa */}
        <Pressable onPress={()=>router.push("/RifasAsociacion/CrearRifa")} style={{ marginRight:20}}>
          <Text style={{color:"#DC82F5", fontSize:48, marginBottom:-6.5,fontWeight:"300" }}>+</Text>
        </Pressable>
      </View>


      <View style={styles.contenedorListaRifas}>
       <FlatList style={{overflow:"visible",paddingHorizontal:20, } } data={rifas}
        renderItem={({item, index, separators}) => (
          <ElementoRifaAsociacion rifa={item}></ElementoRifaAsociacion>
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
      {/* LOTERIA */}
      <CabeceraDegradado color={Colors.DegradatRosa} mediaAltura title="Lotería"></CabeceraDegradado>
      
          <View style={styles.contenedorListaLoteria}>
            <FlatList showsHorizontalScrollIndicator={false}  contentContainerStyle={{paddingHorizontal:20}} horizontal style={{overflow:"hidden", marginTop:-9}} data={loterias}
              renderItem={({item, index, separators}) => (
                <ElementoLoteria loteria={item}></ElementoLoteria>
              )}
            />

            <LinearGradient

            start={{ x: -1, y: 1 }}
            end={{ x: 1, y: 1 }}
              colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
              style={styles.fadeLeft}
            />

            <LinearGradient

              start={{ x:0, y: 1 }}
              end={{ x: 2, y: 1 }}
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              style={styles.fadeRight}
        />  
      </View>

    </View>
  );
};

export default HomeRifasUsuario;

const styles = StyleSheet.create({

  contenedorListaRifas:{

    flex:1,
    paddingTop:27,
    overflow:"hidden",
    
  },
  contenedorListaLoteria:{

     flexBasis:177,
     overflow:"visible",
     
     
  },
  fadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 35, // Ajusta la altura según necesidad
  },
  fadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40, // Ajusta la altura según necesidad
  },

  fadeLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 20, // Ajusta la altura según necesidad
  },
  fadeRight: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    width: 20, // Ajusta la altura según necesidad
  },

  contenedorNombreMunicipio: {

    height: 50,
    paddingHorizontal: 20,
    alignItems: "flex-end",
    paddingBottom: 1.8,
    flexDirection:"row",
    columnGap:3,
  },
  textoMunicipio: {

    fontWeight: "600",
    fontSize: 20,
    color: "#212121"
  }



})