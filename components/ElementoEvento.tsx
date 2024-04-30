import { Evento } from '@/assets/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ImagenRemotaLogoAsociacion from './ImagenRemotaLogoAsociacion';
import Colors from '@/constants/Colors';

interface ElementoEventoProps {
    evento: Evento|null,
  }

//El unic prop que acepta es un evento, el qual te tots els atributs de la tabla de eventos més el logo de les asociacioms
//Al fer la consulta mos tornen un objecte asociaciones dins del evento i dins de este està la ruta de la imatge
//Fallback es la imatge que gastarem si no carrega

const ElementoEvento: React.FC<ElementoEventoProps> = ({evento}) => { //Pa que lo que se pase siga de tipo evento

    console.log("\n")
    console.log(evento)

    //Comprovem el color que te
    
    let color

    switch(evento?.color_evento){

        case("morado"):
            color= Colors.MoradoElemento
            break;
        case("rojo"):
            color = Colors.RojoElemento
            break
        default:
            color= Colors.MoradoElemento    

    }



    //DISENY
    return (
      <View style={[styles.contenedorElemento,{backgroundColor:color.colorFondo, shadowColor:color.colorFondo, shadowOffset:{width:0, height:6}, shadowRadius:8, shadowOpacity:0.525, elevation:2}]}>
          
          {/* Parte izquierdas */}
            <View style={styles.contenedorIzquierda}>
                {/* Titulo i gratuidad */}
                <View style={[styles.contenedorVertical, {justifyContent:"flex-end"}]}>
                    <Text style={[styles.titulo, {color:color.colorTitulo}]}>{evento?.titulo_evento}</Text>
                </View> 

                {/* Mini descripcion */ }
                <View style={{justifyContent:"center", flex:1.3,}}>
                    <Text style={[styles.subtexto, {color:color.colorTitulo}]}  numberOfLines={1}>{evento?.mini_descripcion_evento}</Text>
                </View>


                <View style={styles.contenedorVertical}>
                    <Text style={[styles.subtexto, {color:color.colorTitulo}]}>{evento?.titulo_evento}</Text>
                </View>                  
            </View>


          {/* Parte derecha */}
            <View style={styles.contenedorDerecha}>
            <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="../assets.images.fallbackLogoAsociacion.png" ruta={"logopng.png"}></ImagenRemotaLogoAsociacion>
            </View>
         
         
          {/* <Text>{evento?.asociaciones?.logo_asociacion}</Text> */}
      </View>
    );
};

export default ElementoEvento;

const styles = StyleSheet.create({


    contenedorElemento:{

        height:105,
        marginBottom:17,
        borderRadius:22,
        borderCurve:"continuous",
        display:"flex",
        flexDirection:"row"

        

    }, 

    contenedorIzquierda:{
        flex:2.5,
        flexDirection:"column",
        paddingLeft:17,
        paddingRight:8,

    },
    contenedorDerecha:{
        flexGrow:1,
    },

    contenedorVertical:{

        flex:1,

    },
    imagenLogoAsociacion:{

        flex:1,
        objectFit:"contain"

    },
    titulo:{

        fontWeight:"700",
        fontSize:17
    },
    subtexto:{

        fontWeight:"700",
        fontSize:14,
        opacity:0.7
    }




})

