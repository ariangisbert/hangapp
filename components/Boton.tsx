import React, { useState } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"
//ATRIBUTS QUE ACEPTA


//texto - text del boto
//color - Objecte en el color del fondo
//onPress - Funció que se gastará en el onPress
//disabled - Si esta desactivat
//flex - Per a ferlo flex i llevarli el padding
const Boton = (props:any) =>{

   
        return(

                <Pressable onPress={props.onPress} disabled={props.disabled} style={{flex:1,justifyContent:"center", opacity:props.disabled?0.7:1}}>
                    <View style={[styles.fondoDegradado, {backgroundColor:props.color+"", paddingHorizontal:props.flex?0:60}]}>
                        <Text style={styles.texto}>{props.texto}</Text>
                    </View>
                </Pressable>

                

        )
}


export default Boton

const styles = StyleSheet.create({


    fondoDegradado: {
        paddingHorizontal:60,
        paddingVertical:23.4,
        alignItems: 'center',
        borderRadius: 22,
        borderCurve: "continuous",
    },

    texto: {
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: "500",
        color: '#ffffff',
    },





})