
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert, ActivityIndicator, TouchableHighlight, Button, Pressable,LayoutAnimation } from 'react-native';
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
import { useListaEventos, useListaEventosByAsociacion } from '@/api/eventos';
import { recibirMunicipioyProvincia, recibirNombreMunicipio } from '@/api/municipios';
import { recibirNombreProvincia } from '@/api/provincias';
import IconoChevronBaix from "../../../assets/iconos/IconoChevronBaix"
import { AnimatedText } from 'react-native-reanimated/lib/typescript/reanimated2/component/Text';
import Animated from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { recibirAsociacion } from '@/api/asociaciones';
import ElementoEventoAsociacion from '@/components/ElementoEventoAsociacion';
import { BlurView } from 'expo-blur';
const HomeEventosAsociacion = () => {

  const { usuario, cargandoUsuario } = useAuth() //Carreguem el usuari
  const alturaSafe = useSafeAreaInsets().top
  const [eventoAmpliado, setEventoAmpliado] = useState<any>(null)

  //Esperem a que se carreguen els usuaris
  if (cargandoUsuario) {

    return <ActivityIndicator></ActivityIndicator>

  }

  //Si el usuari no es una asociacio el tornem al principi
  if (usuario.grupo!=="ASOCIACION") {

    supabase.auth.signOut()
    return <Redirect href={"/"} />

  }

  //READS
  const {data:asociacion, isLoading:cargandoAsociacion, error:errorAsociacion} = recibirAsociacion(usuario.id)
  const { data: eventos, isLoading: cargandoEventos, error: errorEventos } = useListaEventosByAsociacion(asociacion?.id_asociacion, cargandoAsociacion)
  




  if (cargandoEventos||cargandoAsociacion) {

    return <ActivityIndicator></ActivityIndicator>

  }

  if (errorEventos||errorAsociacion) {
    
    router.back
  }




  async function salir() {

    const { error } = await supabase.auth.signOut()

    if (error) {

      Alert.alert(error.message)

    } else {

      router.replace("/UserLogin")

    }


  }

  function manejarEventoAmpliado(id_evento:any){

    setEventoAmpliado(id_evento)
    

  }

  function desampliarEvento(){

    setEventoAmpliado(null)

  }



  return (
    <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
     
     {/* Cabecera */}
      <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"flex-end"}}>
      <CabeceraDegradado color={Colors.DegradatRosa} alto title="Mis eventos"></CabeceraDegradado>

        {/* Boton para añadir evento */}
        <Pressable onPress={()=>router.push("/EventosAsociacion/CrearEvento")} style={{ marginRight:20}}>
          <Text style={{color:"#DC82F5", fontSize:48, marginBottom:-6.5,fontWeight:"300" }}>+</Text>
        </Pressable>
      </View>



      <Pressable onPress={desampliarEvento} style={styles.contenedorListaEventos}>
        <FlatList style={{ overflow: "visible", paddingHorizontal: 20, }} data={eventos}
          renderItem={({ item, index, separators }) => (
            <ElementoEventoAsociacion ampliado={eventoAmpliado?eventoAmpliado===item.id_evento:false} borroso={eventoAmpliado?eventoAmpliado!==item.id_evento:false} pulsacionLarga={manejarEventoAmpliado} evento={item}></ElementoEventoAsociacion>
          )}
        />
        <View style={{ marginBottom: 20 }}>
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

        

      </Pressable>
    </View>
  );
};

export default HomeEventosAsociacion;

const styles = StyleSheet.create({

  contenedorListaEventos: {

    flex: 1,
    paddingTop: 27,
    overflow: "hidden"

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