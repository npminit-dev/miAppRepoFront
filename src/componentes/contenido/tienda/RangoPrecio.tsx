import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Producto } from "../../../interfaces/Interfaces";
import { RegisterOptions, UseFormRegister, useForm } from "react-hook-form";
import { AiOutlineClear } from 'react-icons/ai'
import { ordenarPorRango } from "../../../utilidades/funciones";

type props = {
  setprodslista: Dispatch<SetStateAction<Producto[]>>,
}

type formData = { limiteinferior: string, limitesuperior: string }


export default function RangoPrecio({ setprodslista }: props): JSX.Element {

  const { register, handleSubmit, reset, formState: { isValid } } = useForm()

  const manejarSubmit = (datos: formData) => 
    isValid && setprodslista(prods =>  ordenarPorRango(prods, datos.limiteinferior, datos.limitesuperior))

  const inputsOpciones: RegisterOptions = {
    required: true,
    minLength: 1,
    maxLength: 10,
    min: 1,
    max: 1000000000,
    pattern: /^[0-9]{1,10}$/gm,
    validate: (data: string) => !isNaN(parseInt(data)) && parseInt(data) > 0,
  }

  return (
    <form id='rangoprecio_form' onSubmit={handleSubmit(manejarSubmit)}>
      <div id='rangoprecio_titulo_contenedor'>
        <span id='rangoprecio_titulo'>RANGO DE PRECIOS</span>
      </div>
      <div id="rangoprecio_min_contenedor"> 
        <label id="rangoprecio_min_etiqueta">MIN:</label>
        <input 
          id="rangoprecio_min_input"
          type="number" 
          defaultValue="" 
          {...register('limiteinferior', inputsOpciones)}>
        </input>
      </div>
      <div id="rangoprecio_max_contenedor"> 
        <label id="rangoprecio_max_etiqueta">MAX:</label>
        <input 
          id="rangoprecio_max_input"
          type="number" 
          defaultValue="" 
          {...register('limitesuperior', inputsOpciones)}>
        </input>
      </div>
      <div id="rangoprecio_submit_contenedor">
        <button id="rangoprecio_submit"
          form='rangoprecio_form' 
          type="submit" 
          title="establecer rango">APLICAR</button>
      </div>
      <div id="rangoprecio_limpiar_contenedor">
        <AiOutlineClear 
          id='rangoprecio_limpiar_icono'
          onClick={() => reset()}>
        </AiOutlineClear>
      </div>
    </form>
  )
}