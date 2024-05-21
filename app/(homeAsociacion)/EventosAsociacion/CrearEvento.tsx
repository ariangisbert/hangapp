import FieldBordePequenoRosa from '@/components/FieldBordePequenoRosa';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard, Platform, Alert, ActivityIndicator, Image } from 'react-native';
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

const CrearEvento = () => {

    const alturaSafe = useSafeAreaInsets().top
    const {usuario, cargandoUsuario} = useAuth()
    const {mutate:insertEvento} = useInsertEvento()


    let dateHoy = new Date()
    let fechaActual = (dateHoy.getFullYear() + "-" + (dateHoy.getMonth() + 1) + "-" + dateHoy.getDate())
    let horaActual = (dateHoy.getHours() + ":" + ((dateHoy.getMinutes() + "").length <= 1 ? "0" + dateHoy.getMinutes() : dateHoy.getMinutes()))

    const [imagenSeleccionada, setImagenSeleccionada] = useState<any>(null)

    const [titulo, setTitulo] = useState("")
    const manejarTitulo = (texto: string) => { setTitulo(texto) }

    const [ubicacion, setUbicacion] = useState("")
    const manejarUbicacion = (texto: string) => { setUbicacion(texto) }

    const [miniDescripcio, setMiniDescripcion] = useState("")
    const manejarMiniDescripcion = (texto: string) => { setMiniDescripcion(texto) }

    const [desripcion, setDescripcion] = useState("")
    const manejarDescripcion = (texto: string) => { setDescripcion(texto) }


    const [publicoSeleccionado, setPublicoSeleccionado] = useState("Jóvenes")
    const [colorSeleccionado, setColorSeleccionado] = useState("naranja")
    const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual)
    const [horaSeleecionada, setHoraSeleccionada] = useState(horaActual)

    //Hooks para obrir els DatePicker
    const [fechaPickerAbierta, setFechaPickerAbierta] = useState(false)
    const [horaPickerAbierta, setHoraPickerAbierta] = useState(false)


    if(cargandoUsuario){
        return <ActivityIndicator></ActivityIndicator>
    }

    const {data:asociacion, isLoading:cargandoAsociacion, error:errorAsociacion} = recibirAsociacion(usuario.id)

    if(cargandoAsociacion){
        return <ActivityIndicator></ActivityIndicator>
    }


    function asignarFecha(date: Date) {

        let dateString = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate())
        setFechaSeleccionada(dateString)
        setFechaPickerAbierta(false)

    }

    function asignarHora(date: Date) {

        let horaString = (date.getHours() + ":" + ((date.getMinutes() + "").length <= 1 ? "0" + date.getMinutes() : date.getMinutes()))
        setHoraSeleccionada(horaString)
        setHoraPickerAbierta(false)

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
            .from('imagenes_eventos')
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

        if(ubicacion==""){
            errores.push("Añade la ubicación")
        }

        if(miniDescripcio==""){
            errores.push("Añade una mini descripcion")
        }

        if(desripcion==""){
            errores.push("Añade una descripcion")
        }

        //Si la image existix
        if (imagenSeleccionada == null) {
            errores.push("Elige una imagen")
        }
        
        

        if(errores.length>0){

            Alert.alert(errores.join("\n"))
            return
        }

        

        
       const rutaSubida = await subirImagen()

        //Si la ruta esta buida tirem arrere
        
        if(rutaSubida===""){
            return
        }


        insertEvento(
        {titulo_evento:titulo, mini_descripcion_evento:miniDescripcio,ubicacion_evento:ubicacion, descripcion_evento:desripcion, fecha_evento:fechaSeleccionada, hora_evento:horaSeleecionada, id_asociacion:asociacion.id_asociacion, id_municipio:asociacion.id_municipio, imagen_evento:rutaSubida, publico_evento:publicoSeleccionado, color_evento:colorSeleccionado}as any,
        {onSuccess:()=>Alert.alert("Evento creado con éxito")})
        
        
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
                <View style={{ flex: 1 }}>
                    <Stack.Screen options={{ headerTintColor: "#BC77EE", contentStyle: { backgroundColor: "white" } }} />

                    {/* Cabecera */}
                    <View style={{ alignItems: "center", flexBasis: 50, justifyContent: "center" }}>
                        <Text style={{ fontSize: 30, fontWeight: "700", color: "#BC77EE" }}>Nuevo evento</Text>
                    </View>

                    {/* Contenedor crear */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        {/* Fila 1 */}
                        <View style={{ height: 150, columnGap: 20, marginBottom: 25, flexDirection: "row" }}>

                            {/* Image */}
                            <Pressable onPress={abrirImagePicker} style={{overflow:"hidden", backgroundColor: "#E3C6F8", justifyContent: "center", alignItems: "center", borderRadius: 20, borderCurve: "continuous", aspectRatio: 1 }}>

                                {imagenSeleccionada?
                                <Image style={{height:"100%", width:"100%"}} source={{uri:imagenSeleccionada}}></Image>
                                    :
                                <Text style={{ fontSize: 44, color: "#BC77EE" }}>+</Text>    
                                }
                                

                            </Pressable>

                            {/* Titulo y ubicacion */}
                            <View style={{ rowGap: 20, marginTop: -1, justifyContent: "center", flex: 1 }}>

                                <FieldBordePequenoRosa onChangeText={manejarTitulo} placeholder={"Titulo"} altura={40} />
                                <FieldBordePequenoRosa onChangeText={manejarUbicacion} placeholder={"Ubicación"} altura={40} />

                            </View>
                        </View>
                        {/* Fila 2 PUBLICO */}
                        <SegmentedControl
                            values={['Jóvenes', 'Adultos', 'Todos']}
                            tintColor='#E3C6F8'
                            activeFontStyle={{ color: "#1D1D1D", fontWeight: "700" }}
                            fontStyle={{}}
                            selectedIndex={0}
                            onValueChange={(value) => {
                                setPublicoSeleccionado(value)
                            }}
                        />
                        {/* Fila 3 MINI DESCRIPCION */}
                        <FieldBordePequenoRosa style={{ marginTop: 25, fontSize: 15 }} onChangeText={manejarMiniDescripcion} placeholder={"Mini descripción"} altura={40} />
                        {/* Fila 4 DESCRIPCION */}
                        <FieldBordePequenoRosa multiline onChangeText={manejarDescripcion} style={{ marginTop: 25, fontSize: 15, paddingVertical: 10 }} placeholder={"Descripción"} altura={140} />

                        {/* Fila 5 COLORS */}
                        <View style={{ height: 50, marginTop: 27, justifyContent: "space-evenly", flexDirection: "row" }}>

                            <CirculoColor nombreColor={"naranja"} onPress={() => setColorSeleccionado("naranja")} color={Colors.NaranjaElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                            <CirculoColor nombreColor={"rojo"} onPress={() => setColorSeleccionado("rojo")} color={Colors.RojoElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                            <CirculoColor nombreColor={"verde"} onPress={() => setColorSeleccionado("verde")} color={Colors.VerdeElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                            <CirculoColor nombreColor={"azul"} onPress={() => setColorSeleccionado("azul")} color={Colors.AzulElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                            <CirculoColor nombreColor={"morado"} onPress={() => setColorSeleccionado("morado")} color={Colors.MoradoElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>

                        </View>

                        {/* Fecha y hora */}

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

                            {/* Hora */}
                            <Pressable onPress={() => setHoraPickerAbierta(true)} style={{ justifyContent: "center", backgroundColor: "#F6F6F6", borderRadius: 14, borderCurve: "continuous", paddingHorizontal: 18 }}>
                                <Text style={{ fontSize: 17, fontWeight: "600", color: "#C78EF0", textAlign: "center" }}>{horaSeleecionada}</Text>
                            </Pressable>

                            <DateTimePickerModal
                                isVisible={horaPickerAbierta}
                                mode="time"
                                onConfirm={asignarHora}
                                onCancel={() => setHoraPickerAbierta(false)}
                            />

                        </View>

                        {/* Boton crear */}
                        <View style={{ marginTop: 28 }}>
                            <BotonDegradado onPress={clickCrear} grande color={Colors.DegradatRosa} texto="Crear"></BotonDegradado>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default CrearEvento;