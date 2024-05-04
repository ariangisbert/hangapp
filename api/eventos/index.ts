import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const useEventos = (id_municipio:any) => {
  
    let dateHoy =  new Date()
    let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

    return useQuery<Evento[]>({
    queryKey: ['eventos'],
    queryFn: async () => {
      const { data, error } = await supabase.from("eventos")
      .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_municipio",id_municipio). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      gte("fecha_evento", fechaActual)//Que tinguen lloc en un futur
      .order("fecha_evento");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};