import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const recibirNombreProvincia = (id_provincia:number) => {
  
    return useQuery<any>({
    queryKey: ['provincias', id_provincia],
    queryFn: async () => {
      const { data, error } = await supabase.from("provincias")
      .select("*")//Seleccionem nom de la provincia
      .eq("id_provincia",id_provincia).single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};