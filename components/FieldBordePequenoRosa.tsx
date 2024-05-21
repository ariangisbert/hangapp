import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

//Parametros
//altura - Altura del field
//placeholder
//style
//multiline
//longitudMaxima
//onChangeText
const FieldBordePequenoRosa = (props:any) => {
  
  const [enfocado, setEnfocado] = useState(false)
  const [texto, setTexto] = useState("")
  
  
  return (

    <TextInput 
      onChangeText={(nuevoTexto)=> {
        setTexto(nuevoTexto)
        props.onChangeText(nuevoTexto)}
      }
      value={texto}
      onBlur={()=>setEnfocado(false)} 
      onFocus={()=>setEnfocado(true)}  
      placeholderTextColor={"#7D6D89"} 
      autoCorrect={false} 
      multiline= {props.multiline}
      placeholder={props.placeholder} 
      style={{borderWidth:enfocado?2:1.5, paddingHorizontal:10, fontSize:17, color:"#2D2D2D", backgroundColor:"#FCF0FE", borderColor:enfocado?"#BC77EE":"#DEC5F0",borderRadius:14, textAlign:"center", fontWeight:"600", borderCurve:"continuous",  height:props.altura, ...props.style, shadowColor:"#E3C6F8", shadowOffset:{height:1.4}, shadowOpacity:0.5, shadowRadius:1}}/>
    
  );
};

export default FieldBordePequenoRosa;