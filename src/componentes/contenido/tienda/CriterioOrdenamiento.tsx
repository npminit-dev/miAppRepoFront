import React from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { Criterio } from "~/interfaces/Interfaces";

type props = {
  etiqueta: Criterio,
  manejarordenamiento: (criterio: Criterio) => void
}

export default function CriterioOrdenamiento({ etiqueta, manejarordenamiento }: props): JSX.Element {
  return (
    <div 
      className='criterio_container'
      onClick={() => manejarordenamiento(etiqueta)}>
      <span className="criterio_etiqueta">{ etiqueta.toUpperCase() }</span>
      <div className='criterio_icono_contenedor'>
        <FaArrowRightArrowLeft className='criterio_icono'/>
      </div>
    </div>
  )
}