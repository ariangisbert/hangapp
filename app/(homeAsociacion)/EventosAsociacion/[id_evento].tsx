import { recibirAsistencias } from '@/api/asistencias';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const DetallesEvento = () => {

    const {id_evento, colorFondo, colorTexto} = useLocalSearchParams()

    //CARREGUEM ELS EVENTOS
    const [evento, setEvento] = useState<Evento|null>(null)
    const [cargandoEvento, setCargandoEvento] = useState(true)
    const {data:asistencias,isLoading: cargandoAsistencias, error:errorAsistencias } = recibirAsistencias(evento?.id_evento, cargandoEvento)
    useEffect(()=>{

      const recibirEvento = async ()=>{

        const {data, error} = await supabase.from("eventos").select().eq("id_evento", id_evento).single()

        if(error){

          Alert.alert(error.message)

        }else{

          setEvento(data)

        }

        setCargandoEvento(false)

      }

      recibirEvento()

    },[])


    if(cargandoEvento||cargandoAsistencias){

      return <ActivityIndicator >
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

      </ActivityIndicator>

    }

    if(errorAsistencias){

      console.log(errorAsistencias.message)

    }

    console.log(asistencias)


    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]

    return (
      <SafeAreaView style={{backgroundColor:colorFondo+"",flex:1, rowGap:20, paddingHorizontal:42}}>
      
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:60, flexGrow:0, justifyContent:"center" }}>
          <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{evento?.titulo_evento}</Text>
        </View>
      
        {/* Contenedor Imagen */}
        <View style={{flexBasis:380, flexShrink:1, justifyContent:"center", alignItems:"center",shadowOpacity:0.1, shadowColor:colorTexto+"", shadowRadius:9,shadowOffset:{width:0, height:4.5}}}>
         
           {/* ContenedorInteriorImagen */}
          <View style={{flex:1}}>
             <ImagenRemotaEvento style={styles.imagenEvento} ruta={evento?.imagen_evento} fallback='../../../assets/images/fallbackLogoAsociacion.png'></ImagenRemotaEvento>
              
          </View>
        </View>
        <View style={{flexGrow:1, justifyContent:"center"}}>
          {/* Contenedor número asistencias */}
          <View style={{flexBasis:130, backgroundColor:colorTexto+"",alignSelf:"center",paddingHorizontal:26, borderRadius:20, borderCurve:"continuous", alignItems:"center", justifyContent:"center", paddingVertical:3 }}>
            
            {/* Numero */}
            <View style={{flex:1,  justifyContent:"flex-end"}}>
              <Text style={{color:"white", fontWeight:"700", textAlign:"left", fontSize:42, letterSpacing:2}}>{asistencias*1200}</Text>
            </View>
            <View style={{flex:1,marginTop:-4, justifyContent:"center"}}>
              <Text style={{color:"white", fontWeight:"600", textAlign:"left", fontSize:16}}>Asistencias confirmadas</Text>
            </View>

          </View>
        </View>
        


        {/* Contenedor ubicacion gratis y publico */}
        <View style={{flexBasis:40, flexDirection:"row", alignItems:"center", paddingVertical:3}}>
          
          {/* Fecha */}
          <View style={{flex:1, paddingTop:1.7}}>
          {evento?.gratis_evento==true? 
                        <MiniCuadradoVerde texto={"Gratis"}/>: null
                    }
          </View>

          <View style={{flex:2}}>
            <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:16}}>{evento?.ubicacion_evento}</Text>
          </View>

          {/* Hora */}
          <View style={{flex:1}}>
            <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"right", fontSize:16}}>{evento?.publico_evento}</Text>
          </View>

        </View>

      
      </SafeAreaView>
  );
};

export default DetallesEvento;

const styles = StyleSheet.create({

  imagenEvento:{

    flex:1,
    aspectRatio:1,
    resizeMode:"contain",
    borderRadius:18,
    
  }

})