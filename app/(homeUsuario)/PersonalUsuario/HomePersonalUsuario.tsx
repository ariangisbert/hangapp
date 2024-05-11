import { recibirMunicipioyProvincia } from '@/api/municipios';
import CabeceraDegradado from '@/components/CabeceraDegradado';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { Redirect } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform, Pressable, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomePersonalUsuario = () => {

  const { usuario, cargandoUsuario, session } = useAuth() //Carreguem el usuari
  const [botonNombreExpandido, setBotonNombreExpandido] = useState(false)
  const [botonPasswordExpandido, setBotonPasswordExpandido] = useState(false)
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
    setBotonNombreExpandido(!botonNombreExpandido)
  }

  function clickExpandirPassword(){

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBotonPasswordExpandido(!botonPasswordExpandido)
  }

  return (
    <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
      {/* Contenedor nombre */}
      <View  style={[styles.contenedorNombreMunicipio, {height:50}]}>
        <Text style={styles.textoMunicipio}>{usuario.nombre} {usuario.apellidos}</Text>
      </View>
      <CabeceraDegradado title="Zona personal"></CabeceraDegradado>

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
      <View style={[styles.contenedorBotonesCambiar,{flexBasis:botonNombreExpandido||botonPasswordExpandido?100:50,columnGap:15}]}>

          {/* Cambiar nombre */}
          <Pressable onPress={clickExpandirNombre} style={[styles.botonPequeno, {flex:botonPasswordExpandido?0:1}]}>
             <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textoBoton}>Cambiar nombre</Text>
          </Pressable>

          {/* Cambiar contraseña */}
          <Pressable onPress={clickExpandirPassword} style={[styles.botonPequeno, {flexGrow:botonNombreExpandido?0:1,opacity:botonNombreExpandido?0:1}]}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textoBoton}>Cambiar contraseña</Text>
          </Pressable>

      </View>


    </View>
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
  }



})