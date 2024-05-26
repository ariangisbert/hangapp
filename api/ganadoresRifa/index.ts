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

export const comprobarGanador= (id_usuario:any, id_rifa:any,cargandoRifa:boolean, cargandoUsuario:boolean, numeroGanador:number, cargandoNumeroGanador:boolean)=>{

  return useQuery<any>({
    queryKey: ['ganador', id_rifa, id_usuario],
    queryFn: async () => {
      const { data, error } = await supabase.from("participacionesRifas")
      .select("*")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_rifa",id_rifa) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      .eq("id_usuario", id_usuario)
      .eq("numero", numeroGanador)
      if (error) {
        throw new Error(error.message);
      }
      if(data.length===0){
      return false
      }else{
        return true
      }
    },
    enabled:!(cargandoRifa&&cargandoUsuario&&cargandoNumeroGanador)

  });


}