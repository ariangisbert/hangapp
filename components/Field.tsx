
import {StyleSheet, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const Field= (props:any)=>{


    //Props que acepta
    //color - Objecte de tipo Color en dos propietats, color 1 i color 2
    //width - anchura del boto
    //placeholder - placeholder
    //onChangeText - Li pasem una funció, es a dir un manejador que cambiará el valor de la variable en el conext de la pantalla on creem este component.
    //autoComplete - Torna el tipo de text que se autocompletara
    const [texto, setTexto] = useState("")

    return (
        <View style={{width:props.width,alignSelf:"center", opacity:0.7 }}> 
                    <View
                        style={[styles.fondoDegradado, {backgroundColor:props.color}]}>
                           {/*Text input*/}

                            <TextInput
                                style={styles.input}
                                placeholder = {props.placeholder}
                                placeholderTextColor={"#ffffffb5"}
                                value={texto}
                                secureTextEntry = {props.secureTextEntry?true:false} 
                                onChangeText={(nuevoTexto)=> {
                                    setTexto(nuevoTexto)
                                    props.onChangeText(nuevoTexto)}}
                                autoCorrect={false}
                                autoCapitalize="none"
                                autoComplete={props.autoComplete}
                            />

                    </View>
        </View>
    )

}


export default Field

const styles = StyleSheet.create({

    fondoDegradado: {
        
        paddingHorizontal:20,
        height:65,
        alignItems: 'center',
        borderRadius: 22,
        borderCurve: "continuous",
        display:"flex"
    },
    input:{
        
        color:"white",
        fontSize: 15,
        fontWeight: "500",
        width:"100%",
        textAlign:"center",
        height:"100%"


    }


})