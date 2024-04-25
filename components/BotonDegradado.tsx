import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"
//ATRIBUTS QUE ACEPTA


//texto - text del boto
//Color - Objecte en dos propietats, color1 i color2
//onPress - Funció que se gastará en el onPress

const BotonDegradado = (props:any) =>{

        return(

                <Pressable onPress={props.onPress} style={{alignSelf:"center"}}>
                    <LinearGradient
                        // Button Linear Gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[props.color.color1, props.color.color2]}
                        style={styles.fondoDegradado}>
                        <Text style={styles.texto}>{props.texto}</Text>
                    </LinearGradient>
                </Pressable>

                

        )
}


export default BotonDegradado

const styles = StyleSheet.create({


    fondoDegradado: {
        paddingHorizontal:60,
        paddingVertical:23.4,
        alignItems: 'center',
        borderRadius: 22,
        borderCurve: "continuous"
    },

    texto: {
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: "500",
        color: '#ffffff',
    },





})