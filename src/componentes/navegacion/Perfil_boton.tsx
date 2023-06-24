import React, { useContext, useState } from 'react'
import { General } from '../../contextos/General'
import '../../estilos/navbar.css'
import { TiShoppingCart } from 'react-icons/ti'
import { FaUserCircle } from 'react-icons/fa'

export default function Perfil_boton(): JSX.Element{

  const { jwt, loginformvisible, setloginformvisible, setperfilvisible } = useContext(General)

  const sesionmodal = () => {
    loginformvisible ? setloginformvisible(false) : setloginformvisible(true)
  }

  return (
    <>
      { (!jwt) 
      ? <div id='iniciar_sesion' onClick={sesionmodal}>INICIAR SESION</div>
      : <div id='perfil_container'>
          <div id='carr_logo_container'><TiShoppingCart id='carr_logo'></TiShoppingCart></div>
          <div id='perfil' onClick={() => setperfilvisible(true)}><FaUserCircle id='perfil_icono'></FaUserCircle></div> 
        </div> 
      }
    </>
  )
}