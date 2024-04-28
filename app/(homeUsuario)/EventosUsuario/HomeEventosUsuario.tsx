
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, ActivityIndicator, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconoTabFesta from "../../../assets/iconos/IconoTabFesta"
import { Redirect, Stack } from 'expo-router';
import { useHeaderHeight } from "@react-navigation/elements"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CabeceraDegradado from '@/components/CabeceraDegradado';
import { Evento } from '@/assets/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { err } from 'react-native-svg';
import ElementoEvento from '@/components/ElementoEvento';

const HomeEventosUsuario = () => {

  const alturaSafe = useSafeAreaInsets().top

  //Hooks de eventos
  const [eventos, setEventos] = useState<Evento[]|[null]>([])
  const [cargandoEventos, setCargandoEventos] = useState(true)

  const {usuario, cargandoUsuario} = useAuth() //Carreguem el usuari

  //Esperem a que se carreguen els usuaris
  if(cargandoUsuario){

    return <ActivityIndicator></ActivityIndicator>

  }

  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if(usuario.municipio_defecto===null){

    return <Redirect href={"/SeleccionarMunicipio"}/>
    
  }

  //Carreguem els municipis
  useEffect(()=>{

    const recibirEventos = async ()=>{

      const {data, error} = await supabase.from("eventos")
      .select("*, asociaciones(logo_asociacion)")
      .eq("id_municipio",usuario.municipio_defecto)//Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 

        if(error){
          Alert.alert(error.message)
        }else{
          setEventos(data)
        }


        setCargandoEventos(false)

    }

    if(usuario!==null){

      recibirEventos()

    }



  },[]) // Quan se carregue el usuari se execurá este useEffect


  //Esperem a que se carreguen els eventos
  if(cargandoEventos){

   return <ActivityIndicator></ActivityIndicator>

  }
 

  return (
    <View style={{flex:1, marginTop: Platform.OS==="ios"? alturaSafe:20, paddingHorizontal:20}}>
      
      <CabeceraDegradado title="Eventos próximos"></CabeceraDegradado>
      <View style={styles.contenedorListaEventos}>
       <FlatList data={eventos}
        renderItem={({item, index, separators}) => (
          <ElementoEvento evento={item}></ElementoEvento>
        )}
      />
      </View>


    </View>
  );
};

export default HomeEventosUsuario;

const styles = StyleSheet.create({

  contenedorListaEventos:{

    flex:1,
    paddingTop:22,
    borderWidth:2

  }



})