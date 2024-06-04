import { Evento } from '@/assets/types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, LayoutAnimation, Animated, ActivityIndicator } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { asignarColor, numeroAMes } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/providers/AuthProvider';
import { recibirAsistencias } from '@/api/asistencias';
import { recibirNumeroComentarios, recibirOpinionesNegativas, recibirOpinionesPositivas } from '@/api/opiniones';
import IconoPulgarArriba from "../assets/iconos/iconoPulgarArriba"
import IconoPulgarAbajo from "../assets/iconos/iconoPulgarAbajo"

interface ElementoEventoProps {
    evento: Evento | null,
    borroso: boolean,
    pulsacionLarga?: any,
    ampliado: boolean,
    setEventoAmpliadoLayout?: any
}
//Props que acepta
//evento, el qual te tots els atributs de la tabla de eventos més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega
//borroso - si esta borros o no
//onLongPress - li pasem desde el home pa cambiar el hook del evento ampliat
//setEventoAmpliadoLayout
const ElementoEventoAsociacionAnterior: React.FC<ElementoEventoProps> = ({ evento, borroso, pulsacionLarga, ampliado, setEventoAmpliadoLayout }) => { //Pa que lo que se pase siga de tipo evento



    //Comprovem el color que te
    const [expandidoAsistencias, setExpandidoAsistencias] = useState(false)
    const { usuario, cargandoUsuario } = useAuth()

    const { data: asistencias, isLoading: cargandoAsistencias, error: errorAsistencias } = recibirAsistencias(evento?.id_evento, false)
    const { data: numeroOpinionesPositivas, isLoading: cargandoOpinionesPositivas, error: errorOpinionesPositivas } = recibirOpinionesPositivas(evento?.id_evento)
    const { data: numeroOpinionesNegativas, isLoading: cargandoOpinionesNegativas, error: errorOpinionesNegativas } = recibirOpinionesNegativas(evento?.id_evento)
    const { data: numeroComentarios, isLoading: cargandoComentarios, error: errorComentarios } = recibirNumeroComentarios(evento?.id_evento)

    let color = asignarColor(evento?.color_evento)

    let totalOpiniones = numeroOpinionesNegativas + numeroOpinionesPositivas
    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha = evento?.fecha_evento.split("-")[2] + " " + mes + " " + evento?.fecha_evento.split("-")[0]

    const itemRef = useRef<View>(null);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)


    //DISENY
    return (

        <Pressable ref={itemRef} onPress={()=>router.navigate({pathname:`/EventosAsociacion/Comentarios`, params:{id_evento:evento?.id_evento, colorFondo : color.colorFondo, colorTexto: color.colorTitulo}}as any)} style={[styles.contenedorElemento, { height: expandidoAsistencias ? 210 : 205, flexDirection: "column", marginBottom: expandidoAsistencias ? 0 : 17 }]}>
            <View style={{ flex: 1, borderRadius: 22, borderCurve: "continuous", shadowColor: "black", shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: expandidoAsistencias ? 0.25 : 0.185, elevation: 2 }}>
                {/* Contenedor normal */}
                <View style={[styles.contenedorElemento, { flex: 1, backgroundColor: "white", overflow: "hidden", marginBottom: 0, borderRadius: 22, borderCurve: "continuous", shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: expandidoAsistencias ? 0.25 : 0.525, elevation: 2 }]}>


                    {/* Titulo */}

                    <View style={{ justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 19, height: 60, alignItems: "center", backgroundColor: color.colorTitulo, opacity: 1 }}>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titulo, { color: "white" }]}>{evento?.titulo_evento}</Text>
                        <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titulo, { color: "white", fontSize: 17, fontWeight: 600 }]}>{fecha}</Text>

                    </View>

                    {/* Porcentaje likes */}
                    <View style={{ flex: 1, rowGap: 15, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, }}>

                        {/* Texto */}
                        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 42, opacity: 0.8, fontWeight: "600", color: "#D03737" }} numberOfLines={1} adjustsFontSizeToFit >{numeroOpinionesNegativas}</Text>
                            {/* Comentarios */}
                            <View style={{ alignItems: "center",flexDirection:"row", justifyContent: "center", rowGap: 7 }}>

                                <Text style={{ fontSize: 18, color: color.colorTitulo, fontWeight: "600" }}>{numeroComentarios} comentarios </Text>
                                
                            </View>
                            <Text style={{ fontSize: 42, opacity: 0.8, fontWeight: "600", color: "#4BBA40", }} numberOfLines={1} adjustsFontSizeToFit >{numeroOpinionesPositivas}</Text>
                        </View>

                        {/* Barra de porcentaje */}
                        <View style={{ overflow: "hidden", flexDirection: "row", height: 40, borderRadius: 14, borderCurve: "continuous" }}>

                            {/* Porcentaje negatiu */}
                            <View style={{ flex: numeroOpinionesNegativas === 0 ? 1 : numeroOpinionesNegativas, justifyContent: "center", opacity: 0.8, backgroundColor: "#D03737" }}>
                                <IconoPulgarAbajo style={{ marginLeft: 15 }}></IconoPulgarAbajo>
                            </View>

                            {/* Porcentaje positiu */}
                            <View style={{ flex: numeroOpinionesPositivas === 0 ? 1 : numeroOpinionesPositivas, justifyContent: "center", alignItems: "flex-end", opacity: 0.8, backgroundColor: "#4BBA40" }}>
                                <IconoPulgarArriba style={{ marginRight: 15 }}></IconoPulgarArriba>
                            </View>

                                                        

                        </View>


                    </View>

                    <View style={styles.contenedorImagen}>
                        <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="../assets.images.fallbackLogoAsociacion.png" ruta={evento?.asociaciones.logo_asociacion}></ImagenRemotaLogoAsociacion>
                    </View>

                </View>


            </View>


        </Pressable>
    );
};

export default ElementoEventoAsociacionAnterior;

const styles = StyleSheet.create({


    contenedorElemento: {

        display: "flex",


    },

    contenedorImagen: {
        position: "absolute",
        right: 2,
        top: 2,
        height: 100,
        width: 100,
        opacity: 0
    },

    imagenLogoAsociacion: {

        flex: 1,
        objectFit: "contain"

    },
    titulo: {

        fontWeight: "700",
        fontSize: 22
    },
    subtexto: {

        fontWeight: "700",
        fontSize: 14,
        opacity: 0.7
    },

})

