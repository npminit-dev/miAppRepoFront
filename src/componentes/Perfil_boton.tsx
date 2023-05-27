import React, { useContext } from 'react'
import { General } from '../contextos/General'
import '../estilos/navbar.css'
import { TiShoppingCart } from 'react-icons/ti'

export default function Perfil_boton(): JSX.Element{

  const { jwt } = useContext(General)

  return (
    <>
    { (!jwt) 
    ? <div id='iniciar_sesion'>INICIAR SESION</div>
    : <div id='perfil_container'>
        <div id='carr_logo_container'><TiShoppingCart id='carr_logo'></TiShoppingCart></div>
        <div id='perfil'>PERFIL</div> 
      </div>
    }
    </>
  )
}