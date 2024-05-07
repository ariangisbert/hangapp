import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//props que acepta
//texto
//grande - boolean
const MiniCuadradoVerde = (props:any) => {
  return (
    <View style={[styles.contenedorPrincipal, {paddingVertical:props.grande?1.9:0.5, width:props.grande?null:55}]}>
        <Text style={[styles.texto, {fontSize:props.grande?16:14}]}>{props.texto}</Text>
    </View>
  );
};

export default MiniCuadradoVerde;

const styles = StyleSheet.create({

    contenedorPrincipal:{

        backgroundColor:"#6CC142",
        borderRadius:5, 
        borderCurve:"continuous", 
        paddingHorizontal:6, 
        marginBottom:1.7,

    },
    texto:{

        fontWeight:"700",
        color:"white",
        textAlign:"center"

    }


})