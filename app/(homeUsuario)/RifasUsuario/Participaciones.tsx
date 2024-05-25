import Colors from '@/constants/Colors';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const Participaciones = () => {
  return (
    <View style={{backgroundColor:"transparent",justifyContent:"flex-end", height:"100%"}}>
      <Pressable onPress={router.back} style={{flex:1}}>

      </Pressable>
    <View style={styles.contenedorPrincipal}>

      <View style={{height:70,borderRadius:16,marginTop:14,marginHorizontal:12, alignItems:"center",justifyContent:"center",borderCurve:"continuous",backgroundColor:Colors.MoradoElemento.colorTitulo, shadowOpacity:0.2,  shadowColor:"black", shadowRadius:9,shadowOffset:{width:0, height:-2}}}>

      <Text style={{fontWeight:"600", color:"white", fontSize:22}}>Mis números</Text>

      </View>
      
    </View>
    </View>
  );
};

export default Participaciones;

const styles = StyleSheet.create({


    contenedorPrincipal:{
      backgroundColor:"white",
      height:"38%",
      borderRadius:22,
      borderCurve:"continuous",
       
    }




})