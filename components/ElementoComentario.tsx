import React from 'react';
import { View, Text } from 'react-native';
import ImagenRemotaFotoPerfil from './ImagenRemotaFotoPerfil';
import { useAuth } from '@/providers/AuthProvider';
import IconoPulgarAbajo from '@/assets/iconos/iconoPulgarAbajo';
import IconoPulgarArriba from '@/assets/iconos/iconoPulgarArriba';

const ElementoComentario = (props:any) => {
  
    //Props que acepta
    //comentario - el comentario que se torne de la base de datos, dins te comentario, profiles(nombre, apellidos)
  
   
    let comentario = props.comentario
  
    return (
    <View style={{ borderRadius:20,rowGap:12, borderCurve:"continuous",marginBottom:30}}>
      {/* Foto de perfil i nombre */}
      <View style={{flexDirection:"row",columnGap:15, height:45,}}>
        <ImagenRemotaFotoPerfil style={{aspectRatio:1, borderRadius:100}} ruta={comentario.profiles.avatar_url} fallback="../assets.images.fallbackLogoAsociacion.png"></ImagenRemotaFotoPerfil>
        <Text style={{alignSelf:"center", color:props.color+"", fontWeight:"500", fontSize:17}}>{comentario.profiles.nombre+" "+comentario.profiles.apellidos}</Text>
        
        
    </View>

      <Text style={{color:"black", fontSize:15,lineHeight:21.5, fontWeight:"300"}}>{comentario.comentario}</Text>
    </View>
  );
};

export default ElementoComentario;