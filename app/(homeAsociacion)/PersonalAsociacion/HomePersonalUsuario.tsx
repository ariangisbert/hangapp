import { recibirMunicipioyProvincia } from '@/api/municipios';
import CabeceraDegradado from '@/components/CabeceraDegradado';
import FieldDegradado from '@/components/FieldDegradado';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform, Pressable, LayoutAnimation, TextInput, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomePersonalUsuario = () => {

  const { usuario, cargandoUsuario, session, setUsuario } = useAuth() //Carreguem el usuari
  const [botonNombreExpandido, setBotonNombreExpandido] = useState(false)
  const [botonPasswordExpandido, setBotonPasswordExpandido] = useState(false)

  //VALORS DE CANVI
  const [nuevoNombre, setNuevoNombre] = useState<string>("")
  const [nuevoApellido, setNuevoApellido] = useState<string>("")

  const alturaSafe = useSafeAreaInsets().top

  //Esperem a que se carreguen els usuaris
  if (cargandoUsuario) {

    return <ActivityIndicator></ActivityIndicator>

  }

  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if (usuario.municipio_defecto == null) {

    return <Redirect href={"/SeleccionarMunicipio"} />

  }

  //Carreguem el poble 
  //FALTEN CARREAGAR ELS EVENTOS PENDENTS I LES RIFES
  const { data: municipio, isLoading: cargandoMunicipio, error: errorMunicipio } = recibirMunicipioyProvincia(parseInt(usuario.municipio_defecto))


  if ( cargandoMunicipio) {

    return <ActivityIndicator></ActivityIndicator>
    
  }


  function clickExpandirNombre(){

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setBotonNombreExpandido(true)
  }

  function clickExpandirPassword(){

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setBotonPasswordExpandido(true)
  }

  async function clickCambiarNombre(){

    
    if(nuevoNombre?.length<=0||nuevoApellido.length<=0){

      Alert.alert("Introduce tu nuevo nombre y apellidos")
      return

    }

    const {error} = await supabase
                  .from("profiles")
                  .update({nombre: nuevoNombre, apellidos:nuevoApellido})
                  .eq("id", usuario.id)

    if(error){

      Alert.alert(error.message)

    }else{

      //Actualisem el usuari en local per a no fer un altra query a la base de datos

      setUsuario({...usuario,nombre:nuevoNombre, apellidos:nuevoApellido})
      Alert.alert("Nombre cambiado correctamente")
      setBotonNombreExpandido(false)
    }

  }

  function clickGeneral(){
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setBotonNombreExpandido(false)
    setBotonPasswordExpandido(false)
  }

  return (
    <Pressable onPress={clickGeneral} style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
      {/* Contenedor nombre */}
      <View  style={[styles.contenedorNombreMunicipio, {height:50}]}>
        <Text style={styles.textoMunicipio}>{usuario.nombre} {usuario.apellidos}</Text>
      </View>
      <CabeceraDegradado color={Colors.DegradatRosa} title="Zona personal"></CabeceraDegradado>

      {/* Contenedor email y municipio */}
      <View style={styles.contenedorDatos}>
        
        {/* Municipio */}
        <View style={styles.contenedorDato}>
          <View style={{flexShrink:1}}>
             <Text style={styles.textoDatos}>Municipio por defecto:</Text>
          </View>
          <Pressable style={{backgroundColor:"#D8D8D8",paddingHorizontal:10,paddingTop:1, alignItems:"center",justifyContent:"center",height:30,borderRadius:10,borderCurve:"continuous", flex:1}}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={{fontWeight:"500", color:"#212121",fontSize:16}}>{municipio.nombre_municipio}</Text>
            </Pressable>
        </View>

        {/* Email */}
        <View style={styles.contenedorDato}>
        <Text style={styles.textoDatos}>Email:</Text>
        <Text style={{fontSize:18, fontWeight:"400", letterSpacing:0.4}}>{session?.user.email}</Text>
        </View>
      
      </View>

      {/* Botones cambiar nombre */}
      <View style={[styles.contenedorBotonesCambiar,{flexBasis:botonNombreExpandido||botonPasswordExpandido?180:50,columnGap:botonNombreExpandido||botonPasswordExpandido?0:15,}]}>

          {/* Cambiar nombre */}
          <Pressable onPress={clickExpandirNombre} style={[styles.botonPequeno, {flexGrow:botonPasswordExpandido?0:1,opacity:botonPasswordExpandido?0:1,}]}>
             
              {botonNombreExpandido?
              //Si esta expandit
                //Contenedor boto ampliat
                 <View style={{flexGrow:1,width:"100%",paddingHorizontal:10, rowGap:14, paddingVertical:14,justifyContent:"center"  }}>

                    <TextInput value={nuevoNombre} onChangeText={(nuevotexto)=>setNuevoNombre(nuevotexto)} autoCorrect={false} placeholder='Nombre' placeholderTextColor={"#505051"} style={styles.fieldPequeno}></TextInput>
                    <TextInput value={nuevoApellido} onChangeText={(nuevotexto)=>setNuevoApellido(nuevotexto)} autoCorrect={false} placeholder='Apellidos' placeholderTextColor={"#505051"} style={styles.fieldPequeno}></TextInput>
                    <Pressable onPress={clickCambiarNombre} style={styles.botonInternoCambiar}>

                      <Text style={styles.textoInternoBotonCambiar}>Cambiar</Text>

                    </Pressable>

                 </View>
                 
              :



              //Si no esta expandit
                  <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textoBoton}>Cambiar nombre</Text>
             }

          </Pressable>

          {/* Cambiar contraseña */}
          <Pressable onPress={clickExpandirPassword} style={[styles.botonPequeno, {flexGrow:botonNombreExpandido?0:1,opacity:botonNombreExpandido?0:1}]}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textoBoton}>Cambiar contraseña</Text>
          </Pressable>

      </View>


    </Pressable>
  );
};

