import React, { SyntheticEvent, useContext, useState } from 'react';
import { Seleccion } from '~/interfaces/Interfaces';
import Perfil_boton from './Perfil_boton';
import { AiOutlineMenu, AiFillHome, AiFillShop, AiFillPhone } from 'react-icons/ai'
import { General } from '../contextos/General';
import Logo from './Logo';

const nav_movil_keyframes = [
  { transform: 'translateY(0px)' },
  { transform: 'translateY(-100px)' }
]

export default function Navbar(): JSX.Element {

  const { setseleccion, seleccion, anchopantalla, setanchopantalla } = useContext(General)
  const [ desplegado, setdesplegado ] = useState<boolean>(false)
  
  function desplegar_contraer(){
    if(desplegado) document.getElementById('navbar_item_container_movil').animate(nav_movil_keyframes, { duration: 120, easing: 'ease-in' })
    else document.getElementById('navbar_item_container_movil').animate(nav_movil_keyframes, { duration: 120, direction: 'reverse', easing: 'ease-out' })
  } 

  function manejarBotonDesplegable(e: any){
    if(!desplegado) {
      desplegar_contraer()
      setdesplegado(true)
      document.getElementById('navbar_item_container_movil').style.display = 'grid'
    } else {
      desplegar_contraer()
      setdesplegado(false)
      setTimeout(() => document.getElementById('navbar_item_container_movil').style.display = 'none', 100)
    }
  }
  
  const manejarSeleccion = (e: any, seleccion: Seleccion): any => {
    setseleccion(seleccion)
    if(anchopantalla <= 782) manejarBotonDesplegable(e);
  }

  return (
    <>
      <nav id='navbar'> 
        <AiOutlineMenu id='navbar_items_boton' onClick={manejarBotonDesplegable}></AiOutlineMenu>
        <Logo></Logo>
        <div id='navbar_item_container'>
          <div className='navbar_item' onClick={(e) => manejarSeleccion(e, 'INICIO')}>INICIO</div>
          <div className='navbar_item' onClick={(e) => manejarSeleccion(e, 'PRODUCTOS')}>TIENDA</div>
          <div className='navbar_item' onClick={(e) => manejarSeleccion(e, 'CONTACTO')}>CONTACTO</div>
        </div>
        <Perfil_boton></Perfil_boton>
      </nav>
      { anchopantalla <= 782
       ? <div id='navbar_item_container_movil'>
           <div className='navbar-item_movil' onClick={(e) => manejarSeleccion(e, 'INICIO')}><AiFillHome className='item_logo' style={{marginRight: '10px'}}></AiFillHome>INICIO</div>
           <div className='navbar-item_movil' onClick={(e) => manejarSeleccion(e, 'PRODUCTOS')}><AiFillShop className='item_logo' style={{marginRight: '10px'}}></AiFillShop>TIENDA</div>
           <div className='navbar-item_movil' onClick={(e) => manejarSeleccion(e, 'CONTACTO')}><AiFillPhone className='item_logo' style={{marginRight: '10px'}}></AiFillPhone>CONTACTO</div>
         </div>
        : <></>
      }
    </>
  )
}