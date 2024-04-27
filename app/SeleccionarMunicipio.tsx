import { supabase } from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Provincia, Municipio} from "../assets/types"
import TextoDegradado from '@/components/TextoDegradado';
import Colors from '@/constants/Colors';
import BotonDegradado from '@/components/BotonDegradado';
import { useAuth } from '@/providers/AuthProvider';
import { endEvent } from 'react-native/Libraries/Performance/Systrace';
import { router } from 'expo-router';



const SeleccionarMunicipio = () => {
  
  //Provincias
  const [provincias, setProvincias] = useState<Provincia[]|[null]>([null]) //Hook en el objecte provincias
  const [cargandoProvincias, setCargandoProvincias] = useState(true)
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState()

  //Municipios
  const [municipios, setMunicipios] = useState<Municipio[]|[null]>([null])
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState()
  const [municipiosCargados, setMunicipiosCargados] = useState(false)

  const {usuario} = useAuth()

  async function clickConfirmar(){

    const {error} = await supabase.from("profiles").update({municipio_defecto: municipioSeleccionado}).eq("id", usuario.id)

    if(error){

      Alert.alert(error.message)

    }else{


      router.push("/(homeUsuario)")

    }

  }


  useEffect(()=>{

    const recibirProvincias = async ()=>{ //Funcio asincrona on recibirem les provincies

      const {data, error} = await supabase.from("provincias").select() //Consulta
      
      if(error){

        Alert.alert(error.message) //Si hi ha un error el indiquem
        
      }else{

        setProvincias(data)

      }
      setCargandoProvincias(false)

    }

    recibirProvincias()


  },[])


  //RECIBIM MUNICIPIS
  useEffect(()=>{

    const recibirMunicipios = async ()=>{

      if(provinciaSeleccionada){

       const {data, error} = await supabase.from("municipios").select().eq("id_provincia",provinciaSeleccionada)
        if(error){

          Alert.alert(error.message)

        }else{
          
          setMunicipios(data)
          setMunicipiosCargados(true)
        }
      }

    }  

    recibirMunicipios()

  },[provinciaSeleccionada]) //ASO VOL DIR QUE SOLES SE EXECUTARA QUAN CAMBIE ESTE HOOK

  

  if(cargandoProvincias){

   return <ActivityIndicator></ActivityIndicator>

  }

  return (
    <SafeAreaView style={styles.contenedorPagina}>

     <View style={{flex:1.4,justifyContent:"center"}}>
      <TextoDegradado style={styles.titulo} color={Colors.DegradatMorat}>Elige un municipio por defecto, puedes cambiarlo en cualquier momento</TextoDegradado>
    </View>

     {/* Picker de provincies */}
     <View style={styles.contenedorPicker}>
        <TextoDegradado style={styles.subtitulo} color={Colors.DegradatMorat}>Provincia</TextoDegradado>
        <Picker selectedValue={provinciaSeleccionada} style={styles.picker} itemStyle={styles.picker} onValueChange={(itemValue, itemIndex)=>{setProvinciaSeleccionada(itemValue)}}>

          {provincias.map(i=>{
            return<Picker.Item label={i?.nombre_provincia} value={i?.id_provincia} key={i?.id_provincia}/>
          })}
        
        </Picker>
      </View>
      
      {/* Picker de municipis */}
      <View style={[styles.contenedorPicker, {opacity:municipiosCargados?1:0}]}>
        <TextoDegradado style={styles.subtitulo} color={Colors.DegradatMorat}>Municipio</TextoDegradado>
        <Picker selectedValue={municipioSeleccionado} style={styles.picker} itemStyle={styles.picker} onValueChange={(itemValue, itemIndex)=>setMunicipioSeleccionado(itemValue)}>

          {municipios.map(i=>{
            return<Picker.Item  label={i?.nombre_municipio} value={i?.id_municipio} key={i?.id_municipio??0}/> //Si encara no han carregat els municipis, pa que no done error
          })}
         
        </Picker>
      </View>

      <View style={{flex:1, justifyContent:"center"}}>
      <BotonDegradado onPress={clickConfirmar} disabled = {municipioSeleccionado==null||provinciaSeleccionada==null} texto="Confirmar"color={Colors.DegradatMorat}/> 
    </View>

    </SafeAreaView>

  );


};

export default SeleccionarMunicipio;

const styles = StyleSheet.create({


  contenedorPagina:{

    paddingVertical:40,
    paddingHorizontal:20,
    flex:1,
    gap:10

  },
  titulo:{

    fontWeight:"600",
    fontSize:20,
    textAlign:"center",
    lineHeight:27

  },
  subtitulo:{

    fontWeight:"500",
    fontSize:18,
    textAlign:"center",
    padding:5

  },
  contenedorPicker:{
    flex:3
  },
  picker:{

    flex:1,
    padding:5

  }



})