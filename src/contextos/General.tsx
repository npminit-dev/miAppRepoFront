import React, { createContext, useState, useEffect } from "react";
import { Carrito_Prod, Producto, GeneralTipo, DatosUsuario, Seleccion } from "~/interfaces/Interfaces";

const defValues: GeneralTipo = {
  jwt: '',
  setjwt: (): null => null ,
  datosusuario: undefined,
  setdatosusuario: (): null => null,
  productos: [] as Producto[],
  setproductos: (): null => null,
  carrito: [] as Carrito_Prod[],
  setcarrito: (): null => null,
  total: 0.0,
  settotal: (): null => null,
  seleccion: 'INICIO',
  setseleccion: (): null => null
}

export const General = createContext<GeneralTipo>(defValues);

export default function GeneralProvider({children}: any): JSX.Element{

  useEffect(() => {
    async function getProds(){
      let prods: Producto[] | Response = await fetch('http://localhost:3002/prods/categoria/desc')
      prods = await prods.json();
      setproductos(prods as Producto[])
    }
    getProds();
  }, [])

  const [jwt, setjwt] = useState('');
  const [datosusuario, setdatosusuario] = useState({} as DatosUsuario)
  const [productos, setproductos] = useState([] as Producto[])
  const [carrito, setcarrito] = useState([] as Carrito_Prod[])
  const [total, settotal] = useState(0)
  const [seleccion, setseleccion] = useState('INICIO' as Seleccion)

  return (
    <General.Provider value={{
      jwt, setjwt, datosusuario, setdatosusuario, productos, setproductos, carrito, setcarrito, total, settotal, seleccion, setseleccion
    }}>
      {children}
    </General.Provider>
  )
}