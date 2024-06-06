import React, { useState } from "react";
import { Text, Pressable, StyleSheet, View, ActivityIndicator } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"
//ATRIBUTS QUE ACEPTA


//texto - text del boto
//color - Objecte en el color del fondo
//onPress - Funció que se gastará en el onPress
//disabled - Si esta desactivat
//flex - Per a ferlo flex i llevarli el padding
//cargando - si el boto esta carregant algo

const Boton = (props:any) =>{

        const [pulsado, setPulsado] = useState(false)
   
        return(

                <Pressable onPressIn={()=>setPulsado(true)} onPressOut={()=>setPulsado(false)} onPress={props.onPress} disabled={props.disabled} style={{flex:1,justifyContent:"center", opacity:props.disabled||pulsado?0.7:1}}>
                    <View style={[styles.fondoDegradado, {backgroundColor:props.color+"", paddingHorizontal:props.flex?0:60}]}>
                       
                        {props.cargando?<ActivityIndicator color={"white"}></ActivityIndicator>
                        :
                        <Text style={styles.texto}>{props.texto}</Text>}
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