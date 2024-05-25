import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const recibirParticipaciones = (id_rifa:any, id_usuario:any,cargandoUsuario: boolean)=>{

    return useQuery<any>({
        queryKey: ['rifas', id_rifa, id_usuario],
        queryFn: async () => {
          const { data, error } = await supabase.from("participacionesRifas")
          .select("*")//Seleccionem els eventos i els logos de les asocicions
          .eq("id_rifa",id_rifa) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
          .eq("id_usuario", id_usuario)
          if (error) {
            throw new Error(error.message);
          }
          return data
        },
        enabled:!(cargandoUsuario)
    
      });

}