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
    const { data: tieneComprado, isLoading: cargandoTieneComprado } = comprobarCompra(rifa?.id, usuario.id, cargandoRifa, cargandoUsuario)
    const { data: numeroGanadorRifa, isLoading: cargandoNumeroGanadorRifa, error: errorGanador } = recibirNumeroGanador(rifa?.id, cargandoRifa)

    const { data: esGanador, isLoading: cargandoEsGanador, error: errorEsGanador } = comprobarGanador(usuario.id, rifa?.id, cargandoRifa, cargandoUsuario, numeroGanadorRifa?.numero_ganador, cargandoNumeroGanadorRifa)
    const [conffetiTerminado, setConffetiTerminado] = useState(false)

    let colorFondo = Colors.MoradoElemento.colorFondo
    let colorTexto = Colors.MoradoElemento.colorTitulo


    //Carreguem la rifa


    //CONTADOR


    if (cargandoRifa || cargandoTieneComprado || cargandoNumeroGanadorRifa || cargandoUsuario || cargandoEsGanador) {

        return <ActivityIndicator >
            {/* Pa que mentres se carreguen tinga igual el color de fondo */}
            <Stack.Screen options={{ headerTintColor: colorTexto as any, contentStyle: { backgroundColor: colorFondo } as any }} />

        </ActivityIndicator>

    }
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    return (
        <SafeAreaView style={{ backgroundColor:esGanador?"#DAE9E7": colorFondo + "", paddingBottom: 8, flex: 1, paddingHorizontal: 42 }}>
            <Stack.Screen options={{ headerTintColor: colorTexto as any, contentStyle: { backgroundColor: esGanador?"#DAE9E7":colorFondo } as any }} />

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
            <View style={{ flexGrow: 0.3, flexBasis: 40, flexShrink: 0, columnGap: 14, justifyContent: "center", flexDirection: "row", alignItems: "center", paddingVertical: 18, }}>

                <Text style={{ fontSize: 26, color: colorTexto, fontWeight: "700" }}>Número ganador</Text>
            </View>



            {/* Contenedor Ganador rifa */}
            <View style={{ flexGrow: 0.4, flexShrink: 1, alignItems: "center", justifyContent: "center" }}>

                <Text numberOfLines={1} adjustsFontSizeToFit style={{ maxWidth: 70, fontSize: 32, letterSpacing: 0.2, color: "white", fontWeight: "700", zIndex: 2, }}>{numeroGanadorRifa.numero_ganador}</Text>
                {esGanador?
                  <LottieView  style={{ position: "absolute", zIndex: -1, height: 150, width: 200,  }} source={require('../../../assets/animacions/circuloGanador.json')} autoPlay loop />
                :
                <LottieView  style={{ position: "absolute", zIndex: -1, height: 150, width: 200,  }} source={require('../../../assets/animacions/perfavorfunciona.json')} autoPlay loop />
                }


            </View>


            {esGanador?
            <View style={{ flexGrow: 0.3, justifyContent: "center", alignItems: "center", paddingVertical: 3 }}>

                <Text style={{ color: colorTexto + "", fontWeight: "700", textAlign: "center", fontSize: 16 }}>Uno de tus número coinicide con el número ganador. ¡Enhorabuena!</Text>


            </View>
        
            :
            <View style={{ flexGrow: 0.3, justifyContent: "center", alignItems: "center", paddingVertical: 3 }}>

                {tieneComprado?
                <Text style={{ color: colorTexto + "", fontWeight: "700", textAlign: "center", fontSize: 16 }}>Ninguno de tus números coincide con el número ganador. ¡Lo sentimos!</Text>
                :
                <Text style={{ color: colorTexto + "", fontWeight: "700", textAlign: "center", fontSize: 16 }}>{rifa?.fecha.split("-")[2] + " de " + numeroAMes(rifa?.fecha.split("-")[1]) + " de " + rifa?.fecha.split("-")[0]}</Text>
                }
                


            </View>
            }

            {/* Contenedor nombre asociacion */}
            

            {/* Contenedor boton */}

            {esGanador ?
                <LottieView  style={{ position: "absolute", opacity:conffetiTerminado?0:1, top: 0, bottom: 0, left: 0, right: 0 }} source={require('../../../assets/animacions/conffeti3.json')} autoPlay loop={false} onAnimationFinish={()=>setConffetiTerminado(true)} />
                : null
            }

            {(esGanador===false)&&tieneComprado?
            // <LottieView resizeMode="cover" style={{ position: "absolute", opacity:conffetiTerminado?0:1,height:120,width:140, top: 0,   right: 10 }} source={require('../../../assets/animacions/colgantePerdedor-2.json')} autoPlay loop  />
           null
            :
                null
            }

            

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