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

            
        default:
            color= Colors.MoradoElemento    

    }



  return (
    <View style={[styles.contenedorElemento,{backgroundColor:color.colorFondo}]}>
        {/* <ImagenRemotaLogoAsociacion style={styles.imagenLogoAsociacion} fallback="./assets.images.fallbackLogoAsociacion.png" ruta={"logopng.png"}></ImagenRemotaLogoAsociacion> */}
      {/* <Text>{evento?.asociaciones?.logo_asociacion}</Text> */}
    </View>
  );
};

export default ElementoEvento;

const styles = StyleSheet.create({


    contenedorElemento:{

        height:100,
        marginBottom:10,
        borderRadius:22,
        borderCurve:"continuous",
        

    }, 

    imagenLogoAsociacion:{

        flex:1,

    }



})

