import { recibirParticipaciones } from '@/api/participacionesRifas';
import Participacion from '@/components/Participacion';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';

const Participaciones = () => {


  const {idRifa} = useLocalSearchParams()

  const {usuario, cargandoUsuario} = useAuth()
  const {data:participaciones, isLoading:cargandoParticipaciones} = recibirParticipaciones(idRifa, usuario.id, cargandoUsuario)

  if(cargandoUsuario||cargandoParticipaciones){

    return <ActivityIndicator></ActivityIndicator>

  }


  return (
    <View style={{backgroundColor:"transparent",justifyContent:"flex-end", height:"100%"}}>
      <Pressable onPress={router.back} style={{flex:1}}>

      </Pressable>
    <View style={styles.contenedorPrincipal}>

      {/* CAIXA TITUlO */}
      <View style={{height:70,borderRadius:16,marginTop:14,marginHorizontal:12, alignItems:"center",justifyContent:"center",borderCurve:"continuous",backgroundColor:Colors.MoradoElemento.colorTitulo, shadowOpacity:0.2,  shadowColor:"black", shadowRadius:9,shadowOffset:{width:0, height:-2}}}>

        <Text style={{fontWeight:"600", color:"white", fontSize:22}}>Mis números</Text>

      </View>

      {/* Asi renderitzem les participacions */}
      <ScrollView contentContainerStyle={{paddingBottom:54}} style={{marginHorizontal:12, marginTop:14}}>
        <View style={{flex:1, flexWrap:"wrap", columnGap:10, rowGap:10, flexDirection:"row"}}>
          {participaciones.map((p:any)=><Participacion key={p.numero} numero={p.numero}></Participacion>)}
        </View>
      </ScrollView>
      
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