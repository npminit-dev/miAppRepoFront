import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { Carrito_Prod } from "~/interfaces/Interfaces";
import { AiFillDownCircle } from 'react-icons/ai'
import '../../../estilos/barraordenamiento.css'

type props = { 
  carrito: Carrito_Prod[],
  setcarrito: Dispatch<SetStateAction<Carrito_Prod[]>>
}

type criterios = 'nombre' | 'precio' | 'peso' | 'subtotal' | 'defecto'
type modo = 'asc' | 'desc'
type accion = {
  type: criterios,
  payload?: modo
}

const xNombreCB = (a: Carrito_Prod, b: Carrito_Prod) => a.NombreProducto.localeCompare(b.NombreProducto)
const xPrecioCB = (a: Carrito_Prod, b: Carrito_Prod) => a.PrecioXUnidad - b.PrecioXUnidad
const xPesoCB = (a: Carrito_Prod, b: Carrito_Prod) => a.Cantidad - b.Cantidad
const xSubTotalCB = (a: Carrito_Prod, b: Carrito_Prod) => (a.Cantidad * a.PrecioXUnidad) - (b.Cantidad * b.PrecioXUnidad)


export default function BarraOrdenamiento({ carrito, setcarrito }: props): JSX.Element {
  
  const [modos, setmodos] = useState<modo[]>(['desc', 'desc', 'desc', 'desc'])

  const [carr, dispatch] = useReducer((state: Carrito_Prod[], { type, payload }: accion): Carrito_Prod[] => {
    let nuevoEstado: Carrito_Prod[]
    switch(type){
      case 'nombre': 
        nuevoEstado = [...state].sort(xNombreCB);
        if(payload === 'asc') return nuevoEstado
        else {
          nuevoEstado.reverse();
          return nuevoEstado;
        }
      case 'precio': 
        nuevoEstado = [...state].sort(xPrecioCB);
        if(payload === 'asc') return nuevoEstado
        else {
          nuevoEstado.reverse();
          return nuevoEstado;
        }
      case 'peso': 
        nuevoEstado = [...state].sort(xPesoCB)
        if(payload === 'asc') return nuevoEstado
        else {
          nuevoEstado.reverse();
          return nuevoEstado;
        }
      case 'subtotal':
        nuevoEstado = [...state].sort(xSubTotalCB)
        if(payload === 'asc') return nuevoEstado
        else {
          nuevoEstado.reverse();
          return nuevoEstado;
        }
      case 'defecto': 
        return carrito
      default:
        throw new Error('action.type incorrecto')
    }
  }, carrito)

  const switchModo = (idx: number) => {
    setmodos(modos => modos.map((elem: modo, i) => {
      if(i === idx) {
        if(elem === 'asc') return 'desc'
        if(elem === 'desc') return 'asc'
        else throw new Error('valor de modo invalido')
      } else return elem
    }))
  }

  useEffect(() => {
    dispatch({ type: 'defecto'})
  }, [carrito])

  useEffect(() => {
    setcarrito(carr)
  }, [carr])

  return (
    <section id="barraord_contenedor">
      
      <button type="button" className='btn_criterio' 
        onClick={() => {
          switchModo(0)
          dispatch({ type: 'nombre', payload: modos[0] })
        }}>
        <span>NOMBRE</span>
        <AiFillDownCircle 
          className={ modos[0] === 'asc' ? 'modoflecha asc' : 'modoflecha desc' }
         ></AiFillDownCircle>
      </button>

      <button type="button" className='btn_criterio'
        onClick={() => {
          switchModo(1)
          dispatch({ type: 'precio', payload: modos[1] })
        }}>
        <span>PRECIO</span>
        <AiFillDownCircle
          className={ modos[1] === 'asc' ? 'modoflecha asc' : 'modoflecha desc' }
        ></AiFillDownCircle>
      </button>
      
      <button type="button" className='btn_criterio'
        onClick={() => {
          switchModo(2)
          dispatch({ type: 'peso', payload: modos[2] })
        }}>
        <span>PESO</span>
        <AiFillDownCircle
          className={ modos[2] === 'asc' ? 'modoflecha asc' : 'modoflecha desc' }
        ></AiFillDownCircle>
      </button>

      <button type="button" className='btn_criterio'
        onClick={() => {
          switchModo(3)
          dispatch({ type: 'subtotal', payload: modos[3] })
        }}>
        <span>SUBTOTAL</span>
        <AiFillDownCircle
          className={ modos[3] === 'asc' ? 'modoflecha asc' : 'modoflecha desc' }
        ></AiFillDownCircle>
      </button>

    </section>
  )
}