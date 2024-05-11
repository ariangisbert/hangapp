import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const recibirUsuario = (session_id:any)=>{  

    return useQuery<any>({
      queryKey: ['usuario', session_id],
      queryFn: async () => {
        const { data, error } = await supabase.from("profiles")
        .select("*")//Seleccionem els eventos i els logos de les asocicions
        .eq("id",session_id).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari
  
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
    });
  
  
  }