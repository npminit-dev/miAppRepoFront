import Home from '../componentes/contenido/Home'
import Tienda from '../componentes/contenido/Tienda'
import Contacto from '../componentes/contenido/Contacto'
import { Dispatch, SetStateAction } from 'react'

// producto

export interface Producto {
  ProductoID: number, 
  CategoriaID: number, 
  NombreProducto: string, 
  Precio: number, 
  Descripcion: string, 
  Imagen: string, 
  Imagen_Hover: string, 
  Miniatura: string, 
  Miniatura_Hover: string
}

export type Orden = 'asc' | 'desc'

export type Criterio = { activo: boolean, order: Orden }

// usuario

export interface DatosUsuario {
  Alias: string,
  Nombres: string,
  Apellido: string,
  FechaNac: string,
  Edad: number,
  Email: string,
  Telefono: string,
  Contraseña: string
}

export interface DatosUsuarioPerfil {
  AliasUsuario: string,
  Nombres: string,
  Apellido: string,
  FechaDeNacimiento: string,
  Edad: number,
  Email: string,
  Telefono: string,
  FechaDeRegistro: string
}

export interface DatosModificables {
  AliasUsuario: string,
  Nombres: string,
  Apellido: string,
  FechaDeNacimiento: string,
  Edad: number,
  Telefono: string,
}

export interface LogUsuarioForm {
  AliasUsuario: string,
  Contraseña: string
}


// carrito

export interface Carrito_Prod {
  ProductoID: number, 
  NombreProducto: string, 
  PrecioXUnidad: number, 
  Cantidad: number
}

// contexto

export interface GeneralTipo {
  jwt: string,
  setjwt: Dispatch<SetStateAction<string>>,
  cookiesenabled: boolean | undefined,
  setcookiesenabled: Dispatch<SetStateAction<boolean|undefined>>
  carrito: Carrito_Prod[],
  setcarrito: Dispatch<SetStateAction<Carrito_Prod[]>>,
  seleccion: Seleccion,
  setseleccion: Dispatch<SetStateAction<Seleccion>>,
  anchopantalla: number,
  setanchopantalla: Dispatch<SetStateAction<number>>,
  loginformvisible: boolean,
  setloginformvisible: Dispatch<SetStateAction<boolean>>,
  registroformvisible: boolean,
  setregistroformvisible: Dispatch<SetStateAction<boolean>>,
  perfilvisible: boolean,
  setperfilvisible: Dispatch<SetStateAction<boolean>>,
  carritovisible: boolean,
  setcarritovisible: Dispatch<SetStateAction<boolean>>
}

// navbar

export type Seleccion = 'INICIO' | 'PRODUCTOS' | 'CONTACTO'

// contenido pagina

export type Contenido = typeof Home | typeof Tienda | typeof Contacto
export type Presentacion = 'PC' | 'MOVIL'
export type imgarr_tupla = [string, string, string, string, string, string, string, string, string, string]

export default interface contacto{
  direccion: string,
  departamentos: string[],
  horarioatencion: string,
  contacto: string[]
}

// registro

export type Meses = 'ENERO' | 'FEBRERO' | 'MARZO' | 'ABRIL' | 'MAYO' | 'JUNIO' | 'JULIO' | 'AGOSTO' | 'SEPTIEMBRE' | 'OCTUBRE' | 'NOVIEMBRE' | 'DICIEMBRE'


// perfil

export type DatosModo = 'MUESTRA' | 'EDICION'