import { LinearGradient } from "expo-linear-gradient"
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import MaskedView from '@react-native-masked-view/masked-view';
import TextoDegradadoAzul from "../components/TextoDegradadoAzul"
import BotonDegradado from "../components/BotonDegradado"
import FieldDegradado from "@/components/FieldDegradado";
import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";





const UserRegistro = () => {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

        useEffect(() => {
            const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
            );
            const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
            );

        return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
        };
    }, []);

    //Variables del registro

    //Email
    const [email, setEmail] = useState("")
    const manejarEmail = (texto:string) => {setEmail(texto)}

    //Nombre
    const [nombre, setNombre] = useState("")
    const manejarNombre = (texto:string) =>{setNombre(texto)}

    //Apellidos
    const [apellidos, setApellidos] = useState("")
    const manejarApellidos = (texto:string) =>{setNombre(texto)}
 
    //Contraseña
    const [password, setPassword] = useState("")
    const manejarPassword = (texto:string) =>setPassword(texto)

    //Repetir contraseña
    const [repeatPassword, setRepeatPassword] = useState("")
    const manejarRepeatPassword = (texto:string) =>setRepeatPassword(texto)

  

    function clickEntrar(){

        Alert.alert(email)

    }

     return <SafeAreaView style={{ flex: 1 }}>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                
                <View style={styles.contenedorPrincipal}>
                    <View style={styles.cajaLogo}>
                        <Image style={styles.logo} source={require("../assets/images/logos/logoDegradat.png")} />
                    </View>
                
                        <View style={styles.cajaFormulario}>
                            <ScrollView>
                                <View style={[styles.elementoFormulario, {paddingTop:0}]}>
                                <FieldDegradado onChangeText = {manejarNombre} width={280} color={Colors.DegradatMorat} placeholder="Nombre" autoComplete="name"/>
                                </View>

                                <View style={styles.elementoFormulario}>
                                <FieldDegradado onChangeText = {manejarApellidos} width={280} color={Colors.DegradatMorat} placeholder="Apellidos" autoComplete = "off" />
                                </View>

                                <View style={styles.elementoFormulario}>
                                <FieldDegradado onChangeText = {manejarEmail} width={280} color={Colors.DegradatMorat} placeholder="Email" autoComplete="email"/>
                                </View>

                                <View style={styles.elementoFormulario}>
                                <FieldDegradado secureTextEntry onChangeText = {manejarPassword} width={280} color={Colors.DegradatMorat} placeholder="Contraseña"/>
                                </View>

                                <View style={styles.elementoFormulario}>
                                <FieldDegradado secureTextEntry onChangeText = {manejarRepeatPassword} width={280} color={Colors.DegradatMorat} placeholder="Repite la contraseña"/>
                                </View>

                                <View style={styles.elementoFormulario}>
                                <BotonDegradado onPress = {clickEntrar} color={Colors.DegradatMorat} texto="Registrarse"/>
                                </View>
                            
                             </ScrollView>
                        </View>
                    
                </View>

            </KeyboardAvoidingView>

        </TouchableWithoutFeedback>
    </SafeAreaView>

}

export default UserRegistro

const styles = StyleSheet.create({

    contenedorPrincipal: {
        flex: 1,
    },
    cajaLogo: {
        alignItems: "center",
        justifyContent:"center",
        paddingTop:5,
        flex:1,
    },
    logo: {

        flex: 1,
        resizeMode: "center",
        width: "100%"

    },
    subtituloLogo: {

        fontWeight: "500",
        fontSize: 18

    },
    cajaFormulario: {
        flex: 4,

    },
    elementoFormulario:{

        flex:1,
        padding:"5%"

    }

})