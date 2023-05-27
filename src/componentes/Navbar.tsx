import React, { SyntheticEvent, useContext, useState } from "react";
import { Seleccion } from "~/interfaces/Interfaces";
import Perfil_boton from './Perfil_boton';
import { AiOutlineMenu } from 'react-icons/ai'
import { General } from "../contextos/General";
import Logo from "./Logo";

export default function Navbar(): JSX.Element {

  const { setseleccion, seleccion } = useContext(General)

  const Inicio = () => setseleccion('INICIO')
  const Productos = () => setseleccion('PRODUCTOS')
  const SobreNos = () => setseleccion('SOBRE NOSOTROS')

  return (
    <nav id="navbar">
      <AiOutlineMenu id="navbar_items_boton"></AiOutlineMenu>
      <Logo></Logo>
      <div id="navbar_item_container">
        <div className="navbar_item" onClick={Inicio}>INICIO</div>
        <div className="navbar_item" onClick={Productos}>PRODUCTOS</div>
        <div className="navbar_item" onClick={SobreNos}>SOBRE NOSOTROS</div>
      </div>
      <Perfil_boton></Perfil_boton>
    </nav>
  )
}