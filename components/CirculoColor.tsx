import React from 'react';
import { View, Text, Pressable } from 'react-native';

//Props que acepta
//onPress
//color
//colorSeleccionado
//nombreColor

const CirculoColor = (props:any) => {
  return (
    <Pressable onPress={props.onPress} style={{height:50, width:50, borderRadius:60,  backgroundColor:props.color.colorFondo, borderColor:props.color.colorTitulo, borderWidth:props.colorSeleccionado==props.nombreColor?3.5:0}}></Pressable>
  );
};

export default CirculoColor;