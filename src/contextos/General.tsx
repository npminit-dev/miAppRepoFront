import React, { createContext, useState, useEffect } from "react";
import { Carrito_Prod, Producto, GeneralTipo, DatosUsuario, Seleccion } from "../interfaces/Interfaces";
import { cookiename } from '../utilidades/funciones';
import Cookies from "js-cookie";

const defValues: GeneralTipo = {
  jwt: '',
  setjwt: (): null => null,
  cookiesenabled: undefined,
  setcookiesenabled: (): null => null,
  carrito: [] as Carrito_Prod[],
  setcarrito: (): null => null,
  seleccion: 'INICIO',
  setseleccion: (): null => null,
  anchopantalla: window.innerWidth,
  setanchopantalla: (): null => null,
  loginformvisible: false,
  setloginformvisible: (): null => null,
  registroformvisible: false,
  setregistroformvisible: (): null => null,
  perfilvisible: false,
  setperfilvisible: (): null => null,
  carritovisible: false,
  setcarritovisible: (): null => null 
}

export const General = createContext<GeneralTipo>(defValues);

export default function GeneralProvider({children}: any): JSX.Element{

  const [jwt, setjwt] = useState('');
  const [cookiesenabled, setcookiesenabled] = useState(undefined)
  const [carrito, setcarrito] = useState([] as Carrito_Prod[])
  const [seleccion, setseleccion] = useState('INICIO' as Seleccion)
  const [anchopantalla, setanchopantalla] = useState(window.innerWidth)
  const [loginformvisible, setloginformvisible] = useState(false)
  const [registroformvisible, setregistroformvisible] = useState(false)
  const [perfilvisible, setperfilvisible] = useState(false)
  const [carritovisible, setcarritovisible] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('cookiesenabled') == 'true') setcookiesenabled(true)
    else if(localStorage.getItem('cookiesenabled') == 'false') setcookiesenabled(false)
    else Cookies.remove(cookiename)
    if(Cookies.get(cookiename)) setjwt(Cookies.get(cookiename))
  }, [])

  window.addEventListener('resize', () => {
    setanchopantalla(window.innerWidth)
  })

  return (
    <General.Provider value={{
      jwt, 
      setjwt, 
      cookiesenabled,
      setcookiesenabled,
      carrito, 
      setcarrito, 
      seleccion, 
      setseleccion, 
      anchopantalla, 
      setanchopantalla, 
      loginformvisible, 
      setloginformvisible, 
      registroformvisible, 
      setregistroformvisible,
      perfilvisible,
      setperfilvisible,
      carritovisible,
      setcarritovisible
    }}>
      {children}
    </General.Provider>
  )
}