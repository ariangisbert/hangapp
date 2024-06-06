import { Evento } from '@/assets/types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, LayoutAnimation, Animated, ActivityIndicator, TextInput } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { asignarColor, numeroAMes, numeroAMesShort } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/providers/AuthProvider';
import { recibirAsistencias } from '@/api/asistencias';
import { recibirNumeroComentarios, recibirOpinionesNegativas, recibirOpinionesPositivas, useInsertOpinion } from '@/api/opiniones';
import IconoPulgarArriba from "../assets/iconos/iconoPulgarArriba"
import IconoPulgarAbajo from "../assets/iconos/iconoPulgarAbajo"
import Field from './Field';

interface ElementoEventoProps {
    evento: Evento | null,
}
//Props que acepta
//eventosAsistidos
//debeSubir
const ElementoEventoUsuarioAnterior = (props:any) => { //Pa que lo que se pase siga de tipo evento

    let evento = props.eventoAsistido.eventos

    

    //Comprovem el color que te
    const [expandidoAsistencias, setExpandidoAsistencias] = useState(false)
    const { usuario, cargandoUsuario } = useAuth()
    const {mutate:insertOpinion} = useInsertOpinion()

   const [gustado, setGustado] = useState<any>(null)
   const [comentario, setComentario] = useState("")


    useEffect(()=>{


        console.log("ahora")
        if(gustado===null){
             
        }else{
           insertOpinion({id_evento:evento?.id_evento,id_usuario: usuario.id,gustado:gustado, comentario:comentario })
        }



    }, [props.debeSubir])

   

    let color = asignarColor(evento?.color_evento)

    //Ara agarrem el mes
    let mes = numeroAMesShort(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha = evento?.fecha_evento.split("-")[2] + " " + mes + " " + evento?.fecha_evento.split("-")[0]

    const itemRef = useRef<View>(null);

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)


    //DISENY
    return (

        <Pressable onPress={()=>setExpandidoAsistencias(!expandidoAsistencias)} ref={itemRef} style={[styles.contenedorElemento, { height: expandidoAsistencias ? 240 : 150,  flexDirection: "column", marginBottom:expandidoAsistencias?0:  17 }]}>
            <View style={{ flex: 1, borderRadius: 22, borderCurve: "continuous", shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: expandidoAsistencias ? 0.25 : 0.525, elevation: 2 }}>
                {/* Contenedor normal */}
                <View style={[styles.contenedorElemento, { height:150,  flex: 1, backgroundColor: "white", overflow: "hidden", marginBottom: 0, borderRadius: 22, borderCurve: "continuous", shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: expandidoAsistencias ? 0.25 : 0.525, elevation: 2 }]}>


                    {/* Titulo */}

                    <View style={{ justifyContent: "space-between", columnGap:15, flexDirection: "row", paddingHorizontal: 19,  height: 60, alignItems: "center", backgroundColor: color.colorTitulo, opacity: 1 }}>
                       
                       <View style={{flex:2}}> 
                            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titulo, { color: "white" }]}>{evento?.titulo_evento}</Text>
                       </View>

                       <View style={{flex:1, justifyContent:"flex-end",}}>
                            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.titulo, { color: "white", fontSize: 17, fontWeight: 600 }]}>{fecha}</Text>
                       </View>
                    </View>

                    {/* Porcentaje likes */}
                    <View style={{ flex: 1, backgroundColor:color.colorFondo, rowGap: 15, alignItems: "center", justifyContent: "center", paddingHorizontal: 28, }}>

                        {/* Simbolos */}
                        <View style={{ flexDirection: "row", width: "100%",  justifyContent: "space-between", alignItems:"center" }}>
                            
                            <Pressable onPress={()=>setGustado(false)}>
                                 <IconoPulgarAbajo fill={gustado!==null?gustado?"white":"#c63b3b":"white"} noTransparente = {!(gustado!==null)} width={43} height={43} ></IconoPulgarAbajo>
                            </Pressable>

                            <Pressable onPress={()=>setGustado(true)} >
                                <IconoPulgarArriba fill={gustado!==null?gustado?"#4BBA40":"white":"white"} noTransparente = {!(gustado!==null)}  width={43} height={43} ></IconoPulgarArriba>
                            </Pressable>
                        </View>

                        


                    </View>


                </View>
               
                <View style={{height: expandidoAsistencias?90:0,paddingHorizontal:15,justifyContent:"flex-end",alignItems:"center", opacity:expandidoAsistencias?1:0, top:-22, zIndex:-1, borderRadius:22, borderTopLeftRadius:0, borderTopRightRadius:0, borderCurve:"continuous", backgroundColor:color.colorFondo}}>

                    <TextInput value={comentario} onChangeText={(nuevoTexto)=>setComentario(nuevoTexto)} style={{height:50,marginBottom:15,backgroundColor:"white", maxWidth:"100%",borderRadius:11, paddingVertical:5, borderCurve:"continuous", opacity:0.9, width:"100%", paddingHorizontal:10}} placeholder='Comentario' multiline></TextInput>

                </View>


            </View>


        </Pressable>
    );
};

export default ElementoEventoUsuarioAnterior;

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

