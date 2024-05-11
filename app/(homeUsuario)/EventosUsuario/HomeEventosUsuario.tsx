
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
import { useListaEventos } from '@/api/eventos';
import { recibirMunicipioyProvincia, recibirNombreMunicipio } from '@/api/municipios';
import { recibirNombreProvincia } from '@/api/provincias';
import IconoChevronBaix from "../../../assets/iconos/IconoChevronBaix"
import { AnimatedText } from 'react-native-reanimated/lib/typescript/reanimated2/component/Text';
import Animated from 'react-native-reanimated';
const HomeEventosUsuario = () => {

  const { usuario, cargandoUsuario } = useAuth() //Carreguem el usuari
  const [expandidoMunicipio, setExpandidoMunicipio] = useState(false);
  const alturaSafe = useSafeAreaInsets().top

  //Esperem a que se carreguen els usuaris
  if (cargandoUsuario) {

    return <ActivityIndicator></ActivityIndicator>

  }

  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if (usuario.municipio_defecto == null) {

    return <Redirect href={"/SeleccionarMunicipio"} />

  }

  //READS
  const { data: eventos, isLoading: cargandoEventos, error: errorEventos } = useListaEventos(usuario.municipio_defecto)
  const { data: municipio, isLoading: cargandoMunicipio, error: errorMunicipio } = recibirMunicipioyProvincia(parseInt(usuario.municipio_defecto))
  //const {data:nombreProvincia, isLoading:cargandoProvincia, error:errorProvincia} = recibirNombreProvincia(usuario.municipio_defecto)




  if (cargandoEventos || cargandoMunicipio) {

    return <ActivityIndicator></ActivityIndicator>

  }

  if (errorMunicipio || errorEventos) {
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

  function clickMunicipio() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                                  ()=>router.push("/SeleccionarMunicipio"));
    setExpandidoMunicipio(!expandidoMunicipio);
};


  return (
    <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
      {/* Contenedor nombre municipio */}
      <Pressable onPress={clickMunicipio} style={[styles.contenedorNombreMunicipio, {height:expandidoMunicipio?850:50}]}>
        <Text style={styles.textoMunicipio}>{municipio.nombre_municipio}, {municipio.provincias.nombre_provincia}</Text>
        <IconoChevronBaix style={{marginBottom:5}}/>
      </Pressable>
      <CabeceraDegradado title="Eventos próximos"></CabeceraDegradado>
      <View style={styles.contenedorListaEventos}>
        <FlatList style={{ overflow: "visible", paddingHorizontal: 20, }} data={eventos}
          renderItem={({ item, index, separators }) => (
            <ElementoEvento evento={item}></ElementoEvento>
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

      </View>
    </View>
  );
};

export default HomeEventosUsuario;

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