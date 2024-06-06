import { comprobarAsistencia, useInsertAsistencia } from '@/api/asistencias';
import { Evento } from '@/assets/types';
import Boton from '@/components/Boton';
import ImagenRemotaEvento from '@/components/ImagenRemotaEvento';
import MiniCuadradoVerde from '@/components/MiniCuadradoVerde';
import TextoDegradado from '@/components/TextoDegradado';
import { numeroAMes } from '@/constants/funciones';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, ScrollView, Platform } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { err } from 'react-native-svg';
import * as Calendar from 'expo-calendar';

const DetallesEvento = () => {

    const {id_evento, colorFondo, colorTexto} = useLocalSearchParams()
    const {mutate:insertarAsistencia} = useInsertAsistencia()

    //CARREGUEM ELS EVENTOS
    const {usuario, cargandoUsuario} = useAuth()
    const [evento, setEvento] = useState<Evento|null>(null)
    const [cargandoEvento, setCargandoEvento] = useState(true)
    const [cargandoInsert, setCargandoInsert] = useState(false)
    const {data:asiste, isLoading: cargandoAsistencia, error:errorAsistencia} = comprobarAsistencia(evento?.id_evento,usuario.id, cargandoEvento, cargandoUsuario)


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


    if(cargandoEvento||cargandoAsistencia||cargandoUsuario){

      return <ActivityIndicator >
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

      </ActivityIndicator>

    }

   

    async function getDefaultCalendarSource() {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      return defaultCalendar.source as any;
    }

    
    

    

   

    //Ara agarrem el mes
    let mes = numeroAMes(evento?.fecha_evento.split("-")[1])
    //I fem la fecha
    let fecha=evento?.fecha_evento.split("-")[2]+" "+mes+" "+evento?.fecha_evento.split("-")[0]

    function clickNotificar(){
      setCargandoInsert(true)
      insertarAsistencia({id_evento:evento?.id_evento,id_usuario: usuario.id}, {
        onSuccess:()=>{

          
          setCargandoInsert(false)
          async function crearEvento(){
          
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status === 'granted') {
              
              const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT)
            const defaultCalendar =
            calendars.find((calendar) => calendar.isPrimary) || calendars[0]
    
            let fechaEventoCalendario = evento?.fecha_evento +" "+evento?.hora_evento.split(":")[0]+":"+evento?.hora_evento.split(":")[1]
            let fechaEventoCalendarioFuturo = evento?.fecha_evento +" "+(parseInt(evento?.hora_evento.split(":")[0]as any)+1)+":"+evento?.hora_evento.split(":")[1]
             
            const eventIdInCalendar = await Calendar.createEventAsync(defaultCalendar.id,{title:evento?.titulo_evento,  startDate: new Date(fechaEventoCalendario),endDate:new Date(fechaEventoCalendarioFuturo)})
            Alert.alert("Se ha notificado tu asistencia y se ha añadido el evento al calendario.")
            }else{
  
              console.log(status)
            }
            
          }
          crearEvento()
          
          
      
        }})

        
      

    }


    return (
      <SafeAreaView style={{backgroundColor:colorFondo+"", flex:1, paddingHorizontal:42}}>
      
        <Stack.Screen options={{headerTintColor:colorTexto as any ,contentStyle:{backgroundColor:colorFondo}as any}}/>

        {/* Contenedor título */}
        <View style={{flexBasis:80, flexGrow:0, justifyContent:"center" }}>
          <Text style={{color:colorTexto+"", fontWeight:"700", textAlign:"center", fontSize:30}}>{evento?.titulo_evento}</Text>
        </View>

        {/* Contenedor Imagen */}
        <View style={{flexGrow:2.8, justifyContent:"center", alignItems:"center",shadowOpacity:0.1, shadowColor:colorTexto+"", shadowRadius:9,shadowOffset:{width:0, height:4.5}}}>
         
           {/* ContenedorInteriorImagen */}
          <View style={{flex:1}}>
             <ImagenRemotaEvento style={styles.imagenEvento} ruta={evento?.imagen_evento} fallback='../../../assets/images/fallbackLogoAsociacion.png'></ImagenRemotaEvento>
              
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

        {/* Contenedor boton */}
        <View style={{flexGrow:0.71,paddingVertical:6, alignItems:"center", justifyContent:"center"}}>
          <Boton cargando={cargandoInsert} onPress={clickNotificar} disabled={asiste} texto={asiste?"Asistencia notificada":"Notificar asistencia"} color={colorTexto+""}></Boton>
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