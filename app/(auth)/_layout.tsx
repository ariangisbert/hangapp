import { Stack } from "expo-router"


const AuthLayout= ()=>{

    return(

        <Stack>
            <Stack.Screen name="UserLogin" options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="UserRegistro" options={{headerShown:false}}></Stack.Screen>
        </Stack>

    )

}

export default AuthLayout