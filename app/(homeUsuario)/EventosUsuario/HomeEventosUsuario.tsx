
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
import { useListaEventos } from '@/api/eventos';
import { recibirNombreMunicipio } from '@/api/municipios';

const HomeEventosUsuario = () => {

  const {usuario, cargandoUsuario} = useAuth() //Carreguem el usuari
  
  
  const alturaSafe = useSafeAreaInsets().top

  //Esperem a que se carreguen els usuaris
  if(cargandoUsuario){

    return <ActivityIndicator></ActivityIndicator>

  }
  
  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if(usuario.municipio_defecto==null){

    return <Redirect href={"/SeleccionarMunicipio"}/>
    
  }
  const {data:eventos, isLoading:cargandoEventos, error:errorEventos} = useListaEventos(usuario.municipio_defecto)
  const {data:nombreMunicipio, isLoading:cargandoMunicipio, error:errorMunicipio}= recibirNombreMunicipio(parseInt(usuario.municipio_defecto))
  
  
  //Si nia un error tirem paca arrere
  if(errorEventos){

    router.back()

  }


  if(cargandoEventos||cargandoMunicipio){

    return<ActivityIndicator></ActivityIndicator>

  }


    //Carreguem el nom del municipi
   
  
   if(errorMunicipio){
     router.back
   }

   
  async function salir(){

    const {error} = await supabase.auth.signOut()

    if(error){

      Alert.alert(error.message)

    }else{

      router.replace("/UserLogin")

    }


  }

 

  return (
    <View style={{flex:1, marginTop: Platform.OS==="ios"? alturaSafe:20, backgroundColor:"white"}}>
      
      <CabeceraDegradado title="Eventos próximos"></CabeceraDegradado>
      <View style={styles.contenedorListaEventos}>
       <FlatList style={{overflow:"visible",paddingHorizontal:20, } } data={eventos}
        renderItem={({item, index, separators}) => (
          <ElementoEvento evento={item}></ElementoEvento>
        )}
      />
      <View style={{marginBottom:20}}>
      <Button onPress={salir} title='Salir'></Button>
      </View>
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

export default HomeEventosUsuario;

const styles = StyleSheet.create({

  contenedorListaEventos:{

    flex:1,
    paddingTop:27,
    overflow:"hidden"
    
    

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