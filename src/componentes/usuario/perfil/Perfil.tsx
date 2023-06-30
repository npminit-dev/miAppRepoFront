import React, { useContext, useState, useRef, useEffect } from 'react'
import { General } from '../../../contextos/General'
import '../../../estilos/perfil.css'
import { DatosModo, DatosUsuarioPerfil } from '../../../interfaces/Interfaces'
import { fetchData } from '../../../utilidades/funciones'
import ModificarDatos from '../perfil/ModificarDatos'
import Datos from '../perfil/Datos'
import { AiFillEdit } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'

const datosDefecto: DatosUsuarioPerfil = {
    AliasUsuario: '', 
    Nombres: '', 
    Apellido: '', 
    FechaDeNacimiento: '', 
    Edad: 0,  
    Email: '',
    Telefono: '',
    FechaDeRegistro: ''
}

export default function Perfil(): JSX.Element {

  const { jwt, setjwt, perfilvisible, setperfilvisible } = useContext(General)
  const [datos, setdatos] = useState<DatosUsuarioPerfil>(datosDefecto)
  const [modo, setmodo] = useState<DatosModo>('MUESTRA')
  const perfilcontenedor = useRef<HTMLDivElement>()
  const perfilfondo = useRef<HTMLDivElement>()

  const obtenerDatos = async() => {
    try {
      let datos: any = await fetchData('http://localhost:3002/usuarios/misdatos', jwt, 'POST', 'text/plain')
      console.log(JSON.parse(datos))
      setdatos(JSON.parse(datos))
    } catch(error) {
      console.log(error)
    }
  }

  const abrirPerfil = () => {
    perfilcontenedor.current?.animate(
      [{ right: `-25px`, opacity: 0, filter: 'grayscale(1)' }, { right: '0', opacity: 1, filter: 'grayscale(0)' }], 
      { duration: 400, fill: 'forwards', easing: 'cubic-bezier(.1,.9,.51,.98)' }
    )
  }

  const cerrarPerfil = () => {
    perfilcontenedor.current.animate(
      [{ right: '0', opacity: 1, filter: 'grayscale(0)' }, { right: `-25px`, opacity: 0, filter: 'grayscale(1)' }], 
      { duration: 400, fill: 'forwards', easing: 'cubic-bezier(.73,.15,.9,.25)' }
    ).onfinish = () => {
      setperfilvisible(false)
      setmodo('MUESTRA')
    }
  }

  useEffect(() => {
    if(perfilvisible) {
      abrirPerfil()
      obtenerDatos()
    }
  }, [perfilvisible])

  return (
    <> {
    perfilvisible && 
    <div id="perfil_fondo" 
      onMouseDown={(e) => e.target === perfilfondo.current && cerrarPerfil()} ref={perfilfondo}>
      <div id="perfil_contenedor" ref={perfilcontenedor}>
        <header id='perfil_cabecera'>- MI PERFIL -</header> 
        <div id="perfil_contenedor_interno">
          { modo === 'EDICION' && 
            <ModificarDatos datos={datos} 
              setdatos={setdatos} 
              jwt={jwt} 
              setjwt={setjwt}
              setmodo={setmodo}
            ></ModificarDatos>
            }
          { modo === 'MUESTRA' && 
          <>
            <Datos datos={datos} setmodo={setmodo}></Datos>
            <div id='editar_boton_contenedor'>
              <button id='editar_boton' onClick={() => setmodo('EDICION')}>
                <span>EDITAR</span>
                <AiFillEdit></AiFillEdit>
              </button>
              <button id='cerrar_boton' onClick={() => cerrarPerfil()}>
                <span>CERRAR</span>
                <AiOutlineClose></AiOutlineClose>
              </button>
            </div>
          </> 
          }
        </div>
      </div>
    </div>
    }
    </>
  );

}