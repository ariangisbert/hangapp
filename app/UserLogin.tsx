import { LinearGradient } from "expo-linear-gradient"
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import MaskedView from '@react-native-masked-view/masked-view';
import TextoDegradadoAzul from "../components/TextoDegradadoAzul"
import BotonDegradado from "../components/BotonDegradado"
import FieldDegradado from "@/components/FieldDegradado";
import Colors from "@/constants/Colors";
import { useState } from "react";

const UserLogin = () => {

    //Variables del login

    //Email
    const [email, setEmail] = useState("")
    const manejarEmail = (texto:string) => {setEmail(texto)}

    //Contraseña
    const [password, setPassword] = useState("")
    const manejarPassword = (texto:string) =>setPassword(texto)

    function clickEntrar(){

        Alert.alert(email)

    }

    return <SafeAreaView style={{ flex: 1 }}>
        
        <View style={styles.contenedorPrincipal}>
            <View style={styles.cajaLogo}>
                <Image style={styles.logo} source={require("../assets/images/logos/logoDegradat.png")} />

                <TextoDegradadoAzul style={styles.subtituloLogo}>Mantente al tanto</TextoDegradadoAzul>
            </View>

            <View style={styles.cajaFormulario}>

                <FieldDegradado onChangeText = {manejarEmail} width={280} color={Colors.DegradatMorat} placeholder="Email"/>
                <FieldDegradado secureTextEntry onChangeText = {manejarPassword} width={280} color={Colors.DegradatMorat} placeholder="Contraseña"/>
                <BotonDegradado onPress = {clickEntrar} color={Colors.DegradatMorat} texto="Entrar"/>
                
            </View>
        </View>
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
    },

})

export default UserLogin