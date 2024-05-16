import FieldBordePequenoRosa from '@/components/FieldBordePequenoRosa';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Colors from '@/constants/Colors';
import CirculoColor from '@/components/CirculoColor';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { fechaAString, numeroAMes, numeroAMesShort } from '@/constants/funciones';
import BotonDegradado from '@/components/BotonDegradado';

const CrearEvento = () => {
  
    const alturaSafe = useSafeAreaInsets().top
    let dateHoy =  new Date()
    let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
    let horaActual = (dateHoy.getHours()+":"+((dateHoy.getMinutes()+"").length<=1?"0"+dateHoy.getMinutes():dateHoy.getMinutes()))


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
    const [fechaPickerAbierta, setFechaPickerAbierta]= useState(false)
    const [horaPickerAbierta, setHoraPickerAbierta]= useState(false)


    function asignarFecha(date:Date){

        let dateString = (date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate())
        setFechaSeleccionada(dateString)
        setFechaPickerAbierta(false)

    }

    function asignarHora(date:Date){

        let horaString = (date.getHours()+":"+((date.getMinutes()+"").length<=1?"0"+date.getMinutes():date.getMinutes()))
        setHoraSeleccionada(horaString)
        setHoraPickerAbierta(false)

    }

  
    return (
    <View style={{flex:1, marginTop: Platform.OS === "ios" ? alturaSafe : 20, }}>
      <TouchableWithoutFeedback >
        <View style={{flex:1}}>
            <Stack.Screen options={{headerTintColor:"#BC77EE", contentStyle:{backgroundColor:"white"} }}/>
            
            {/* Cabecera */}
            <View style={{alignItems:"center", flexBasis:50, justifyContent:"center"}}>
                <Text style={{fontSize:30, fontWeight:"700",color:"#BC77EE" }}>Nuevo evento</Text>
            </View>

            {/* Contenedor crear */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}} style={{paddingHorizontal:20,marginTop:20}}>
                {/* Fila 1 */}
                <View style={{height:150, columnGap:20,marginBottom:22, flexDirection:"row"}}>

                    <Pressable style={{backgroundColor:"#E3C6F8",borderRadius:20, borderCurve:"continuous", aspectRatio:1}}></Pressable>
                    <View style={{rowGap:20, marginTop:-1, justifyContent:"center", flex:1}}>
                        
                        <FieldBordePequenoRosa onChangeText={manejarTitulo} placeholder={"Titulo"} altura={40}/>
                        <FieldBordePequenoRosa onChangeText={manejarUbicacion} placeholder={"Ubicación"} altura={40}/>

                    </View>
                </View>
                {/* Fila 2 PUBLICO */}
                <SegmentedControl
                    values={['Jóvenes', 'Adultos', 'Todos']}
                    tintColor='#E3C6F8'
                    activeFontStyle={{color:"#1D1D1D", fontWeight:"700"}}
                    fontStyle={{ }}
                    selectedIndex={0}
                    onValueChange={(value) => {
                    setPublicoSeleccionado(value)
                    }}
                />
                {/* Fila 3 MINI DESCRIPCION */}
                <FieldBordePequenoRosa style={{marginTop:22, fontSize:15}} onChangeText={manejarMiniDescripcion} placeholder={"Mini descripción"} altura={40}/>
                {/* Fila 4 DESCRIPCION */}
                <FieldBordePequenoRosa multiline onChangeText={manejarDescripcion} style={{marginTop:22, fontSize:15,  paddingVertical:10}}  placeholder={"Descripción"} altura={140}/>

                {/* Fila 5 COLORS */}
                <View style={{height:50, marginTop:22,justifyContent:"space-evenly",flexDirection:"row"}}>

                    <CirculoColor nombreColor={"naranja"} onPress={()=>setColorSeleccionado("naranja")} color={Colors.NaranjaElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                    <CirculoColor nombreColor={"rojo"} onPress={()=>setColorSeleccionado("rojo")}  color={Colors.RojoElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                    <CirculoColor nombreColor={"verde"} onPress={()=>setColorSeleccionado("verde")}  color={Colors.VerdeElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                    <CirculoColor nombreColor={"azul"} onPress={()=>setColorSeleccionado("azul")}  color={Colors.AzulElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                    <CirculoColor nombreColor={"morado"} onPress={()=>setColorSeleccionado("morado")}  color={Colors.MoradoElemento} colorSeleccionado={colorSeleccionado}></CirculoColor>
                
                </View>

                {/* Fecha y hora */}
                <Text style={{fontSize:18, marginTop:22, fontWeight:"600", color:"#BC77EE", textAlign:"center"}}>Fecha y hora</Text>
                
                <View style={{marginTop:22, height:40, justifyContent:"center", columnGap:20, flexDirection:"row"}}>
                    
                    {/* Fecha */}
                    <Pressable onPress={()=>setFechaPickerAbierta(true)} style={{justifyContent:"center", backgroundColor:"#F6F6F6", borderRadius:14, borderCurve:"continuous", paddingHorizontal:22}}>
                        <Text style={{fontSize:17, fontWeight:"600", color:"#C78EF0", textAlign:"center"}}>{fechaAString(fechaSeleccionada)}</Text>           
                    </Pressable>

                    <DateTimePickerModal
                        isVisible={fechaPickerAbierta}
                        mode="date"
                        onConfirm={asignarFecha}
                        onCancel={()=>setFechaPickerAbierta(false)}
                    />

                    {/* Hora */}
                    <Pressable onPress={()=>setHoraPickerAbierta(true)} style={{justifyContent:"center", backgroundColor:"#F6F6F6", borderRadius:14,borderCurve:"continuous",paddingHorizontal:18}}>
                         <Text style={{fontSize:17, fontWeight:"600", color:"#C78EF0", textAlign:"center"}}>{horaSeleecionada}</Text>
                    </Pressable>

                    <DateTimePickerModal
                        isVisible={horaPickerAbierta}
                        mode="time"
                        onConfirm={asignarHora}
                        onCancel={()=>setHoraPickerAbierta(false)}
                    />

                </View>

                {/* Boton crear */}
                <View style={{marginTop:22}}>
                    <BotonDegradado color={Colors.DegradatRosa} texto="Crear"></BotonDegradado>
                </View>    
            </ScrollView>
        </View>         
       </TouchableWithoutFeedback>         
    </View>
  );
};

export default CrearEvento;