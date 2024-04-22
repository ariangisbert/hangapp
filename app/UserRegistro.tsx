import { LinearGradient } from "expo-linear-gradient"
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import MaskedView from '@react-native-masked-view/masked-view';
import TextoDegradadoAzul from "../components/TextoDegradadoAzul"
import BotonDegradado from "../components/BotonDegradado"
import FieldDegradado from "@/components/FieldDegradado";
import Colors from "@/constants/Colors";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";





const UserRegistro = () => {

    

    //Variables del registro

    //Email
    const [email, setEmail] = useState("")
    const manejarEmail = (texto:string) => {setEmail(texto)}

    //Nombre
    const [nombre, setNombre] = useState("")
    const manejarNombre = (texto:string) =>{setNombre(texto)}

    //Apellidos
    const [apellidos, setApellidos] = useState("")
    const manejarApellidos = (texto:string) =>{setApellidos(texto)}
 
    //Contraseña
    const [password, setPassword] = useState("")
    const manejarPassword = (texto:string) =>setPassword(texto)

    //Repetir contraseña
    const [repeatPassword, setRepeatPassword] = useState("")
    const manejarRepeatPassword = (texto:string) =>setRepeatPassword(texto)

  

    async function clickEntrar(){

        //Comprobem els errors.

        let todoCorrecto = true
        let errors = []


        //Nom
        if(nombre.length==0||nombre===""){

            todoCorrecto=false
            errors.push("Introduce tu nombre.")

        }else{
            if(/\d/.test(nombre)==true){

                todoCorrecto=false
                errors.push("Tu nombre no puede contener números.")

            }
        }   

        //Cognom

        if(apellidos.length==0||apellidos===""){

            todoCorrecto=false
            errors.push("Introduce tu apellido.")

        }else{

                if(/\d/.test(apellidos)==true){

                    todoCorrecto=false
                    errors.push("Tu apellido no puede contener números.")
                
                }
         }
        

        //Email siga correcte
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if(reg.test(email)==false){

            todoCorrecto=false
            errors.push("Introduce un email válido.")

        }

        //Contraseñes
        if(password.length<6){

            todoCorrecto=false
            errors.push("Tu contraseña debe tener al menos 6 caracteres.")

        }else{

            //Si no conicidixen les contraseñes
            if(password!==repeatPassword){

                todoCorrecto=false
                errors.push("Las contraseñas no coniciden")


            }


        }

        if(todoCorrecto==false){

            Alert.alert(errors.join("\n"))

            return

        }

        //Si esta tot be registrem al usuari
        const { data, error } = await supabase.auth.signUp(
            {
            email: email,
            password: password,
            options:{ data:{
                nombre:nombre,
                apellidos:apellidos
                }
             }
          }
        )
        



         if(error){
         Alert.alert(error.message)
         }
        
        

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