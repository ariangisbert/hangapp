export type Municipio = {

    id_municipio: number,
    nombre_municipio: string,
    id_provincia:number

}
export type Provincia = {

    id_provincia: number,
    nombre_provincia: string

}

export type Evento = {

    id_evento: number,
    titulo_evento:string,
    mini_descripcion_evento:string,
    descripcion_evento:string,
    fecha_evento:string,
    hora_evento:string,
    id_asociacion:number,
    id_municipio:number,
    imagen_evento:any,
    publico_evento:string,
    gratis_evento:boolean,
    color_evento:string,
    logo_asociacion:string,
    asociaciones:any,
    ubicacion_evento:string

}

