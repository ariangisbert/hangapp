import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//props que acepta
//unidad
const ContenedorUnidad = (props:any) => {
  return (
    <View style={styles.contenedorUnidad}>

                
                <View style={styles.cajaUnidad}>
                 <Text style={styles.textoUnidad}>{props.unidad<=0?"0":props.unidad.toString().length ==1?"0": props.unidad.toString().split("")[0]}</Text>
                </View>
                <View style={styles.cajaUnidad}>
                    <Text style={styles.textoUnidad}>{props.unidad<=0?"0":props.unidad.toString().length <=1?props.unidad.toString().length==0?"0": props.unidad.toString().split("")[0]: props.unidad.toString().split("")[1]}</Text>
                </View>
            </View>
  );
};

export default ContenedorUnidad;

const styles = StyleSheet.create({

    contenedorUnidad:{
  
      flex:1,
      flexDirection:"row",
      columnGap:6,
      height:"100%"
    },
    cajaUnidad:{
  
      flex:1,
      backgroundColor:"#BEC0E9",
      borderRadius:8,
      borderCurve:"continuous",
      alignItems:"center",
      justifyContent:"center",
  
    },
    textoUnidad:{
      fontWeight:"700",
      fontSize:26,
      color:"#4348B1"
  
  
    }
  
  })