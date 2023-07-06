import React, { useState, useEffect, useRef, useContext, useReducer, ReducerWithoutAction, ReducerState, Reducer } from 'react'
import { Producto } from '../../../interfaces/Interfaces'
import { General } from '../../../contextos/General'

import Ordenamiento from './Ordenamiento'
import ProductosLista from './ProductosLista'

type acciones = {
  type: 'porNombreAsc' | 'porNombreDesc' | 'porPrecioAsc' | 'porPrecioDesc'
}

export default function Tienda(): JSX.Element {


  const { carrito, setcarrito, jwt, setjwt } = useContext(General)
  const [ focuseado, setfocuseado ] = useState<Producto>(undefined)
  const [ prodslista, setprodslista ] = useState<Producto[]>([])

  const getProds = () => {
    fetch('http://localhost:3002/prods/categoria/desc')
      .then(prodsjson => prodsjson.json())
      .then(carr => setprodslista(carr))
  }

  useEffect(() => {
    getProds()
  }, [])

  return (
    <section>
      <Ordenamiento 
        setprodslista={setprodslista}
        prodslista={prodslista}
      ></Ordenamiento>
      <ProductosLista prodslista={prodslista}></ProductosLista>
    </section>
  )
}