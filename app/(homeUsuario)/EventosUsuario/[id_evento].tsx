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
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';


const DetallesEvento = () => {

    const {id_evento, colorFondo, colorTexto} = useLocalSearchParams()

    //CARREGUEM ELS EVENTOS
    const [evento, setEvento] = useState<Evento|null>(null)
    const [cargandoEvento, setCargandoEvento] = useState(true)

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


    if(cargandoEvento){

      return <ActivityIndicator >
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

      </ActivityIndicator>

    }


    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]

    return (
      <SafeAreaView style={{backgroundColor:colorFondo, flex:1, paddingHorizontal:42,} as any}>
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0, justifyContent:"center" }}>
          <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{evento?.titulo_evento}</Text>
        </View>

        {/* Contenedor Imagen */}
        <View style={{flexGrow:3, justifyContent:"center", alignItems:"center", }}>
         
           {/* ContenedorInteriorImagen */}
          <View style={{flex:1}}>
             <ImagenRemotaEvento style={styles.imagenEvento} ruta='evento.jpg' fallback='../../../assets/images/fallbackLogoAsociacion.png'></ImagenRemotaEvento>
              
          </View>
        </View>
        

        {/* Contenedor fecha y hora */}
        <View style={{flexGrow:0.3, flexDirection:"row", alignItems:"center", paddingVertical:3 }}>
          
          {/* Fecha */}
          <View style={{flex:1}}>
            <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"left", fontSize:16}}>{fecha}</Text>
          </View>

          {/* Hora */}
          <View style={{flex:1}}>
            <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"right", fontSize:16}}>{evento?.hora_evento.substring(0, 5)}</Text>
          </View>
        </View>

        {/* Contenedor descripcion */}
        <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow:0.6, flexBasis:48, flexShrink:1 }}>
          <Text style={{color:colorTexto+"", fontWeight:"500",lineHeight:24, textAlign:"center", fontSize:15}}>{evento?.descripcion_evento}</Text>
        </ScrollView>

        {/* Contenedor ubicacion gratis y publico */}
        <View style={{flexGrow:0.3, flexDirection:"row", alignItems:"center", paddingVertical:3}}>
          
          {/* Fecha */}
          <View style={{flex:1, paddingTop:1.7}}>
          {evento?.gratis_evento==true? 
                        <MiniCuadradoVerde/>: null
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

        {/* Contenedor boton */}
        <View style={{flexGrow:0.1,flexBasis:70,  justifyContent:"center"}}>
          <Boton texto="Notificar asistencia" color={colorTexto+""}></Boton>
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