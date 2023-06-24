import React, { SetStateAction } from 'react'
import { DatosModo, DatosUsuarioPerfil } from '../../interfaces/Interfaces';
import Dato from './Dato';
import { AiFillEdit } from 'react-icons/ai';
import { Dispatch } from 'react';
import '../../estilos/datos.css'
import { recortarDateDB, revertirFecha } from '../../utilidades/funciones';

type props = {
  datos: DatosUsuarioPerfil,
  setmodo: Dispatch<SetStateAction<DatosModo>>
}

export default function Datos({datos, setmodo} : props): JSX.Element {

  return (
    <section id='datos_contenedor'>
      {
        Object.entries(datos).map((elem, i) => {
          console.log(elem[1])
          return (
            <Dato
              key={i}
              etiqueta={elem[0]}
              dato={(elem[0] == 'FechaDeNacimiento' || elem[0] == 'FechaDeRegistro') 
                ? revertirFecha(recortarDateDB(elem[1])) 
                : elem[1] }
            ></Dato>
          )
        })
      }
    </section>
  )
}