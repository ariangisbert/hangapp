import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const recibirOpinionesPositivas = (id_evento:any) => {
  
    return useQuery<any>({
    queryKey: ['opiniones', id_evento],
    queryFn: async () => {
      const { count,data, error } = await supabase.from("opinionesEventos")
      .select("*", {count:"exact", head:true})//Seleccionem els eventos i els logos de les asocicions
      .eq("id_evento",id_evento)
      .eq("gustado", true) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      
  
      if (error) {
        throw new Error(error.message);
      }
      return count;
    }, 
  },);
  };

  export const recibirOpinionesNegativas = (id_evento:any) => {
  
    return useQuery<any>({
    queryKey: ['opinionesNegativas', id_evento],
    queryFn: async () => {
      const { count,data, error } = await supabase.from("opinionesEventos")
      .select("*", {count:"exact", head:true})//Seleccionem els eventos i els logos de les asocicions
      .eq("id_evento",id_evento)
      .eq("gustado", false) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      
  
      if (error) {
        throw new Error(error.message);
      }
      return count;
    }, 
  },);
  };