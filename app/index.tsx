import { LinearGradient } from "expo-linear-gradient"
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import MaskedView from '@react-native-masked-view/masked-view';
import TextoDegradadoAzul from "../components/TextoDegradadoAzul"
import BotonDegradadoAzul from "../components/BotonDegradadoAzul"
import FieldDegradadoAzul from "@/components/FieldDegradadoAzul";

const UserLogin = () => {

    return <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contenedorPrincipal}>
            <View style={styles.cajaLogo}>
                <Image style={styles.logo} source={require("../assets/images/logos/logoDegradat.png")} />

                <TextoDegradadoAzul style={styles.subtituloLogo}>Mantente al tanto</TextoDegradadoAzul>
               
              
            </View>

            <View style={styles.cajaFormulario}>

                {/*Boto en degradat*/}
                <BotonDegradadoAzul width="200" texto="Entrar"/>
                <FieldDegradadoAzul texto="email"/>

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
        borderColor: "red",
        borderWidth: 1
    },






})

export default UserLogin