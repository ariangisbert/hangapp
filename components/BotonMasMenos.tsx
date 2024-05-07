import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


//props que acepta
//onPressMas - Funció que es realitzarà quan apretem el boto de mes
//onPressMenos - Funció que es realitzarà quan apretem el boto de menos
//color - El color del element
//value - Hook del valor de la cantidad actual
const BotonMasMenos = (props:any) => {
    
    
    let color = props.color
    return (
        <View style={[styles.contenedorPrincipal, {backgroundColor:color.colorTitulo}]}>

            <Pressable onPress={props.onPressMenos} style={styles.contenedorLateral}>
                <Text style={[styles.textoSimbolo, {lineHeight:34.1, fontSize:31}]}>-</Text>
            </Pressable>

            <View style={[styles.contenedorCentral,{backgroundColor:color.colorFondo}]}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{fontSize:31, fontWeight:"600", textAlign:"center", color:color.colorTitulo}}>{props.valor}</Text>
            </View>

            <Pressable onPress={props.onPressMas} style={styles.contenedorLateral}>
                <Text style={styles.textoSimbolo}>+</Text>
            </Pressable>
        </View>
    );
};

export default BotonMasMenos;

const styles = StyleSheet.create({

    contenedorPrincipal: {

        height: "100%",
        flexGrow: 0,
        flexBasis: 130,
        flexShrink: 0,
        borderRadius: 20,
        borderCurve: "continuous",
        flexDirection: "row",
    },
    contenedorCentral: {

        flexGrow:2.2,
        borderRadius:5,
        borderCurve:"continuous",
        borderTopWidth: 5,
        borderBottomWidth:5,
        justifyContent:"center",
        borderColor:Colors.MoradoElemento.colorTitulo,
    },

    contenedorLateral:{
        flexGrow:0,
        flexBasis:34,
        justifyContent:"center"
    },
    textoSimbolo:{
        textAlign:"center",
        color:"white",
        fontWeight:"600",
        fontSize:26

    }



})