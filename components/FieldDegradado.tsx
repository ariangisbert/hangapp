
import {StyleSheet, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const FieldDegradado= (props:any)=>{


    //Props que acepta
    //color - Objecte de tipo Color en dos propietats, color 1 i color 2
    //width - anchura del boto
    //placeholder - placeholder
    //onChangeText - Li pasem una funció, es a dir un manejador que cambiará el valor de la variable en el conext de la pantalla on creem este component.

    const [texto, setTexto] = useState("")

    return (
        <View style={{width:props.width,alignSelf:"center", opacity:0.7 }}> 
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[props.color.color1, props.color.color2]}
                        style={styles.fondoDegradado}>
                           {/*Text input*/}

                            <TextInput
                                style={styles.input}
                                placeholder = {props.placeholder}
                                value={texto}
                                onChangeText={(nuevoTexto)=> {
                                    setTexto(nuevoTexto)
                                    props.onChangeText(nuevoTexto)}}
                                    autoCorrect={false}
                            />

                    </LinearGradient>
        </View>
    )

}


export default FieldDegradado

const styles = StyleSheet.create({

    fondoDegradado: {
        
        paddingHorizontal:60,
        paddingVertical:22.5,
        alignItems: 'center',
        borderRadius: 22,
        borderCurve: "continuous"
        
    },
    input:{
        
        color:"white",
        fontSize: 15,
        fontWeight: "500",

    }


})