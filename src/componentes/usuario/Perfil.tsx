import React, { useContext, useState, useRef, useEffect } from 'react'
import { General } from '../../contextos/General'
import '../../estilos/perfil.css'
import { DatosModo, DatosUsuarioPerfil } from '../../interfaces/Interfaces'
import { fetchData } from '../../utilidades/funciones'
import ModificarDatos from './ModificarDatos'
import Datos from './Datos'
import { AiFillEdit } from 'react-icons/ai'

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
      [{ right: `-${perfilcontenedor.current.offsetWidth}px` }, { right: '0' }], 
      { duration: 150, fill: 'forwards', easing: 'ease-out' }
    )
  }

  const cerrarPerfil = () => {
    perfilcontenedor.current.animate(
      [{ right: '0' }, { right: `-${perfilcontenedor.current.offsetWidth}px` }], 
      { duration: 150, fill: 'forwards', easing: 'ease-in' }
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
    <div id="perfil_fondo" onClick={(e) => e.target === perfilfondo.current && cerrarPerfil()} ref={perfilfondo}>
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
          </div>
          </> }
        </div>
      </div>
    </div>
    }
    </>
  );

}