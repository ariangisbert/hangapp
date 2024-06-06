import { useAuth } from "@/providers/AuthProvider"
import { Redirect, Stack } from "expo-router"


const AuthLayout= ()=>{


    const {session} = useAuth()

    //Si ja esta la sesió inicia no se pot entrar así
    // if(session){

    //     return <Redirect href={"/"}></Redirect>

    // }

    return(

        <Stack>
            <Stack.Screen name="LoginAsociacion" options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="RegistroAsociaciones" options={{headerShown:false}}></Stack.Screen>
      
        </Stack>

    )

}

export default AuthLayout