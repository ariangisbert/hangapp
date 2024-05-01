import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MiniCuadradoVerde = () => {
  return (
    <View style={styles.contenedorPrincipal}>
        <Text style={styles.texto}>Gratis</Text>
    </View>
  );
};

export default MiniCuadradoVerde;

const styles = StyleSheet.create({

    contenedorPrincipal:{

        backgroundColor:"#6CC142",
        borderRadius:5, 
        borderCurve:"continuous", 
        paddingHorizontal:5, 
        paddingVertical:0.5,
        marginBottom:1.7,
        width:55,

    },
    texto:{

        fontWeight:"700",
        color:"white",
        textAlign:"center"

    }


})