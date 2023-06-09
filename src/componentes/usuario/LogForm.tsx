import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { LogUsuarioForm } from "../../interfaces/Interfaces";
import '../../estilos/logform.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { General } from "../../contextos/General";
import { animarCierreModal, crearGalleta, fetchData } from '../../utilidades/funciones';
import { useRef } from 'react';
import RegistroForm from "./RegistroForm";

export default function LogForm(): JSX.Element {

  const { loginformvisible, setloginformvisible, setjwt, cookiesenabled } = useContext(General)

  const { register, formState: {errors} , handleSubmit } = useForm({})

  // asdasd

  const contenedor = useRef<HTMLDivElement>();  
  const sesionerrs = useRef<HTMLSpanElement>()
  const boton_iniciosesion = useRef<HTMLInputElement>()

  const [iniciando, setiniciando] = useState<boolean>(false)
  const [modalRegistro, setModalRegistro] = useState<boolean>(false);

  const cargarDatosUsuario = async (datos: LogUsuarioForm) => {
    try {
      setiniciando(true)
      let result = await fetchData('http://localhost:3002/usuarios/iniciarsesion', JSON.stringify(datos), 'post', 'application/json')
      if(cookiesenabled) crearGalleta(result, 15)
      setiniciando(false)
      setloginformvisible(false)
      setjwt(result)
    } catch(err) {
      sesionerrs.current.textContent = 'Credenciales Incorrectas'
      setiniciando(false)
    }
  }

  async function datosForm(datos: LogUsuarioForm){
    await cargarDatosUsuario(datos)
  }

  return (
    <>
      {loginformvisible ? 
      <div id="logform_fondo" ref={contenedor}>
      <div id="logform_contenedor">
        <AiFillCloseCircle id="logform_cerrar" onClick={() => animarCierreModal(contenedor, setloginformvisible)}></AiFillCloseCircle>
        <form id="logform" onSubmit={handleSubmit(datosForm)}>
          <div className="input_contenedor">
            <label className="input_etiqueta">Alias</label>
            <input className="input" type="text" {...register('AliasUsuario', { 
              required: true,
            })}/>
            { errors.AliasUsuario?.type === "required" && <p className="err_msg">el campo 'Alias' es obligatorio</p> }
          </div>
          <div className="input_contenedor">
            <label className="input_etiqueta">Contraseña</label>
            <input className="input" type="password" {...register('Contraseña',{
              required: true
            })}/>
            { errors.Contraseña?.type === 'required' && <p className="err_msg">el campo 'Contraseña' es obligatorio</p> }
          </div>
          <div id="iniciarsesion_contenedor">
            <input id="submit" type="submit" value={ iniciando ? 'INICIANDO...' : 'INICIAR SESION' } ref={boton_iniciosesion}/>
            <span className="err_msg" ref={sesionerrs}></span>
          </div>
          <a href="#" id="boton_registro" onClick={() => {
            setModalRegistro(true); 
            animarCierreModal(contenedor, setloginformvisible)}}
          >Quiero registrarme</a>
        </form>
      </div>  
    </div>
    : <></> }
      { modalRegistro && <RegistroForm setModalRegistro={setModalRegistro}></RegistroForm>}
    </>
  )
}