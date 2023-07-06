import React, { useContext, useState } from "react";
import { General } from "../../contextos/General";
import '../../estilos/contenido.css'
import Home from './Home'
import { Contenido } from "~/interfaces/Interfaces";
import Tienda from './tienda/Tienda';
import Contacto from "./Contacto";

export default function Contenido(): JSX.Element{

  const { seleccion } = useContext(General);

  return (
    <div id="contenido_contenedor">
      { seleccion === 'INICIO' 
        ? <Home></Home> 
        : seleccion === 'PRODUCTOS' 
        ? <Tienda></Tienda> 
        : <Contacto></Contacto> }
    </div>
  )
}