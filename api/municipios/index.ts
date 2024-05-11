import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const recibirNombreMunicipio = (id_municipio:number) => {
  
    return useQuery<any>({
    queryKey: ['municipios', id_municipio],
    queryFn: async () => {
      const { data, error } = await supabase.from("municipios")
      .select("*")//Seleccionem nom del municipi
      .eq("id_municipio",id_municipio).single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const recibirMunicipioyProvincia = (id_municipio:number) => {
  
  return useQuery<any>({
  queryKey: ['municipios', id_municipio],
  queryFn: async () => {
    const { data, error } = await supabase.from("municipios")
    .select("*, provincias(nombre_provincia)")//Seleccionem nom del municipi
    .eq("id_municipio",id_municipio).single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
});
};