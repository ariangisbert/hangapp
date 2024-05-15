import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const useListaEventos = (id_municipio:any) => {
  
    let dateHoy =  new Date()
    let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

    let horaActual = (dateHoy.getHours()+":"+dateHoy.getMinutes()+":00")

    return useQuery<Evento[]>({
    queryKey: ['eventos'],
    queryFn: async () => {
      const { data, error } = await supabase.from("eventos")
      .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id_municipio",id_municipio) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
      .or(`fecha_evento.gt.${fechaActual},and(fecha_evento.eq.${fechaActual},hora_evento.gt.${horaActual})`)//Filtra soles els eventos que estiguen en hora i dia futur
      .order("fecha_evento");

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useListaEventosByAsociacion = (id_asociacion:any, cargandoAsociacion:boolean) => {
  
  let dateHoy =  new Date()
  let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

  let horaActual = (dateHoy.getHours()+":"+dateHoy.getMinutes()+":00")

  return useQuery<Evento[]>({
  queryKey: ['eventos', id_asociacion],
  queryFn: async () => {
    const { data, error } = await supabase.from("eventos")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    .or(`fecha_evento.gt.${fechaActual},and(fecha_evento.eq.${fechaActual},hora_evento.gt.${horaActual})`)//Filtra soles els eventos que estiguen en hora i dia futur
    .order("fecha_evento");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }, enabled:!cargandoAsociacion,
},);
};

