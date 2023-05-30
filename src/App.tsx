import React, { useContext } from "react"
import { FaShopify } from 'react-icons/fa'
import Estrellas_miniatura from "./componentes/Estrellas_miniatura";
import { General } from "./contextos/General";
import { Producto } from './interfaces/Interfaces';
import Navbar from './componentes/Navbar';
import Contenido from "./componentes/Contenido";
import './estilos/app.css'
import PieDePagina from "./componentes/PieDePagina";


export default function App() {

  const { productos, setproductos, carrito, jwt, total, datosusuario } = useContext(General)

  return (
    <div id="app">
      <Navbar></Navbar>
      <Contenido></Contenido>
      <PieDePagina></PieDePagina>
    </div>
  )
}