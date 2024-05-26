import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Evento, Loteria, Rifa } from '@/assets/types';


export const recibirListaLoteria = (id_municipio:any, cargandoUsuario:boolean) => {
  
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
    },enabled:!cargandoUsuario
  });
};

export const recibirListaLoteriaByAsociacion = (id_asociacion:any, cargandoAsociacion:boolean) => {
  
  let dateHoy =  new Date()
  let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
  
  

  return useQuery<Loteria[]>({
  queryKey: ['loteria'],
  queryFn: async () => {
    const { data, error } =  await supabase.from("loteria")
    .select("*")//Seleccionem els eventos i els logos de les asocicions
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

export const recibirLoteria = (id:any)=>{  

  return useQuery<Loteria>({
    queryKey: ['loteria', id],
    queryFn: async () => {
      const { data, error } = await supabase.from("loteria")
      .select("*,asociaciones(nombre_asociacion)")//Seleccionem els eventos i els logos de les asocicions
      .eq("id",id).single() //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });


}

export const useInsertReservaLoteria = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<{id_usuario:any, id_loteria:any, cantidad:number, numero_telefono:any}, 'id'>) {
      const { error } = await supabase.from('reservasLoteria').insert({
        id_usuario: data.id_usuario,
        id_loteria: data.id_loteria,
        cantidad: data.cantidad,
        numero_telefono:data.numero_telefono

      });

      if (error) {
        throw error
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["loteria"] as any);
    },
    onError(error) {
      console.log(error.message);
    },
  })

}

export const comprobarReserva = (id_loteria:any, id_usuario:any, cargandoLoteria:boolean, cargandoUsuario: boolean)=>{

  return useQuery<any>({
      queryKey: ['loteria', id_loteria, id_usuario],
      queryFn: async () => {
        const { data, error } = await supabase.from("reservasLoteria")
        .select("*")//Seleccionem els eventos i els logos de les asocicions
        .eq("id_loteria",id_loteria) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
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
      enabled:!(cargandoLoteria&&cargandoUsuario)
  
    });

}

export const recibirListaReservas = (id_loteria:any) => {
  
  let dateHoy =  new Date()
  let fecha = (dateHoy.getFullYear()+"-"+(dateHoy.getMonth()+1)+"-"+dateHoy.getDate())
  
  

  return useQuery<any>({
  queryKey: ['reservas'],
  queryFn: async () => {
    const { data, error } =  await supabase.from("reservasLoteria")
    .select("*, profiles(nombre, apellidos)")//Seleccionem els eventos i els logos de les asocicions
    .eq("id_loteria",id_loteria) //Busquem tots els eventos que tinguen el municipi igual que el muncipi del usuari 
    .order("gestionada")


    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
});
};

export const useUpdateReservaGestionada = () =>{

  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id_usuario, id_loteria }: any) {
      
      const { error } = await supabase.from('reservasLoteria')
        .update({gestionada:true}).
        eq("id_usuario", id_usuario)

        if (error) {
        throw error;
      }
    }, 
    async onSuccess() {
      await queryClient.invalidateQueries(['reservas'] as any);
    },
    onError(error) {
      console.log(error);
    },
  });

}