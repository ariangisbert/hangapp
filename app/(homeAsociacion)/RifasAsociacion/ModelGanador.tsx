import { recibirUsuarioGanador } from '@/api/ganadoresRifa';
import { recibirParticipaciones } from '@/api/participacionesRifas';
import Participacion from '@/components/Participacion';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';

const ModelGanador = () => {


  const { idRifa, numeroGanador } = useLocalSearchParams()

  const { data: ganador, isLoading: cargandoGanador, error: errorGanador } = recibirUsuarioGanador(idRifa, numeroGanador)

  if (cargandoGanador) {

    return <ActivityIndicator></ActivityIndicator>

  }

  console.log(ganador.profiles.municipios)


  return (
    <View style={{ backgroundColor: "transparent", justifyContent: "flex-end", height: "100%" }}>
      <Pressable onPress={router.back} style={{ flex: 1 }}>

      </Pressable>

      <View style={styles.contenedorPrincipal}>

        {/* CAIXA TITUlO */}
        <View style={{ height: 70, borderRadius: 16, marginTop: 14, marginHorizontal: 12, alignItems: "center", justifyContent: "center", borderCurve: "continuous", backgroundColor: Colors.MoradoElemento.colorTitulo, shadowOpacity: 0.2, shadowColor: "black", shadowRadius: 9, shadowOffset: { width: 0, height: -2 } }}>

          <Text style={{ fontWeight: "600", color: "white", fontSize: 22 }}>Ganador</Text>

        </View>

        <View style={{ alignItems: "center", paddingHorizontal:30 }}>
          {ganador?

          //Si nia guanyador mostrem el nom del guanyadr, el seu email i de aon es
          <View style={{rowGap:10}}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 23, lineHeight: 40, color:Colors.MoradoElemento.colorTitulo, textAlign: "center", fontWeight: "700" }}>{ganador.profiles.nombre + " "+ ganador.profiles.apellidos}</Text>
            <View style={{ paddingHorizontal:15}}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 20, lineHeight: 40, color:Colors.MoradoElemento.colorTitulo, textAlign: "center", fontWeight: "500" }}>{ganador.profiles.municipios.nombre_municipio+", "+ ganador.profiles.municipios.provincias.nombre_provincia}</Text>
            </View>
            <View style={{ paddingHorizontal:15, borderRadius:12, borderCurve:"continuous",backgroundColor:Colors.MoradoElemento.colorFondo}}>
              <Text numberOfLines={1} adjustsFontSizeToFit style={{ fontSize: 20, lineHeight: 40, color:Colors.MoradoElemento.colorTitulo, textAlign: "center", fontWeight: "400" }}>{ganador.profiles.email}</Text>
            </View>

            
          </View>
            :
          <Text  adjustsFontSizeToFit style={{ fontSize: 23, lineHeight: 40, color:Colors.MoradoElemento.colorTitulo, textAlign: "center", fontWeight: "700" }}>El número ganador se ha vendido fuera de HangApp</Text>
          }
        </View>


      </View>
    </View>
  );
};

export default ModelGanador;

const styles = StyleSheet.create({


  contenedorPrincipal: {
    backgroundColor: "white",
    height: "45%",
    borderRadius: 22,
    borderCurve: "continuous",
    rowGap: 20

  }




})