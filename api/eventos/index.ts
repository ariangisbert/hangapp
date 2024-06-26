import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento } from '@/assets/types';


export const useListaEventos = (id_municipio:any, cargandoUsuario:boolean) => {
  
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
    },enabled:!cargandoUsuario
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

export const useListaEventosByAsociacionAnterior = (id_asociacion:any, cargandoAsociacion:boolean) => {
  
  let dateHoy =  new Date()
  let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

  let horaActual = (dateHoy.getHours()+":"+dateHoy.getMinutes()+":00")

  return useQuery<Evento[]>({
  queryKey: ['eventosAnteriores', id_asociacion],
  queryFn: async () => {
    const { data, error } = await supabase.from("eventos")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    .or(`fecha_evento.lt.${fechaActual},and(fecha_evento.eq.${fechaActual},hora_evento.lt.${horaActual})`)//Filtra soles els eventos que estiguen en hora i dia futur
    .order("fecha_evento");

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }, enabled:!cargandoAsociacion,
},);
};


export const useInsertEvento = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Evento, 'id'>) {
      const { error } = await supabase.from('eventos').insert({
        titulo_evento: data.titulo_evento,
        mini_descripcion_evento: data.mini_descripcion_evento,
        descripcion_evento: data.descripcion_evento,
        ubicacion_evento: data.ubicacion_evento,
        fecha_evento: data.fecha_evento,
        hora_evento: data.hora_evento,
        id_asociacion: data.id_asociacion,
        id_municipio: data.id_municipio,
        imagen_evento: data.imagen_evento,
        publico_evento:data.publico_evento,
        gratis_evento:true,
        color_evento:data.color_evento

      });

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["eventos"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  });


}

export const useEliminarEvento = ()=>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id:number) {
      
      const { error } = await supabase.from('eventos').delete().eq("id_evento",id);

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["eventos"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  });



}

export const recibirEventosFuturosByUsuario = (id_usuario:any, cargandoUsuario:boolean) =>{

  let dateHoy =  new Date()
  let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

  let horaActual = (dateHoy.getHours()+":"+dateHoy.getMinutes()+":00")

  //Mos torna tot el numero de eventos en sí, pero els que no coincidixen en el filtro els  torna com a null

  return useQuery<any>({
  queryKey: ['eventosFuturos'],
  queryFn: async () => {
    const { data, error } = await supabase.from("asistencias")
    .select("eventos(*)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_usuario", id_usuario)
    .gt("eventos.fecha_evento", fechaActual)
    if (error) {
      console.log(error.message)
      throw new Error(error.message);
    }
    
    return data;
  },enabled:!cargandoUsuario
});
}



export const recibirEventosAsistidosByUsuario = (id_usuario:any, cargandoUsuario:boolean) =>{

  let dateHoy =  new Date()
  let fechaActual = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())

  let horaActual = (dateHoy.getHours()+":"+dateHoy.getMinutes()+":00")

  //Mos torna tot el numero de eventos en sí, pero els que no coincidixen en el filtro els  torna com a null

  return useQuery<any>({
  queryKey: ['eventosPasados'],
  queryFn: async () => {
    const { data, error } = await supabase.from("asistencias")
    .select("eventos(*)")
    .eq("id_usuario", id_usuario)
     .lt("eventos.fecha_evento", fechaActual)
    if (error) {
      console.log(error.message)
      throw new Error(error.message);
    }
    //Eliminem els que siguen null
    return data.filter(item => item.eventos !== null);

  },enabled:!cargandoUsuario
});
}

export const recibirEventosNoOpinados = (id_usuario:any, cargandoUsuario:boolean) =>{

 
  //Mos torna tot el numero de eventos en sí, pero els que no coincidixen en el filtro els  torna com a null

  return useQuery<any>({
  queryKey: ['eventosOpinados'],
  queryFn: async () => {
    const { data, error } = await supabase.from("opinionesEventos")
    .select("eventos(*)")
    .eq("id_usuario", id_usuario)

    if (error) {
      console.log(error.message)
      throw new Error(error.message);
    }
    //Eliminem els que siguen null
    
    return data

  },enabled:!cargandoUsuario
});
}

