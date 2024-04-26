import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SeleccionarMunicipio = () => {
  
  const [provincias, setProvincias] = useState(null) //Hook en el objecte provincias
  
  useEffect(()=>{

    const recibirProvincias = async ()=>{ //Funcio asincrona on recibirem les provincies

      const {data, error} = await supabase.from("provincias").select()
      
      if(error){

        Alert.alert(error.message)

      }else{

        console.log(data)
        
      }
    }

    recibirProvincias()


  },[])

  
  return (
    <SafeAreaView>
      <Text>Seleccionar municipio</Text>
    </SafeAreaView>
  );


};

export default SeleccionarMunicipio;