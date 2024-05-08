import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento, Loteria, Rifa } from '@/assets/types';


export const recibirListaLoteria = (id_municipio:any) => {
  
    let dateHoy =  new Date()
    let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
    
    

    return useQuery<Loteria[]>({
    queryKey: ['loteria'],
    queryFn: async () => {
      const { data, error } =  await supabase.from("loteria")
      .select("*")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_municipio",id_municipio). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      gt("fecha", fecha)//Que tinguen lloc en un futur
      .order("fecha")


      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const recibirLoteria = (id:any)=>{  

  return useQuery<Loteria>({
    queryKey: ['loteria', id],
    queryFn: async () => {
      const { data, error } = await supabase.from("loteria")
      .select("*")//Seleccionem els eventos i els logos de les asocicions
      .eq("id",id).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });


}