export default HomePersonalUsuario;



const styles = StyleSheet.create({

  contenedorListaEventos: {

    flex: 1,
    paddingTop: 27,
    overflow: "hidden",
      

  },
  contenedorDatos:{
    flexBasis:120,
    backgroundColor:"#F6F6F6",
    marginHorizontal:20,
    marginVertical:15,
    paddingHorizontal:12,
    borderRadius:21,
    borderCurve:"continuous",
    shadowColor:" #000000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius:1, 
    shadowOpacity: 0.225,
    elevation: 2,
    rowGap:-9
  },
  contenedorDato:{
    flex:1, 
    alignItems:"center", 
    flexDirection:"row", 
    columnGap:10

  },
  contenedorNombreMunicipio: {
    height: 50,
    paddingHorizontal: 20,
    alignItems: "flex-end",
    paddingBottom: 1.8,
    flexDirection:"row",
    columnGap:3,
  },
  textoMunicipio: {

    fontWeight: "600",
    fontSize: 20,
    color: "#2D2D2D"
  },
  textoDatos:{

    color: Colors.MoradoElemento.colorTitulo,
    fontWeight:"600",
    fontSize:18,

  },
  contenedorBotonesCambiar:{
    marginHorizontal:20,
    marginVertical:5,
    flexDirection:"row"

  },
  botonPequeno:{

    borderRadius:15,
    borderCurve:"continuous",
    backgroundColor: Colors.MoradoElemento.colorTitulo,
    alignItems:"center",
    justifyContent:"center",
    flex:1
  },
  botonCambiarNombreExpandido:{


  },
  textoBoton:{
    color:"white",
    fontWeight:"500"
  },
  fieldPequeno:{
    alignSelf:"center",
    borderColor:"white",
    color:"black",
    width:200,
    textAlign:"center",
    borderRadius:13,
    borderCurve:"continuous",
    paddingVertical:10,
    paddingHorizontal:10,
    backgroundColor:"#DFE0F7",
    opacity:0.75,
    fontWeight:"500"

  },
  botonInternoCambiar:{

    alignSelf:"center",
    borderColor:"white",
    color:"black",
    borderRadius:12,
    borderCurve:"continuous",
    paddingVertical:10,
    paddingHorizontal:20,
    backgroundColor:"#DFE0F7",
    alignItems:"center",
    

  },
  textoInternoBotonCambiar:{

    opacity:0.8,
    fontWeight:"600"

  }



})