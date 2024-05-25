import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const recibirNumeroGanador = (id_rifa:any,  cargandoRifa:boolean, )=>{

    return useQuery<any>({
        queryKey: ['ganadoresRifa', id_rifa],
        queryFn: async () => {
          const { data, error } = await supabase.from("ganadoresRifas")
          .select("*")//Seleccionem els eventos i els logos de les asocicions
          .eq("id_rifa",id_rifa).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
          if (error) {
            throw new Error(error.message);
          }
          return data;
        },
        enabled:!cargandoRifa
    
      });

}