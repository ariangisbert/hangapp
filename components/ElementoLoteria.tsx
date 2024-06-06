import { Evento, Loteria } from '@/assets/types';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Animated, TouchableWithoutFeedback } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { numeroAMes, numeroAMesShort } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';

interface ElementoLoteriaProps {
    loteria: Loteria | null,
}

//El unic prop que acepta es un evento, el qual te tots els atributs de la tabla de eventos més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega

const ElementoLoteria: React.FC<ElementoLoteriaProps> = ({ loteria }) => { //Pa que lo que se pase siga de tipo evento

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
          toValue: 0.96,
          useNativeDriver: true,
        }).start();
      };
    
      const handlePressOut = () => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      };

    //Comprovem el color que te

    let color

    switch (loteria?.color) {

        case ("morado"):
            color = Colors.MoradoElemento
            break;
        case ("rojo"):
            color = Colors.RojoElemento
            break
        case ("verde"):
            color = Colors.VerdeElemento
            break
        default:
            color = Colors.MoradoElemento

    }

    //Ara agarrem el mes
    let mes = numeroAMesShort(loteria?.fecha.split("-")[1])
    //I fem la fecha
    let fecha=loteria?.fecha.split("-")[2]+" "+mes+" "+loteria?.fecha.split("-")[0]


    //DISENY
    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={()=>router.navigate({pathname:`/RifasUsuario/Loteria`, params:{id:loteria?.id, colorPasado:loteria?.color}}as any)}>
            <Animated.View style={[styles.contenedorElemento, {transform: [{ scale: scaleAnim }], backgroundColor: color.colorTitulo, shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: 0.2, elevation: 2 }]}>
            <View style={styles.contenedorTitulo}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={styles.titulo}>{loteria?.titulo}</Text>
            </View>

            <View style={styles.contenedorNumero}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.numero}>{loteria?.numero}</Text>
            </View>

            <View style={styles.contenedorFecha}>
                    <Text style={styles.fecha}>{fecha}</Text>
            </View>

            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default ElementoLoteria;

const styles = StyleSheet.create({


    contenedorElemento: {

        height: 125,
        width:183,
        alignSelf:"center",
        borderRadius: 22,
        borderCurve: "continuous",
        display: "flex",
        marginRight:22


    },

    contenedorTitulo: {
        flex: 1,
        justifyContent:"center",
        paddingHorizontal:5,

    },
    contenedorNumero: {
        flex: 0.70,
        justifyContent:"center"
    },
    contenedorFecha: {
        flex: 1,
        justifyContent:"center"
    },

    titulo: {

        fontWeight: "700",
        textAlign:"center",
        color:"white",
        fontSize: 17,
    },
    numero: {

        fontWeight: "700",
        textAlign:"center",
        color:"white",
        fontSize: 32,
        letterSpacing:1
    },
    fecha: {
        textAlign:"center",
        fontWeight: "700",
        fontSize: 14,
        color:"white",
        opacity: 0.76
    },

})

