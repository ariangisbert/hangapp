import { comprobarReserva, recibirLoteria, useInsertReservaLoteria } from '@/api/loteria';
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
import { useAuth } from '@/providers/AuthProvider';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Image, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const DetallesLoteria = () => {


    const {id, colorPasado} = useLocalSearchParams()
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1)
    //Carreguem la rifa

    const {data:loteria, isLoading:cargandoLoteria, error} = recibirLoteria(id)
    const {usuario,cargandoUsuario} = useAuth()
    const {data:tieneReservado, isLoading:cargandoTieneReservado} = comprobarReserva(loteria?.id, usuario.id, cargandoLoteria, cargandoUsuario) 
    

    
    const [telefono, setTelefono] = useState("")
    function manejarTelefono(nuevoTexto:any){

      setTelefono(nuevoTexto)

    }

    const [cargandoInsert, setCargandoInsert] = useState(false)

    const {mutate:insertarReserva} = useInsertReservaLoteria()

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
    

    if(cargandoLoteria||cargandoUsuario||cargandoTieneReservado){

      
      return <ActivityIndicator >
        {/* Pa que mentres se carreguen tinga igual el color de fondo */}
        <Stack.Screen options={{headerTintColor:colorTexto+""}}/> 
        
      </ActivityIndicator>

    }

    let mes = numeroAMes(loteria?.fecha.split("-")[1])
    //I fem la fecha
    let fecha=loteria?.fecha.split("-")[2]+" "+mes+" "+loteria?.fecha.split("-")[0]


    //Funcions de clicks
    
    function clickMas(){

      setCantidadSeleccionada(cantidadSeleccionada+1)

    }

    function clickMenos(){

      if(cantidadSeleccionada==1){
        return
      }

        
      setCantidadSeleccionada(cantidadSeleccionada-1)

    }
    
    function clickReservar(){

      if(telefono===""){

        Alert.alert("Introduce un número de teléfono.")
        return
      }

      const soloNumeros = /^[0-9]+$/;


      if((telefono.length!=9)||(!soloNumeros.test(telefono))){

        Alert.alert("Introduce un número de teléfono válido.")
        return
      }

      
      
   
        setCargandoInsert(true)
        insertarReserva({id_usuario:usuario.id, id_loteria:loteria?.id, cantidad:cantidadSeleccionada, numero_telefono:telefono}, {onSuccess:()=>setCargandoInsert(false)})
  
      

    }

    return (
      <SafeAreaView style={{backgroundColor:"white",paddingBottom:8,justifyContent:"center", flex:1, paddingHorizontal:42}}>
        <Stack.Screen options={{headerTintColor:colorTexto+"",contentStyle:{backgroundColor:colorFondo}as any}}/>

        <Pressable onPress={()=>Keyboard.dismiss()} style={{flex:1}}>
          <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
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

            {/* Contenedor telefono */}
          
          
            <View style={{flexGrow:0.8, paddingVertical:20,justifyContent:"center"}}>
              
              {tieneReservado?
                null
                :
                <Field onChangeText={manejarTelefono} width={250} placeholder="Teléfono" color={colorTexto}></Field>
              }

            </View>
            
            {/* Contenedor boton */}
            <View style={{flexGrow:0.01, flexDirection:"row",justifyContent:"center",alignItems:"center",paddingVertical:0, columnGap:20}}>
              <Boton cargando={cargandoInsert} onPress={clickReservar} flex texto={tieneReservado?"Reservada":"Reservar"} disabled={tieneReservado} color={colorTexto+""}></Boton>
              
              {tieneReservado?
              null
              :

              <BotonMasMenos onPressMas={clickMas} onPressMenos={clickMenos} valor = {cantidadSeleccionada} color={color}/>
              }

            </View>
          </KeyboardAvoidingView>
        </Pressable>
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
