import { Evento } from '@/assets/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, LayoutAnimation } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import Animated from 'react-native-reanimated';
import { numeroAMes } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';

interface ElementoEventoProps {
    evento: Evento | null,
}

//El unic prop que acepta es un evento, el qual te tots els atributs de la tabla de eventos més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega

const ElementoEvento: React.FC<ElementoEventoProps> = ({ evento }) => { //Pa que lo que se pase siga de tipo evento

    

    //Comprovem el color que te

    let color

    switch (evento?.color_evento) {

        case ("morado"):
            color = Colors.MoradoElemento
            break;
        case ("rojo"):
            color = Colors.RojoElemento
            break
        default:
            color = Colors.MoradoElemento

    }

    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]


    //DISENY
    return (
        <Pressable  onPress={()=>router.navigate({pathname:`/EventosUsuario/[id_evento]`, params:{id_evento:evento?.id_evento, colorFondo : color.colorFondo, colorTexto: color.colorTitulo}}as any)} style={[styles.contenedorElemento, { backgroundColor: color.colorFondo, shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: 0.525, elevation: 2}]}>
         
            {/* Parte izquierdas */}
                <View style={styles.contenedorIzquierda}>
                    
                    {/* Titulo i gratuidad */}
                    <View style={{ alignItems: "flex-end",flex:1, flexDirection:"row", columnGap:10}}>
                        <Text style={[styles.titulo, { color: color.colorTitulo }]}>{evento?.titulo_evento}</Text>
                        
                        {/* Cuadraet verd gratis */}
                        {evento?.gratis_evento==true? 
                            <MiniCuadradoVerde texto={"Gratis"}/>: null
                        }
                    </View>
                
                    {/* Mini descripcion */}
                    <View style={{ justifyContent: "center", flex: Platform.OS === "ios" ? 1.22 : 1 }}>
                        <Text style={[styles.subtexto, { color: color.colorTitulo }]} numberOfLines={1}>{evento?.mini_descripcion_evento}</Text>
                    </View>

                    {/* Hora fecha y publico */}
                    <View style={{flex:0.9,flexDirection: "row" }}>
                        <View style={{ flex: 0.30, flexShrink:0,flexBasis:14 }}>
                            <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{evento?.hora_evento.substring(0, 5)}</Text>
                        </View>

                        <View style={{ flex: 1.55, alignItems:"center"}}>
                            <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{fecha}</Text>
                        </View>

                        <View style={{ flex: 0.95, paddingLeft:0.2}}>
                            <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{evento?.publico_evento}</Text>
                        </View>


                    </View>
                </View>

                {/* Parte derecha */}
                <View style={styles.contenedorDerecha}>
                    <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="../assets.images.fallbackLogoAsociacion.png" ruta={evento?.asociaciones.logo_asociacion}></ImagenRemotaLogoAsociacion>
                </View>
                       
        </Pressable>
    );
};

export default ElementoEvento;

const styles = StyleSheet.create({


    contenedorElemento: {

        height: 105,
        marginBottom: 17,
        borderRadius: 22,
        borderCurve: "continuous",
        display: "flex",
        flexDirection: "row"


    },

    contenedorIzquierda: {
        flex: 2.5,
        flexDirection: "column",
        paddingLeft: 17,
        paddingRight: 8,

    },
    contenedorDerecha: {
        flexGrow: 1,
    },

    imagenLogoAsociacion: {

        flex: 1,
        objectFit: "contain"

    },
    titulo: {

        fontWeight: "700",
        fontSize: 17
    },
    subtexto: {

        fontWeight: "700",
        fontSize: 14,
        opacity: 0.7
    },

})

