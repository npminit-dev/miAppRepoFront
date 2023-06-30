import React from "react";
import { normalizarCamelCase } from "../../../utilidades/funciones";
import '../../../estilos/dato.css'

type props = {
  etiqueta: string,
  dato: string
}

export default function Dato({ etiqueta, dato }: props): JSX.Element {

  return (
    <div className="dato_contenedor">
      <label className="etiqueta_dato"> { normalizarCamelCase(etiqueta) } </label>
      <label className="valor_dato"> { dato } </label>
    </div>
  )
}