import FieldBordePequenoRosa from '@/components/FieldBordePequenoRosa';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard, Platform, Alert, ActivityIndicator, Image, Switch, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Colors from '@/constants/Colors';
import CirculoColor from '@/components/CirculoColor';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fechaAString, numeroAMes, numeroAMesShort } from '@/constants/funciones';
import BotonDegradado from '@/components/BotonDegradado';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system"
import { supabase } from '@/lib/supabase';
import {randomUUID} from "expo-crypto"
import {decode} from "base64-arraybuffer"
import { useAuth } from '@/providers/AuthProvider';
import { recibirAsociacion } from '@/api/asociaciones';
import { useInsertEvento } from '@/api/eventos';
import { useInsertRifa } from '@/api/rifas';

const CrearRifa = () => {

    const alturaSafe = useSafeAreaInsets().top
    const {usuario, cargandoUsuario} = useAuth()
    const {mutate:insertRifa} = useInsertRifa()


    let dateHoy = new Date()
    let fechaActual = (dateHoy.getFullYear() + "-" + (dateHoy.getMonth() + 1) + "-" + dateHoy.getDate())
    
    const [imagenSeleccionada, setImagenSeleccionada] = useState<any>(null)

    const [titulo, setTitulo] = useState("")
    const manejarTitulo = (texto: string) => { setTitulo(texto) }

    const [numeroMaximoFisico,setNumeroMaximoFisico] = useState<any>(0)
    const manejarNumeroMaximoFisico = (texto: string) => {
        
        setNumeroMaximoFisico(texto) 
    
    }

    const [desripcion, setDescripcion] = useState("")
    const manejarDescripcion = (texto: string) => { setDescripcion(texto) }

    const [precio,setPrecio] = useState<any>("")
    const manejarPrecio = (texto: string) => {
        

        let nuevoTexto = texto.replace(",", ".")

        setPrecio(nuevoTexto) 
    
    }
    const [tieneRangoFisico,setTieneRangoFisico ] = useState(false)
    

    const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual)

    //Hooks para obrir els DatePicker
    const [fechaPickerAbierta, setFechaPickerAbierta] = useState(false)


    const {data:asociacion, isLoading:cargandoAsociacion, error:errorAsociacion} = recibirAsociacion(usuario.id, cargandoUsuario)

    if(cargandoAsociacion||cargandoUsuario){
        return <ActivityIndicator></ActivityIndicator>
    }


    function asignarFecha(date: Date) {

        let dateString = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
        setFechaSeleccionada(dateString)
        setFechaPickerAbierta(false)

    }


    const subirImagen = async () => {

        //SI LA RUTA ESTA MAL
        if (!imagenSeleccionada?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(imagenSeleccionada, {
            encoding: 'base64',
        });

        //Creem una ruta nova en nom aleatori
        const rutaNueva = `${randomUUID()}.png`;

        const contentType = 'image/png';

        const { data, error } = await supabase.storage
            .from('imagenes_rifas')
            .upload(rutaNueva, decode(base64), { contentType });
        if(error){

            Alert.alert(error.message)
            return ""
        }

        if (data) {
            return data.path;
        }
    };

    // FUNCIO PA CREAR EL EVENTO, IMPORTANT
    async function clickCrear() {

        let errores = []

        //Comprobacions de existencia
        if(titulo==""){
            errores.push("Añade un título")
        }


        if(desripcion==""){
            errores.push("Añade una descripcion")
        }

        //Si la image existix
        if (imagenSeleccionada == null) {
            errores.push("Elige una imagen")
        }



        //Comprobem el preu
        if(precio==""){

            errores.push("Establece un precio")

        }else{


            const regex = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;
            if(!regex.test(precio)){

                errores.push("No es float")

            }else{

                let precioFloat = parseFloat(precio)

                if(precioFloat<0.5){
                    errores.push("El precio mínimo de la rifa es de 0.5 €")
                }
                if(precioFloat>20){

                    errores.push("El precio máximo para una rifa es de 20€")

                }
            }
        }

        //Si hay un numero máximo físico
        if(tieneRangoFisico){

            

            if(numeroMaximoFisico==""){

                
                errores.push("Introduce el número máximo físico.")

            }else{

                const soloNumeros = /^[0-9]+$/;

                if(!soloNumeros.test(numeroMaximoFisico)){

                    errores.push("Introduce un número máximo válido.")

                }

            }

        }

        if(tieneRangoFisico==false){

            setNumeroMaximoFisico(null)

        }
        
        
        

        if(errores.length>0){

            Alert.alert(errores.join("\n"))
            return
        }

        
        Alert.alert("Comprueba los datos", "Una vez creada la rifa no se puede modificar ni eliminar.",
            
        //Botons
        [
        {text:"Cancelar"
        },
        {
            text:"Crear rifa",
            onPress:async ()=>{
                
                const rutaSubida = await subirImagen()

        //Si la ruta esta buida tirem arrere
        
        if(rutaSubida===""){
            return
        }

        insertRifa(
        {titulo:titulo,  descripcion:desripcion, fecha:fechaSeleccionada, id_asociacion:asociacion.id_asociacion, id_municipio:asociacion.id_municipio, imagen:rutaSubida, precio:precio, numero_maximo_fisico:numeroMaximoFisico}as any,
        {onSuccess:()=>{Alert.alert("Rifa creado con éxito");router.back()}})
        


            },
            style:"default"
        }] )

        console.log("Aqui llega")

        
       
        
    }

    async function abrirImagePicker() {
        let resultadoFoto = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        // SI CANCELEM LA TRIA DE FOTO
        if (resultadoFoto.canceled) {
            return
        }

        setImagenSeleccionada(resultadoFoto.assets[0].uri)

    }


    return (
        <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, }}>
            <TouchableWithoutFeedback >
            <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
                    <View style={{ flex: 1 }}>
                        <Stack.Screen options={{ headerTintColor: "#BC77EE", contentStyle: { backgroundColor: "white" } }} />

                        {/* Cabecera */}
                        <View style={{ alignItems: "center", flexBasis: 50, justifyContent: "center" }}>
                            <Text style={{ fontSize: 30, fontWeight: "700", color: "#BC77EE" }}>Nueva rifa</Text>
                        </View>

                        {/* Contenedor crear */}
                        
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} style={{ paddingHorizontal: 20, marginTop: 20 }}>
                                {/* Fila 1 */}
                                <View style={{ height: 250, columnGap: 20, marginBottom: 25, justifyContent:"center", flexDirection: "row" }}>

                                    {/* Image */}
                                    <Pressable onPress={abrirImagePicker} style={{overflow:"hidden", backgroundColor: "#E3C6F8", justifyContent: "center", alignItems: "center", borderRadius: 20, borderCurve: "continuous", aspectRatio: 1 }}>

                                        {imagenSeleccionada?
                                        <Image style={{height:"100%", width:"100%"}} source={{uri:imagenSeleccionada}}></Image>
                                            :
                                        <Text style={{ fontSize: 44, color: "#BC77EE" }}>+</Text>    
                                        }
                                        

                                    </Pressable>

                                </View>
                                <View style={{paddingHorizontal:20}}>
                                    <FieldBordePequenoRosa onChangeText={manejarTitulo} placeholder={"Titulo"} altura={40} />
                                </View>        
                                
                                {/* Fila 4 DESCRIPCION */}
                                <View style={{paddingHorizontal:20}}>
                                    <FieldBordePequenoRosa multiline onChangeText={manejarDescripcion} style={{ marginTop: 25, fontSize: 16, paddingVertical: 10 }} placeholder={"Descripción"} altura={120} />
                                </View>       

                                {/* Fila PRECIO */}
                                <View style={{justifyContent:"center", alignItems:"center",columnGap:20, flexDirection:"row"}}>
                                    <FieldBordePequenoRosa numerico style={{marginTop:25, width:100, fontSize:20, letterSpacing:0.5}} onChangeText={manejarPrecio} placeholder={"0,0 €"} altura={60} />
                                    
                                    <View style={{justifyContent:"center",columnGap:10,flexDirection:"row", marginTop:22, alignItems:"center", }}>
                                        <Text style={{ fontSize: 19, fontWeight: "600", color: "#BC77EE" }}>Rango físico?</Text>
                                        <Switch
                                            trackColor={{ false: "#FCF0FE", true: "#DEC5F0" }}
                                            thumbColor={tieneRangoFisico ? "#BC77EE" : "white"}
                                            ios_backgroundColor="#FCF0FE"
                                            onValueChange={() => setTieneRangoFisico(previousState => !previousState)}
                                            value={tieneRangoFisico}
                                        />
                                    </View>
                                
                                </View>

                                {/* Si te un rango físic mostrem el camp */}
                                {tieneRangoFisico?
                                <View style={{justifyContent:"center", alignItems:"center",columnGap:20, flexDirection:"row"}}>
                                    <FieldBordePequenoRosa numerico style={{marginTop:25, width:200, fontSize:16, letterSpacing:0.5}} onChangeText={manejarNumeroMaximoFisico} placeholder={"Número máximo"} altura={50} />
                                </View>:null}



                                {/* Fecha */}

                                <View style={{ marginTop: 27, height: 40, justifyContent: "center", columnGap: 20, flexDirection: "row" }}>

                                    {/* Fecha */}
                                    <Pressable onPress={() => setFechaPickerAbierta(true)} style={{ justifyContent: "center", backgroundColor: "#F6F6F6", borderRadius: 14, borderCurve: "continuous", paddingHorizontal: 22 }}>
                                        <Text style={{ fontSize: 17, fontWeight: "600", color: "#C78EF0", textAlign: "center" }}>{fechaAString(fechaSeleccionada)}</Text>
                                    </Pressable>

                                    <DateTimePickerModal
                                        isVisible={fechaPickerAbierta}
                                        mode="date"
                                        onConfirm={asignarFecha}
                                        onCancel={() => setFechaPickerAbierta(false)}
                                        minimumDate={new Date()}
                                    />
                                </View>

                                {/* Boton crear */}
                                <View style={{ marginTop: 28 }}>
                                    <BotonDegradado onPress={clickCrear} grande color={Colors.DegradatRosa} texto="Crear"></BotonDegradado>
                                </View>
                            </ScrollView>
                        
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default CrearRifa;