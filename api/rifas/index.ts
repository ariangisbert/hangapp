import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento, Rifa } from '@/assets/types';


export const recibirListaRifas = (id_municipio:any) => {
  
    let dateHoy =  new Date()
    let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
    
    

    return useQuery<Rifa[]>({
    queryKey: ['rifas'],
    queryFn: async () => {
      const { data, error } =
      
      dateHoy.getHours()<12?
      await supabase.from("rifas")
      .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_municipio",id_municipio). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      gte("fecha", fecha)//Que tinguen lloc en un futur
      .order("fecha")
      :await supabase.from("rifas")
      .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
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

export const recibirRifa = (id:any)=>{  

  return useQuery<Rifa>({
    queryKey: ['rifas', id],
    queryFn: async () => {
      const { data, error } = await supabase.from("rifas")
      .select("*,asociaciones(nombre_asociacion)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id",id).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });


}