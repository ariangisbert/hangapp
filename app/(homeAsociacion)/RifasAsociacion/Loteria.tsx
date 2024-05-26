import { recibirLoteria } from '@/api/loteria';
import { recibirRifa } from '@/api/rifas';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import BotonMasMenos from '@/components/BotonMasMenos';
import ContenedorUnidad from '@/components/ContenedorUnidad';
import Field from '@/components/Field';
import FieldDegradado from '@/components/FieldDegradado';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import ImagenRemotaRifa from '@/components/ImagenRemotaRifa';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import Colors from '@/constants/Colors';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const DetallesLoteria = () => {

    const {id, colorPasado} = useLocalSearchParams()
    let color

    switch (colorPasado) {

        case ("morado"):
            color = Colors.MoradoElemento
            break;
        case ("rojo"):
            color = Colors.RojoElemento
            break
        case ("verde"):
            color = Colors.VerdeElemento
            break
        default:
            color = Colors.MoradoElemento

    }

    let colorTexto = color.colorTitulo
    let colorFondo = color.colorFondo
    
    //Carreguem la rifa

    const {data:loteria, isLoading:cargandoLoteria, error} = recibirLoteria(id)



    if(cargandoLoteria){

      
      return <ActivityIndicator >
        {/* Pa que mentres se carreguen tinga igual el color de fondo */}
        <Stack.Screen options={{headerTintColor:colorTexto+""}}/> 
        
      </ActivityIndicator>

    }

    let mes = numeroAMes(loteria?.fecha.split("-")[1])
    //I fem la fecha
    let fecha=loteria?.fecha.split("-")[2]+" "+mes+" "+loteria?.fecha.split("-")[0]


    //Funcions de clicks
   

    return (
      <SafeAreaView style={{backgroundColor:"white",paddingBottom:8,justifyContent:"center", flex:1, paddingHorizontal:42}}>
        <Stack.Screen options={{headerTintColor:colorTexto+"",contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0.4, justifyContent:"center" }}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{loteria?.titulo}</Text>
        </View>

        {/* Contenedor Loteria */}
        <View style={{flexGrow:1.2,flexBasis:300, flexShrink:1, paddingHorizontal:24,borderRadius:24, borderCurve:"continuous", backgroundColor:color.colorTitulo, shadowOpacity:0.09, shadowColor:colorTexto+"", shadowRadius:9,shadowOffset:{width:0, height:4.5}}}>
          {/* Contenedor logo loteria */}
          <View style={{flex:1.15, alignItems:"center"}}>
            <Image style={styles.logo} source={require("../../../assets/images/logos/loteria.png")} />
          </View>

          {/* Contenedor numero */}
          <View style={{flex:1, justifyContent:"center"}}>
            <Text style={{fontWeight:"700", textAlign:"center", color:"white", fontSize:56, letterSpacing:4.8}}>{loteria?.numero}</Text>
          </View>

          {/* Contenedor fecha */}
          <View style={{flex:1, justifyContent:"center"}}>
            <Text style={{fontWeight:"700", textAlign:"center",letterSpacing:0.5, color:"white", fontSize:17,}}>{fecha}</Text>
          </View>

          {/* Contenedor preu */}
          <View style={{flexBasis:80,alignItems:"center"}}>
            {/* Caixa preu */}
            <View style={{flex:1,borderWidth:3,borderColor:"white",  width:98,}}>
              
              {/* TEXT PRECIO */}
              <View style={{flex:1,backgroundColor:"white",}}>
               <Text style={{fontWeight:"800", textAlign:"center",letterSpacing:2.48, color:"#3C3C3C", fontSize:17,}}>PRECIO</Text>
              </View>
              {/* PRECIO */}
              <View style={{flex:2.1, justifyContent:"center"}}>
              <Text style={{fontWeight:"700", textAlign:"center",letterSpacing:3, color:"white", fontSize:22,}}>{loteria?.precio}€</Text>
              </View>

            </View>

          </View>

          {/* Contenedor Asociacio */}
          <View style={{flex:1, justifyContent:"center"}}>
          <Text style={{fontWeight:"700", textAlign:"center",letterSpacing:0.5, color:"white", fontSize:17,}}>{loteria?.asociaciones.nombre_asociacion}</Text>
          </View>

        </View>

        


        <View style={{flexGrow:1, justifyContent:"center"}}>
          {/* Contenedor boton */}
          <View style={{flexGrow:0.01, flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:0, columnGap:20}}>
            <Boton onPress={()=>router.navigate({pathname:`/RifasAsociacion/ReservasLoteria`, params:{id:id, colorPasado:colorPasado}}as any)} flex texto="Ver reservas" color={colorTexto+""}></Boton>
            
          </View>
          
        </View>
        

        
        

      </SafeAreaView>
  );
};

export default DetallesLoteria;

const styles = StyleSheet.create({

  logo:{
    flex:1,
    resizeMode:"contain",
    width:"100%"

  }

})
