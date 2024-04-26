import { supabase } from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Provincia} from "../assets/types"
const SeleccionarMunicipio = () => {
  
  const [provincias, setProvincias] = useState<Provincia[]|[null]>([null]) //Hook en el objecte provincias
  const [cargando, setCargando] = useState(true)
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<Provincia>()

  useEffect(()=>{

    const recibirProvincias = async ()=>{ //Funcio asincrona on recibirem les provincies

      const {data, error} = await supabase.from("provincias").select() //Consulta
      
      if(error){

        Alert.alert(error.message) //Si hi ha un error el indiquem
        
      }else{

        setProvincias(data)
        
      }
      setCargando(false)
    }

    recibirProvincias()


  },[])

  if(cargando){

   return <ActivityIndicator></ActivityIndicator>

  }

  return (
    <SafeAreaView>

      {/* <Text>{provincias.map(i=>i?.nombre_provincia ??"Nombre no disponible").join("\n")}</Text> */}
      <Picker selectedValue={provinciaSeleccionada}>

        {provincias.map())}
      
      </Picker>
    </SafeAreaView>
  );


};

export default SeleccionarMunicipio;