import { Evento, Rifa } from '@/assets/types';
import React from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { numeroAMes } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';

interface ElementoRifaProps {
    rifa: Rifa | null,
}

//El unic prop que acepta es una rifa, el qual te tots els atributs de la tabla de rifes més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega

const ElementoRifaAnterior: React.FC<ElementoRifaProps> = ({ rifa }) => { //Pa que lo que se pase siga de tipo evento

    

    //Comprovem el color que te

    let color = Colors.MoradoElemento

    //Ara agarrem el mes
    let mes = numeroAMes(rifa?.fecha.split("-")[1])
    //I fem la fecha
    let fecha=rifa?.fecha.split("-")[2]+" "+mes+" "+rifa?.fecha.split("-")[0]


    //DISENY
    return (
        <Pressable onPress={()=>router.navigate({pathname:`/RifasUsuario/ResultadoRifa`, params:{id:rifa?.id}}as any)} style={[styles.contenedorElemento, { backgroundColor: color.colorFondo, shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: 0.525, elevation: 2 }]}>
           
            {/* Parte izquierdas */}
            <View style={styles.contenedorIzquierda}>
                
                {/* Titulo*/}
                <View style={{ justifyContent: "flex-end",flex:1.05}}>
                    <Text numberOfLines={1} style={[styles.titulo, { color: color.colorTitulo }]}>Rifa {rifa?.titulo}</Text>
                    
                </View>

                {/*Fecha*/}
                <View style={{flex:1,justifyContent:"flex-start"}}>
                    
                        <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{fecha}</Text>
                    
                </View>
            </View>


            {/* Parte derecha */}
            <View style={styles.contenedorDerecha}>
                <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="../assets.images.fallbackLogoAsociacion.png" ruta={rifa?.asociaciones.logo_asociacion}></ImagenRemotaLogoAsociacion>
            </View>


           
            
        </Pressable>
    );
};

export default ElementoRifaAnterior;

const styles = StyleSheet.create({


    contenedorElemento: {

        height: 91,
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
        rowGap:11.5,

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
        fontSize: 19
    },
    subtexto: {

        fontWeight: "700",
        fontSize: 15.5,
        opacity: 0.7
    },

})