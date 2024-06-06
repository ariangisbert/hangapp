import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  export const recibirNumeroComentarios = (id_evento:any) => {
  
    return useQuery<any>({
    queryKey: ['numeroComentarios', id_evento],
    queryFn: async () => {
      const { count,data, error } = await supabase.from("opinionesEventos")
      .select("*", {count:"exact", head:true})//Seleccionem els eventos i els logos de les asocicions
      .eq("id_evento",id_evento)
      .neq("comentario", "") //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      
      if (error) {
        throw new Error(error.message);
      }
      if(count){
      return count
      }else{

        return 0

      };
    }, 
  },);
  };

  export const recibirComentarios = (id_evento:any) => {
  
    return useQuery<any>({
    queryKey: ['numeroComentarios', id_evento],
    queryFn: async () => {
      const { data, error } = await supabase.from("opinionesEventos")
      .select("comentario,gustado, profiles(nombre,apellidos, avatar_url)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_evento",id_evento)
      .neq("comentario", "") //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      
      if (error) {
        throw new Error(error.message);
      }
      return data
    }, 
  },);
  };

  export const useInsertOpinion = () =>{

    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: Omit<{id_evento:any, id_usuario:any, gustado:boolean, comentario:any}, 'id'>) {
        const { error } = await supabase.from('opinionesEventos').insert({
          id_evento:data.id_evento,
          id_usuario:data.id_usuario,
          gustado:data.gustado,
          comentario:data.comentario
        });
  
        if (error) {
          throw error
        }
      },
      async onSuccess() {
        await queryClient.invalidateQueries(["eventosPasados", "eventosOpinados"] as any);
      },
      onError(error) {
        console.log(error.message);
      },
    });
  
  
  }

