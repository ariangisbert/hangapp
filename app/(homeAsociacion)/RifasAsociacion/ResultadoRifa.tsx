import { comprobarCompra } from '@/api/comprasRifas';
import { comprobarGanador, recibirNumeroGanador } from '@/api/ganadoresRifa';
import { recibirRifa, useInsertCompraRifa } from '@/api/rifas';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import BotonMasMenos from '@/components/BotonMasMenos';
import ContenedorUnidad from '@/components/ContenedorUnidad';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import ImagenRemotaRifa from '@/components/ImagenRemotaRifa';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import Colors from '@/constants/Colors';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Modal, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';
import LottieView from 'lottie-react-native';


const ResultadoRifa = () => {

    const { id } = useLocalSearchParams()
    const { usuario, cargandoUsuario } = useAuth()
    const { data: rifa, isLoading: cargandoRifa, error } = recibirRifa(id)
    const { data: numeroGanadorRifa, isLoading: cargandoNumeroGanadorRifa, error: errorGanador } = recibirNumeroGanador(rifa?.id, cargandoRifa)

    
    let colorFondo = Colors.MoradoElemento.colorFondo
    let colorTexto = Colors.MoradoElemento.colorTitulo


    //Carreguem la rifa


    //CONTADOR


    if (cargandoRifa || cargandoNumeroGanadorRifa || cargandoUsuario ) {

        return <ActivityIndicator >
            {/* Pa que mentres se carreguen tinga igual el color de fondo */}
            <Stack.Screen options={{ headerTintColor: colorTexto as any, contentStyle: { backgroundColor: colorFondo } as any }} />

        </ActivityIndicator>

    }
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    return (
        <SafeAreaView style={{ backgroundColor:colorFondo + "", paddingBottom: 0, flex: 1, paddingHorizontal: 42 }}>
            <Stack.Screen options={{ headerTintColor: colorTexto as any, contentStyle: { backgroundColor:colorFondo } as any }} />

            {/* Contenedor título */}
            <View style={{ flexBasis: 80, flexGrow: 0, justifyContent: "center" }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ color: colorTexto + "", fontWeight: "700", textAlign: "center", fontSize: 30 }}>{rifa?.titulo}</Text>
            </View>

            {/* Contenedor Imagen */}
            <View style={{ flexGrow: 1.5, justifyContent: "center", alignItems: "center", shadowOpacity: 0.09, shadowColor: colorTexto, shadowRadius: 9, shadowOffset: { width: 0, height: 4.5 } }}>

                {/* ContenedorInteriorImagen */}
                <View style={{ flex: 1 }}>
                    <ImagenRemotaRifa style={styles.imagenRifa} ruta={rifa?.imagen} fallback='../../../assets/images/fallbackLogoAsociacion.png'></ImagenRemotaRifa>

                </View>
            </View>


            {/* Contenedor contador atras */}
            <View style={{  flexBasis: 70, flexShrink: 1, columnGap: 14, justifyContent: "center", flexDirection: "row", alignItems: "center", paddingVertical: 18, }}>

                <Text style={{ fontSize: 26, color: colorTexto, fontWeight: "700" }}>Número ganador</Text>
            </View>



            {/* Contenedor Ganador rifa */}
            <View style={{ flexGrow: 0.5, flexShrink: 1, alignItems: "center", justifyContent: "center" }}>

                <Text numberOfLines={1} adjustsFontSizeToFit style={{ maxWidth: 70, fontSize: 32, letterSpacing: 0.2, color: "white", fontWeight: "700", zIndex: 2, }}>{numeroGanadorRifa.numero_ganador}</Text>
               
                <LottieView  style={{ position: "absolute", zIndex: -1, height: "100%", width: 200,  }} source={require('../../../assets/animacions/perfavorfunciona.json')} autoPlay loop />
                


            </View>


        
            <View style={{flexBasis:100, justifyContent:"center",  alignSelf:"center"}}>
                <Boton onPress={()=>router.navigate({pathname:`/RifasAsociacion/ModelGanador`, params:{idRifa:rifa?.id, numeroGanador:numeroGanadorRifa.numero_ganador}}as any)}  texto="Ver ganador" color={colorTexto+""}></Boton>
            
            </View>
            
            
            

        

            

        </SafeAreaView>


    );
};

export default ResultadoRifa;

const styles = StyleSheet.create({

    imagenRifa: {

        flex: 1,
        aspectRatio: 1,
        borderRadius: 18,
        resizeMode: "cover"

    },

})