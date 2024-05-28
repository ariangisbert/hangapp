import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento, Rifa } from '@/assets/types';


export const recibirListaRifas = (id_municipio:any, cargandoUsuario:boolean) => {
  
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
    },enabled:!cargandoUsuario
  });
};

export const recibirListaRifasAnteriores = (id_municipio:any, cargandoUsuario:boolean) => {
  
  let dateHoy =  new Date()
  let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
  
  
  return useQuery<Rifa[]>({
  queryKey: ['rifasAnteriores'],
  queryFn: async () => {

    const { data, error } =
    
    dateHoy.getHours()<12?
    await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_municipio",id_municipio). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    lt("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")
    :await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_municipio",id_municipio). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    lte("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")


    if (error) {
      throw new Error(error.message);
    }
    return data;
  },enabled:!cargandoUsuario
});
};

export const recibirListaRifasByAsociacion = (id_asociacion:any, cargandoAsociacion:boolean) => {
  
  let dateHoy =  new Date()
  let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
  
  

  return useQuery<Rifa[]>({
  queryKey: ['rifas', id_asociacion],
  queryFn: async () => {
    const { data, error } =
    
    dateHoy.getHours()<12?
    await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    gte("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")
    :await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    gt("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")


    if (error) {
      throw new Error(error.message);
    }
    return data;
  },enabled:!cargandoAsociacion
});
};

export const recibirListaRifasAnterioresByAsociacion = (id_asociacion:any, cargandoAsociacion:boolean) => {
  
  let dateHoy =  new Date()
  let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
  
  
  return useQuery<Rifa[]>({
  queryKey: ['rifasAnterioresAsociacion'],
  queryFn: async () => {

    const { data, error } =
    
    dateHoy.getHours()<12?
    await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    lt("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")
    :await supabase.from("rifas")
    .select("*, asociaciones(logo_asociacion)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_asociacion",id_asociacion). //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    lte("fecha", fecha)//Que tinguen lloc en un futur
    .order("fecha")


    if (error) {
      throw new Error(error.message);
    }
    return data;
  },enabled:!cargandoAsociacion
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

export const useInsertRifa = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Rifa, 'id'>) {
      const { error } = await supabase.from('rifas').insert({
        titulo: data.titulo,
        descripcion: data.descripcion,
        fecha: data.fecha,
        id_asociacion: data.id_asociacion,
        id_municipio: data.id_municipio,
        imagen: data.imagen,
        precio:data.precio,
        numero_maximo_fisico:data.numero_maximo_fisico

      });

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["rifas"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  });

}

export const useInsertCompraRifa = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<{id_usuario:any, id_rifa:any, cantidad:number}, 'id'>) {
      const { error } = await supabase.from('comprasRifas').insert({
        id_usuario: data.id_usuario,
        id_rifa: data.id_rifa,
        cantidad: data.cantidad,

      });

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["rifas"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  })

}