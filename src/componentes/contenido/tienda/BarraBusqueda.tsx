import React, { Dispatch } from 'react'
import { IoSearchCircle } from 'react-icons/io5'
import { Producto } from '~/interfaces/Interfaces'
import { SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { ordenarPorBusqueda } from '../../../utilidades/funciones';

type props = {
  setprodslista: Dispatch<SetStateAction<Producto[]>>
}

type datos = {
  ABuscar: string
}

export default function BarraBusqueda({ setprodslista }: props): JSX.Element {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const manejarBusqueda = (datos: datos) => {
    setprodslista(prods => ordenarPorBusqueda(prods, datos.ABuscar))
  }

  return (
    <div>
      <form id='busqueda_input' onSubmit={handleSubmit(manejarBusqueda)}>
        <input 
          type='text' 
          title='Input caracteres buscados'  
          {...register('ABuscar', {
            required: true,
            minLength: 1,
            maxLength: 30,
            validate: (dato: string) => dato.trim().length !== 0
          }
        )}></input>
        <button type='submit' form='busqueda_input' title='Aplicar busqueda personalizada'>
          <IoSearchCircle></IoSearchCircle>
        </button>
        <div>
          { 
            errors?.ABuscar?.type === 'required' ? <span>No hay texto en la caja de busqueda</span> :
            errors?.ABuscar?.type === 'pattern' ? <span>Caracteres validos: letras, numeros, espacios, simbolos '-_'</span> :
            errors?.ABuscar?.type === 'maxLength' ? <span>La busqueda no debe tener mas de 30 caracteres</span> : 
            errors?.ABuscar?.type === 'validate' ? <span>La busqueda no puede tener solo espacios</span> : ''
          }
        </div>
      </form>
    </div>
  )
}