import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const comprobarCompra = (id_rifa:any, id_usuario:any, cargandoRifa:boolean, cargandoUsuario: boolean)=>{

    return useQuery<any>({
        queryKey: ['rifas', id_rifa, id_usuario],
        queryFn: async () => {
          const { data, error } = await supabase.from("comprasRifas")
          .select("*")//Seleccionem els eventos i els logos de les asocicions
          .eq("id_rifa",id_rifa) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
          .eq("id_usuario", id_usuario)
          if (error) {
            throw new Error(error.message);
          }
          if(data.length===0){
          return false
          }else{
            return true
          }
        },
        enabled:!(cargandoRifa&&cargandoUsuario)
    
      });

}