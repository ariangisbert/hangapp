
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
import { recibirEventosAsistidosByUsuario, recibirEventosNoOpinados, useListaEventos } from '@/api/eventos';
import { recibirMunicipioyProvincia, recibirNombreMunicipio } from '@/api/municipios';
import { recibirNombreProvincia } from '@/api/provincias';
import IconoChevronBaix from "../../../assets/iconos/IconoChevronBaix"
import { AnimatedText } from 'react-native-reanimated/lib/typescript/reanimated2/component/Text';
import Animated from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import ElementoEventoAsociacionAnterior from '@/components/ElementoEventoAsociacionAnterior';
import ElementoEventoUsuarioAnterior from '@/components/ElementoEventoUsuarioOpinion';
import Boton from '@/components/Boton';
const HomeEventosUsuario = () => {

  const queryClient = useQueryClient();
  const { session,usuario, cargandoUsuario, setUsuario, setSession } = useAuth() //Carreguem el usuari
  const [expandidoMunicipio, setExpandidoMunicipio] = useState(false);
  const alturaSafe = useSafeAreaInsets().top

  //Esperem a que se carreguen els usuaris


  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
 
  

  //READS
  const { data: eventos, isLoading: cargandoEventos, error: errorEventos } = useListaEventos(usuario.municipio_defecto, cargandoUsuario)
  const { data: municipio, isLoading: cargandoMunicipio, error: errorMunicipio } = recibirMunicipioyProvincia(parseInt(usuario.municipio_defecto), cargandoUsuario)
  const {data:eventosAsistidos, isLoading:cargandoEventosAsistidos, error:errorEventosAsistidos} = recibirEventosAsistidosByUsuario(usuario.id, cargandoUsuario)
  const {data:eventosOpinados, isLoading:cargandoEventosOpinados, error:errorEventosOpinados} = recibirEventosNoOpinados(usuario.id, cargandoUsuario)
  const [pulsadoTerminar, setPulsadoTerminar] = useState(false)
  const [refrescado, setRefrescando] = useState(false)

  if (cargandoEventos || cargandoMunicipio||cargandoUsuario||cargandoEventosAsistidos||cargandoEventosOpinados) {

    return <ActivityIndicator></ActivityIndicator>

  }

  //Comprobem els eventos que NO estiguen opinats
  const eventosNoOpinados = eventosAsistidos.filter((eventoAsistido:any) =>
    !eventosOpinados.some((eventoOpinado:any) =>
      eventoAsistido.eventos.id_evento === eventoOpinado.eventos.id_evento
    )
  );

  if (usuario.municipio_defecto == null) {

    return <Redirect href={"/SeleccionarMunicipio"} />

  }


 

  if (errorMunicipio || errorEventos) {
    router.back
  }




  

  function clickMunicipio() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut,
                                  ()=>router.push("/SeleccionarMunicipio"));
    setExpandidoMunicipio(!expandidoMunicipio);
};

async function refrescar(){

  setRefrescando(true)

  await queryClient.invalidateQueries(["eventos"] as any)

  setRefrescando(false)
}


  return (
    <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
      {/* Contenedor nombre municipio */}
      <Pressable onPress={clickMunicipio} style={[styles.contenedorNombreMunicipio, {height:expandidoMunicipio?850:50}]}>
        <Text style={styles.textoMunicipio}>{municipio.nombre_municipio}, {municipio.provincias.nombre_provincia}</Text>
        <IconoChevronBaix style={{marginBottom:5}}/>
      </Pressable>
      <CabeceraDegradado color={Colors.DegradatMorat} title="Eventos próximos"></CabeceraDegradado>
      <View style={styles.contenedorListaEventos}>
        <FlatList refreshing={refrescado} onRefresh={refrescar} style={{ overflow: "visible", paddingHorizontal: 20, }} data={eventos}
          renderItem={({ item, index, separators }) => (
            <ElementoEvento evento={item}></ElementoEvento>
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
      {/* Si hi han eventos no opinats, mostrem el BlurView*/}
      {eventosNoOpinados.length>0?
      <BlurView  experimentalBlurMethod="dimezisBlurView" intensity={9} style={{position:"absolute", paddingHorizontal:20,  justifyContent:"center", top:0, bottom:0, left:0, right:0,}}>
      <View style={{borderRadius:22, borderCurve:"continuous",alignItems:"center" , justifyContent:"space-between", paddingVertical:25, shadowColor: Colors.MoradoElemento.colorTitulo, shadowOffset: { width: 0, height: 0 }, shadowRadius: 8, shadowOpacity: 0.2, elevation: 2,  backgroundColor:"white", height:"72%", opacity:0.97}}>

          <Text  style={{fontSize:25,marginBottom:30,paddingHorizontal:25, backgroundColor:"white", color:Colors.MoradoElemento.colorTitulo, textAlign:"center", fontWeight:"700"}}>¿Qué te parecieron estos eventos?</Text>
          <View style={{overflow:"hidden", paddingHorizontal:25,marginBottom:15, flex:1,}}>
            <FlatList showsVerticalScrollIndicator={false} refreshing={refrescado} onRefresh={refrescar} style={{ overflow: "visible", flex:1, width:"100%",  }} data={eventosNoOpinados}
              renderItem={({ item, index, separators }) => (
              <ElementoEventoUsuarioAnterior debeSubir ={pulsadoTerminar}  eventoAsistido={item}></ElementoEventoUsuarioAnterior>
              )}/>
            </View>
            <View style={{flexBasis:70,}}>
              <Boton onPress={()=>setPulsadoTerminar(!pulsadoTerminar)} color={Colors.MoradoElemento.colorTitulo} texto={"Terminar"}></Boton>
            </View>    
        </View>

    </BlurView>
    :
    null
    }
      
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