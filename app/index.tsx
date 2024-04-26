import { useAuth } from "@/providers/AuthProvider"
import { Redirect } from "expo-router"
import { ActivityIndicator, Text } from "react-native"

const index = () =>{

    const {session, cargando, usuario} = useAuth()

    if(cargando){

        return <ActivityIndicator></ActivityIndicator>

    }

    //Si hi ha una sessio activa
    if(session){


        //Comprobem si te un poble per defecte
        //Si no el te el redirigim a seleccionar municipi
        if(!usuario.municipio_defecto){
           return  <Redirect href={"/SeleccionarMunicipio"}></Redirect>
        }else{
        //Si si que te un municipi el redirigim al home
            return <Redirect href={"/loginCorrecto"}></Redirect>
         }

    }else{ //Si no

        //Mos porta a la pantalla de login
        return(
            <Redirect href={"/UserLogin"}></Redirect>
            
        )
    }


}

export default index
