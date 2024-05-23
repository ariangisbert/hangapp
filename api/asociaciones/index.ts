import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const recibirAsociacion = (usuario_id:any, cargandoUsuario:boolean)=>{  

    return useQuery<any>({
      queryKey: ['asociacion', usuario_id],
      queryFn: async () => {
        const { data, error } = await supabase.from("asociaciones")
        .select("*")//Seleccionem els eventos i els logos de les asocicions
        .eq("id",usuario_id).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari
  
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
      enabled:!cargandoUsuario
    });
  
}