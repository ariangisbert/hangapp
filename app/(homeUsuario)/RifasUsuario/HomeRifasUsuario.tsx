
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, ActivityIndicator, TouchableHighlight, Button } from 'react-native';
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
import { recibirListaRifas } from '@/api/rifas';
import { recibirNombreMunicipio } from '@/api/municipios';
import ElementoRifa from '@/components/ElementoRifa';

const HomeRifasUsuario = () => {

  const {usuario, cargandoUsuario} = useAuth() //Carreguem el usuari
  const alturaSafe = useSafeAreaInsets().top


  //RECARREGUEM EL USUARI
  //Esperem a que se carreguen els usuaris
  if(cargandoUsuario){

    return <ActivityIndicator></ActivityIndicator>

  }
  
  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if(usuario.municipio_defecto==null){

    return <Redirect href={"/SeleccionarMunicipio"}/>
    
  }

  //Carreguem rifes i municipi
  const {data:rifas, isLoading:cargandoRifas, error:errorRifas} = recibirListaRifas(usuario.municipio_defecto)
  const {data:nombreMunicipio, isLoading:cargandoMunicipio, error:errorMunicipio} = recibirNombreMunicipio(usuario.municipio_defecto)

  //Si nia un error tirem paca arrere
  if(errorRifas||errorMunicipio){

    router.back()

  }
  //Esperem a que se carreguen els eventos i el municipi
  if(cargandoRifas||cargandoMunicipio){

   return <ActivityIndicator></ActivityIndicator>

  }

 

  return (
    <View style={{flex:1, marginTop: Platform.OS==="ios"? alturaSafe:20, backgroundColor:"white"}}>
      
      <CabeceraDegradado title="Rifas"></CabeceraDegradado>
      <View style={styles.contenedorListaRifas}>
       <FlatList style={{overflow:"visible",paddingHorizontal:20, } } data={rifas}
        renderItem={({item, index, separators}) => (
          <ElementoRifa rifa={item}></ElementoRifa>
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
    </View>
  );
};

export default HomeRifasUsuario;

const styles = StyleSheet.create({

  contenedorListaRifas:{

    flex:1,
    paddingTop:27,
    overflow:"hidden"
    
  },
  contenedorListaLoteria:{

    

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



})