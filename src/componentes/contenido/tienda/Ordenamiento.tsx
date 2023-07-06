import React, { Dispatch, SetStateAction, useState } from "react";
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import BarraBusqueda from "./BarraBusqueda";
import { Criterio, EstadoOrd, Orden, Producto } from "~/interfaces/Interfaces";
import { ordenar } from "../../../utilidades/funciones";
import CriterioOrdenamiento from "./CriterioOrdenamiento";
import RangoPrecio from "./RangoPrecio";

type props = {
  setprodslista: Dispatch<SetStateAction<Producto[]>>,
  prodslista: Producto[]
}

export default function Ordenamiento({ setprodslista, prodslista }: props): JSX.Element {

  const [ ordestado, setordestado ] = useState<EstadoOrd>({ nombre: 'asc', precio: 'asc', categoria: 'desc' })

  const manejarOrdenamiento = async (criterio: Criterio) => {
    setordestado(prev => {
      let nuevoEstado = {...prev}
      prev[criterio] === 'asc' ? nuevoEstado[criterio] = 'desc' : nuevoEstado[criterio] = 'asc'
      return nuevoEstado
    })
     let result = await ordenar(prodslista, criterio, ordestado[criterio])
     setprodslista(result)
   }
  

  return (
    <section>
      <CriterioOrdenamiento 
        etiqueta={'nombre'} 
        manejarordenamiento={manejarOrdenamiento} 
      ></CriterioOrdenamiento>
      <CriterioOrdenamiento 
        etiqueta={'precio'} 
        manejarordenamiento={manejarOrdenamiento} 
      ></CriterioOrdenamiento>
      <CriterioOrdenamiento 
        etiqueta={'categoria'} 
        manejarordenamiento={manejarOrdenamiento} 
      ></CriterioOrdenamiento>
      <RangoPrecio setprodslista={setprodslista}></RangoPrecio>
      <BarraBusqueda setprodslista={setprodslista}/>
    </section>
  )
}