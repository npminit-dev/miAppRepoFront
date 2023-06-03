import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { LogUsuarioForm } from "~/interfaces/Interfaces";
import '../estilos/logform.css'
import { AiFillCloseCircle } from 'react-icons/ai'
import { General } from "../contextos/General";

export default function LogForm(): JSX.Element {

  const { register, formState: {errors} , handleSubmit } = useForm({})

  const { loginformvisible, setloginformvisible } = useContext(General)

  const cerrarModal = () => loginformvisible ? setloginformvisible(false) : setloginformvisible(true)

  function datosForm(datos: LogUsuarioForm){
    console.log(datos)
  }

  return (
    <>
      {loginformvisible ? 
      <div id="logform_fondo">
      <div id="logform_contenedor">
        <AiFillCloseCircle id="logform_cerrar" onClick={cerrarModal}></AiFillCloseCircle>
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
            <input className="input" type="text" {...register('Contraseña',{
              required: true
            })}/>
            { errors.Contraseña?.type === 'required' && <p className="err_msg">el campo 'Contraseña' es obligatorio</p> }
          </div>
          <input id="submit" type="submit" value="INICIAR SESION"/>
          <a href="#" id="boton_registro">Quiero registrarme</a>
        </form>
      </div>  
    </div>
    : <></>
    }
    </>
  )
}