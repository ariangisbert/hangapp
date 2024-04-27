import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
    usuario:any
    session : Session |null
    cargando:boolean
    cargandoUsuario:boolean
}

//Inicialitzem el context en null
const AuthContext = createContext<AuthData>({

    session:null,
    cargando:true,
    usuario:null,
    cargandoUsuario:true

})

export default function AuthProvider({children}:PropsWithChildren){

    const [session, setSession] = useState<Session|null>(null) //Hook de la sesio
    const [cargando, setCargando] = useState(true) //Hook que gastarem pa saber si ja s'ha baixat la sessio
    const [cargandoUsuario, setCargandoUsuario] = useState(true)
    const [usuario, setUsuario] = useState(null) //Hook que gastarem per a llegir els datos de el usuari que está en la sesió

    useEffect(()=>{

        const conseguirSesio = async ()=>{

            const {data:{session}} = await supabase.auth.getSession() //Agarrem la sesio, decostruim el data en una sessio
            setSession(session) //I la clavem en el hook
            
            
            setCargando(false)

            
       
       
        }

        conseguirSesio() //Ejecutem el metodo

        supabase.auth.onAuthStateChange((_event, session)=>{
            setSession(session)
        })

    },[])


    useEffect(()=>{

        //Quan se carregue la sessió llegim el usuari
        
        const recibirUsuario = async ()=>{

            if(session){

                const {data} = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()
    
                setUsuario(data)  
                setCargandoUsuario(false)
                
            }
            
                

        }

        recibirUsuario()
        

    },[session])

    return <AuthContext.Provider value = {{session,cargando, usuario, cargandoUsuario}}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)