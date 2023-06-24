import Home from '../componentes/contenido/Home'
import Tienda from '../componentes/contenido/Tienda'
import Contacto from '../componentes/contenido/Contacto'

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
  setjwt: (jwt: string) => any,
  cookiesenabled: boolean | undefined,
  setcookiesenabled: (set: boolean) => any
  carrito: Carrito_Prod[],
  setcarrito: (carritos: Carrito_Prod[]) => any,
  total: number,
  settotal: (total: number) => any,
  seleccion: Seleccion,
  setseleccion: (seleccion: Seleccion) => any,
  anchopantalla: number,
  setanchopantalla: (ancho: number | undefined) => any,
  loginformvisible: boolean,
  setloginformvisible: (visible: boolean) => any,
  registroformvisible: boolean,
  setregistroformvisible: (visible: boolean) => any
  perfilvisible: boolean,
  setperfilvisible: (visible: boolean) => any
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