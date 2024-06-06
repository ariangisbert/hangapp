import { LinearGradient } from "expo-linear-gradient"
import { ActivityIndicator, Alert, Button, Image, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import MaskedView from '@react-native-masked-view/masked-view';
import TextoDegradado from "../../components/TextoDegradado"
import BotonDegradado from "../../components/BotonDegradado"
import FieldDegradado from "@/components/FieldDegradado";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const LoginAsociacion = () => {

    ///////LOGICA

    //Variables del login
    
    //Email

    const [email, setEmail] = useState("")
    const manejarEmail = (texto: string) => { setEmail(texto) }

    //Contraseña
    const [password, setPassword] = useState("")
    const manejarPassword = (texto: string) => setPassword(texto)

    const {session, cargando:cargandoSesion, usuario, cargandoUsuario, setUsuario} = useAuth()

    useEffect(()=>{


        if(usuario!==null){

            if(usuario.grupo==="ASOCIACION"){

                router.replace("/")

            }else{

                Alert.alert("No existe una asociacion con esas credenciales")
                supabase.auth.signOut()
                setUsuario(null)

            }
        }else{
            console.log("no usuario")
        }

        


    }, [usuario])


    if(cargandoSesion||cargandoUsuario){
        
        return<ActivityIndicator></ActivityIndicator>
    }

    
    


        
    

    async function clickEntrar() {


        if(email.length==0||email==""){

            Alert.alert("Introduce un email")
            return
        }else{

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

            if (reg.test(email) == false) {

                Alert.alert("Introduce un email válido")
                return

            }
        }

        if(password.length==0||password==""){

            Alert.alert("Introduce una contraseña")
            return
        }

        //Una vegada comprobem els camps iniciem sesió
        const {data, error} = await supabase.auth.signInWithPassword({email, password})

        //Si nia un error parem
        if(error){

            Alert.alert("Email o contraseña incorrectos")
            return

        }
        
    }




    ///////DISENY
    return <SafeAreaView style={{ flex: 1 }}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.contenedorPrincipal}>
                <View style={styles.cajaLogo}>
                    <Image style={styles.logo} source={require("../../assets/images/logos/logoAsociaciones.png")} />

                  </View>

                <View style={styles.cajaFormulario}>
                   
                    <View style={styles.elementoFormulario}>
                    <FieldDegradado onChangeText={manejarEmail} width={280} color={Colors.DegradatRosa} placeholder="Email" />
                    </View>

                    <View style={styles.elementoFormulario}>
                    <FieldDegradado secureTextEntry onChangeText={manejarPassword} width={280} color={Colors.DegradatRosa} placeholder="Contraseña" />
                    </View>

                    <View style={styles.elementoFormulario}>
                    <BotonDegradado onPress={clickEntrar} color={Colors.DegradatRosa} texto="Entrar" />
                    </View>

                    {/* Boto pa anar a registrarse */}
                    <View style={styles.elementoFormulario}>
                        <Link href={"/RegistroAsociaciones"} asChild>
                            <Pressable>
                                <TextoDegradado color={Colors.DegradatRosa} style={styles.subtituloLogo}>Solicitar afiliación</TextoDegradado>
                            </Pressable>
                        </Link>
                    </View>

                    {/*Boto pa anar a la zona administrador  */}
                    <View style={styles.elementoFormulario}>
                        
                            <BotonDegradado onPress={()=>{router.navigate("/UserLogin")}} color={Colors.DegradatMorat} texto="Zona Usuario"/>
                            
                    </View>
                    

                </View>
            </View>

        </TouchableWithoutFeedback>
    </SafeAreaView>


}



const styles = StyleSheet.create({

    contenedorPrincipal: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    cajaLogo: {
        alignItems: "center",
        flex: 1,
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
        justifyContent:"center",
        alignItems:"center"
    },
    elementoFormulario:{

        paddingVertical: "5%"
        

    }

})

export default LoginAsociacion