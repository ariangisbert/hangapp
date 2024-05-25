import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text } from 'react-native';

const Participacion = (props:any) => {

  return (
    <View style={{borderRadius:13, flexBasis:"31.4%",  borderCurve:"continuous",justifyContent:"center", height:50, alignItems:"center",width:100, backgroundColor:Colors.MoradoElemento.colorTitulo}}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={{color:"white", fontSize:20, fontWeight:"700"}}>{props.numero}</Text>
    </View>
  );
};

export default Participacion;