
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

const HomeEventosUsuario = () => {


  const {usuario, cargandoUsuario,setUsuario} = useAuth() //Carreguem el usuari

  //Hooks de eventos
  const [eventos, setEventos] = useState<Evento[]|[null]>([])
  const [cargandoEventos, setCargandoEventos] = useState(true)
  const [nombreMuncipio, setNombreMunicipio] = useState<any>("a")
  const [cargandoMunicipio, setCargandoMunicipio] = useState(true)


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

  //Carreguem els eventos
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

   //Carreguem el nom del municipi
   useEffect(()=>{

    const recibirMunicipios = async ()=>{

      const {data, error} = await supabase.from("municipios")
      .select("nombre_municipio")
      .eq("id_municipio",usuario.municipio_defecto).single()//Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 

        if(error){
          Alert.alert(error.message)
        }else{
          setNombreMunicipio(data)
        }
        setCargandoMunicipio(false)

    }

    if(usuario!==null){

      recibirMunicipios()

    }



  },[]) // Quan se carregue el usuari se execurá este useEffect



  //Esperem a que se carreguen els eventos i els municipis
  if(cargandoEventos||cargandoMunicipio){

   return <ActivityIndicator></ActivityIndicator>

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
        <Text>{nombreMuncipio.nombre_municipio}</Text>
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