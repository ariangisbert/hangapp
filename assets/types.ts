import { Float } from "react-native/Libraries/Types/CodegenTypes"

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

export type Rifa = {

    id: number,
    titulo:string,
    descripcion:string,
    fecha:string,
    id_asociacion:number,
    id_municipio:number,
    imagen:any,
    precio:Float,
    asociaciones:any,

}

export type Loteria = {

    id: number,
    titulo:string,
    fecha:string,
    id_asociacion:number,
    id_municipio:number,
    numero:number,
    precio:Float,
    color:string,
    asociaciones:any
}

