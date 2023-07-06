import React, { useState, useContext, useEffect } from 'react'
import { BiExit } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { General } from '../../../contextos/General'
import { cookiename } from '../../../utilidades/funciones';

export default function CerrarSesion(): JSX.Element {

  const { setjwt, setcarrito, setseleccion, setperfilvisible, setcarritovisible } = useContext(General)

  const [confirmacion, setconfirmacion] = useState<boolean>(false)

  const cerrarSesion = () => {
    Cookies.remove(cookiename)
    setcarrito([])
    setjwt('')
    setseleccion('INICIO')
    setconfirmacion(false)
    setperfilvisible(false)
    setcarritovisible(false)
  }

  useEffect(() => {
    console.log(confirmacion)
  }, [confirmacion])

  return (
    <div id='cerr_ses_boton' title='Cerrar sesion'>
      { !confirmacion ? 
        <div id='cerr_ses_seleccion' onClick={() => setconfirmacion(true)}>
          <span id='cerr_ses_sel_titulo'>CERRAR SESION</span>
          <BiExit id='cerr_ses_ico'></BiExit> 
        </div> : 
        <div id='cerr_ses_confirm'>
          <span id='cerr_ses_con_titulo'>SE CERRARA LA SESION</span>
          <button id='cerr_ses_con_conf' type='button' title='confirmar cierre de sesion' 
            onClick={() => confirmacion && cerrarSesion()}
          >OK</button>
          <button id='cerr_ses_con_can' type='button' title='cancelar cierre de sesion' 
            onClick={() => setconfirmacion(false)}
          >CANCELAR</button>
        </div>
      }
      
    </div>
  )
}