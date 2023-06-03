import React, { createContext, useState, useEffect } from "react";
import { Carrito_Prod, Producto, GeneralTipo, DatosUsuario, Seleccion } from "~/interfaces/Interfaces";

const defValues: GeneralTipo = {
  jwt: '',
  setjwt: (): null => null,
  cookiesenabled: false,
  setcookiesenabled: (): null => null,
  datosusuario: undefined,
  setdatosusuario: (): null => null,
  productos: [] as Producto[],
  setproductos: (): null => null,
  carrito: [] as Carrito_Prod[],
  setcarrito: (): null => null,
  total: 0.0,
  settotal: (): null => null,
  seleccion: 'INICIO',
  setseleccion: (): null => null,
  anchopantalla: window.innerWidth,
  setanchopantalla: (): null => null,
  loginformvisible: false,
  setloginformvisible: (): null => null,
  registroformvisible: false,
  setregistroformvisible: (): null => null
}

export const General = createContext<GeneralTipo>(defValues);

export default function GeneralProvider({children}: any): JSX.Element{

  useEffect(() => {
    if(!localStorage.getItem('cookiesenabled')) setcookiesenabled(false)
    else setcookiesenabled(true)
  }, [])

  const [jwt, setjwt] = useState('');
  const [cookiesenabled, setcookiesenabled] = useState(false)
  const [datosusuario, setdatosusuario] = useState({} as DatosUsuario)
  const [productos, setproductos] = useState([] as Producto[])
  const [carrito, setcarrito] = useState([] as Carrito_Prod[])
  const [total, settotal] = useState(0)
  const [seleccion, setseleccion] = useState('INICIO' as Seleccion)
  const [anchopantalla, setanchopantalla] = useState(window.innerWidth)
  const [loginformvisible, setloginformvisible] = useState(false)
  const [registroformvisible, setregistroformvisible] = useState(false)

  window.addEventListener('resize', () => {
    setanchopantalla(window.innerWidth)
  })

  return (
    <General.Provider value={{
      jwt, 
      setjwt, 
      cookiesenabled,
      setcookiesenabled,
      datosusuario, 
      setdatosusuario, 
      productos, 
      setproductos, 
      carrito, 
      setcarrito, 
      total, 
      settotal, 
      seleccion, 
      setseleccion, 
      anchopantalla, 
      setanchopantalla, 
      loginformvisible, 
      setloginformvisible, 
      registroformvisible, 
      setregistroformvisible
    }}>
      {children}
    </General.Provider>
  )
}