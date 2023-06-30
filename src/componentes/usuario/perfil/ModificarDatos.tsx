import React, { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { DatosModificables, DatosModo, DatosUsuarioPerfil } from "~/interfaces/Interfaces";
import { cookiename, fetchData, recortarDateDB, revertirFecha } from '../../../utilidades/funciones';
import * as isoDatestringValidator from 'iso-datestring-validator';
import Cookies from "js-cookie";
import { BiExit, BiSave } from 'react-icons/bi'
import '../../../estilos/modificardatos.css'
import Editando from "../../Editando";

type props = {
  datos: DatosUsuarioPerfil
  setdatos: Dispatch<SetStateAction<DatosUsuarioPerfil>>
  jwt: string,
  setjwt: Dispatch<SetStateAction<string>>,
  setmodo: Dispatch<SetStateAction<DatosModo>>
}

export default function ModificarDatos({ datos, setdatos, jwt, setjwt, setmodo }: props): JSX.Element {

  const exitocaja = useRef<HTMLDivElement>();
  const { register, setError, handleSubmit , formState: { errors }, reset } = useForm({reValidateMode: 'onBlur'})
  const [exitotimer, setexitotimer] = useState<NodeJS.Timeout>();

  const manejarSubtmit = (datosInput: DatosModificables) => {
    let body = [jwt, Object.values(datosInput)]
    console.log(body)
    fetchData('http://localhost:3002/usuarios/modificar', JSON.stringify(body), 'PUT', 'application/json')
      .then((nuevojwt) => {
        setjwt(nuevojwt)
        if(localStorage.getItem('cookiesenabled') === 'true') Cookies.set(cookiename, nuevojwt)
        exitocaja.current.textContent = 'Cambios guardados!'
        if(exitotimer) clearTimeout(exitotimer)
        setexitotimer(setTimeout(() => exitocaja.current.textContent = '', 3000))
      })
      .catch((err) => {
        console.log(err)
        setError('Interno', { type: 'errorinterno', message: 'Error interno del servidor, cambios no guardados'})  
      })
  }
  
  const verificarAlias = async(alias: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {
      try {
        let resultado = await fetchData('http://localhost:3002/usuarios/verificaralias', alias, 'POST', 'text/plain')
        if(resultado === 'false') res(true)
      } catch(error) {
        res(false)
      }
    })
  }
  
  useEffect(() => {
    reset({ 
      AliasUsuario: datos.AliasUsuario,
      Nombres: datos.Nombres,
      Apellido: datos.Apellido,
      FechaDeNacimiento: revertirFecha(recortarDateDB(datos.FechaDeNacimiento)),
      Edad: datos.Edad,
      Telefono: datos.Telefono
     } as DatosModificables)
  }, [datos])

  return (
    <section id="modificar_seccion">
      <Editando></Editando>
      <form id="modificar_form" onSubmit={handleSubmit(manejarSubtmit)}>
        <div className='m_input_contenedor'>
          <label>Alias:</label>
          <input type="text" { ...register('AliasUsuario', {
            required: false,
            pattern: /^[\w\d\-\.]{7,50}$/g,
            validate: async (dato) => await verificarAlias(dato) || datos.AliasUsuario === dato 
          }) }></input>
        </div>

        <div className="m_input_contenedor">
          <label>Nombres:</label>
          <input type="text" {...register('Nombres', {
            required: false,
            pattern: /^[A-Z][a-z]{1,50}(\s)*([A-Z][a-z]{1,50})?$/g
          })}></input>
        </div>

        <div className="m_input_contenedor">
          <label>Apellidos:</label>
          <input type="text" {...register('Apellido', {
            required: false,
            pattern: /^[A-Z][a-z]{1,50}\s?([A-Z][a-z]{1,50})?$/
          })}></input>
        </div>

        <div className="m_input_contenedor">
          <label>Fecha de nacimiento:</label>
          <input type="text" {...register('FechaDeNacimiento', {
            required: false,
            pattern: /^(((0|1|2)[0-9]){1}|(3[0-1]))-((0[1-9])|(1[0-2]))-(19[0-9]{2}){1}|20[0-1][0-9]{1}$/g,
            validate: (fecha: string) => isoDatestringValidator.isValidDate(revertirFecha(fecha))
          })}></input>
        </div>

        <div className="m_input_contenedor">
          <label>Edad:</label>
          <input type="text" {...register('Edad', {
            required: false,
            pattern: /^([0-9]{1,2}|1[0-3][0-9])$/g
          })}></input>
        </div>

        <div className="m_input_contenedor">
          <label>Telefono:</label>
          <input type="text" {...register('Telefono', {
            required: false,
            pattern: /^\d{7,30}$/g
          })}></input>
        </div>

        <input hidden {...register('Interno', { required: false })} />

      </form>
      <div id="m_err_caja">
        { 
          errors.AliasUsuario?.type === 'validate' ? <div> El Alias ya existe en nuestro registros, intente con otro </div> : 
          errors.AliasUsuario?.type === 'pattern' ? <div> El Alias es debe tener de 7 a 30 caracteres de longitud, conteniendo letras, numeros y los simbolos '-', '.', '_'  </div> :
          errors.Nombres?.type === 'pattern' ? <div> El/los nombres pueden ser maximo 2 y deben comenzar con mayuscula, logitud maxima de 50 cada uno </div> :
          errors.Apellido?.type === 'pattern' ? <div> El/los apellidos pueden ser maximo 2 y deben comenzar con mayuscula, logitud maxima de 50 cada uno </div> :
          errors.FechaDeNacimiento?.type === 'pattern' ? <div> La fecha de nacimiento debe tener el formato DD-MM-YYYY y valores validos ej: 01-10-1999 </div> :
          errors.FechaDeNacimiento?.type === 'validate' ? <div> La fecha no es valida </div> : 
          errors.Edad?.type === 'pattern' ? <div> La edad insertada es invalida </div> :
          errors.Telefono?.type === 'pattern' ? <div> El telefono debe tener solo numeros y una longitud minima de 7 y maxima de 50 </div> : 
          errors.Interno?.type === 'errorinterno' ? <div> { errors.Interno.message as string } </div> : <></>
        }
        <div id="m_exito_caja" ref={exitocaja}></div>
      </div>
      <div id="guardar-salir_botones">
        <button id='guardar_boton' type="submit" form='modificar_form'>
          <span>GUARDAR</span>  
          <BiSave></BiSave>
        </button>
        <button id='salir_boton' form='modificar_form' onClick={() => setmodo("MUESTRA")}>
          <span>SALIR</span>
          <BiExit></BiExit>
        </button>
      </div>
    </section>
  )


}
