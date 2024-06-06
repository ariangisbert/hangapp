import { Evento, Rifa } from '@/assets/types';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, LayoutAnimation, ActivityIndicator, Alert, Animated, TouchableWithoutFeedback } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { numeroAMes } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';
import { useUpdateReservaGestionada } from '@/api/loteria';
import { useAuth } from '@/providers/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import call from "react-native-phone-call"



//Props que acepta
//reserva - El elemento loteria en si
//color - El color del element, el del text va a ser sempre blanc

const ElementoReserva = (props:any) => { //Pa que lo que se pase siga de tipo evento

    const queryClient = useQueryClient();
    const {usuario, cargandoUsuario} = useAuth()
    const [ampliado, setAmpliado] = useState(false)
    const [cargandoUpdate, setCargandoUpdate] = useState(false)
    const {mutate:updateReserva} = useUpdateReservaGestionada()
    const scaleAnim = useRef(new Animated.Value(1)).current;

    
    if(cargandoUsuario){
        return<ActivityIndicator></ActivityIndicator>
    }
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

    const idUsuario = usuario.id
    const reserva = props.reserva

    function clickAmpliar(){

        
            LayoutAnimation.configureNext({
                duration: 600,
                create: {type: 'linear', property: 'opacity'},
                update: {type: 'spring', springDamping: 0.6},
                delete: {type: 'linear', property: 'opacity'},
              });
            setAmpliado(!ampliado)
        
    }

    async function clickGestionar(){

   
    setCargandoUpdate(true)
    updateReserva({id_usuario:reserva.id_usuario,id_loteria:reserva.id_loteria},
        
        {onSuccess:()=>{setCargandoUpdate(false);setAmpliado(false)}})


    }

    function llamar(){

        call({number:reserva.numero_telefono,  skipCanOpen: true})

    }

    //DISENY
    return (
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={clickAmpliar}>
        <Animated.View  style={[styles.contenedorElemento, {transform: [{ scale: scaleAnim }],  height:ampliado?130:91, backgroundColor: props.color, shadowColor: props.color, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: 0.15, elevation: 2, opacity:reserva.gestionada?0.7:1 }]}>
           
            {/* Contenido no ampliado, sempre es estatic */}
            <View style={styles.contenedorNoAmpliado}>
                
                {/* Titulo*/}
                <View style={{ justifyContent: "center"}}>
                    <Text numberOfLines={1} style={[styles.titulo, { color: "white", fontWeight:"600" }]}>{reserva.profiles.nombre + " "+reserva.profiles.apellidos}</Text>
                </View>

                <View style={{ justifyContent: "center", alignItems:"center"}}>
                    <Text style={{color:"white", fontWeight:"700"}}>Cantidad</Text>
                    <Text numberOfLines={1} style={[styles.titulo, { color: "white", fontSize:25, textAlign:"right" }]}>{reserva.cantidad}</Text>
                </View>
                

             
            </View>

            {/* Caja telefono y gestionado, soles visible quan esta ampliat */}
            { ampliado?<View style={{height:49,top:-17,paddingHorizontal:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                
                {/* Titulo*/}
                <View style={{flex:1, alignItems:"flex-start"}}>
                    <Pressable onPress={llamar} style={{ justifyContent: "center", backgroundColor:"white", paddingHorizontal:20, opacity:0.7, paddingVertical:5, borderRadius:12, borderCurve:"continuous"}}>
                        <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titulo, { color: props.color, fontWeight:"600", fontSize:18  }]}>{reserva.numero_telefono}</Text>
                    </Pressable>
                </View>

                <View  style={{flex:1, alignItems:"flex-end"}}>
                    <Pressable onPress={clickGestionar} disabled={(cargandoUpdate||reserva.gestionada)} style={{  justifyContent: "center", backgroundColor:"white", paddingHorizontal:20, opacity:0.7, paddingVertical:6, borderRadius:13, borderCurve:"continuous"}}>
                        {cargandoUpdate?
                        <ActivityIndicator/>
                        :
                        <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.titulo, { color: props.color, fontWeight:"600", fontSize:18  }]}>{reserva.gestionada?"Gestionada": "Hecho"}</Text>
                        }    
                        </Pressable>
                </View>
             
            </View>
            :null}


            


           
            
        </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default ElementoReserva;

const styles = StyleSheet.create({


    contenedorElemento: {

        height: 91,
        marginBottom: 17,
        borderRadius: 22,
        borderCurve: "continuous",
        display: "flex",
        
    },

    contenedorNoAmpliado: {
        height:91,
        width:"100%",
        flexDirection:"row",
        paddingHorizontal:20,
        justifyContent:"space-between",

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