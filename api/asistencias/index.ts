import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const recibirAsistencias = (id_evento:any, cargandoEvento:boolean) => {
  
    return useQuery<any>({
    queryKey: ['asistencias', id_evento],
    queryFn: async () => {
      const { data, error, count } = await supabase.from("asistencias")
      .select("*",{count:"exact", head:true})//Seleccionem els eventos i els logos de les asocicions
      .eq("id_evento",id_evento) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      
      if (error) {
        throw new Error(error.message);
      }
      return count;
    },

    enabled:!cargandoEvento

  });
};



export const useInsertAsistencia = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<{id_evento:any, id_usuario:any}, 'id'>) {
      const { error } = await supabase.from('asistencias').insert({
        id_evento:data.id_evento,
        id_usuario:data.id_usuario
      });

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["asistencias"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  });


}

export const comprobarAsistencia = (id_evento:any, id_usuario:any, cargandoEvento:boolean, cargandoUsuario: boolean)=>{

    return useQuery<any>({
        queryKey: ['asistencias', id_evento, id_usuario],
        queryFn: async () => {
          const { data, error } = await supabase.from("asistencias")
          .select("*")//Seleccionem els eventos i els logos de les asocicions
          .eq("id_evento",id_evento) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
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
        enabled:!(cargandoEvento&&cargandoUsuario)
    
      });

}


// export const useEliminarEvento = ()=>{

//   const queryClient = useQueryClient();

//   return useMutation({
//     async mutationFn(id:number) {
      
//       const { error } = await supabase.from('eventos').delete().eq("id_evento",id);

//       if (error) {
//         throw error
//       }
//     },
//     async onSuccess() {
//       await queryClient.invalidateQueries(["eventos"] as any);
//     },
//     onError(error) {
//       console.log(error.message);
//     },
//   });



// }

