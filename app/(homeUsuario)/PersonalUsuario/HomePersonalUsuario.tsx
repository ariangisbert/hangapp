import { recibirEventosFuturosByUsuario } from '@/api/eventos';
import { recibirMunicipioyProvincia } from '@/api/municipios';
import CabeceraDegradado from '@/components/CabeceraDegradado';
import ElementoEventoFuturo from '@/components/ElementoEventoFuturo';
import FieldDegradado from '@/components/FieldDegradado';
import ImagenRemotaFotoPerfil from '@/components/ImagenRemotaFotoPerfil';
import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform, Pressable, LayoutAnimation, TextInput, Alert, FlatList, Button, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"
import { randomUUID } from 'expo-crypto';
import { decode } from 'base64-arraybuffer';

const HomePersonalUsuario = () => {

  const { usuario, cargandoUsuario, session, setUsuario, setSession } = useAuth() //Carreguem el usuari
  const [botonNombreExpandido, setBotonNombreExpandido] = useState(false)
  const [botonPasswordExpandido, setBotonPasswordExpandido] = useState(false)
  const [imagenPerfilSeleccionada, setImagenPerfilSeleccionada] = useState<any>(null)

  //VALORS DE CANVI
  const [nuevoNombre, setNuevoNombre] = useState<string>("")
  const [nuevoApellido, setNuevoApellido] = useState<string>("")
  const { data: municipio, isLoading: cargandoMunicipio, error: errorMunicipio } = recibirMunicipioyProvincia(parseInt(usuario?.municipio_defecto), cargandoUsuario)

  const {data:eventosFuturos, isLoading:cargandoEventosFuturos, error:errorEventos } = recibirEventosFuturosByUsuario(usuario.id, cargandoUsuario)

  const alturaSafe = useSafeAreaInsets().top


  useEffect(()=>{

    if(imagenPerfilSeleccionada==null){
      return
    }

    async function subirImagenDentroEffect(){

      console.log(imagenPerfilSeleccionada)
      const rutaSubida = await subirImagen()

    console.log(rutaSubida)
    //Si la ruta esta buida tirem arrere
    
    if(rutaSubida===""){
        Alert.alert("Error al cambiar la foto de perfil")
        return
    }


    const {error} = await supabase
    .from("profiles")
    .update({avatar_url: rutaSubida})
    .eq("id", usuario.id)

    if(error){

    Alert.alert(error.message)

    }else{

    //Actualisem el usuari en local per a no fer un altra query a la base de datos

    setUsuario({...usuario,avatar_url:rutaSubida})
    Alert.alert("Imagen de perfil cambiada correctamente")
    }    

    }

    subirImagenDentroEffect()
    
  
    


  }, [imagenPerfilSeleccionada])


  //Esperem a que se carreguen els usuaris
  if (cargandoUsuario||cargandoMunicipio||cargandoEventosFuturos) {

    return <ActivityIndicator></ActivityIndicator>

  }

  //Comprovem que tinga un poble per defecto, si no el te el enviem a que trie poble
  if (usuario.municipio_defecto == null) {

    return <Redirect href={"/SeleccionarMunicipio"} />

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

  async function salir() {

    if(!session){
      router.replace("/UserLogin")
      setUsuario(null)
      return
    }

    const { error } = await supabase.auth.signOut()

    console.log()

    if (error) {

      Alert.alert(error.message)

    } else {

      router.replace("/UserLogin")
      setUsuario(null)
      setSession(null)
    }


  }

  async function abrirImagePicker() {

    console.log(imagenPerfilSeleccionada)

    let resultadoFoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    // SI CANCELEM LA TRIA DE FOTO
    if (resultadoFoto.canceled) {
        Alert.alert("Error al cambiar la foto de perfil")
        return
    }
    
   

    setImagenPerfilSeleccionada(resultadoFoto.assets[0].uri)

    

}

  const subirImagen = async () => {

    //SI LA RUTA ESTA MAL
    if (!imagenPerfilSeleccionada?.startsWith('file://')) {
        return;
    }

    const base64 = await FileSystem.readAsStringAsync(imagenPerfilSeleccionada, {
        encoding: 'base64',
    });

    //Creem una ruta nova en nom aleatori
    const rutaNueva = `${randomUUID()}.png`;

    const contentType = 'image/png';

    const { data, error } = await supabase.storage
        .from('imagenesPerfil')
        .upload(rutaNueva, decode(base64), { contentType });
    if(error){

        Alert.alert(error.message)
        return ""
    }

    if (data) {
        return data.path;
    }
  };

  
  return (
    <Pressable onPress={clickGeneral} style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, backgroundColor: "white" }}>
      {/* Contenedor nombre */}
      <View  style={[styles.contenedorNombreMunicipio, {height:50}]}>
        <Text style={styles.textoMunicipio}>{usuario.nombre} {usuario.apellidos}</Text>
      </View>
      <View style={{flexDirection:"row",  alignItems:"flex-end", justifyContent:"space-between"}}>
          <CabeceraDegradado color={Colors.DegradatMorat}  title="Zona personal"></CabeceraDegradado>
          <TouchableWithoutFeedback onPress={abrirImagePicker}>

            <ImagenRemotaFotoPerfil style={{height:55,marginRight:25, borderRadius:200, aspectRatio:1}} ruta={usuario.avatar_url} fallback={"../../assets.images.fallbackLogoAsociacion.png"}></ImagenRemotaFotoPerfil>
         
          </TouchableWithoutFeedback>
      </View>
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

      {/* Eventos futuros */}
      <View style={{marginHorizontal:20, paddingVertical:15, rowGap:20}}>
        <Text style={{fontSize:26, color:Colors.MoradoElemento.colorTitulo, fontWeight:"700"}}>Eventos futuros</Text>
        {/* Contenedor flatlist */}
        <View style={{height:115}}>
          
          <FlatList horizontal showsHorizontalScrollIndicator={false} data={eventosFuturos} style={{overflow:"visible"}}
            contentContainerStyle={{}}
            renderItem={({ item, index, separators }) => (
              //Mostrem soles els eventos que no siguen null
              item.eventos?
              <ElementoEventoFuturo eventoFuturo = {item}></ElementoEventoFuturo>
              :null
            )}
          />

        <LinearGradient

        start={{ x: -1, y: 1 }}
        end={{ x: 1, y: 1 }}
          colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0)']}
          style={styles.fadeLeft}
        />

        <LinearGradient

          start={{ x:0, y: 1 }}
          end={{ x: 2, y: 1 }}
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
          style={styles.fadeRight}
        />  

        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
          <Button onPress={salir} title='Salir'></Button>
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
    marginVertical:20,
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
    marginVertical:6,
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

  },
  fadeLeft: {
    position: 'absolute',
    top: 0,
    left: -20,
    bottom: 0,
    width: 20, // Ajusta la altura según necesidad
  },
  fadeRight: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: -20,
    width: 20, // Ajusta la altura según necesidad
  },



})