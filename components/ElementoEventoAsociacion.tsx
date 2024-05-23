import { Evento } from '@/assets/types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, LayoutAnimation, Animated } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';
import { asignarColor, numeroAMes } from "../constants/funciones"
import { router } from 'expo-router';
import MiniCuadradoVerde from './MiniCuadradoVerde';
import { BlurView } from 'expo-blur';
import { useAuth } from '@/providers/AuthProvider';
import { recibirAsistencias } from '@/api/asistencias';

interface ElementoEventoProps {
    evento: Evento | null,
    borroso:boolean,
    pulsacionLarga?:any,
    ampliado:boolean,
    setEventoAmpliadoLayout?:any
}
//Props que acepta
//evento, el qual te tots els atributs de la tabla de eventos més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega
//borroso - si esta borros o no
//onLongPress - li pasem desde el home pa cambiar el hook del evento ampliat
//setEventoAmpliadoLayout
const ElementoEventoAsociacion: React.FC<ElementoEventoProps> = ({ evento, borroso, pulsacionLarga,ampliado,setEventoAmpliadoLayout}) => { //Pa que lo que se pase siga de tipo evento

    

    //Comprovem el color que te
    const [expandidoAsistencias, setExpandidoAsistencias] = useState(false)
    const {usuario, cargandoUsuario} = useAuth()
    
    const {data:asistencias,isLoading: cargandoAsistencias, error:errorAsistencias } = recibirAsistencias(evento?.id_evento, false)
    let color = asignarColor(evento?.color_evento)
    
    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]

    const itemRef = useRef<View>(null);


    useEffect(()=>{

        LayoutAnimation.configureNext({
            duration:300,
            create: {type: "easeInEaseOut", property: 'opacity'},
            delete: {type: "easeInEaseOut", property: 'opacity'},
          });

        if(ampliado){

            itemRef.current?.measure((fx, fy, width, height, px, py) => {
                setEventoAmpliadoLayout(py)
            });
            
        }

    }, [ampliado])

    function clickExpandir(){

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandidoAsistencias(!expandidoAsistencias)
    }


    //DISENY
    return (
        
            <Pressable ref={itemRef} onLongPress={()=>pulsacionLarga?pulsacionLarga(evento?.id_evento):null} onPress={clickExpandir} style={[styles.contenedorElemento, {height:expandidoAsistencias?210:105, flexDirection:"column",marginBottom:expandidoAsistencias?0:17 }]}>
                    
                    <View style={[styles.contenedorElemento, {flex:1,backgroundColor: color.colorFondo,flexDirection:"row", height:105,marginBottom:0, borderRadius: 22,borderCurve: "continuous",shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity:expandidoAsistencias?0.25: 0.525, elevation: 2}]}>
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
                                <View style={{ flex: 0.35, flexShrink:0,flexBasis:14 }}>
                                    <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{evento?.hora_evento.substring(0, 5)}</Text>
                                </View>

                                <View style={{ flex: 1.55, alignItems:"center"}}>
                                    <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{fecha}</Text>
                                </View>

                                <View style={{ flex: 1.0, paddingLeft:0.2}}>
                                    <Text style={[styles.subtexto, { color: color.colorTitulo }]}>{evento?.publico_evento}</Text>
                                </View>


                            </View>
                        </View>

                        {/* Parte derecha */}
                        <View style={styles.contenedorDerecha}>
                            <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="../assets.images.fallbackLogoAsociacion.png" ruta={evento?.asociaciones.logo_asociacion}></ImagenRemotaLogoAsociacion>
                        </View>

                     </View>

                    
                     <View style={{ flexDirection:"row", opacity:expandidoAsistencias?1:0, justifyContent:"space-evenly",paddingTop:expandidoAsistencias?22:0, height:expandidoAsistencias?105:0,top:-22,zIndex:-1,borderRadius:22,borderCurve:"continuous", marginHorizontal:22,backgroundColor:color.colorTitulo}}>
                        

                        <View style={{ justifyContent:"center"}}>
                            <Text style={{color:color.colorFondo,fontSize:20,fontWeight:"700", textAlign:"left"}}>
                                Asistentes{"\n"}confirmados
                            </Text>
                        </View>

                        {/* Numero asistencies */}
                        <View style={{ justifyContent:"center"}}>
                             <Text numberOfLines={1} adjustsFontSizeToFit style={{color:color.colorFondo,fontSize:33,letterSpacing:0.5,fontWeight:"700", textAlign:"center"}}>
                                {asistencias*1200}
                            </Text>
                        </View>        
                     </View> 
                      
                       
            </Pressable>
    );
};

export default ElementoEventoAsociacion;

const styles = StyleSheet.create({


    contenedorElemento: {

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

