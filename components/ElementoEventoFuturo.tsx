import { asignarColor, numeroAMesShort } from '@/constants/funciones';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, Pressable } from 'react-native';

const ElementoEventoFuturo = (props:any) => {
  
    let evento = props.eventoFuturo.eventos
    let color = asignarColor(evento.color_evento)

    let mes = numeroAMesShort(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]


    return (  
    <Pressable style={{height:"100%",width:120, paddingHorizontal:6,marginRight:15,paddingVertical:15, alignItems:"center", backgroundColor:color.colorFondo, borderRadius:20, borderCurve:"continuous", justifyContent:"space-between",shadowColor: color.colorFondo, shadowOffset: { width: 0, height: 6 }, shadowRadius: 8, shadowOpacity: 0.525, elevation: 2  }}>
        <View style={{flexGrow:0.1}}>
            <Text numberOfLines={2} adjustsFontSizeToFit style={{color:color.colorTitulo, textAlign:"center",fontWeight:"700", fontSize:14}}>{evento.titulo_evento}</Text>
        </View>
        <View style={{}}>
         <Text  numberOfLines={1} adjustsFontSizeToFit style={{color:color.colorTitulo, textAlign:"center",fontWeight:"700", fontSize:14, opacity:0.76}}>{fecha}</Text>
        </View>
        <View style={{}}>
         <Text numberOfLines={1} adjustsFontSizeToFit style={{color:color.colorTitulo, textAlign:"center",fontWeight:"700", fontSize:14, opacity:0.76}}>{evento?.hora_evento.substring(0, 5)}</Text>  
        </View>    
    </Pressable>
  );
};

export default ElementoEventoFuturo;