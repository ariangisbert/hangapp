import { supabase } from "@/lib/supabase"
import { useAuth } from "@/providers/AuthProvider"
import { Redirect } from "expo-router"
import { ActivityIndicator, Text } from "react-native"

const index = () =>{

    
    const {session, cargando, usuario, cargandoUsuario} = useAuth()


    //Esperem a que carregue la sesió
    if(cargando){

        return <ActivityIndicator></ActivityIndicator>

    }

    //Si hi ha una sessio activa
    if(session){
        //Quan carregue el poble
        if(cargandoUsuario){

            return <ActivityIndicator></ActivityIndicator>

            
        }else{

            console.log(usuario)


            //Comprobem si es usuari normal o asociacio

            



            //Comprobem si te un poble per defecte
            //Si no el te el redirigim a seleccionar municipi
            if(usuario){//Per a evitar errors, si hi ha una sesio pero no hi ha un usuari mos torna al login

                if(usuario.grupo==="ASOCIACION"){

                    return  <Redirect href={"(homeAsociacion)"}></Redirect>

                }
                
                if(usuario.municipio_defecto==null){
                return  <Redirect href={"/SeleccionarMunicipio"}></Redirect>
                }else{ 
                //Si si que te un municipi el redirigim al home
                    return <Redirect href={"/(homeUsuario)"}></Redirect>
                }

            }else{

            return <Redirect href={"/UserLogin"}></Redirect>

            }
        }

    }else{ //Si no
        //Mos porta a la pantalla de login
        return(
            <Redirect href={"/UserLogin"}></Redirect>
            
        )
    }


}

export default index
