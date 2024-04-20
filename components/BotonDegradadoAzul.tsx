import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient"

//ATRIBUTS QUE ACEPTA

//width - anchura del boto
//texto - text del boto

const BotonDegradadoAzul = (props:any) =>{

        return(

                <Pressable style={{width:parseInt(props.width), alignSelf:"center"}}>
                    <LinearGradient
                        // Button Linear Gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#4e54c8', '#8f94fb']}
                        style={styles.fondoDegradado}>
                        <Text style={styles.texto}>{props.texto}</Text>
                    </LinearGradient>
                </Pressable>

                

        )
}


export default BotonDegradadoAzul

const styles = StyleSheet.create({


    fondoDegradado: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 22,
    },

    texto: {
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: "500",
        color: '#ffffff',
    },





})