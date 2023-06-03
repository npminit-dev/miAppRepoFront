import Home from '../componentes/Home'
import Tienda from '../componentes/Tienda'
import Contacto from '../componentes/Contacto'

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
  cookiesenabled: boolean,
  setcookiesenabled: (set: boolean) => any,
  datosusuario: DatosUsuario
  setdatosusuario: (datos: DatosUsuario) => any
  productos: Producto[],
  setproductos: (productos: Producto[]) => any,
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