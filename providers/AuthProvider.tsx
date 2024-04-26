import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {

    session : Session |null
    usuario:any
    cargando:boolean
}

//Inicialitzem el context en null
const AuthContext = createContext<AuthData>({

    session:null,
    cargando:true,
    usuario:null

})

export default function AuthProvider({children}:PropsWithChildren){

    const [session, setSession] = useState<Session|null>(null) //Hook de la sesio
    const [cargando, setCargando] = useState(true) //Hook que gastarem pa saber si ja s'ha baixat la sessio
    const [usuario, setUsuario] = useState(null) //Hook que gastarem per a llegir els datos de el usuari que está en la sesió

    useEffect(()=>{

        const conseguirSesio = async ()=>{

            const {data:{session}} = await supabase.auth.getSession() //Agarrem la sesio, decostruim el data en una sessio
            setSession(session) //I la clavem en el hook
            
            //Quan se carregue la sessió llegim el usuari
            if(session){

                const {data} = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()

                    
                setUsuario(data||null)    
            }

            setCargando(false)
       
       
        }

        conseguirSesio() //Ejecutem el metodo

        supabase.auth.onAuthStateChange((_event, session)=>{
            setSession(session)
        })

    },[])
    return <AuthContext.Provider value = {{session,cargando, usuario}}>{children}</AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)